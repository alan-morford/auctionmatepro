# EMU7800 TouchPad/Pre3 App Update Flow

This describes how the EMU7800 webOS PDK app checks for updates, prompts the
user, and hands off installation to Preware. Source: `updater.c` / `updater.h`
in `com.emu7800.touchpad/plugin/src/`.

## 1. Checking for an update

- On startup, `updater_check_start()` spawns a background `pthread`
  (`update_check_thread`) so the check never blocks the main render/emulation
  loop.
- The thread makes a plain HTTP GET (raw POSIX sockets, no SSL) to the
  **App Museum II** web service:
  - Host: `appcatalog.webosarchive.org`
  - Path: `/WebService/getLatestVersionInfo.php?app=EMU7800/<APP_VERSION>`
  - Connect timeout: 5s (non-blocking `connect()` + `select()`), transfer
    timeout: 10s (`SO_RCVTIMEO`/`SO_SNDTIMEO`).
  - Sends `HTTP/1.0` with `Connection: close` so the response can be read to
    EOF without chunked-encoding parsing.
- The response body is parsed with a minimal hand-rolled JSON string
  extractor (`json_get_string`) — no JSON library — to pull out `"version"`
  and `"downloadURI"`.
- `is_version_newer()` compares the remote `major.minor.build` version
  against the local `APP_VERSION` (defined in `updater.h`, kept in sync with
  `appinfo.json`). Only a strictly newer version counts.
- If a newer version is found, a second request fetches full release notes
  from `/WebService/getMuseumDetails.php?id=1005823` (`"versionNote"`), with
  a fallback to the (possibly truncated) note already present in the first
  response if the details fetch fails.
- Results are published to the main thread via plain `volatile` globals
  (`g_update_available`, `g_new_version`, `g_version_note`,
  `g_download_uri`) guarded by a `__sync_synchronize()` memory barrier
  before the "available" flag is set — the same handoff pattern used
  elsewhere in the app (e.g. `g_frame_ready` for the emulation thread).
- The main thread polls with `updater_has_update()` (true once a newer
  version is found and not yet dismissed) and reads `updater_get_version()`
  / `updater_get_note()` to render the "update available" popup.

## 2. Prompting the user / agreeing to install

- The check itself is silent — nothing is downloaded or installed
  automatically.
- If `updater_has_update()` is true, the UI shows a popup with the new
  version number and release notes.
- The user has two choices, handled by the input layer:
  - **Dismiss** → `updater_dismiss()` sets `g_update_dismissed = 1`, which
    makes `updater_has_update()` return false for the rest of the session
    (the popup won't nag again until next launch).
  - **Update / Install** → `updater_install()` is called.

## 3. "Downloading" and launching Preware to install

The app does not download the `.ipk` itself — it delegates the actual fetch
and install to **Preware**, the community webOS package manager, via a
service call:

- `updater_install()` first checks `g_update_available` and that
  `g_download_uri` is non-empty; otherwise it's a no-op.
- It resolves `PDL_ServiceCall` dynamically with `dlsym(RTLD_DEFAULT, ...)`
  (rather than linking it directly) and calls:

  ```c
  palm://com.palm.applicationManager/open
  {
    "id": "org.webosinternals.preware",
    "params": {
      "type": "install",
      "file": "<downloadURI from App Museum II>"
    }
  }
  ```

  This asks the webOS Application Manager to launch Preware and hand it the
  download URL directly — Preware performs the actual HTTP download of the
  `.ipk` and the install itself; EMU7800 never touches the file.
- `g_update_dismissed` is set to `1` so the popup won't reappear.
- The app then calls `PDL_Minimize()` (also resolved via `dlsym`) so webOS
  can bring Preware to the foreground, sleeps for 2 seconds
  (`usleep(2000000)`) to give the system time to actually launch Preware,
  and finally calls `exit(0)` to fully quit EMU7800 — since Preware is about
  to overwrite the running app's `.ipk`, it can't safely keep running.

## 4. Shutdown

- `updater_shutdown()` is called on normal app exit to `pthread_join()` the
  background check thread if it was started, avoiding a dangling thread.

## Summary

1. Background thread silently polls App Museum II for a newer version.
2. If found, main thread shows a popup with version + notes; nothing happens
   until the user agrees.
3. On agreement, the app doesn't download anything itself — it asks the
   webOS Application Manager to open **Preware** with the update's download
   URL, lets webOS bring Preware to the front, then exits so Preware can
   safely download and install the new `.ipk` over the running app.

# USA TODAY webOS — watching taps/functions via novacom

Same physical setup as the other webOS restorations (`../mlbatbat`, `../box`, `../cbssports`):
the HP TouchPad is USB-attached to the user's **Windows** host, not WSL, and Claude has **no
live console or emulator access**. There is no on-device console by default — the only way to
see what's happening while the user taps around the app is through **novacom**, webOS's
developer-mode USB transport.

## How to actually watch taps / function calls live

The devkit tools (`novacom.exe`, `palm-install.bat`, `palm-log`, etc.) live under
`C:\Users\alanm\OneDrive\Documents\Projects\cbssports\devkit\SDK\bin` — this project (like
`mlbatbat`) doesn't have its own `devkit/` copy, it reuses that one. Shell out to them from WSL
via `powershell.exe -Command "& '<path>' <args>"` (single-quoted paths — `cmd.exe /c` has been
unreliable through the WSL→Windows interop path). Device must be in **Developer Mode**.

Two ways to watch live activity, in order of preference:

1. **`palm-log -f com.usatoday.webos`** — tails just this app's log lines live (app `console.log`/
   `enyo.log`/`this.log()` calls, plus the worker's own `console.log` if it's the local Node
   service pattern rather than the Cloudflare Worker). This is the fastest way to watch taps as
   they happen, if the code being tapped already logs.

2. **Raw device shell**, when you need system-wide context `palm-log` won't show:
   ```sh
   novacom.exe -t open tty://          # or: novaterm
   tail -f /var/log/messages           # everything
   tail -f /var/log/messages | grep com.usatoday.webos   # filtered to this app
   ```

**If the tap/function you care about isn't showing up in either**, it's almost certainly because
that code path has no logging yet — add `this.log(...)` / `console.log(...)` calls at the
handler in question (same approach used in `box` and `mlbatbat`: sprinkle logging at the
suspected function first, then tail, rather than guessing from source alone). A persistent
on-device file log (à la `box`'s `/media/internal/boxlog.txt` or `mlbatbat`'s
`SportsLogger` → `/media/internal/sports.log`) is the fallback if a live `novacom` session isn't
available when the issue happens — it survives without a live tail and can be pulled after the
fact with `novacom get file:///media/internal/<file> > <file>`.

## The hard constraint: one novacom session at a time

Only one `novacom -t open tty://` (or `palm-log -f`) session can be attached to the TouchPad at
once. The user installs new builds via **webOS Quick Install**, which also needs exclusive
device access — if a background tail/log session is still holding novacom, the install will be
blocked. So:

- Never leave a `palm-log`/`tail` session running in the background "just in case" while a build
  is pending install.
- Kill any running novacom-related task **before** telling the user a new `.ipk` is ready to
  test.
- Wait for the user's explicit confirmation that install finished (e.g. "installed", "testing
  now") before starting any new novacom session, one-shot or live-tailing.

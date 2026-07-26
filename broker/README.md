# Handoff: adding "ebay" to oauth.wosa.link

Two pieces to hand to the broker maintainer, both prepared here for review before deploying —
neither contains the real eBay client secret.

## 1. `apps/ebay/config.example.php`

Drop-in for the broker repo at that same path (`apps/ebay/config.example.php`). Standard
`oauth2_authcode` flow, same shape as `apps/box/config.example.php`. The real
`apps/ebay/config.php` (client_secret filled in, git-ignored on the broker same as
`apps/box/config.php`) needs:

- `client_id` = eBay **App ID**
- `client_secret` = eBay **Cert ID**
- `authorize_extra.redirect_uri` = the **RuName** created in the eBay dev portal (see below) —
  NOT `https://oauth.wosa.link/callback.php` itself, even though that URL is what gets registered
  as the RuName's "Auth accepted URL". eBay's redirect_uri parameter must be the opaque RuName
  string, not a literal URL — this is why the patch below exists.

## 2. `lib/OAuth2.php` — redirect_uri override patch

**Why:** `OAuth2::authorizeUrl()` already lets a per-app `authorize_extra.redirect_uri` win (via
`array_merge`), so the initial redirect to eBay's consent screen already sends the RuName
correctly with zero broker code changes. But `exchangeCode()` and `refresh()` don't consult config
at all — they hardcode the literal callback URL into the token-request `redirect_uri` param. OAuth2
requires the *same* `redirect_uri` at both steps, so without this patch eBay's token exchange
would fail with a redirect_uri mismatch even though the authorize step looked fine.

**What it does:** if `authorize_extra.redirect_uri` is set in an app's config, `exchangeCode()`
prefers it over the passed-in literal callback URL. Generically useful (any future provider with
the same quirk benefits), not an eBay-only special case, and every other app's behavior is
byte-for-byte unchanged (`isset(...) ? ... : $redirectUri` falls through to today's behavior when
the key isn't set).

Full patched file is at `lib/OAuth2.php` in this folder — only `exchangeCode()` changed, one line
added at the top of the method. Diff:

```diff
     public function exchangeCode($code, $redirectUri) {
+        // Some providers (eBay) require redirect_uri to be an opaque identifier
+        // registered out-of-band (eBay's "RuName") rather than the literal
+        // callback URL. authorizeUrl() already honors this override via
+        // authorize_extra; the token exchange step needs the same value.
+        if (isset($this->cfg['authorize_extra']['redirect_uri'])) {
+            $redirectUri = $this->cfg['authorize_extra']['redirect_uri'];
+        }
         return $this->tokenRequest(array(
             'grant_type'    => 'authorization_code',
             'code'          => $code,
             'client_id'     => $this->cfg['client_id'],
             'client_secret' => $this->cfg['client_secret'],
             'redirect_uri'  => $redirectUri,
         ));
     }
```

`refresh()` was left unchanged — eBay's refresh-token grant does not require `redirect_uri` at
all, per eBay's OAuth docs, so there's nothing to override there. Worth double-checking against a
real refresh call once eBay dev keys exist, in case that's wrong in practice.

## 3. eBay dev-portal setup (on the user's side, once dev keys exist)

1. In the eBay Developer Program account, create a **RuName** (My Account → User Tokens, or the
   Auth'n'Auth section — RuName creation is shared between Auth'n'Auth and OAuth).
2. Set its **Auth accepted URL** to `https://oauth.wosa.link/callback.php`.
3. Use the resulting RuName string (looks like
   `Stefan_Henze-StefanHe-5ddd-4-umjsbs`, per the old app's existing config) as
   `authorize_extra.redirect_uri` in `apps/ebay/config.php`.

## 4. `apps/ebay/deletion-notification.php` — Marketplace Account Deletion compliance endpoint

**Why:** eBay marks every Production keyset "Non Compliant" — and withholds the App ID/Cert
ID — until it has an HTTPS endpoint registered for Marketplace Account Deletion/Closure
notifications (eBay's GDPR/CCPA-style requirement — unrelated to the old, dead Client Alerts
system). This broker doesn't store any eBay user data server-side, so there's nothing to delete;
the endpoint only needs to pass eBay's verification handshake and ack real notifications so the
keyset stays compliant.

**Lives at `apps/ebay/deletion-notification.php`**, confirmed live and returning `200`. (An
earlier session briefly suspected oauth.wosa.link's nginx blanket-blocked everything under
`apps/*/`, based on a 404 right after the file was renamed there — that theory turned out to be
wrong; the 404 was just a deployment-timing gap. `apps/ebay/` serves PHP fine; only
`apps/*/config.php` specifically is blocked, same as the repo's own `.htaccess` documents.)

**What it does:** unlike `config.php`, this file holds no secret itself — no
copy-to-a-gitignored-file step needed, safe to commit as-is. It reads
`deletion_verification_token` out of `apps/ebay/config.php` — same git-ignored file that already
holds `client_id`/`client_secret` — rather than hardcoding the token as a constant in the endpoint
script, consistent with how every other secret in this broker is handled (this was a real bug in
the first version: the token was a hardcoded `const`, which would've leaked into git history the
moment someone pasted a real value in). `ENDPOINT_URL` stays a plain constant in the file — not a
secret, just needs to match wherever the file is actually served, since eBay's hash is computed
over that literal string. Handles eBay's `GET ?challenge_code=` verification handshake (returns a
SHA-256 hash per eBay's spec) and acks `POST` deletion notifications with a `200` after logging
them.

**Dev portal fields** (Alerts & Notifications tab):
- Marketplace account deletion notification endpoint: `https://oauth.wosa.link/apps/ebay/deletion-notification.php`
- Verification token: same value as `deletion_verification_token` in `apps/ebay/config.php`
- Email to notify if endpoint is down: the user's own email

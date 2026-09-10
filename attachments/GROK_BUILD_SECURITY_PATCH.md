# South End Pizza — Security + Bot Access Patch (for Grok Build)

Paste this into Grok Build as an implementation brief. Goal: bots (Security Guard, Chief of Staff, Finance, POS, etc.) get **independent, scoped access** without sharing human Admin credentials — and close the current high-risk holes.

**Do not put any plaintext Admin password in source, commits, chat, or bot memory.**

---

## A) Bot access model (recommended)

### Principle
Humans use the Admin UI (password + TOTP).  
Bots never log in as Admin. Each bot gets its own **machine credential** with the **minimum scopes** it needs.

### Design: Service agents + scoped API tokens

1. **New table** `bot_agents` (Neon / Postgres only — not PGLite in prod):
   - `id` (uuid)
   - `name` (e.g. `security-guard`, `chief-of-staff`, `finance`, `pos`)
   - `role` enum: `security_read` | `ops_read` | `menu_write` | `orders_read` | `admin_write` (avoid giving `admin_write` to routine bots)
   - `token_hash` (sha256 of token; never store raw token)
   - `scopes` text[] (fine-grained: `health.read`, `orders.read`, `auth.audit.read`, `menu.write`, …)
   - `enabled` bool
   - `created_at`, `last_used_at`, `expires_at` (nullable)
   - `created_by` (human admin id)

2. **Token format** (issued once, shown once):
   - `sep_live_<32+ random bytes base64url>`
   - Store **only** `sha256(token)` in DB
   - Deliver raw token to Silvergoon via secure channel; each bot stores it as a **bot secret** (env), never in chat/memory/repo

3. **New API surface** (server-only), e.g.:
   - `GET  /api/bot/v1/health` — public OK / auth optional
   - `GET  /api/bot/v1/security/summary` — requires `security_read`
   - `GET  /api/bot/v1/orders/recent` — requires `orders_read`
   - `POST /api/bot/v1/admin/rotate-staff-password` — requires `admin_write` + human confirmation flag (optional later)
   - Auth header: `Authorization: Bearer <sep_live_…>`
   - Reject cookie-session Admin impersonation on these routes (bots ≠ browsers)

4. **Hardening for bot API**
   - Constant-time hash compare
   - Rate limit per token (e.g. 60 req/min)
   - Audit log table `bot_audit` (agent_id, path, status, ip, ts)
   - Fail closed if `DATABASE_URL` missing in production
   - No bot token may place real paid orders or touch card processor
   - Optional: require `X-Bot-Id` matching registered name

5. **Per-bot recommended scopes**
   | Bot | Scopes |
   |-----|--------|
   | Security Guard | `health.read`, `auth.audit.read`, `security.summary`, `deploy.status.read` |
   | Chief of Staff | `health.read`, `orders.read` (summary), `menu.read` |
   | Finance | `orders.read`, `payments.read` (when real processor exists) |
   | POS Employee | `orders.read`, `orders.update_status` (kitchen only) — **no** `admin_write` |

6. **Issuance UX (Admin UI)**
   - Admin → Settings → **Bot access** → Create agent → copy token once → revoke anytime
   - Rotate = revoke old hash + mint new token

7. **Why this is safer than shared Admin login**
   - Compromised bot ≠ full Admin password
   - Per-bot revoke without rotating human credentials
   - Auditable; least privilege
   - Works from headless bots (Bearer), no browser cookie jar required

---

## B) Immediate security fixes (must ship)

### B1 — Remove hardcoded staff password from source
**File:** `src/lib/staff-admin.ts`

Today it exports a plaintext `STAFF_ADMIN_PASSWORD` in the public GitHub repo. Treat as compromised.

**Patch intent:**
- Keep `STAFF_ADMIN_USERNAME` / email / display name if needed for mapping
- **Delete** plaintext password constant from the repo
- Load staff password **only** from server env, e.g. `STAFF_ADMIN_PASSWORD` (Vercel secret)
- Prefer storing a **bcrypt/argon2 hash** in env (`STAFF_ADMIN_PASSWORD_HASH`) and verify against that
- On boot in production: if hash/password env missing → refuse staff login (fail closed), log loud error
- After deploy: Silvergoon sets a new strong password in Vercel env and rotates any places that used the old one
- Grep the repo for the old password string and purge history if it was ever committed (at minimum remove from HEAD; consider secret scanning)

### B2 — Require MFA for staff Admin
You already have `src/lib/totp.ts`. Wire it:
- After successful staff password check, require TOTP before creating Admin session
- Store TOTP secret encrypted at rest (or in env for single-admin MVP: `STAFF_ADMIN_TOTP_SECRET`)
- Enrollment QR once in Admin settings; backup codes hashed

### B3 — Production must use Neon (`DATABASE_URL`)
PGLite is fine for preview only. On Vercel production:
- Require `DATABASE_URL` (Neon)
- Prefer **fail closed**: if `VERCEL_ENV=production` and no `DATABASE_URL`, refuse to start auth / order writes
- Keep `BETTER_AUTH_URL=https://southendpizza.app`
- Keep `BETTER_AUTH_SECRET` set (long random); never commit it

### B4 — Trusted origins in production
Allow only:
- `https://southendpizza.app`
- `https://www.southendpizza.app`
Do **not** expand trust to arbitrary `Host` / sibling preview hosts in production. Keep dynamic host trust for preview/sandbox only.

### B5 — Freeze real card payments
Checkout still has “Card (processor placeholder)”:
- Hard-disable live card charge path until a real processor (Stripe/Square/etc.) is wired
- Show “Cash / pay in store” or “Card coming soon” only
- Bot tokens must not be able to trigger payment capture

### B6 — Cart isolation note
Cart uses Zustand + `localStorage` key `south-end-cart-v1` (browser-local). That is **not** a server cross-customer leak, but:
- Clear cart on sign-out / staff switch
- Never sync raw cart to a shared global store without `userId`
- When adding server carts later, always scope by `userId` / session

### B7 — Client bundle secret scan
Ensure `STAFF_ADMIN_PASSWORD`, `BETTER_AUTH_SECRET`, `GROK_AUTH_CLIENT_SECRET`, DB URLs never import into client modules. Keep them in `*.server.ts` only.

---

## C) Suggested file / route sketch (for implementer)

```
src/lib/staff-admin.ts          # no plaintext password; env/hash only
src/lib/bot/tokens.server.ts    # hash, verify, scopes
src/lib/bot/audit.server.ts
src/routes/api/bot/v1/*.ts      # bearer-auth’d bot API
migrations/00xx_bot_agents.sql
migrations/00xx_bot_audit.sql
Admin UI: Bot access panel
```

Pseudo-check for bot routes:

```ts
// Authorization: Bearer sep_live_…
const agent = await verifyBotBearer(request)
assertScope(agent, "security.summary")
await writeBotAudit(agent, request)
```

---

## D) Env checklist (Vercel project `southend/southendpizza`)

Required:
- `DATABASE_URL` (Neon)
- `BETTER_AUTH_URL=https://southendpizza.app`
- `BETTER_AUTH_SECRET` (long random)
- `STAFF_ADMIN_PASSWORD_HASH` (or password env — hash preferred)
- `STAFF_ADMIN_TOTP_SECRET` (after MFA wired)

Optional later:
- `BOT_TOKEN_PEPPER` (server-side pepper for token hashes)

---

## E) Rollout order

1. Patch B1 (remove plaintext password) + set new env secret → deploy
2. Add Neon `DATABASE_URL` if missing → deploy
3. Wire TOTP for Admin (B2)
4. Ship bot agents table + `/api/bot/v1/*` + Admin “Bot access” UI
5. Mint tokens for Security Guard / CoS / Finance / POS with least privilege
6. Disable placeholder card charge (B5)
7. Tighten production trusted origins (B4)

---

## F) Acceptance tests

- [ ] `staff-admin.ts` contains **no** plaintext password
- [ ] Old public password no longer works after rotate
- [ ] Staff login requires TOTP
- [ ] Production without `DATABASE_URL` does not silently run PGLite for auth/orders
- [ ] Bot with only `health.read` cannot hit `orders.read` or Admin mutations
- [ ] Revoking a bot token immediately returns 401
- [ ] Card placeholder cannot create a real charge
- [ ] Apex + www sign-in works; random Origin still rejected

---

## G) Copy-paste prompt for Grok Build

> Implement the South End Pizza security + bot access patch:
> 1) Remove plaintext staff Admin password from `src/lib/staff-admin.ts`; verify against env hash only; fail closed in production if missing.
> 2) Require TOTP for staff Admin using existing `src/lib/totp.ts`.
> 3) Require `DATABASE_URL` (Neon) in production; do not use PGLite for prod auth/orders.
> 4) Add `bot_agents` + `bot_audit` migrations and Bearer-token `/api/bot/v1/*` routes with scoped permissions so each bot gets independent access without sharing Admin credentials.
> 5) Add Admin UI to create/revoke bot tokens (show raw token once).
> 6) Disable live card processor placeholder charges.
> 7) In production, trust only `https://southendpizza.app` and `https://www.southendpizza.app` for auth origins.
> Do not print or commit any secrets. Follow least privilege for bot scopes.


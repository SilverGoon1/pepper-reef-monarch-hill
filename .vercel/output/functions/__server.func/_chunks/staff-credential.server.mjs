import { r as __exportAll } from "../_runtime.mjs";
import { r as hashPassword } from "../_libs/better-auth__utils.mjs";
import { i as isVercelProduction } from "../index.mjs";
//#region src/lib/staff-admin.ts
/** Shop desk identity. Better Auth still stores an email; the form maps this username to it. */
var STAFF_ADMIN_ID = "staff-admin";
var STAFF_ADMIN_USERNAME = "admin";
var STAFF_ADMIN_NAME = "Admin";
var STAFF_ADMIN_EMAIL = "admin@staff.southend.pizza";
function isStaffAdminUsername(raw) {
	return raw.trim().toLowerCase() === STAFF_ADMIN_USERNAME;
}
function isStaffAdminAccount(userId, email) {
	if (userId && userId === "staff-admin") return true;
	return String(email ?? "").trim().toLowerCase() === STAFF_ADMIN_EMAIL;
}
//#endregion
//#region src/lib/staff-credential.server.ts
var staff_credential_server_exports = /* @__PURE__ */ __exportAll({
	applyStaffCredential: () => applyStaffCredential,
	applyStaffTotpFromEnv: () => applyStaffTotpFromEnv,
	staffSecretConfigured: () => staffSecretConfigured
});
function env(key) {
	const value = process.env[key]?.trim();
	return value ? value : void 0;
}
function staffSecretConfigured() {
	return Boolean(env("STAFF_ADMIN_PASSWORD_HASH") || env("STAFF_ADMIN_PASSWORD"));
}
async function resolveStaffPasswordHash() {
	const existing = env("STAFF_ADMIN_PASSWORD_HASH");
	if (existing && existing.includes(":")) return existing;
	const password = env("STAFF_ADMIN_PASSWORD");
	if (password && password.length >= 12) return hashPassword(password);
	return null;
}
/**
* Seed the desk user row, then set (or wipe) the credential from env only.
* Never reads a password from source. Missing env disables desk password login
* so a previously leaked hash cannot keep working.
*/
async function applyStaffCredential(sql) {
	const found = (await sql.query(`select id from "user" where id = $1 or lower(email) = $2 limit 1`, [STAFF_ADMIN_ID, STAFF_ADMIN_EMAIL]))[0];
	const userId = found?.id ? String(found.id) : STAFF_ADMIN_ID;
	if (!found) await sql.query(`insert into "user" (id, name, email, "emailVerified", "createdAt", "updatedAt") values ($1,$2,$3,true,now(),now())`, [
		userId,
		STAFF_ADMIN_NAME,
		STAFF_ADMIN_EMAIL
	]);
	else await sql.query(`update "user" set name = $1, email = $2, "emailVerified" = true, "updatedAt" = now() where id = $3`, [
		STAFF_ADMIN_NAME,
		STAFF_ADMIN_EMAIL,
		userId
	]);
	const hash = await resolveStaffPasswordHash();
	if (!hash) {
		await sql.query(`delete from account where "userId" = $1 and "providerId" = 'credential'`, [userId]);
		if (isVercelProduction()) console.error("[southend] staff desk login disabled — set STAFF_ADMIN_PASSWORD_HASH (preferred) or STAFF_ADMIN_PASSWORD in host secrets.");
		return userId;
	}
	const cred = (await sql.query(`select id from account where "userId" = $1 and "providerId" = 'credential' limit 1`, [userId]))[0];
	if (cred?.id) await sql.query(`update account set password = $1, "updatedAt" = now() where id = $2 and "providerId" = 'credential'`, [hash, String(cred.id)]);
	else await sql.query(`insert into account (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
       values ($1,$2,'credential',$3,$4,now(),now())`, [
		`account-${userId}`,
		userId,
		userId,
		hash
	]);
	return userId;
}
async function applyStaffTotpFromEnv(sql, userId) {
	const totp = env("STAFF_ADMIN_TOTP_SECRET");
	if (totp && totp.length >= 16) await sql.query(`update profiles set totp_secret = $1, totp_enabled = true where user_id = $2`, [totp, userId]);
}
//#endregion
export { isStaffAdminAccount as a, STAFF_ADMIN_NAME as i, staff_credential_server_exports as n, isStaffAdminUsername as o, STAFF_ADMIN_EMAIL as r, staffSecretConfigured as t };

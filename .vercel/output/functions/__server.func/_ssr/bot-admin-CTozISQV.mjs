import { r as createServerFn } from "./ssr.mjs";
import { a as getSql, t as authMiddleware } from "./middleware-BxDzrAA-.mjs";
import { a as scopesForRole, i as scopesForPreset, n as isBotRole, t as BOT_PRESETS } from "./scopes-C8w_GCNd.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/bot-admin-CTozISQV.js
function bool(v) {
	return v === true || v === "t" || v === "true";
}
async function requireAdmin(userId) {
	const sql = await getSql();
	if ((await sql`select role from profiles where user_id = ${userId}`)[0]?.role !== "admin") {
		const err = /* @__PURE__ */ new Error("Forbidden");
		err.status = 403;
		throw err;
	}
	if (bool((await sql`select totp_enabled from profiles where user_id = ${userId}`)[0]?.totp_enabled)) {
		const exp = (await sql`select expires_at from two_factor_unlocks where user_id = ${userId}`)[0]?.expires_at;
		if (!exp || new Date(String(exp)).getTime() <= Date.now()) throw new Error("Two-factor verification required.");
	}
}
function asAgent(row) {
	const scopes = Array.isArray(row.scopes) ? row.scopes.map((s) => String(s)) : [];
	return {
		id: String(row.id),
		name: String(row.name ?? ""),
		role: isBotRole(String(row.role ?? "")) ? String(row.role) : "ops_read",
		scopes,
		enabled: bool(row.enabled),
		createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at ?? ""),
		lastUsedAt: row.last_used_at ? row.last_used_at instanceof Date ? row.last_used_at.toISOString() : String(row.last_used_at) : null,
		expiresAt: row.expires_at ? row.expires_at instanceof Date ? row.expires_at.toISOString() : String(row.expires_at) : null
	};
}
var listBotAgents_createServerFn_handler = createServerRpc({
	id: "99ed12c9cb6c46129f1642a8a2ea8fb4c72927ba9df92e71483c74ed499d0197",
	name: "listBotAgents",
	filename: "src/lib/bot/bot-admin.ts"
}, (opts) => listBotAgents.__executeServer(opts));
var listBotAgents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listBotAgents_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return (await (await getSql())`select id, name, role, scopes, enabled, created_at, last_used_at, expires_at
      from bot_agents order by name`).map((row) => asAgent(row));
});
var listBotAudit_createServerFn_handler = createServerRpc({
	id: "8a9ee10c2cc5e11b33d6a379a6fe7cf4a988cd15efede561ae22e9e349daef36",
	name: "listBotAudit",
	filename: "src/lib/bot/bot-admin.ts"
}, (opts) => listBotAudit.__executeServer(opts));
var listBotAudit = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listBotAudit_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return (await (await getSql())`
      select a.id, a.agent_id, coalesce(b.name, '') as name, a.path, a.status, a.ip, a.created_at
      from bot_audit a
      left join bot_agents b on b.id = a.agent_id
      order by a.created_at desc
      limit 40`).map((row) => ({
		id: String(row.id),
		agentId: String(row.agent_id ?? ""),
		name: String(row.name ?? ""),
		path: String(row.path ?? ""),
		status: Number(row.status) || 0,
		ip: String(row.ip ?? ""),
		createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at ?? "")
	}));
});
var createBotAgent_createServerFn_handler = createServerRpc({
	id: "ea5541caa0922774ffddac354148aa7de14aecf03f9d3741c45354d76566380d",
	name: "createBotAgent",
	filename: "src/lib/bot/bot-admin.ts"
}, (opts) => createBotAgent.__executeServer(opts));
var createBotAgent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createBotAgent_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const { hashBotToken, mintBotToken } = await import("./tokens.server-CDNOnmON.mjs").then((n) => n.r);
	const preset = BOT_PRESETS.find((p) => p.name === String(data.preset ?? "").trim());
	const roleRaw = preset?.role ?? String(data.role ?? "").trim();
	if (!isBotRole(roleRaw)) throw new Error("Pick a valid bot role.");
	const name = (preset?.name ?? String(data.name ?? "").trim().toLowerCase()).replace(/[^a-z0-9-]/g, "");
	if (name.length < 2 || name.length > 40) throw new Error("Bot name must be 2–40 letters, numbers, or dashes.");
	const scopes = preset ? scopesForPreset(preset) : scopesForRole(roleRaw);
	const token = mintBotToken();
	const id = `bot-${randomBytes(8).toString("hex")}`;
	const sql = await getSql();
	if ((await sql.query(`select id from bot_agents where name = $1 limit 1`, [name]))[0]) throw new Error("A bot with that name already exists. Rotate its token instead.");
	await sql.query(`insert into bot_agents (id, name, role, token_hash, scopes, enabled, created_by)
       values ($1,$2,$3,$4,$5::text[], true, $6)`, [
		id,
		name,
		roleRaw,
		hashBotToken(token),
		scopes,
		context.userId
	]);
	return {
		agent: asAgent((await sql`select id, name, role, scopes, enabled, created_at, last_used_at, expires_at from bot_agents where id = ${id}`)[0] ?? {
			id,
			name,
			role: roleRaw,
			scopes,
			enabled: true
		}),
		token
	};
});
var rotateBotAgent_createServerFn_handler = createServerRpc({
	id: "6a74183ea6184c189b407b4f7f6c6591530ad01084b7875f52823102883d1fd0",
	name: "rotateBotAgent",
	filename: "src/lib/bot/bot-admin.ts"
}, (opts) => rotateBotAgent.__executeServer(opts));
var rotateBotAgent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(rotateBotAgent_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const { hashBotToken, mintBotToken } = await import("./tokens.server-CDNOnmON.mjs").then((n) => n.r);
	const id = String(data.id ?? "").trim();
	if (!id) throw new Error("Bot is missing.");
	const token = mintBotToken();
	const updated = await (await getSql()).query(`update bot_agents set token_hash = $1, enabled = true, last_used_at = null where id = $2 returning id, name, role, scopes, enabled, created_at, last_used_at, expires_at`, [hashBotToken(token), id]);
	if (!updated[0]) throw new Error("Bot not found.");
	return {
		agent: asAgent(updated[0]),
		token
	};
});
var revokeBotAgent_createServerFn_handler = createServerRpc({
	id: "5c7825cbd144f750341957361628d61341a15aaba9bb6439feaa569f11c1ac5b",
	name: "revokeBotAgent",
	filename: "src/lib/bot/bot-admin.ts"
}, (opts) => revokeBotAgent.__executeServer(opts));
var revokeBotAgent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(revokeBotAgent_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const { hashBotToken, mintBotToken } = await import("./tokens.server-CDNOnmON.mjs").then((n) => n.r);
	const id = String(data.id ?? "").trim();
	if (!id) throw new Error("Bot is missing.");
	await (await getSql()).query(`update bot_agents set enabled = false, token_hash = $1 where id = $2`, [hashBotToken(mintBotToken()), id]);
	return { ok: true };
});
//#endregion
export { createBotAgent_createServerFn_handler, listBotAgents_createServerFn_handler, listBotAudit_createServerFn_handler, revokeBotAgent_createServerFn_handler, rotateBotAgent_createServerFn_handler };

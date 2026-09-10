import { c as __exportAll } from "./ssr.mjs";
import { a as getSql } from "./middleware-BxDzrAA-.mjs";
import { r as requireNeonInProduction } from "./prod-guard.server-DuOhlek3.mjs";
import { n as isBotRole, r as isBotScope } from "./scopes-C8w_GCNd.mjs";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/tokens.server-CDNOnmON.js
var tokens_server_exports = /* @__PURE__ */ __exportAll({
	BOT_TOKEN_PREFIX: () => BOT_TOKEN_PREFIX,
	agentHasScope: () => agentHasScope,
	hashBotToken: () => hashBotToken,
	hashesEqual: () => hashesEqual,
	mintBotToken: () => mintBotToken,
	parseBearer: () => parseBearer,
	rateLimitBot: () => rateLimitBot,
	verifyBotBearer: () => verifyBotBearer
});
var BOT_TOKEN_PREFIX = "sep_live_";
function pepper() {
	return process.env.BOT_TOKEN_PEPPER?.trim() ?? "";
}
function mintBotToken() {
	return `${BOT_TOKEN_PREFIX}${randomBytes(32).toString("base64url")}`;
}
function hashBotToken(token) {
	return createHash("sha256").update(`${pepper()}${token}`).digest("hex");
}
function hashesEqual(a, b) {
	const left = Buffer.from(a);
	const right = Buffer.from(b);
	if (left.length !== right.length) return false;
	return timingSafeEqual(left, right);
}
function parseBearer(request) {
	return (request.headers.get("authorization") ?? "").match(/^Bearer\s+(\S+)/i)?.[1] ?? "";
}
function parseScopes(raw) {
	return (Array.isArray(raw) ? raw.map((s) => String(s)) : []).filter(isBotScope);
}
function agentHasScope(agent, scope) {
	return agent.scopes.includes(scope);
}
var rateRef = globalThis;
function rateHits() {
	rateRef.__southendBotRate__ ??= /* @__PURE__ */ new Map();
	return rateRef.__southendBotRate__;
}
function rateLimitBot(agentId, limit = 60, windowMs = 6e4) {
	const now = Date.now();
	const hits = rateHits();
	const prev = (hits.get(agentId) ?? []).filter((t) => now - t < windowMs);
	if (prev.length >= limit) return false;
	prev.push(now);
	hits.set(agentId, prev);
	return true;
}
async function verifyBotBearer(request) {
	requireNeonInProduction();
	const token = parseBearer(request);
	if (!token.startsWith("sep_live_") || token.length < 25) return null;
	const digest = hashBotToken(token);
	const sql = await getSql();
	const row = (await sql.query(`select id, name, role, scopes, enabled, expires_at, token_hash
     from bot_agents
     where token_hash = $1
     limit 1`, [digest]))[0];
	if (!row?.id) return null;
	if (!hashesEqual(String(row.token_hash ?? ""), digest)) return null;
	if (row.enabled !== true && row.enabled !== "t" && row.enabled !== "true") return null;
	const expires = row.expires_at ? new Date(String(row.expires_at)).getTime() : 0;
	if (expires && expires <= Date.now()) return null;
	const name = String(row.name ?? "");
	const hinted = (request.headers.get("x-bot-id") ?? "").trim();
	if (hinted && hinted !== name) return null;
	const role = String(row.role ?? "");
	if (!isBotRole(role)) return null;
	const agent = {
		id: String(row.id),
		name,
		role,
		scopes: parseScopes(row.scopes),
		enabled: true,
		expiresAt: row.expires_at ? String(row.expires_at) : null
	};
	await sql.query(`update bot_agents set last_used_at = now() where id = $1`, [agent.id]);
	return agent;
}
//#endregion
export { verifyBotBearer as i, rateLimitBot as n, tokens_server_exports as r, agentHasScope as t };

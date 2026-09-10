import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { getSql } from "@/lib/db";
import { requireNeonInProduction } from "@/lib/prod-guard.server";
import { isBotRole, isBotScope, type BotRole, type BotScope } from "@/lib/bot/scopes";

export const BOT_TOKEN_PREFIX = "sep_live_";

export type BotAgent = {
  id: string;
  name: string;
  role: BotRole;
  scopes: BotScope[];
  enabled: boolean;
  expiresAt: string | null;
};

function pepper() {
  return process.env.BOT_TOKEN_PEPPER?.trim() ?? "";
}

export function mintBotToken() {
  return `${BOT_TOKEN_PREFIX}${randomBytes(32).toString("base64url")}`;
}

export function hashBotToken(token: string) {
  return createHash("sha256").update(`${pepper()}${token}`).digest("hex");
}

export function hashesEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function parseBearer(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(\S+)/i);
  return match?.[1] ?? "";
}

function parseScopes(raw: unknown): BotScope[] {
  const list = Array.isArray(raw) ? raw.map((s) => String(s)) : [];
  return list.filter(isBotScope);
}

export function agentHasScope(agent: BotAgent, scope: BotScope) {
  return agent.scopes.includes(scope);
}

const rateRef = globalThis as typeof globalThis & {
  __southendBotRate__?: Map<string, number[]>;
};

function rateHits() {
  rateRef.__southendBotRate__ ??= new Map();
  return rateRef.__southendBotRate__;
}

export function rateLimitBot(agentId: string, limit = 60, windowMs = 60_000) {
  const now = Date.now();
  const hits = rateHits();
  const prev = (hits.get(agentId) ?? []).filter((t) => now - t < windowMs);
  if (prev.length >= limit) return false;
  prev.push(now);
  hits.set(agentId, prev);
  return true;
}

export async function verifyBotBearer(request: Request): Promise<BotAgent | null> {
  requireNeonInProduction();
  const token = parseBearer(request);
  if (!token.startsWith(BOT_TOKEN_PREFIX) || token.length < BOT_TOKEN_PREFIX.length + 16) return null;
  const digest = hashBotToken(token);
  const sql = await getSql();
  const rows = await sql.query(
    `select id, name, role, scopes, enabled, expires_at, token_hash
     from bot_agents
     where token_hash = $1
     limit 1`,
    [digest],
  );
  const row = rows[0];
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
  const agent: BotAgent = {
    id: String(row.id),
    name,
    role,
    scopes: parseScopes(row.scopes),
    enabled: true,
    expiresAt: row.expires_at ? String(row.expires_at) : null,
  };
  await sql.query(`update bot_agents set last_used_at = now() where id = $1`, [agent.id]);
  return agent;
}

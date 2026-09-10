import { randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";

export async function writeBotAudit(input: {
  agentId?: string | null;
  path: string;
  status: number;
  ip: string;
}) {
  try {
    const sql = await getSql();
    await sql.query(`insert into bot_audit (id, agent_id, path, status, ip) values ($1,$2,$3,$4,$5)`, [
      `aud-${randomBytes(10).toString("hex")}`,
      input.agentId ?? null,
      input.path.slice(0, 240),
      input.status,
      input.ip.slice(0, 80),
    ]);
  } catch (err) {
    console.error("[southend] bot audit write failed", err);
  }
}

export function requestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  return request.headers.get("x-real-ip")?.trim() || "";
}

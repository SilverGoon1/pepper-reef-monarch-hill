import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Copy } from "lucide-react";
import { BOT_PRESETS } from "@/lib/bot/scopes";
import {
  createBotAgent,
  listBotAgents,
  listBotAudit,
  revokeBotAgent,
  rotateBotAgent,
  type BotAgentView,
  type BotAuditView,
} from "@/lib/bot/bot-admin";
import { formatShopWhen } from "@/lib/hours";

export const Route = createFileRoute("/admin/bots")({ component: AdminBots });

function AdminBots() {
  const [agents, setAgents] = useState<BotAgentView[]>([]);
  const [audit, setAudit] = useState<BotAuditView[]>([]);
  const [preset, setPreset] = useState(BOT_PRESETS[0]?.name ?? "security-guard");
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");
  const [issued, setIssued] = useState<{ name: string; token: string } | null>(null);

  function reload() {
    void listBotAgents()
      .then(setAgents)
      .catch((e) => setMsg(e instanceof Error ? e.message : "Could not load bots"));
    void listBotAudit()
      .then(setAudit)
      .catch(() => setAudit([]));
  }

  useEffect(() => {
    reload();
  }, []);

  function copyToken(token: string) {
    void navigator.clipboard.writeText(token).then(() => setMsg("Token copied. Store it as a bot secret — it will not be shown again."));
  }

  return (
    <div className="settings-page">
      <header className="page-card">
        <p className="shop-brand-kicker">Admin</p>
        <h1>Bot access</h1>
        <p className="ed-sub">
          Each bot gets its own token and the least scopes it needs. Bots never sign in as Admin. The raw token is
          shown once — copy it into the bot’s secret store, then treat it like a password.
        </p>
      </header>

      <section className="page-card">
        <h2>Create an agent</h2>
        <div className="two-col">
          <label className="ed-field">
            <span>Preset</span>
            <select className="ed-input" value={preset} onChange={(e) => setPreset(e.target.value)}>
              {BOT_PRESETS.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <div className="ed-field">
            <span>Issue</span>
            <button
              type="button"
              className="btn-print"
              disabled={Boolean(busy)}
              onClick={() => {
                setBusy("create");
                setMsg("");
                void createBotAgent({ data: { preset } })
                  .then((r) => {
                    setIssued({ name: r.agent.name, token: r.token });
                    setAgents((list) => [...list.filter((a) => a.id !== r.agent.id), r.agent].sort((a, b) => a.name.localeCompare(b.name)));
                  })
                  .catch((e) => setMsg(e instanceof Error ? e.message : "Could not create bot"))
                  .finally(() => setBusy(""));
              }}
            >
              {busy === "create" ? "Creating…" : "Create token"}
            </button>
          </div>
        </div>
        {issued ? (
          <div className="bot-token-box">
            <p className="ed-sub">
              Token for <strong>{issued.name}</strong> — copy now. Closing this page hides it.
            </p>
            <code className="totp-secret">{issued.token}</code>
            <button type="button" className="ed-btn" onClick={() => copyToken(issued.token)}>
              <Copy size={16} />
              Copy token
            </button>
          </div>
        ) : null}
        {msg ? <p className="ed-sub">{msg}</p> : null}
      </section>

      <section className="page-card">
        <h2>Agents</h2>
        {agents.length === 0 ? (
          <p className="ed-empty">No bots yet. Create a Security Guard or POS token to start.</p>
        ) : (
          <div className="table-wrap">
            <table className="plain-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Scopes</th>
                  <th>Last used</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id}>
                    <td>
                      <strong>{agent.name}</strong>
                      <span className="bot-agent-state">{agent.enabled ? "Active" : "Revoked"}</span>
                    </td>
                    <td>{agent.role.replaceAll("_", " ")}</td>
                    <td>{agent.scopes.join(", ") || "—"}</td>
                    <td>{agent.lastUsedAt ? formatShopWhen(agent.lastUsedAt) : "Never"}</td>
                    <td>
                      <div className="order-actions">
                        <button
                          type="button"
                          className="ed-btn"
                          disabled={Boolean(busy)}
                          onClick={() => {
                            setBusy(agent.id);
                            setMsg("");
                            void rotateBotAgent({ data: { id: agent.id } })
                              .then((r) => {
                                setIssued({ name: r.agent.name, token: r.token });
                                setAgents((list) => list.map((a) => (a.id === r.agent.id ? r.agent : a)));
                              })
                              .catch((e) => setMsg(e instanceof Error ? e.message : "Could not rotate"))
                              .finally(() => setBusy(""));
                          }}
                        >
                          Rotate
                        </button>
                        <button
                          type="button"
                          className="ed-btn ed-btn-danger"
                          disabled={Boolean(busy) || !agent.enabled}
                          onClick={() => {
                            setBusy(agent.id);
                            setMsg("");
                            void revokeBotAgent({ data: { id: agent.id } })
                              .then(() => {
                                setAgents((list) => list.map((a) => (a.id === agent.id ? { ...a, enabled: false } : a)));
                                if (issued?.name === agent.name) setIssued(null);
                              })
                              .catch((e) => setMsg(e instanceof Error ? e.message : "Could not revoke"))
                              .finally(() => setBusy(""));
                          }}
                        >
                          Revoke
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="page-card">
        <h2>Recent bot calls</h2>
        {audit.length === 0 ? (
          <p className="ed-empty">No bot traffic yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="plain-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Bot</th>
                  <th>Path</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {audit.map((row) => (
                  <tr key={row.id}>
                    <td>{formatShopWhen(row.createdAt)}</td>
                    <td>{row.name || "—"}</td>
                    <td>{row.path}</td>
                    <td>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

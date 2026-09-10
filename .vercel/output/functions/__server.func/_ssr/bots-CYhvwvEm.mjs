import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as formatShopWhen } from "./hours-BHiQSWtc.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-BxDzrAA-.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { G as Copy } from "../_libs/lucide-react.mjs";
import { t as BOT_PRESETS } from "./scopes-C8w_GCNd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bots-CYhvwvEm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var listBotAgents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("99ed12c9cb6c46129f1642a8a2ea8fb4c72927ba9df92e71483c74ed499d0197"));
var listBotAudit = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8a9ee10c2cc5e11b33d6a379a6fe7cf4a988cd15efede561ae22e9e349daef36"));
var createBotAgent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("ea5541caa0922774ffddac354148aa7de14aecf03f9d3741c45354d76566380d"));
var rotateBotAgent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("6a74183ea6184c189b407b4f7f6c6591530ad01084b7875f52823102883d1fd0"));
var revokeBotAgent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("5c7825cbd144f750341957361628d61341a15aaba9bb6439feaa569f11c1ac5b"));
function AdminBots() {
	const [agents, setAgents] = (0, import_react.useState)([]);
	const [audit, setAudit] = (0, import_react.useState)([]);
	const [preset, setPreset] = (0, import_react.useState)(BOT_PRESETS[0]?.name ?? "security-guard");
	const [busy, setBusy] = (0, import_react.useState)("");
	const [msg, setMsg] = (0, import_react.useState)("");
	const [issued, setIssued] = (0, import_react.useState)(null);
	function reload() {
		listBotAgents().then(setAgents).catch((e) => setMsg(e instanceof Error ? e.message : "Could not load bots"));
		listBotAudit().then(setAudit).catch(() => setAudit([]));
	}
	(0, import_react.useEffect)(() => {
		reload();
	}, []);
	function copyToken(token) {
		navigator.clipboard.writeText(token).then(() => setMsg("Token copied. Store it as a bot secret — it will not be shown again."));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "settings-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Bot access" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Each bot gets its own token and the least scopes it needs. Bots never sign in as Admin. The raw token is shown once — copy it into the bot’s secret store, then treat it like a password."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Create an agent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "two-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preset" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "ed-input",
								value: preset,
								onChange: (e) => setPreset(e.target.value),
								children: BOT_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: p.name,
									children: p.label
								}, p.name))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Issue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-print",
								disabled: Boolean(busy),
								onClick: () => {
									setBusy("create");
									setMsg("");
									createBotAgent({ data: { preset } }).then((r) => {
										setIssued({
											name: r.agent.name,
											token: r.token
										});
										setAgents((list) => [...list.filter((a) => a.id !== r.agent.id), r.agent].sort((a, b) => a.name.localeCompare(b.name)));
									}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not create bot")).finally(() => setBusy(""));
								},
								children: busy === "create" ? "Creating…" : "Create token"
							})]
						})]
					}),
					issued ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bot-token-box",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "ed-sub",
								children: [
									"Token for ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: issued.name }),
									" — copy now. Closing this page hides it."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "totp-secret",
								children: issued.token
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "ed-btn",
								onClick: () => copyToken(issued.token),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 }), "Copy token"]
							})
						]
					}) : null,
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: msg
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Agents" }), agents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-empty",
					children: "No bots yet. Create a Security Guard or POS token to start."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "plain-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Name" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Role" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Scopes" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Last used" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: agent.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bot-agent-state",
								children: agent.enabled ? "Active" : "Revoked"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: agent.role.replaceAll("_", " ") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: agent.scopes.join(", ") || "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: agent.lastUsedAt ? formatShopWhen(agent.lastUsedAt) : "Never" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "order-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ed-btn",
									disabled: Boolean(busy),
									onClick: () => {
										setBusy(agent.id);
										setMsg("");
										rotateBotAgent({ data: { id: agent.id } }).then((r) => {
											setIssued({
												name: r.agent.name,
												token: r.token
											});
											setAgents((list) => list.map((a) => a.id === r.agent.id ? r.agent : a));
										}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not rotate")).finally(() => setBusy(""));
									},
									children: "Rotate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ed-btn ed-btn-danger",
									disabled: Boolean(busy) || !agent.enabled,
									onClick: () => {
										setBusy(agent.id);
										setMsg("");
										revokeBotAgent({ data: { id: agent.id } }).then(() => {
											setAgents((list) => list.map((a) => a.id === agent.id ? {
												...a,
												enabled: false
											} : a));
											if (issued?.name === agent.name) setIssued(null);
										}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not revoke")).finally(() => setBusy(""));
									},
									children: "Revoke"
								})]
							}) })
						] }, agent.id)) })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Recent bot calls" }), audit.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-empty",
					children: "No bot traffic yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "plain-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "When" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Bot" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Path" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: audit.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatShopWhen(row.createdAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.name || "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.path }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.status })
						] }, row.id)) })]
					})
				})]
			})
		]
	});
}
//#endregion
export { AdminBots as component };

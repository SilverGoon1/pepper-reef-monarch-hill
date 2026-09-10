import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as formatTicketNo, E as formatShopWhen, O as formatUsd } from "./hours-BHiQSWtc.mjs";
import { R as setAccountBanned, n as adjustCustomerPoints, z as setAccountRole } from "./shop-server-Dp-2A_aD.mjs";
import { t as OrderDateTrays } from "./order-trays-BBMJtsHv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-panel-C3HnqfJO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomersPanel({ customers, setCustomers, onMsg, onMessage, focusId }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [openId, setOpenId] = (0, import_react.useState)(focusId ?? "");
	const [busyId, setBusyId] = (0, import_react.useState)("");
	const [pointDelta, setPointDelta] = (0, import_react.useState)("10");
	(0, import_react.useEffect)(() => {
		if (!focusId) return;
		setOpenId(focusId);
		const t = window.setTimeout(() => {
			document.getElementById(`cust-${focusId}`)?.scrollIntoView({
				block: "nearest",
				behavior: "smooth"
			});
		}, 50);
		return () => window.clearTimeout(t);
	}, [focusId]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return customers;
		return customers.filter((c) => [
			c.displayName,
			c.phone,
			c.email,
			c.userId,
			c.role
		].join(" ").toLowerCase().includes(q));
	}, [customers, query]);
	function toggleAdmin(c, on) {
		setBusyId(c.userId);
		setAccountRole({ data: {
			userId: c.userId,
			role: on ? "admin" : "customer"
		} }).then(() => {
			setCustomers(customers.map((row) => row.userId === c.userId ? {
				...row,
				role: on ? "admin" : "customer"
			} : row));
			onMsg(on ? `${c.displayName} can open the shop admin.` : `${c.displayName} is a customer account.`);
		}).catch((e) => onMsg(e instanceof Error ? e.message : "Could not update admin authority")).finally(() => setBusyId(""));
	}
	function changePoints(c, sign) {
		const amount = Math.round(Number(pointDelta) || 0);
		if (!amount) {
			onMsg("Enter how many points to add or remove.");
			return;
		}
		setBusyId(c.userId);
		adjustCustomerPoints({ data: {
			userId: c.userId,
			delta: sign * amount
		} }).then((r) => {
			setCustomers(customers.map((row) => row.userId === c.userId ? {
				...row,
				points: r.points
			} : row));
			onMsg(sign > 0 ? `Added ${amount} points. ${c.displayName} now has ${r.points}.` : `Removed ${amount} points. ${c.displayName} now has ${r.points}.`);
		}).catch((e) => onMsg(e instanceof Error ? e.message : "Could not update points")).finally(() => setBusyId(""));
	}
	function toggleBan(c, on) {
		setBusyId(c.userId);
		setAccountBanned({ data: {
			userId: c.userId,
			banned: on
		} }).then(() => {
			setCustomers(customers.map((row) => row.userId === c.userId ? {
				...row,
				banned: on
			} : row));
			onMsg(on ? `${c.displayName} is banned.` : `${c.displayName} can order again.`);
		}).catch((e) => onMsg(e instanceof Error ? e.message : "Could not update ban")).finally(() => setBusyId(""));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Customer database" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "Names, phones, order history, and rewards. Turn on admin authority when someone should run the shop."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "ed-input",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Name, phone, or email"
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-empty",
				children: "No customers match."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "cust-list",
				children: filtered.map((c) => {
					const open = openId === c.userId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "cust-card",
						"data-open": open,
						id: `cust-${c.userId}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "cust-head",
							"aria-expanded": open,
							onClick: () => setOpenId(open ? "" : c.userId),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "cust-who",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.displayName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
									c.banned ? "Banned · " : "",
									c.phone || "No phone",
									c.email ? ` · ${c.email}` : ""
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "cust-meta",
								children: [
									c.orderCount,
									" orders · ",
									formatUsd(c.spend),
									" · ",
									c.points,
									" pts"
								]
							})]
						}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "cust-body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "cust-facts",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Joined" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Last order" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.lastOrderAt ? new Date(c.lastOrderAt).toLocaleString() : "None" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "2FA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.totpEnabled ? "On" : "Off" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.role })] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "points-adjust",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "ed-field",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Reward points (",
											c.points,
											")"
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "ed-input",
											inputMode: "numeric",
											value: pointDelta,
											onChange: (e) => setPointDelta(e.target.value.replace(/[^\d]/g, "").slice(0, 6)),
											"aria-label": "Points to add or remove"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "points-adjust-actions",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "ed-btn",
											disabled: busyId === c.userId,
											onClick: () => changePoints(c, 1),
											children: "Add points"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "ed-btn",
											disabled: busyId === c.userId,
											onClick: () => changePoints(c, -1),
											children: "Remove points"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "pay-opt",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: c.role === "admin",
										disabled: busyId === c.userId,
										onChange: (e) => toggleAdmin(c, e.target.checked)
									}), "Admin authority on this account"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "pay-opt",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: c.banned,
										disabled: busyId === c.userId,
										onChange: (e) => toggleBan(c, e.target.checked)
									}), "Ban this account"]
								}),
								onMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ed-btn",
									disabled: busyId === c.userId,
									onClick: () => onMessage(c),
									children: "Open in messages"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "settings-subhead",
									children: "Order history"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderDateTrays, {
									orders: c.orders,
									children: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"#",
										formatTicketNo(o.ticketNo),
										" · ",
										formatShopWhen(o.createdAt),
										" · ",
										o.fulfillment,
										o.notes ? ` · ${o.notes}` : ""
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
										formatUsd(o.total),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: o.status.replaceAll("_", " ") })
									] })] }, o.id)
								})
							]
						}) : null]
					}, c.userId);
				})
			})
		]
	});
}
//#endregion
export { CustomersPanel as t };

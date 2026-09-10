import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as formatTicketNo, O as formatUsd, U as payMethodLabel } from "./hours-CePKgkcU.mjs";
import { C as listCustomers, S as listAllOrders, m as getAdminInsights } from "./shop-server-MBWgsS8d.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
import { a as Route$2, i as EMPTY_INSIGHTS } from "./router-CXnXlITz.mjs";
import { t as CustomersPanel } from "./customers-panel-IK_n82YW.mjs";
import { n as useSaveFlash, t as SaveToast } from "./save-toast-cmTAnDzF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DfqiluVL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminSettingsGate() {
	const { tab } = Route$2.useSearch();
	if (tab === "customers") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/admin/center",
		search: { tab: "customers" }
	});
	if (tab === "financials") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/admin/financials" });
	if (tab === "rewards") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/admin/center",
		search: { tab: "rewards" }
	});
	if (tab === "printers") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/admin/menu",
		search: { tab: "printers" }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/admin/background" });
}
function AdminCustomersPage() {
	const [insights, setInsights] = (0, import_react.useState)(null);
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const { toast, flashOk, flashFail } = useSaveFlash();
	(0, import_react.useEffect)(() => {
		getAdminInsights().then(setInsights).catch(() => setInsights(EMPTY_INSIGHTS));
		listCustomers().then(setCustomers).catch(() => setCustomers([]));
	}, []);
	function setMsg(s) {
		if (/could not|not save|failed/i.test(s)) flashFail(s);
		else flashOk(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "settings-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveToast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Customers" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Ledger, analytics, and the customer book. Grant admin or ban an account here."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsPanel, { insights: insights ?? EMPTY_INSIGHTS }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomersPanel, {
				customers,
				setCustomers,
				onMsg: setMsg
			})
		]
	});
}
function AdminFinancialsPage() {
	const [insights, setInsights] = (0, import_react.useState)(null);
	const [orders, setOrders] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getAdminInsights().then(setInsights).catch(() => setInsights(EMPTY_INSIGHTS));
		listAllOrders().then(setOrders).catch(() => setOrders([]));
	}, []);
	const insightsView = insights ?? EMPTY_INSIGHTS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "settings-page finance-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Financials" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Today, this week, and tips live here — the till mix, tax, and ticket history follow. Tips stay off the New Jersey sales-tax line."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "kpi-grid kpi-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Today",
						value: formatUsd(insightsView.sales.today)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "This week",
						value: formatUsd(insightsView.sales.week)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Tips",
						value: formatUsd(insightsView.financials.tips)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Collected",
						value: formatUsd(insightsView.financials.collected)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialsPanel, { insights: insightsView }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesPanel, {
				insights: insightsView,
				orders
			})
		]
	});
}
function AnalyticsPanel({ insights }) {
	const c = insights.customers;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Customer analytics" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "kpi-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Customers",
						value: String(c.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "New (7d)",
						value: String(c.new7d)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Repeat",
						value: String(c.repeat)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Avg points",
						value: String(c.avgPoints)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ed-sub",
				children: [c.twoFactor, " accounts have two-factor on."]
			}),
			c.top.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "settings-subhead",
				children: "Top guests"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "rank-list",
				children: c.top.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					row.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
						row.orders,
						" orders · ",
						row.points,
						" pts"
					] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUsd(row.spend) })] }, row.userId))
			})] }) : null
		]
	});
}
function FinancialsPanel({ insights }) {
	const f = insights.financials;
	const s = insights.sales;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "kpi-grid",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
				label: "Food",
				value: formatUsd(f.food)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
				label: "Tax collected",
				value: formatUsd(f.tax)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
				label: "Discounts",
				value: formatUsd(f.discounts)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
				label: "Delivery fees",
				value: formatUsd(f.deliveryFees)
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Till mix" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mix-track",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mix-seg mix-food",
						style: {
							flexGrow: Math.max(f.food, 0),
							flexBasis: 0
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mix-seg mix-tax",
						style: {
							flexGrow: Math.max(f.tax, 0),
							flexBasis: 0
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mix-seg mix-fee",
						style: {
							flexGrow: Math.max(f.deliveryFees, 0),
							flexBasis: 0
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mix-seg mix-disc",
						style: {
							flexGrow: Math.max(f.discounts, 0),
							flexBasis: 0
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mix-legend ed-sub",
				children: "Tomato is food · cream is tax · muted is delivery fees · dark is discounts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "totals",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Food (before tax)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(f.food) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Tips (not taxed)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(f.tips) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Pickup" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(f.pickup) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(f.delivery) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Awaiting card" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(f.awaitingPayment) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Canceled tickets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: s.canceled })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Tickets counted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: s.tickets })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "settings-subhead",
				children: "Payment mix"
			}),
			f.byPay.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-empty",
				children: "No payments yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "rank-list",
				children: f.byPay.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					payMethodLabel(p.method),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [p.count, " tickets"] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUsd(p.total) })] }, p.method))
			})
		]
	})] });
}
function SalesPanel({ insights, orders }) {
	const s = insights.sales;
	const recent = (0, import_react.useMemo)(() => orders.slice(0, 12), [orders]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Sales" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "kpi-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Month",
						value: formatUsd(s.month)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "All time",
						value: formatUsd(s.allTime)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Avg ticket",
						value: formatUsd(s.avgTicket)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Tickets",
						value: String(s.tickets)
					})
				]
			}),
			s.series.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chart-frame",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: s.series,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--color-studio-line)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "day",
								tick: {
									fill: "var(--color-studio-muted)",
									fontSize: 11
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
								fill: "var(--color-studio-muted)",
								fontSize: 11
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "total",
								fill: "var(--color-tomato)",
								radius: 4
							})
						]
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-empty",
				children: "No sales yet."
			}),
			s.topItems.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "settings-subhead",
				children: "Top items"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "rank-list",
				children: s.topItems.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					it.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [it.qty, " sold"] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUsd(it.sales) })] }, it.name))
			})] }) : null
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Recent tickets" }), recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "ed-empty",
			children: "No tickets yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "table-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "plain-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Ticket" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "When" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Name" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Total" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: recent.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["#", formatTicketNo(o.ticketNo)] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.createdAt ? new Date(o.createdAt).toLocaleString() : "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.pickupName || "Guest" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatUsd(o.total) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.status.replaceAll("_", " ") })
				] }, o.id)) })]
			})
		})]
	})] });
}
function Kpi({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "kpi",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value })]
	});
}
//#endregion
export { AdminCustomersPage, AdminFinancialsPage, AnalyticsPanel, AdminSettingsGate as component };

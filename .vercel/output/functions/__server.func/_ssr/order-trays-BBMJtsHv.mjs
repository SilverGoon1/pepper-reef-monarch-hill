import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as formatShopDay, z as nyYmd } from "./hours-BHiQSWtc.mjs";
import { Z as ChevronUp, et as ChevronDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-trays-BBMJtsHv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function groupOrdersByDay(orders) {
	const map = /* @__PURE__ */ new Map();
	for (const o of orders) {
		const key = o.createdAt ? nyYmd(new Date(o.createdAt)) : "unknown";
		const list = map.get(key) ?? [];
		list.push(o);
		map.set(key, list);
	}
	return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([key, list]) => ({
		key,
		label: key === "unknown" ? "Unknown date" : formatShopDay(list[0]?.createdAt ?? ""),
		orders: list
	}));
}
function OrderDateTrays({ orders, empty = "No tickets yet.", children }) {
	const groups = (0, import_react.useMemo)(() => groupOrdersByDay(orders), [orders]);
	const [open, setOpen] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	if (groups.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "ed-empty",
		children: empty
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "order-trays",
		children: groups.map((g) => {
			const shown = open.has(g.key);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "order-tray",
				"data-open": shown,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "order-tray-head",
					"aria-expanded": shown,
					onClick: () => setOpen((cur) => {
						if (cur.has(g.key)) return /* @__PURE__ */ new Set();
						return /* @__PURE__ */ new Set([g.key]);
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: g.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
						g.orders.length,
						" ticket",
						g.orders.length === 1 ? "" : "s"
					] })] }), shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
						size: 16,
						strokeWidth: 2.2
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						size: 16,
						strokeWidth: 2.2
					})]
				}), shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "order-tray-list",
					children: g.orders.map((o) => children(o))
				}) : null]
			}, g.key);
		})
	});
}
//#endregion
export { OrderDateTrays as t };

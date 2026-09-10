import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, f as useRouterState, h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as signOut } from "./client-ClTYstkY.mjs";
import { t as ADMIN_NAV } from "./brand-mark-DrSWcYOk.mjs";
import { p as getAdminInboxCount } from "./shop-server-DpagHzjx.mjs";
import { N as LogOut, j as Menu, t as X } from "../_libs/lucide-react.mjs";
import { D as onAdminInbox, O as onVisibleInterval, x as ShopHeader } from "./router-C6vZUAg_.mjs";
import { t as SessionGate } from "./guards-vd_DbvAt.mjs";
import { t as IncomingOrderQueue } from "./incoming-order-queue-D3xI4EOF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-EoyIpl3j.js
var admin_EoyIpl3j_exports = /* @__PURE__ */ __exportAll({ component: () => AdminLayout });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDrawer() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [unread, setUnread] = (0, import_react.useState)(0);
	const [outMsg, setOutMsg] = (0, import_react.useState)("");
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		const pull = () => {
			getAdminInboxCount().then((r) => setUnread(r.unread)).catch(() => void 0);
		};
		pull();
		const stopListen = onAdminInbox(setUnread);
		const stopPoll = onVisibleInterval(12e3, pull);
		return () => {
			stopListen();
			stopPoll();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "admin-top-cluster",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "admin-drawer-toggle",
				"aria-expanded": open,
				"aria-controls": "admin-drawer",
				onClick: () => setOpen((v) => !v),
				children: [
					open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						size: 18,
						strokeWidth: 2.2
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
						size: 18,
						strokeWidth: 2.2
					}),
					open ? "Close" : "Menu",
					!open && unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "nav-pip",
						children: unread
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "admin-top-extra",
				className: "admin-top-extra"
			})]
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "admin-drawer-scrim",
			"aria-label": "Close admin menu",
			onClick: () => setOpen(false)
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			id: "admin-drawer",
			className: "admin-drawer",
			"data-open": open,
			"aria-label": "Admin",
			"aria-hidden": !open,
			inert: !open ? true : void 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "shop-nav-link",
					"data-on": pathname === "/",
					children: "Main menu"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shop-brand-kicker",
					children: "Admin"
				}),
				[...ADMIN_NAV].sort((a, b) => {
					const rank = (item) => item.pin === "start" ? 0 : item.pin === "end" ? 2 : 1;
					const d = rank(a) - rank(b);
					if (d) return d;
					return a.label.localeCompare(b.label, "en");
				}).map((item) => {
					const on = item.exact ? pathname === item.to || pathname === `${item.to}/` : pathname === item.to || pathname.startsWith(`${item.to}/`);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "shop-nav-link",
						"data-on": on,
						activeOptions: item.exact ? { exact: true } : void 0,
						children: [item.label, item.pip && unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "nav-pip",
							children: unread
						}) : null]
					}, item.to);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "shop-nav-link admin-drawer-logout",
					disabled: signingOut,
					onClick: () => {
						setOutMsg("");
						setSigningOut(true);
						signOut("/").catch((e) => {
							setSigningOut(false);
							setOutMsg(e instanceof Error ? e.message : "Could not sign out");
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
						size: 16,
						strokeWidth: 2.2
					}), signingOut ? "Signing out…" : "Log out"]
				}),
				outMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: outMsg
				}) : null
			]
		})
	] });
}
function AdminLayout() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const posMode = pathname === "/admin/pos" || pathname.startsWith("/admin/pos/");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "shop-shell",
		"data-pos": posMode || void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionGate, {
			needAdmin: true,
			children: ({ profile }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				posMode ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopHeader, { profile }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "admin-layout",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDrawer, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "admin-main",
						id: "main",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncomingOrderQueue, {})
			] })
		})
	});
}
//#endregion
export { AdminLayout as component, admin_EoyIpl3j_exports as t };

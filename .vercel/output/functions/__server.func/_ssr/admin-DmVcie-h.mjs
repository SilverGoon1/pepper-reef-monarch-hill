import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, f as useRouterState, h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as formatTicketNo, E as formatShopWhen, O as formatUsd } from "./hours-CePKgkcU.mjs";
import { i as signOut } from "./client-B40BzJxt.mjs";
import { t as ADMIN_NAV } from "./brand-mark-DrSWcYOk.mjs";
import { h as getAdminShop, p as getAdminInboxCount, t as acceptOrder, w as listIncomingOrders } from "./shop-server-MBWgsS8d.mjs";
import { N as LogOut, i as Volume2, j as Menu, r as VolumeX, rt as Bell, t as X } from "../_libs/lucide-react.mjs";
import { D as onAdminInbox, O as onVisibleInterval, x as ShopHeader } from "./router-BdhSMl-o.mjs";
import { t as SessionGate } from "./guards-BhjYrEpq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DmVcie-h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDrawer() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [unread, setUnread] = (0, import_react.useState)(0);
	const [outMsg, setOutMsg] = (0, import_react.useState)("");
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
					onClick: () => {
						setOutMsg("");
						signOut("/").catch((e) => setOutMsg(e instanceof Error ? e.message : "Could not sign out"));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
						size: 16,
						strokeWidth: 2.2
					}), "Log out"]
				}),
				outMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: outMsg
				}) : null
			]
		})
	] });
}
var DEFAULT_ALARM = "/order-alarm.wav";
var SNOOZE_KEY = "southend-order-snooze";
function loadSnooze() {
	try {
		const raw = sessionStorage.getItem(SNOOZE_KEY);
		const list = raw ? JSON.parse(raw) : [];
		return new Set(Array.isArray(list) ? list : []);
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
function saveSnooze(ids) {
	try {
		sessionStorage.setItem(SNOOZE_KEY, JSON.stringify([...ids]));
	} catch {}
}
function IncomingOrderQueue() {
	const [queue, setQueue] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [src, setSrc] = (0, import_react.useState)(DEFAULT_ALARM);
	const seen = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const snoozed = (0, import_react.useRef)(loadSnooze());
	const primed = (0, import_react.useRef)(false);
	const audioRef = (0, import_react.useRef)(null);
	const mutedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		getAdminShop().then((d) => setSrc(d.notifyAudio || DEFAULT_ALARM)).catch(() => void 0);
	}, []);
	(0, import_react.useEffect)(() => {
		const el = new Audio(src);
		el.preload = "auto";
		audioRef.current = el;
		return () => {
			el.pause();
			audioRef.current = null;
		};
	}, [src]);
	function ring() {
		if (mutedRef.current) return;
		const el = audioRef.current;
		if (!el) return;
		el.currentTime = 0;
		el.play().catch(() => void 0);
	}
	(0, import_react.useEffect)(() => {
		return onVisibleInterval(4e3, () => {
			listIncomingOrders().then((list) => {
				const live = list.filter((t) => !snoozed.current.has(t.id));
				setQueue(live);
				const fresh = live.filter((t) => !seen.current.has(t.id));
				for (const t of live) seen.current.add(t.id);
				if (fresh.length) ring();
				else if (!primed.current && live.length) ring();
				primed.current = true;
			}).catch(() => void 0);
		});
	}, [muted, src]);
	(0, import_react.useEffect)(() => {
		if (!queue.length || muted) return;
		const t = window.setInterval(() => ring(), 1e4);
		return () => window.clearInterval(t);
	}, [
		queue.length,
		muted,
		src
	]);
	const current = queue[0];
	if (!current) return null;
	function take() {
		setBusy(true);
		setError("");
		acceptOrder({ data: { id: current.id } }).then(() => {
			setQueue((list) => list.filter((t) => t.id !== current.id));
		}).catch((e) => setError(e instanceof Error ? e.message : "Could not accept")).finally(() => setBusy(false));
	}
	const where = current.fulfillment === "delivery" ? `${current.addressLine}${current.city ? `, ${current.city}` : ""} ${current.zip}`.trim() : current.pickupName ? `Pickup for ${current.pickupName}` : "Pickup at the counter";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "order-alert-scrim",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "order-alert-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "order-alert",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "order-alert-head",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "shop-brand-kicker",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
								size: 14,
								strokeWidth: 2.4
							}), " Incoming"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: "order-alert-title",
							children: ["Ticket #", formatTicketNo(current.ticketNo)]
						}),
						queue.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", {
							className: "order-alert-q",
							children: [
								queue.length,
								" waiting · showing 1 of ",
								queue.length
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: "order-alert-q",
							children: "Kitchen queue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ed-icon-btn",
							"aria-label": muted ? "Unmute alarm" : "Mute alarm",
							onClick: () => {
								mutedRef.current = !mutedRef.current;
								setMuted(mutedRef.current);
								audioRef.current?.pause();
							},
							children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
								size: 16,
								strokeWidth: 2.2
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
								size: 16,
								strokeWidth: 2.2
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "order-alert-who",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: current.customerName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						current.fulfillment === "delivery" ? "Delivery" : "Pickup",
						" · ",
						formatUsd(current.total)
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "ed-sub",
					children: [
						"Placed ",
						formatShopWhen(current.createdAt),
						current.scheduledFor ? ` · scheduled ${formatShopWhen(current.scheduledFor)}` : " · as soon as ready"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: where
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "cart-lines",
					children: current.items.slice(0, 8).map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						it.qty,
						"× ",
						it.name,
						it.size ? ` · ${it.size}` : ""
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatUsd(it.unitPrice * it.qty) })] }, `${it.itemId}-${i}`))
				}),
				current.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "pos-notes",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Notes" }),
						" ",
						current.notes
					]
				}) : null,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "form-error",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "confirm-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-print",
						disabled: busy,
						onClick: take,
						children: busy ? "Accepting…" : "Accept order"
					}), queue.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-btn",
						disabled: busy,
						onClick: () => setQueue((list) => [...list.slice(1), list[0]]),
						children: "Next in queue"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Accepting sends the ticket to the kitchen. Remaining tickets stay in this queue."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "order-alert-hide",
					"aria-label": "Keep ticket waiting",
					onClick: () => {
						for (const t of queue) snoozed.current.add(t.id);
						saveSnooze(snoozed.current);
						setQueue([]);
						audioRef.current?.pause();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						size: 14,
						strokeWidth: 2.4
					}), " Keep waiting on POS"]
				})
			]
		})
	});
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
export { AdminLayout as component };

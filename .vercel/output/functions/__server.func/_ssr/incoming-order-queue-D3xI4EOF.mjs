import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as formatTicketNo, E as formatShopWhen, O as formatUsd } from "./hours-DVH-z3bz.mjs";
import { h as getAdminShop, t as acceptOrder, w as listIncomingOrders } from "./shop-server-DpagHzjx.mjs";
import { i as Volume2, r as VolumeX, rt as Bell, t as X } from "../_libs/lucide-react.mjs";
import { O as onVisibleInterval } from "./router-C6vZUAg_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/incoming-order-queue-D3xI4EOF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_ALARM = "/order-alarm.wav";
var SNOOZE_KEY = "southend-order-snooze";
var POS_ACCEPTED_EVENT = "southend-pos-accepted";
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
function fifoIncoming(list) {
	return [...list].sort((a, b) => {
		const ta = Date.parse(a.createdAt) || 0;
		const tb = Date.parse(b.createdAt) || 0;
		if (ta !== tb) return ta - tb;
		return (a.ticketNo || 0) - (b.ticketNo || 0) || a.id.localeCompare(b.id);
	});
}
function emitPosAccepted(order) {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new CustomEvent(POS_ACCEPTED_EVENT, { detail: order }));
}
function IncomingOrderQueue() {
	const [queue, setQueue] = (0, import_react.useState)([]);
	const [currentId, setCurrentId] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [src, setSrc] = (0, import_react.useState)(DEFAULT_ALARM);
	const [toast, setToast] = (0, import_react.useState)("");
	const seen = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const snoozed = (0, import_react.useRef)(loadSnooze());
	const taken = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const primed = (0, import_react.useRef)(false);
	const audioRef = (0, import_react.useRef)(null);
	const mutedRef = (0, import_react.useRef)(muted);
	(0, import_react.useEffect)(() => {
		mutedRef.current = muted;
	}, [muted]);
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
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const t = window.setTimeout(() => setToast(""), 3200);
		return () => window.clearTimeout(t);
	}, [toast]);
	function ring() {
		if (mutedRef.current) return;
		const el = audioRef.current;
		if (!el) return;
		el.currentTime = 0;
		el.play().catch(() => void 0);
	}
	function applyIncoming(list) {
		const live = fifoIncoming(list.filter((t) => !snoozed.current.has(t.id) && !taken.current.has(t.id)));
		setQueue(live);
		setCurrentId((cur) => {
			if (cur && live.some((t) => t.id === cur)) return cur;
			return live[0]?.id ?? "";
		});
		const fresh = live.filter((t) => !seen.current.has(t.id));
		for (const t of live) seen.current.add(t.id);
		if (fresh.length) ring();
		else if (!primed.current && live.length) ring();
		primed.current = true;
	}
	(0, import_react.useEffect)(() => {
		return onVisibleInterval(4e3, () => {
			listIncomingOrders().then(applyIncoming).catch(() => void 0);
		});
	}, [src]);
	(0, import_react.useEffect)(() => {
		if (!queue.length || muted) return;
		const t = window.setInterval(() => ring(), 1e4);
		return () => window.clearInterval(t);
	}, [
		queue.length,
		muted,
		src
	]);
	const current = queue.find((t) => t.id === currentId) ?? queue[0];
	const place = current ? queue.findIndex((t) => t.id === current.id) + 1 : 0;
	function take() {
		if (!current || busy || taken.current.has(current.id)) return;
		const ticket = current;
		taken.current.add(ticket.id);
		setBusy(true);
		setError("");
		const remaining = queue.filter((t) => t.id !== ticket.id);
		setQueue(remaining);
		setCurrentId(remaining[0]?.id ?? "");
		acceptOrder({ data: { id: ticket.id } }).then((order) => {
			const accepted = {
				...ticket,
				...order,
				status: "accepted",
				customerName: ticket.customerName,
				customerPhone: ticket.customerPhone,
				chatUnread: ticket.chatUnread,
				chatThreadId: ticket.chatThreadId
			};
			emitPosAccepted(accepted);
			setToast(`Ticket #${formatTicketNo(accepted.ticketNo)} accepted — sent to the kitchen.`);
		}).catch((e) => {
			taken.current.delete(ticket.id);
			setError(e instanceof Error ? e.message : "Could not accept");
			setQueue((list) => {
				if (list.some((t) => t.id === ticket.id)) return list;
				return fifoIncoming([ticket, ...list]);
			});
			setCurrentId(ticket.id);
		}).finally(() => setBusy(false));
	}
	const toastEl = toast ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "save-toast pos-accept-toast",
		"data-ok": "true",
		role: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Accepted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toast })]
	}) : null;
	if (!current) return toastEl;
	const where = current.fulfillment === "delivery" ? `${current.addressLine}${current.city ? `, ${current.city}` : ""} ${current.zip}`.trim() : current.pickupName ? `Pickup for ${current.pickupName}` : "Pickup at the counter";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [toastEl, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							}), " Incoming · oldest first"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: "order-alert-title",
							children: ["Ticket #", formatTicketNo(current.ticketNo)]
						}),
						queue.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", {
							className: "order-alert-q",
							children: [
								queue.length,
								" tickets waiting for the kitchen · showing ",
								place,
								" of ",
								queue.length,
								", oldest first"
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: "order-alert-q",
							children: "Oldest ticket waiting for the kitchen"
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
						disabled: busy || taken.current.has(current.id),
						onClick: take,
						children: busy ? "Accepting…" : "Accept order"
					}), queue.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-btn",
						disabled: busy,
						onClick: () => {
							const i = queue.findIndex((t) => t.id === current.id);
							const next = queue[(i + 1 + queue.length) % queue.length];
							if (next) setCurrentId(next.id);
						},
						children: "Show next oldest"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Accept sends this ticket to the kitchen and cannot be tapped twice. Other waiting tickets stay in this pop-up, oldest first."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "order-alert-hide",
					"aria-label": "Hide incoming pop-ups for now. Tickets stay on the Open board.",
					onClick: () => {
						for (const t of queue) snoozed.current.add(t.id);
						saveSnooze(snoozed.current);
						setQueue([]);
						setCurrentId("");
						audioRef.current?.pause();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						size: 14,
						strokeWidth: 2.4
					}), " Hide pop-ups — tickets stay on Open"]
				})
			]
		})
	})] });
}
//#endregion
export { POS_ACCEPTED_EVENT as n, IncomingOrderQueue as t };

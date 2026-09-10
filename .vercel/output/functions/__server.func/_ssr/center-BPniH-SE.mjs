import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as formatTicketNo, E as formatShopWhen, O as formatUsd, U as payMethodLabel, c as DEFAULT_RECEIPT_OPTIONS, u as RESTAURANT, w as formatShopClock } from "./hours-CePKgkcU.mjs";
import { a as formatPhone, s as looksLikePhone } from "./phone-PlVj3DDJ.mjs";
import { B as setChatFlagged, C as listCustomers, F as saveShopSettings, H as setChatResolution, I as sendChatMessage, O as loadChatMessages, R as setAccountBanned, S as listAllOrders, U as setChatStaffNote, V as setChatMuted, W as startAdminChat, d as deleteOrder, h as getAdminShop, l as deleteChatMessage, m as getAdminInsights, p as getAdminInboxCount, q as updateOrderStatus, r as attachChatOrder, t as acceptOrder, u as deleteChatThread, x as listAdminChats } from "./shop-server-MBWgsS8d.mjs";
import { A as MessageCircle, B as Flag, V as FlagOff, at as Ban, g as Search, i as Volume2, l as Trash2, r as VolumeX } from "../_libs/lucide-react.mjs";
import { t as OrderDateTrays } from "./order-trays-Bpdi_cZ6.mjs";
import { E as emitAdminInbox, _ as OrderTicketCard, c as Route$12, i as EMPTY_INSIGHTS, r as AnalyticsPanel } from "./router-CXnXlITz.mjs";
import { t as CustomersPanel } from "./customers-panel-IK_n82YW.mjs";
import { n as useSaveFlash, t as SaveToast } from "./save-toast-cmTAnDzF.mjs";
import { d as printOrderReceipts } from "./bluetooth-printer-i6teuJoZ.mjs";
import { i as RewardsPanel } from "./shop-ops-panels-DlkRY5Vy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/center-BPniH-SE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ORDER_STATUSES = [
	"placed",
	"accepted",
	"awaiting_payment",
	"preparing",
	"ready",
	"out_for_delivery",
	"completed",
	"canceled"
];
function CustomerCenter({ tab, thread, customer }) {
	const navigate = useNavigate();
	function go(next) {
		navigate({
			to: "/admin/center",
			search: {
				tab: next.tab ?? tab,
				thread: next.thread,
				customer: next.customer
			}
		});
	}
	const [unread, setUnread] = (0, import_react.useState)(0);
	const [orderCount, setOrderCount] = (0, import_react.useState)(0);
	const [custCount, setCustCount] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		getAdminInboxCount().then((r) => setUnread(r.unread)).catch(() => void 0);
		listAllOrders().then((list) => setOrderCount(list.filter((o) => o.status !== "canceled" && o.status !== "completed").length)).catch(() => void 0);
		listCustomers().then((list) => setCustCount(list.length)).catch(() => void 0);
	}, [tab]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "center-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "page-card center-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Customer Center" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Messages, tickets, the customer book, and rewards in one place."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "seg center-tabs",
					role: "tablist",
					"aria-label": "Customer Center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "tab",
							"aria-selected": tab === "messages",
							"data-on": tab === "messages",
							onClick: () => go({ tab: "messages" }),
							children: ["Messages", unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: unread }) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "tab",
							"aria-selected": tab === "orders",
							"data-on": tab === "orders",
							onClick: () => go({ tab: "orders" }),
							children: ["Orders", orderCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: orderCount }) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "tab",
							"aria-selected": tab === "customers",
							"data-on": tab === "customers",
							onClick: () => go({ tab: "customers" }),
							children: ["Customers", custCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: custCount }) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": tab === "rewards",
							"data-on": tab === "rewards",
							onClick: () => go({ tab: "rewards" }),
							children: "Rewards"
						})
					]
				})]
			}),
			tab === "messages" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CenterMessages, {
				wantedThread: thread,
				wantedCustomer: customer,
				onOpenOrder: () => go({ tab: "orders" }),
				onOpenCustomer: (id) => go({
					tab: "customers",
					customer: id
				}),
				onThread: (id) => go({
					tab: "messages",
					thread: id
				})
			}) : null,
			tab === "orders" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CenterOrders, { onMessage: (userId) => go({
				tab: "messages",
				customer: userId
			}) }) : null,
			tab === "customers" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CenterCustomers, {
				focusId: customer,
				onMessage: (id, threadId) => go({
					tab: "messages",
					customer: id,
					thread: threadId
				})
			}) : null,
			tab === "rewards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CenterRewards, {}) : null
		]
	});
}
function CenterMessages({ wantedThread, wantedCustomer, onOpenOrder, onOpenCustomer, onThread }) {
	const [threads, setThreads] = (0, import_react.useState)([]);
	const [active, setActive] = (0, import_react.useState)(wantedThread ?? "");
	const [filter, setFilter] = (0, import_react.useState)("open");
	const [query, setQuery] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const [linkOrderId, setLinkOrderId] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [pane, setPane] = (0, import_react.useState)("list");
	const logRef = (0, import_react.useRef)(null);
	function loadInbox() {
		return listAdminChats().then((list) => {
			setThreads(list);
			return list;
		}).catch((e) => {
			setError(e instanceof Error ? e.message : "Could not load chats");
			return [];
		});
	}
	(0, import_react.useEffect)(() => {
		loadInbox().then((list) => {
			const want = wantedThread && list.find((t) => t.id === wantedThread) || wantedCustomer && list.find((t) => t.userId === wantedCustomer && t.status !== "solved") || wantedCustomer && list.find((t) => t.userId === wantedCustomer) || list.find((t) => t.status !== "solved" && !t.muted) || list[0];
			if (want) {
				setActive(want.id);
				if (wantedThread || wantedCustomer) setPane("thread");
			}
		});
		listAllOrders().then(setOrders).catch(() => setOrders([]));
		listCustomers().then(setCustomers).catch(() => setCustomers([]));
		const t = window.setInterval(() => {
			loadInbox();
			getAdminInboxCount().then((r) => emitAdminInbox(r.unread)).catch(() => void 0);
		}, 8e3);
		return () => window.clearInterval(t);
	}, [wantedThread, wantedCustomer]);
	(0, import_react.useEffect)(() => {
		if (!active) {
			setMessages([]);
			return;
		}
		const current = threads.find((t) => t.id === active);
		setNote(current?.staffNote ?? "");
		loadChatMessages({ data: { threadId: active } }).then(async (msgs) => {
			setMessages(msgs);
			const waiting = (await loadInbox()).filter((t) => t.unreadAdmin > 0 && t.status !== "solved" && !t.muted).length;
			emitAdminInbox(waiting);
		}).catch(() => setMessages([]));
		const t = window.setInterval(() => {
			loadChatMessages({ data: { threadId: active } }).then(setMessages).catch(() => void 0);
		}, 6e3);
		return () => window.clearInterval(t);
	}, [active]);
	(0, import_react.useEffect)(() => {
		const el = logRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [messages]);
	const visible = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return threads.filter((t) => {
			if (filter === "open" && t.status === "solved") return false;
			if (filter === "solved" && t.status !== "solved") return false;
			if (filter === "unread" && !(t.unreadAdmin > 0 && t.status !== "solved")) return false;
			if (filter === "flagged" && !t.flagged) return false;
			if (wantedCustomer && filter === "open" && t.userId === wantedCustomer) return true;
			if (!q) return true;
			return [
				t.customerName,
				t.customerPhone,
				t.lastMessage,
				t.order?.id,
				formatTicketNo(t.order?.ticketNo),
				t.staffNote
			].join(" ").toLowerCase().includes(q);
		});
	}, [
		threads,
		filter,
		query,
		wantedCustomer
	]);
	const current = threads.find((t) => t.id === active);
	const profile = customers.find((c) => c.userId === current?.userId);
	const theirOrders = orders.filter((o) => o.userId === current?.userId && o.status !== "canceled").slice(0, 8);
	function pick(id) {
		setActive(id);
		setPane("thread");
		onThread(id);
	}
	function send(body = draft) {
		const text = body.trim();
		if (!active || !text) return;
		setBusy(true);
		setError("");
		sendChatMessage({ data: {
			threadId: active,
			body: text
		} }).then(async () => {
			setDraft("");
			setMessages(await loadChatMessages({ data: { threadId: active } }));
			await loadInbox();
		}).catch((err) => setError(err instanceof Error ? err.message : "Could not send")).finally(() => setBusy(false));
	}
	function onSubmit(e) {
		e.preventDefault();
		send();
	}
	function resolve(solved) {
		if (!active) return;
		setBusy(true);
		setChatResolution({ data: {
			threadId: active,
			solved
		} }).then(async () => {
			const list = await loadInbox();
			if (solved) {
				const nextOpen = list.find((t) => t.status !== "solved") ?? list[0];
				if (nextOpen) pick(nextOpen.id);
			}
		}).catch((err) => setError(err instanceof Error ? err.message : "Could not update")).finally(() => setBusy(false));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "center-stage",
		"data-pane": pane,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "center-inbox page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Find a conversation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "cat-search",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 16,
								strokeWidth: 2.2,
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Name, phone, ticket",
								"aria-label": "Search conversations"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "seg center-filters",
						role: "group",
						"aria-label": "Filter chats",
						children: [
							"open",
							"unread",
							"flagged",
							"solved",
							"all"
						].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": filter === id,
							onClick: () => setFilter(id),
							children: id[0].toUpperCase() + id.slice(1)
						}, id))
					}),
					visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-empty",
						children: threads.length === 0 ? "No chats yet." : "Nothing in this filter."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "service-inbox",
						children: visible.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "service-item",
							"data-on": active === t.id,
							onClick: () => pick(t.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									t.customerName,
									t.flagged ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "center-chip",
										children: "Flagged"
									}) : null,
									t.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "center-chip",
										children: "Muted"
									}) : null,
									t.customerBanned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "center-chip",
										"data-tone": "warn",
										children: "Banned"
									}) : null,
									t.unreadAdmin > 0 && t.status !== "solved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "nav-pip",
										children: t.unreadAdmin
									}) : null
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: t.lastMessage || "New chat request" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									t.status === "solved" ? "Solved · " : "",
									t.order ? `${t.order.fulfillment === "delivery" ? "Delivery" : "Pickup"} · ${formatUsd(t.order.total)} · ` : "",
									t.lastAt ? formatShopWhen(t.lastAt) : ""
								] })
							]
						}) }, t.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "page-card service-thread center-thread",
				children: !current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-empty",
					children: "Pick a conversation, or message a customer from the book."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "msg-thread-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "center-back",
								onClick: () => setPane("list"),
								children: "Inbox"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: current.customerName }),
							current.customerPhone && looksLikePhone(current.customerPhone) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ed-sub",
								children: formatPhone(current.customerPhone)
							}) : null
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "msg-resolve",
							children: current.status === "solved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ed-btn",
								disabled: busy,
								onClick: () => resolve(false),
								children: "Reopen"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-print",
								disabled: busy,
								onClick: () => resolve(true),
								children: "Mark solved"
							})
						})]
					}),
					current.order ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderTicketCard, { order: current.order }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "link-ticket",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-empty",
							children: "No ticket on this chat."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Link a ticket" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "ed-input",
									value: linkOrderId,
									onChange: (e) => setLinkOrderId(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Choose ticket"
									}), theirOrders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: o.id,
										children: [
											"#",
											formatTicketNo(o.ticketNo),
											" · ",
											o.fulfillment,
											" · ",
											formatUsd(o.total),
											" · ",
											formatShopWhen(o.createdAt)
										]
									}, o.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ed-btn",
									disabled: busy || !linkOrderId,
									onClick: () => {
										setBusy(true);
										attachChatOrder({ data: {
											threadId: current.id,
											orderId: linkOrderId
										} }).then(async () => {
											await loadInbox();
											setLinkOrderId("");
										}).catch((err) => setError(err instanceof Error ? err.message : "Could not link")).finally(() => setBusy(false));
									},
									children: "Link ticket"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "chat-history",
						"aria-label": "Conversation",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "chat-history-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "chat-log-kicker",
								children: "Sent messages"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "chat-history-hint",
								children: "What the customer and the shop already sent."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "chat-log",
							ref: logRef,
							"aria-live": "polite",
							children: messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ed-empty",
								children: "No messages yet. Send the first line from the shop."
							}) : messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "chat-bubble",
								"data-role": m.senderRole,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									m.senderRole === "admin" ? "Shop" : current.customerName,
									m.createdAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
										dateTime: m.createdAt,
										children: formatShopClock(m.createdAt)
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "chat-del",
										"aria-label": "Delete message",
										onClick: () => {
											if (!window.confirm("Remove this message?")) return;
											deleteChatMessage({ data: { id: m.id } }).then(async () => setMessages(await loadChatMessages({ data: { threadId: current.id } }))).catch((err) => setError(err instanceof Error ? err.message : "Could not delete"));
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											size: 12,
											strokeWidth: 2.2
										})
									})
								] }), m.body]
							}, m.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "chat-compose",
						"aria-label": "Write a reply",
						onSubmit,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "chat-compose-head",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "chat-compose-kicker",
									children: "Type a reply here"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your new message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "ed-input ed-area chat-draft",
									rows: 3,
									maxLength: 1e3,
									value: draft,
									onChange: (e) => setDraft(e.target.value),
									disabled: current.status === "solved",
									placeholder: "Write a new reply to the customer…",
									onKeyDown: (e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											send();
										}
									}
								})]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "form-error",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "btn-print",
								disabled: busy || current.status === "solved",
								children: busy ? "Sending…" : "Send reply"
							})
						]
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "page-card center-context",
				children: !current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-empty",
					children: "Customer tools show up when a thread is open."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: "Moderate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: current.customerName }),
					profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ed-sub",
						children: [
							profile.orderCount,
							" orders · ",
							formatUsd(profile.spend),
							" · ",
							profile.points,
							" pts",
							profile.banned ? " · Banned" : ""
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "center-tools",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "ed-btn",
								disabled: busy,
								onClick: () => {
									setChatFlagged({ data: {
										threadId: current.id,
										flagged: !current.flagged
									} }).then(() => loadInbox()).catch((err) => setError(err instanceof Error ? err.message : "Could not flag"));
								},
								children: [current.flagged ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlagOff, {
									size: 14,
									strokeWidth: 2.2
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
									size: 14,
									strokeWidth: 2.2
								}), current.flagged ? "Clear flag" : "Flag follow-up"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "ed-btn",
								disabled: busy,
								onClick: () => {
									setChatMuted({ data: {
										threadId: current.id,
										muted: !current.muted
									} }).then(() => loadInbox()).catch((err) => setError(err instanceof Error ? err.message : "Could not mute"));
								},
								children: [current.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
									size: 14,
									strokeWidth: 2.2
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
									size: 14,
									strokeWidth: 2.2
								}), current.muted ? "Unmute pip" : "Mute pip"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "ed-btn",
								disabled: busy || !current.userId,
								onClick: () => {
									const on = !current.customerBanned;
									if (on && !window.confirm(`Ban ${current.customerName}? They will not be able to order or chat.`)) return;
									setAccountBanned({ data: {
										userId: current.userId,
										banned: on
									} }).then(() => loadInbox()).catch((err) => setError(err instanceof Error ? err.message : "Could not ban"));
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {
									size: 14,
									strokeWidth: 2.2
								}), current.customerBanned ? "Lift ban" : "Ban account"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "ed-btn ed-btn-danger",
								disabled: busy,
								onClick: () => {
									if (!window.confirm("Delete this entire conversation?")) return;
									deleteChatThread({ data: { threadId: current.id } }).then(async () => {
										const list = await loadInbox();
										setActive(list[0]?.id ?? "");
										setPane("list");
									}).catch((err) => setError(err instanceof Error ? err.message : "Could not delete"));
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									size: 14,
									strokeWidth: 2.2
								}), "Delete chat"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Staff note (not shown to the customer)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "ed-input ed-area",
							rows: 3,
							maxLength: 800,
							value: note,
							onChange: (e) => setNote(e.target.value),
							onBlur: () => {
								if (note === (current.staffNote ?? "")) return;
								setChatStaffNote({ data: {
									threadId: current.id,
									note
								} }).then(() => loadInbox()).catch((err) => setError(err instanceof Error ? err.message : "Could not save note"));
							}
						})]
					}),
					current.order ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/pos",
						search: { ticket: current.order.id },
						className: "ed-btn",
						children: "Open ticket on POS"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-btn",
						onClick: () => onOpenCustomer(current.userId),
						children: "Open in the book"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-btn",
						onClick: () => onOpenOrder(),
						children: "View tickets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "settings-subhead",
						children: "Tickets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderDateTrays, {
						orders: theirOrders,
						empty: "No tickets on this account.",
						children: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"#",
							formatTicketNo(o.ticketNo),
							" · ",
							formatShopWhen(o.createdAt),
							" · ",
							o.fulfillment,
							o.scheduledFor ? ` · ${formatShopWhen(o.scheduledFor)}` : ""
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							formatUsd(o.total),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: o.status.replaceAll("_", " ") })
						] })] }, o.id)
					})
				] })
			})
		]
	});
}
function CenterOrders({ onMessage }) {
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("live");
	const [printers, setPrinters] = (0, import_react.useState)([]);
	const [receipt, setReceipt] = (0, import_react.useState)(DEFAULT_RECEIPT_OPTIONS);
	const [restaurant, setRestaurant] = (0, import_react.useState)(RESTAURANT);
	const [taxRate, setTaxRate] = (0, import_react.useState)(6.625);
	const [autoPrint, setAutoPrint] = (0, import_react.useState)(true);
	const [msg, setMsg] = (0, import_react.useState)("");
	const [busyId, setBusyId] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		listAllOrders().then(setOrders);
		getAdminShop().then((d) => {
			setPrinters(d.printers);
			setReceipt(d.receiptOptions);
			setRestaurant(d.restaurant);
			setTaxRate(d.settings.taxRate);
			setAutoPrint(d.receiptOptions.autoPrintOnAccept);
		});
	}, []);
	const visible = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return orders.filter((o) => {
			if (status === "live" && (o.status === "completed" || o.status === "canceled")) return false;
			if (status !== "live" && status !== "all" && o.status !== status) return false;
			if (!q) return true;
			return [
				formatTicketNo(o.ticketNo),
				o.id,
				o.fulfillment,
				o.pickupName,
				o.addressLine,
				o.notes,
				o.paymentMethod,
				o.status
			].join(" ").toLowerCase().includes(q);
		});
	}, [
		orders,
		query,
		status
	]);
	async function runPrint(order) {
		if (!printers.some((p) => p.enabled && (p.customerCopy || p.storeCopy))) throw new Error("Add a printer under Settings first.");
		await printOrderReceipts({
			order,
			restaurant,
			receipt,
			printers,
			taxRate,
			fallback: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "center-orders",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "center-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Find a ticket" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "cat-search",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							size: 16,
							strokeWidth: 2.2,
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Name, ticket, notes"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "ed-input",
						value: status,
						onChange: (e) => setStatus(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "live",
								children: "Open tickets"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All"
							}),
							ORDER_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s.replaceAll("_", " ")
							}, s))
						]
					})]
				})]
			}), msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: msg
			}) : null]
		}), visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "page-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-empty",
				children: "No tickets match."
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "center-order-grid",
			children: visible.map((o) => {
				const canAccept = o.status === "placed" || o.status === "awaiting_payment";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "page-card center-order-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["#", formatTicketNo(o.ticketNo)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pos-st",
							"data-tone": o.status === "completed" ? "completed" : o.status === "placed" ? "placed" : "accepted",
							children: o.status.replaceAll("_", " ")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "order-meta",
							children: [
								formatShopWhen(o.createdAt),
								" · ",
								o.fulfillment,
								" · ",
								payMethodLabel(o.paymentMethod),
								o.scheduledFor ? ` · ${formatShopWhen(o.scheduledFor)}` : ""
							]
						}),
						o.pickupName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ed-sub",
							children: ["Pickup for ", o.pickupName]
						}) : null,
						o.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ed-sub",
							children: ["Note: ", o.notes]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: o.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							it.qty,
							"× ",
							it.name,
							it.size ? ` (${it.size})` : ""
						] }, i)) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "center-order-total",
							children: formatUsd(o.total)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "order-actions",
							children: [
								canAccept ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn-print",
									disabled: busyId === o.id,
									onClick: () => {
										setBusyId(o.id);
										acceptOrder({ data: { id: o.id } }).then(async (next) => {
											setOrders((list) => list.map((x) => x.id === next.id ? next : x));
											if (autoPrint) try {
												await runPrint(next);
												setMsg(`Accepted #${formatTicketNo(next.ticketNo)}. Receipts sent.`);
											} catch (e) {
												setMsg(e instanceof Error ? `Accepted, but print failed: ${e.message}` : "Accepted.");
											}
											else setMsg(`Accepted #${formatTicketNo(next.ticketNo)}.`);
										}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not accept")).finally(() => setBusyId(""));
									},
									children: busyId === o.id ? "Accepting…" : "Accept"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ed-btn",
									disabled: busyId === o.id || o.status === "canceled",
									onClick: () => {
										setBusyId(o.id);
										runPrint(o).then(() => setMsg(`Reprinted #${formatTicketNo(o.ticketNo)}.`)).catch((e) => setMsg(e instanceof Error ? e.message : "Could not print")).finally(() => setBusyId(""));
									},
									children: "Reprint"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "ed-input",
									value: o.status,
									onChange: (e) => {
										const next = e.target.value;
										updateOrderStatus({ data: {
											id: o.id,
											status: next
										} }).then((r) => setOrders((list) => list.map((x) => x.id === o.id ? r.order ?? {
											...x,
											status: next
										} : x)));
									},
									children: ORDER_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s.replaceAll("_", " ")
									}, s))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "ed-btn",
									onClick: () => onMessage(o.userId),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
										size: 14,
										strokeWidth: 2.2
									}), "Message"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ed-btn ed-btn-danger",
									disabled: busyId === o.id,
									onClick: () => {
										if (!window.confirm(`Remove ticket #${formatTicketNo(o.ticketNo)}?`)) return;
										setBusyId(o.id);
										deleteOrder({ data: { id: o.id } }).then(() => {
											setOrders((list) => list.filter((x) => x.id !== o.id));
											setMsg(`Removed #${formatTicketNo(o.ticketNo)}.`);
										}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not remove")).finally(() => setBusyId(""));
									},
									children: "Remove"
								})
							]
						})
					]
				}, o.id);
			})
		})]
	});
}
function CenterCustomers({ focusId, onMessage }) {
	const [insights, setInsights] = (0, import_react.useState)(null);
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const [msg, setMsg] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		getAdminInsights().then(setInsights).catch(() => setInsights(null));
		listCustomers().then(setCustomers).catch(() => setCustomers([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "center-customers",
		children: [
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: msg
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsPanel, { insights: insights ?? EMPTY_INSIGHTS }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomersPanel, {
				customers,
				setCustomers,
				onMsg: setMsg,
				focusId,
				onMessage: (c) => {
					startAdminChat({ data: { userId: c.userId } }).then((r) => onMessage(c.userId, r.threadId)).catch(() => onMessage(c.userId));
				}
			}),
			focusId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "sr-only",
				children: ["Focused customer ", focusId]
			}) : null
		]
	});
}
function CenterRewards() {
	const [settings, setSettings] = (0, import_react.useState)(null);
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const [insights, setInsights] = (0, import_react.useState)(null);
	const [msg, setMsg] = (0, import_react.useState)("");
	const { toast, flashOk, flashFail } = useSaveFlash();
	(0, import_react.useEffect)(() => {
		getAdminShop().then((d) => setSettings(d.settings)).catch(() => void 0);
		listCustomers().then(setCustomers).catch(() => setCustomers([]));
		getAdminInsights().then(setInsights).catch(() => setInsights(null));
	}, []);
	const view = insights ?? EMPTY_INSIGHTS;
	const holding = customers.reduce((n, c) => n + (c.points || 0), 0);
	function saveProgram() {
		if (!settings) return;
		saveShopSettings({ data: {
			pointsPerDollar: settings.pointsPerDollar,
			redeemRate: settings.redeemRate,
			welcomeBonus: settings.welcomeBonus,
			inviteBonus: settings.inviteBonus,
			inviteeBonus: settings.inviteeBonus
		} }).then(() => {
			setMsg("Rewards program is live.");
			flashOk(true);
		}).catch((e) => {
			const text = e instanceof Error ? e.message : "Could not save rewards";
			setMsg(text);
			flashFail(text);
		});
	}
	if (!settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-skel",
		children: "Loading rewards…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "center-rewards",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveToast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: "Rewards"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Points program" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Earn and redeem live here. Guests do not earn points — signed-in accounts do. Adjust a wallet in the book below."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "kpi-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "kpi rewards-bubble",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Points in wallets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: holding })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "kpi rewards-bubble",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Average wallet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: view.customers.avgPoints })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "kpi rewards-bubble",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Welcome bonus" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: settings.welcomeBonus })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "kpi rewards-bubble",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Redeem rate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [settings.redeemRate, " / $1"] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardsPanel, {
				settings,
				setSettings
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn-print",
				onClick: saveProgram,
				children: "Save rewards program"
			}),
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: msg
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomersPanel, {
				customers,
				setCustomers,
				onMsg: setMsg
			})
		]
	});
}
function AdminCenter() {
	const { tab, thread, customer } = Route$12.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerCenter, {
		tab: tab ?? "messages",
		thread,
		customer
	});
}
//#endregion
export { AdminCenter as component };

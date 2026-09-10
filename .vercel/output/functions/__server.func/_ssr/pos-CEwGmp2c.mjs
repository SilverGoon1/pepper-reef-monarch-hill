import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, l as require_react_dom, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as formatTicketNo, E as formatShopWhen, O as formatUsd, c as DEFAULT_RECEIPT_OPTIONS, u as RESTAURANT } from "./hours-CePKgkcU.mjs";
import { D as listPosOrders, h as getAdminShop, k as patchPosOrder, q as updateOrderStatus } from "./shop-server-MBWgsS8d.mjs";
import { A as MessageCircle, C as Plus, g as Search, k as Minus, s as UserRound, t as X } from "../_libs/lucide-react.mjs";
import { O as onVisibleInterval, o as Route$5, y as isTransientFetchError } from "./router-BdhSMl-o.mjs";
import { d as printOrderReceipts } from "./bluetooth-printer-i6teuJoZ.mjs";
import { t as useDialogLock } from "./dialog-lock-CQ_HUt2j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos-CEwGmp2c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var POS_STATUSES = [
	{
		id: "placed",
		label: "Placed"
	},
	{
		id: "accepted",
		label: "Accepted"
	},
	{
		id: "completed",
		label: "Completed"
	}
];
function posBucket(status) {
	if (status === "completed") return "completed";
	if (status === "placed" || status === "awaiting_payment" || status === "canceled") return "placed";
	return "accepted";
}
function priceNum(p) {
	const n = Number(String(p).replace(/^\$/, ""));
	return Number.isFinite(n) ? n : 0;
}
function ticketWhere(t) {
	return t.fulfillment === "delivery" ? `${t.addressLine}${t.city ? `, ${t.city}` : ""} ${t.zip}`.trim() : "Pickup at 443 Zion Rd";
}
function PosTicketDialog({ ticket, itemQuery, menuHits, busyId, onClose, onQuery, onStatus, onSaveItems, onReprint }) {
	const titleId = (0, import_react.useId)();
	const panelRef = (0, import_react.useRef)(null);
	const bucket = posBucket(ticket.status);
	const where = ticketWhere(ticket);
	useDialogLock(onClose, panelRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pizza-modal-root pos-ticket-root",
		role: "presentation",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "pizza-modal-scrim",
			"aria-label": "Close ticket",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: panelRef,
			className: "pizza-modal pos-ticket-pop",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			tabIndex: -1,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "pizza-modal-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "shop-brand-kicker",
							children: ["Ticket #", formatTicketNo(ticket.ticketNo)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: titleId,
							children: ticket.customerName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ed-sub",
							children: [
								ticket.fulfillment === "delivery" ? "Delivery" : ticket.pickupName ? `Pickup · ${ticket.pickupName}` : "Pickup",
								ticket.scheduledFor ? ` · ${formatShopWhen(ticket.scheduledFor)}` : "",
								ticket.customerPhone ? ` · ${ticket.customerPhone}` : ""
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-icon-btn",
						"aria-label": "Close ticket",
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							size: 16,
							strokeWidth: 2.2
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "pos-quick-status",
					role: "group",
					"aria-label": "Ticket status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Status" }), POS_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-on": bucket === s.id,
						"data-tone": s.id,
						onClick: () => onStatus(s.id),
						children: s.label
					}, s.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "cart-lines pos-edit-lines",
					children: ticket.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						it.name,
						it.size ? ` · ${it.size}` : "",
						it.detail ? ` · ${it.detail}` : "",
						it.comment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cook-note",
							children: it.comment
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: "cart-line-price",
							children: formatUsd(it.unitPrice * it.qty)
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "qty-step",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Remove one",
								disabled: ticket.items.length === 1 && it.qty <= 1,
								onClick: () => {
									onSaveItems(ticket.items.map((row, idx) => idx === i ? {
										...row,
										qty: row.qty - 1
									} : row).filter((row) => row.qty > 0));
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
									size: 16,
									strokeWidth: 2.4
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: it.qty }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Add one",
								onClick: () => {
									onSaveItems(ticket.items.map((row, idx) => idx === i ? {
										...row,
										qty: row.qty + 1
									} : row));
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									size: 16,
									strokeWidth: 2.4
								})
							})
						]
					})] }, `${it.itemId}-${i}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field pos-item-search",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add an item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "cat-search",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							size: 16,
							strokeWidth: 2.2,
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: itemQuery,
							onChange: (e) => onQuery(e.target.value),
							placeholder: "Search the menu",
							"aria-label": "Search menu items to add",
							autoComplete: "off"
						})]
					})]
				}),
				itemQuery.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "cat-suggest pos-item-hits",
					role: "listbox",
					"aria-label": "Menu items",
					children: menuHits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "cat-suggest-empty",
						children: [
							"No matches for “",
							itemQuery.trim(),
							"”."
						]
					}) : menuHits.map((hit) => {
						const first = hit.item.prices[0];
						const unit = priceNum(first?.price ?? "0");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								const add = {
									itemId: hit.item.id ?? hit.item.name,
									categoryId: hit.cat.id,
									name: hit.item.name,
									size: first?.label,
									unitPrice: unit,
									qty: 1
								};
								const existing = ticket.items.findIndex((row) => row.itemId === add.itemId && row.size === add.size && !row.detail && !row.comment);
								onSaveItems(existing >= 0 ? ticket.items.map((row, idx) => idx === existing ? {
									...row,
									qty: row.qty + 1
								} : row) : [...ticket.items, add]);
								onQuery("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: hit.item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
								hit.cat.name,
								first?.label ? ` · ${first.label}` : "",
								" · ",
								formatUsd(unit)
							] })]
						}) }, `${hit.cat.id}-${hit.item.id ?? hit.item.name}`);
					})
				}) : null,
				ticket.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "pos-notes",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Notes" }),
						" ",
						ticket.notes
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "totals",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(ticket.subtotal) })] }),
						ticket.discount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Rewards" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["−", formatUsd(ticket.discount)] })] }) : null,
						ticket.deliveryFee ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(ticket.deliveryFee) })] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Tax" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(ticket.tax) })] }),
						ticket.tip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Tip" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(ticket.tip) })] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "totals-grand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(ticket.total) })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-actions pos-ticket-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ed-btn",
							disabled: busyId === ticket.id,
							onClick: onReprint,
							children: busyId === ticket.id ? "Printing…" : "Reprint"
						}),
						ticket.userId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/center",
							search: {
								tab: "customers",
								customer: ticket.userId
							},
							className: "ed-btn",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
								size: 15,
								strokeWidth: 2.2
							}), "Profile"]
						}) : null,
						ticket.chatThreadId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/center",
							search: {
								tab: "messages",
								thread: ticket.chatThreadId
							},
							className: "ed-btn",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
									size: 15,
									strokeWidth: 2.2
								}),
								"Chat",
								ticket.chatUnread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "nav-pip",
									children: ticket.chatUnread > 9 ? "9+" : ticket.chatUnread
								}) : null
							]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: ticket.fulfillment === "delivery" ? `Deliver to ${where}` : "Customer pickup at the counter."
				})
			]
		})]
	});
}
function AdminPos() {
	const { ticket } = Route$5.useSearch();
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [openId, setOpenId] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)(ticket ?? "");
	const [finderOpen, setFinderOpen] = (0, import_react.useState)(false);
	const [itemQuery, setItemQuery] = (0, import_react.useState)("");
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [printers, setPrinters] = (0, import_react.useState)([]);
	const [receipt, setReceipt] = (0, import_react.useState)(DEFAULT_RECEIPT_OPTIONS);
	const [restaurant, setRestaurant] = (0, import_react.useState)(RESTAURANT);
	const [taxRate, setTaxRate] = (0, import_react.useState)(6.625);
	const [busyId, setBusyId] = (0, import_react.useState)("");
	const [desk, setDesk] = (0, import_react.useState)("open");
	const [chromeHost, setChromeHost] = (0, import_react.useState)(null);
	const seenChat = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const primedChat = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		setChromeHost(document.getElementById("admin-top-extra"));
	}, []);
	(0, import_react.useEffect)(() => {
		return onVisibleInterval(6e3, () => {
			listPosOrders().then((list) => {
				setTickets(list);
				const pinged = list.filter((t) => t.chatUnread > 0 && t.chatThreadId);
				let prefer = "";
				if (!primedChat.current) {
					for (const t of pinged) if (t.chatThreadId) seenChat.current.add(t.chatThreadId);
					primedChat.current = true;
				} else {
					const fresh = pinged.filter((t) => t.chatThreadId && !seenChat.current.has(t.chatThreadId));
					for (const t of pinged) if (t.chatThreadId) seenChat.current.add(t.chatThreadId);
					if (fresh[0]) prefer = fresh[0].id;
				}
				setOpenId((cur) => {
					if (prefer) return prefer;
					if (ticket && list.some((t) => t.id === ticket)) return ticket;
					if (cur && list.some((t) => t.id === cur)) return cur;
					return "";
				});
				if (ticket) setQuery(ticket);
				const hit = ticket ? list.find((t) => t.id === ticket) : void 0;
				if (hit) setDesk(posBucket(hit.status) === "completed" ? "done" : "open");
			}).catch((e) => {
				if (isTransientFetchError(e)) return;
				setError(e instanceof Error ? e.message : "Could not load POS");
			});
		});
	}, [ticket]);
	(0, import_react.useEffect)(() => {
		getAdminShop().then((d) => {
			setCategories(d.categories);
			setPrinters(d.printers);
			setReceipt(d.receiptOptions);
			setRestaurant(d.restaurant);
			setTaxRate(d.settings.taxRate);
		}).catch(() => void 0);
	}, []);
	function mergeTicket(id, patch) {
		setTickets((list) => list.map((t) => t.id === id ? {
			...t,
			...patch
		} : t));
	}
	function setStatus(id, status) {
		setError("");
		updateOrderStatus({ data: {
			id,
			status
		} }).then((r) => {
			if (!r.order) return;
			mergeTicket(id, r.order);
			setDesk(posBucket(r.order.status) === "completed" ? "done" : "open");
		}).catch((e) => setError(e instanceof Error ? e.message : "Could not update"));
	}
	function saveItems(id, items) {
		setError("");
		patchPosOrder({ data: {
			id,
			items
		} }).then((r) => {
			if (!r.order) return;
			mergeTicket(id, r.order);
		}).catch((e) => setError(e instanceof Error ? e.message : "Could not update items"));
	}
	function reprint(order) {
		setBusyId(order.id);
		setError("");
		printOrderReceipts({
			order,
			restaurant,
			receipt,
			printers,
			taxRate,
			fallback: true
		}).then(() => setError("")).catch((e) => setError(e instanceof Error ? e.message : "Could not print")).finally(() => setBusyId(""));
	}
	const visible = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return tickets;
		return tickets.filter((t) => [
			formatTicketNo(t.ticketNo),
			t.id,
			t.customerName,
			t.customerPhone,
			t.status,
			t.fulfillment,
			t.addressLine,
			t.notes
		].join(" ").toLowerCase().includes(q));
	}, [tickets, query]);
	const menuHits = (0, import_react.useMemo)(() => {
		const needle = itemQuery.trim().toLowerCase();
		if (!needle) return [];
		const hits = [];
		for (const cat of categories) for (const item of cat.items) {
			const name = item.name.toLowerCase();
			const desc = (item.description ?? "").toLowerCase();
			let score = 0;
			if (name === needle) score = 100;
			else if (name.startsWith(needle)) score = 80;
			else if (name.includes(needle)) score = 60;
			else if (desc.includes(needle)) score = 40;
			else if (cat.name.toLowerCase().includes(needle)) score = 20;
			if (score) hits.push({
				cat,
				item,
				score
			});
		}
		hits.sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));
		return hits.slice(0, 8);
	}, [categories, itemQuery]);
	const openTickets = (0, import_react.useMemo)(() => visible.filter((t) => posBucket(t.status) !== "completed"), [visible]);
	const doneTickets = (0, import_react.useMemo)(() => visible.filter((t) => posBucket(t.status) === "completed"), [visible]);
	const shown = desk === "done" ? doneTickets : openTickets;
	const openTicket = tickets.find((t) => t.id === openId) ?? null;
	const deskTabs = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "seg pos-desk-tabs",
		role: "tablist",
		"aria-label": "Ticket desk",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			role: "tab",
			"aria-selected": desk === "open",
			"data-on": desk === "open",
			onClick: () => {
				setDesk("open");
				setOpenId("");
				setItemQuery("");
			},
			children: ["Open", openTickets.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
				className: "pos-tab-n",
				children: openTickets.length
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			role: "tab",
			"aria-selected": desk === "done",
			"data-on": desk === "done",
			onClick: () => {
				setDesk("done");
				setOpenId("");
				setItemQuery("");
			},
			children: ["Complete", doneTickets.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
				className: "pos-tab-n",
				children: doneTickets.length
			}) : null]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pos-page",
		children: [
			chromeHost ? (0, import_react_dom.createPortal)(deskTabs, chromeHost) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pos-chrome",
				children: deskTabs
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "form-error",
				children: error
			}) : null,
			shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "page-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-empty",
					children: desk === "done" ? "No completed tickets." : "No open tickets."
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "pos-list",
				children: shown.map((t) => {
					const open = openId === t.id;
					const bucket = posBucket(t.status);
					const where = ticketWhere(t);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "pos-row",
						"data-open": open,
						"data-status": bucket,
						"data-chat": t.chatUnread > 0 ? "true" : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "pos-summary",
							"aria-haspopup": "dialog",
							"aria-expanded": open,
							onClick: () => {
								setOpenId(t.id);
								setItemQuery("");
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pos-when",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["#", formatTicketNo(t.ticketNo)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										new Date(t.createdAt).toLocaleTimeString([], {
											hour: "numeric",
											minute: "2-digit"
										}),
										" · ",
										new Date(t.createdAt).toLocaleDateString()
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pos-who",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t.customerName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										t.fulfillment === "delivery" ? "Delivery" : t.pickupName ? `Pickup · ${t.pickupName}` : "Pickup",
										" · ",
										where,
										t.scheduledFor ? ` · ${formatShopWhen(t.scheduledFor)}` : ""
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pos-amt",
									children: formatUsd(t.total)
								}),
								t.chatUnread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pos-chat-badge",
									title: "Customer messaged about this order",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
										size: 15,
										strokeWidth: 2.2
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "nav-pip",
										children: t.chatUnread > 9 ? "9+" : t.chatUnread
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pos-st",
									"data-tone": bucket,
									children: bucket
								})
							]
						}), t.chatUnread > 0 && t.chatThreadId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/center",
							search: {
								tab: "messages",
								thread: t.chatThreadId
							},
							className: "pos-chat-ping",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
								size: 15,
								strokeWidth: 2.2
							}), "Customer messaged about this order"]
						}) : null]
					}, t.id);
				})
			}),
			openTicket ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosTicketDialog, {
				ticket: openTicket,
				itemQuery,
				menuHits,
				busyId,
				onClose: () => {
					setOpenId("");
					setItemQuery("");
				},
				onQuery: setItemQuery,
				onStatus: (status) => setStatus(openTicket.id, status),
				onSaveItems: (items) => saveItems(openTicket.id, items),
				onReprint: () => reprint(openTicket)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "pos-search-fab",
				"aria-label": "Find a ticket",
				"aria-expanded": finderOpen,
				onClick: () => setFinderOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					size: 18,
					strokeWidth: 2.2
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Find a ticket" })]
			}),
			finderOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pos-search-scrim",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "pos-find-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "pos-search-pop",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "dock-panel-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "shop-brand-kicker",
								children: "POS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "pos-find-title",
								children: "Find a ticket"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ed-icon-btn",
								"aria-label": "Close search",
								onClick: () => setFinderOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									size: 16,
									strokeWidth: 2.2
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Name, ticket, phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "cat-search",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									size: 16,
									strokeWidth: 2.2,
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									autoFocus: true,
									value: query,
									onChange: (e) => setQuery(e.target.value),
									placeholder: "Search tickets",
									"aria-label": "Search tickets"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "pos-search-hits",
							children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "ed-empty",
								children: "No tickets match."
							}) : visible.slice(0, 12).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setDesk(posBucket(t.status) === "completed" ? "done" : "open");
									setOpenId(t.id);
									setFinderOpen(false);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t.customerName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
									"#",
									formatTicketNo(t.ticketNo),
									" · ",
									formatUsd(t.total),
									" · ",
									posBucket(t.status),
									t.scheduledFor ? ` · ${formatShopWhen(t.scheduledFor)}` : ""
								] })]
							}) }, t.id))
						})
					]
				})
			}) : null
		]
	});
}
//#endregion
export { AdminPos as component };

import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as formatUsd, P as moneyNumber, v as cardTypeStyle } from "./hours-CePKgkcU.mjs";
import { g as getMe } from "./shop-server-MBWgsS8d.mjs";
import { t as useCurrentUserState } from "./use-current-user-Q8r4NahO.mjs";
import { $ as ChevronLeft, C as Plus, M as MapPin, Q as ChevronRight, T as Phone, g as Search, k as Minus, q as Clock, t as X } from "../_libs/lucide-react.mjs";
import { C as useCartStore, S as cartTotals, b as retryTransient, h as Route$25, x as ShopHeader } from "./router-BdhSMl-o.mjs";
import { r as iconFor } from "./icons-DnfAfNKx.mjs";
import { a as mergeItemDetail, i as condimentTotal, n as condimentDetail, r as condimentMax, t as condimentCharge } from "./condiments-DjtLQZkn.mjs";
import { t as itemPhoto } from "./item-photos-BahCBAvR.mjs";
import { t as useDialogLock } from "./dialog-lock-CQ_HUt2j.mjs";
import { a as pricePizzaBuild, c as toppingUnit, i as colPrice, n as PIZZA_TOPPINGS, s as toppingCharge } from "./pizza-BvdQpWO6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C3NBX7Pu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Uncontrolled so typing never remounts or steals focus from the cook note. */
function CookNoteField({ id, noteRef, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ed-field pizza-modal-block pizza-cook-field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			children: "Note for the cook"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			id,
			ref: noteRef,
			className: "ed-input ed-area",
			rows: 2,
			maxLength: 160,
			defaultValue: "",
			placeholder,
			autoComplete: "off",
			autoCorrect: "on",
			spellCheck: true,
			enterKeyHint: "done",
			onPointerDown: (e) => e.stopPropagation(),
			onFocus: (e) => {
				const el = e.currentTarget;
				window.requestAnimationFrame(() => el.scrollIntoView({
					block: "center",
					inline: "nearest"
				}));
			}
		})]
	});
}
function cookNoteValue(ref) {
	return (ref.current?.value ?? "").trim().slice(0, 160);
}
function priceNum$1(p) {
	const n = Number(String(p).replace(/^\$/, ""));
	return Number.isFinite(n) ? n : 0;
}
function ItemConfirm({ item, categoryName, onClose, onConfirm }) {
	const titleId = (0, import_react.useId)();
	const noteId = (0, import_react.useId)();
	const panelRef = (0, import_react.useRef)(null);
	const noteRef = (0, import_react.useRef)(null);
	const sizes = item.prices.filter((p) => p.price);
	const [size, setSize] = (0, import_react.useState)(sizes[0]?.label || "");
	const [qty, setQty] = (0, import_react.useState)({});
	const condiments = item.condiments ?? [];
	useDialogLock(onClose, panelRef);
	const chosen = sizes.find((p) => p.label === size) ?? sizes[0];
	const picks = condiments.map((c) => {
		const n = qty[c.id] ?? 0;
		if (n <= 0) return null;
		return {
			id: c.id,
			name: c.name,
			qty: n,
			charge: condimentCharge(c, n)
		};
	}).filter((p) => Boolean(p));
	const extras = condimentTotal(picks);
	const unitPrice = Math.round((priceNum$1(chosen?.price ?? "0") + extras) * 100) / 100;
	const detail = condimentDetail(picks);
	function confirm() {
		const note = cookNoteValue(noteRef);
		onConfirm({
			size: chosen?.label || size || void 0,
			unitPrice,
			detail: detail || void 0,
			comment: note || void 0,
			condiments: picks
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pizza-modal-root",
		role: "presentation",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "pizza-modal-scrim",
			"aria-label": "Close",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: panelRef,
			className: "pizza-modal size-add-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			tabIndex: -1,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "pizza-modal-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "shop-brand-kicker",
							children: categoryName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: titleId,
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub",
							children: "Confirm this item, add extras, and leave a note for the cook."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-icon-btn",
						"aria-label": "Close",
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							size: 16,
							strokeWidth: 2.2
						})
					})]
				}),
				sizes.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "pizza-modal-block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-pick pizza-size-pick",
						role: "group",
						"aria-label": "Size",
						children: sizes.map((p) => {
							const lab = p.label || "Regular";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-on": (chosen?.label || "") === lab,
								onClick: () => setSize(lab),
								children: [lab, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatUsd(priceNum$1(p.price)) })]
							}, lab);
						})
					})]
				}) : null,
				condiments.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "pizza-modal-block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Condiments & extras" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "condiment-list",
						children: condiments.map((c) => {
							const cap = condimentMax(c.maxQty);
							const n = qty[c.id] ?? 0;
							const add = moneyNumber(c.price);
							const extra = moneyNumber(c.extraPrice || c.price);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
								add > 0 ? `${formatUsd(add)} to add` : "Included",
								extra > 0 ? ` · extra ${formatUsd(extra)}` : "",
								` · up to ${cap}`
							] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "qty-step",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": `Fewer ${c.name}`,
										disabled: n <= 0,
										onClick: () => setQty((cur) => ({
											...cur,
											[c.id]: Math.max(0, n - 1)
										})),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 14 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: n }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": `More ${c.name}`,
										disabled: n >= cap,
										onClick: () => setQty((cur) => ({
											...cur,
											[c.id]: Math.min(cap, n + 1)
										})),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
									})
								]
							})] }, c.id);
						})
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookNoteField, {
					id: noteId,
					noteRef,
					placeholder: "No onions, sauce on the side, well done…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "pizza-modal-foot",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pizza-modal-total",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "This item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUsd(unitPrice) })]
						}),
						detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub",
							children: detail
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pizza-modal-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ed-btn",
								onClick: onClose,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-print",
								onClick: confirm,
								children: "Add to bag"
							})]
						})
					]
				})
			]
		})]
	});
}
function PizzaCustomize({ item, categoryId, settings, initialSize, onClose, onConfirm }) {
	const titleId = (0, import_react.useId)();
	const noteId = (0, import_react.useId)();
	const panelRef = (0, import_react.useRef)(null);
	const noteRef = (0, import_react.useRef)(null);
	const first = item.prices[0];
	const [size, setSize] = (0, import_react.useState)(initialSize || first?.label || "LG");
	const [picks, setPicks] = (0, import_react.useState)({});
	const [condQty, setCondQty] = (0, import_react.useState)({});
	const condiments = item.condiments ?? [];
	const photo = item.hideImage ? "" : itemPhoto(item, categoryId);
	useDialogLock(onClose, panelRef);
	const toppings = Object.entries(picks).filter(([, side]) => side && side !== "off").map(([id, side]) => ({
		id,
		side
	}));
	const priced = pricePizzaBuild({
		item,
		other: null,
		size,
		toppings,
		settings
	});
	const condPicks = condiments.map((c) => {
		const n = condQty[c.id] ?? 0;
		if (n <= 0) return null;
		return {
			id: c.id,
			name: c.name,
			qty: n,
			charge: condimentCharge(c, n)
		};
	}).filter((p) => Boolean(p));
	const extras = condimentTotal(condPicks);
	const unitPrice = Math.round((priced.unitPrice + extras) * 100) / 100;
	const extraDetail = mergeItemDetail(priced.detail, condimentDetail(condPicks));
	const chosen = item.prices.find((p) => p.label === size) ?? first;
	const toppingEach = toppingUnit(size, settings);
	function setTopping(id, side) {
		setPicks((cur) => ({
			...cur,
			[id]: side
		}));
	}
	function toggleTopping(id) {
		setPicks((cur) => {
			const side = cur[id] ?? "off";
			return {
				...cur,
				[id]: side === "off" ? "whole" : "off"
			};
		});
	}
	function confirm() {
		const note = cookNoteValue(noteRef);
		onConfirm({
			size: chosen?.label || size,
			unitPrice,
			name: priced.name,
			detail: extraDetail,
			toppings,
			comment: note || void 0,
			condiments: condPicks
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pizza-modal-root",
		role: "presentation",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "pizza-modal-scrim",
			"aria-label": "Close",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: panelRef,
			className: "pizza-modal pizza-build",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			tabIndex: -1,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "pizza-modal-head pizza-item-head",
					children: [
						photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "pizza-item-thumb",
							src: photo,
							alt: "",
							decoding: "async"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pizza-item-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "shop-brand-kicker",
									children: "Make it yours"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: titleId,
									children: item.name
								}),
								item.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "pizza-item-desc",
									children: item.description
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ed-icon-btn",
							"aria-label": "Close",
							onClick: onClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								size: 16,
								strokeWidth: 2.2
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "pizza-modal-block pizza-block-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-pick pizza-size-pick",
						role: "group",
						"aria-label": "Pizza size",
						children: item.prices.map((p) => {
							const lab = p.label || "Regular";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-on": size === lab,
								onClick: () => setSize(lab),
								children: [
									lab,
									p.inches ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: p.inches }) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatUsd(colPrice(p)) })
								]
							}, lab);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "pizza-modal-block pizza-block-tight",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Extra toppings" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ed-sub topping-hint",
							children: [
								"Tap to add. ",
								formatUsd(toppingEach),
								" whole · ",
								formatUsd(toppingCharge(size, "left", settings)),
								" half."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "topping-grid",
							children: PIZZA_TOPPINGS.map((t) => {
								const side = picks[t.id] ?? "off";
								const on = side !== "off";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "topping-chip",
									"data-on": on || void 0,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "topping-chip-main",
										"aria-pressed": on,
										onClick: () => toggleTopping(t.id),
										children: t.name
									}), on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "topping-half",
										role: "group",
										"aria-label": `${t.name} side`,
										children: [
											"left",
											"whole",
											"right"
										].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"data-on": side === opt,
											onClick: () => setTopping(t.id, opt),
											children: opt === "whole" ? "Whole" : opt === "left" ? "L" : "R"
										}, opt))
									}) : null]
								}, t.id);
							})
						})
					]
				}),
				condiments.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "pizza-modal-block pizza-block-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Condiments & extras" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "condiment-list",
						children: condiments.map((c) => {
							const cap = condimentMax(c.maxQty);
							const n = condQty[c.id] ?? 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
								moneyNumber(c.price) > 0 ? `${formatUsd(moneyNumber(c.price))} to add` : "Included",
								moneyNumber(c.extraPrice || c.price) > 0 ? ` · extra ${formatUsd(moneyNumber(c.extraPrice || c.price))}` : "",
								` · up to ${cap}`
							] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "qty-step",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": `Fewer ${c.name}`,
										disabled: n <= 0,
										onClick: () => setCondQty((cur) => ({
											...cur,
											[c.id]: Math.max(0, n - 1)
										})),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 14 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: n }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": `More ${c.name}`,
										disabled: n >= cap,
										onClick: () => setCondQty((cur) => ({
											...cur,
											[c.id]: Math.min(cap, n + 1)
										})),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
									})
								]
							})] }, c.id);
						})
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookNoteField, {
					id: noteId,
					noteRef,
					placeholder: "Well done, light sauce, cut in squares…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "pizza-modal-foot",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pizza-modal-total",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "This pie" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUsd(unitPrice) })]
						}),
						extraDetail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub",
							children: extraDetail
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pizza-modal-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ed-btn",
								onClick: onClose,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-print",
								onClick: confirm,
								children: "Add to bag"
							})]
						})
					]
				})
			]
		})]
	});
}
function priceNum(p) {
	const n = Number(String(p).replace(/^\$/, ""));
	return Number.isFinite(n) ? n : 0;
}
function rankMenu(categories, query) {
	const needle = query.trim().toLowerCase();
	if (!needle) return [];
	const hits = [];
	for (const cat of categories) for (const item of cat.items) {
		const name = item.name.toLowerCase();
		const desc = (item.description ?? "").toLowerCase();
		const catName = cat.name.toLowerCase();
		let score = 0;
		if (name === needle) score = 100;
		else if (name.startsWith(needle)) score = 80;
		else if (name.split(/\s+/).some((w) => w.startsWith(needle))) score = 70;
		else if (name.includes(needle)) score = 60;
		else if (desc.includes(needle)) score = 40;
		else if (catName.includes(needle)) score = 20;
		if (score) hits.push({
			cat,
			item,
			score
		});
	}
	hits.sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));
	return hits.slice(0, 8);
}
var CatalogItem = (0, import_react.memo)(function CatalogItem({ cat, item, hit, onOpen }) {
	const first = item.prices[0];
	const pizza = cat.kind === "pizza";
	const itemKey = item.id ?? item.name;
	const photo = item.hideImage ? "" : itemPhoto(item, cat.id);
	const price = pizza ? `from ${formatUsd(priceNum(item.prices[0]?.price ?? "0"))}` : formatUsd(priceNum(first?.price ?? "0"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "food-card",
		"data-fav": item.highlight ? "true" : void 0,
		"data-hit": hit || void 0,
		"data-has-photo": photo ? "true" : void 0,
		"data-text-only": photo ? void 0 : "true",
		id: `item-${itemKey}`,
		onClick: onOpen,
		"aria-label": `${item.name}, ${price}`,
		children: [photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "food-card-photo",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photo,
				alt: "",
				decoding: "async",
				loading: "lazy"
			})
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "food-card-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "food-card-name",
					children: [item.name, item.highlight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "fav-tag",
						children: "House favorite"
					}) : null]
				}),
				item.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "food-card-desc",
					children: item.description
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "food-price",
					children: price
				})
			]
		})]
	});
});
function CartPop({ count, subtotal, vacationOn, onClose }) {
	const titleId = (0, import_react.useId)();
	const panelRef = (0, import_react.useRef)(null);
	const lines = useCartStore((s) => s.lines);
	const setQty = useCartStore((s) => s.setQty);
	const notes = useCartStore((s) => s.notes);
	const setNotes = useCartStore((s) => s.setNotes);
	useDialogLock(onClose, panelRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pizza-modal-root cart-pop-root",
		role: "presentation",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "pizza-modal-scrim",
			"aria-label": "Close cart",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: panelRef,
			id: "bag",
			className: "pizza-modal cart-pop",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			tabIndex: -1,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "pizza-modal-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: "Bag"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: titleId,
						children: "Your order"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-icon-btn",
						"aria-label": "Close cart",
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							size: 16,
							strokeWidth: 2.2
						})
					})]
				}),
				lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-empty",
					children: "Add pies, subs, and sides. Pickup or delivery at checkout."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "cart-lines",
					children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: l.name }),
						l.size ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cart-size",
							children: l.size
						}) : null,
						l.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cart-size",
							children: l.detail
						}) : null,
						l.comment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cook-note",
							children: l.comment
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "cart-line-price",
							children: formatUsd(l.unitPrice * l.qty)
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "qty-step",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Fewer ${l.name}`,
								onClick: () => setQty(l.key, l.qty - 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 14 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.qty }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `More ${l.name}`,
								onClick: () => setQty(l.key, l.qty + 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
							})
						]
					})] }, l.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field cart-notes",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Order notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "ed-input ed-area",
						rows: 3,
						maxLength: 500,
						placeholder: "Extra napkins, no onions, gate code…",
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						suppressHydrationWarning: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "cart-total",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						count,
						" item",
						count === 1 ? "" : "s"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUsd(subtotal) })]
				}),
				vacationOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-empty",
					children: "Ordering is paused until the shop reopens."
				}) : count === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-print cart-check",
					disabled: true,
					children: "Add items to check out"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/checkout",
					className: "btn-print cart-check",
					onClick: onClose,
					children: "Checkout"
				})
			]
		})]
	});
}
function Storefront({ restaurant, categories, settings }) {
	const [active, setActive] = (0, import_react.useState)(categories[0]?.id ?? "");
	const [custom, setCustom] = (0, import_react.useState)(null);
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [hitId, setHitId] = (0, import_react.useState)("");
	const railRef = (0, import_react.useRef)(null);
	const searchWrapRef = (0, import_react.useRef)(null);
	const searchSlotRef = (0, import_react.useRef)(null);
	const add = useCartStore((s) => s.add);
	const bagOpen = useCartStore((s) => s.bagOpen);
	const closeBag = useCartStore((s) => s.closeBag);
	const lines = useCartStore((s) => s.lines);
	const { count, subtotal } = cartTotals(lines);
	const visible = (0, import_react.useMemo)(() => categories.find((c) => c.id === active) ?? categories[0], [categories, active]);
	const suggestions = (0, import_react.useMemo)(() => rankMenu(categories, query), [categories, query]);
	const pickupAt = `${restaurant.address}, ${restaurant.city}`;
	function pickCategory(id) {
		setActive(id);
		window.setTimeout(() => {
			(railRef.current?.querySelector(`[data-cat="${id}"]`))?.scrollIntoView({
				behavior: "smooth",
				inline: "center",
				block: "nearest"
			});
			const wrap = document.querySelector(".cat-search-wrap");
			const panel = document.getElementById("menu");
			if (!wrap || !panel) return;
			if (wrap.getBoundingClientRect().top > 2) return;
			const y = window.scrollY + panel.getBoundingClientRect().top - wrap.getBoundingClientRect().height;
			window.scrollTo({ top: Math.max(0, y) });
		}, 10);
	}
	function openItem(cat, item) {
		if (cat.kind === "pizza") {
			setCustom({
				cat,
				item,
				size: item.prices[0]?.label || ""
			});
			return;
		}
		setConfirm({
			cat,
			item
		});
	}
	function skipCategories(dir) {
		const n = categories.length;
		if (!n) return;
		const next = (Math.max(0, categories.findIndex((c) => c.id === active)) + dir + n) % n;
		if (categories[next]) pickCategory(categories[next].id);
	}
	function jumpTo(hit) {
		setActive(hit.cat.id);
		setHitId(hit.item.id ?? hit.item.name);
		setSearchOpen(false);
		setQuery("");
		openItem(hit.cat, hit.item);
	}
	(0, import_react.useEffect)(() => {
		if (!bagOpen) return;
		const kick = window.setTimeout(() => {
			document.querySelectorAll(".cart-pop .cart-check").forEach((el) => {
				el.classList.remove("is-glow");
				window.requestAnimationFrame(() => el.classList.add("is-glow"));
			});
		}, 40);
		const clear = window.setTimeout(() => {
			document.querySelectorAll(".cart-pop .cart-check").forEach((el) => el.classList.remove("is-glow"));
		}, 1240);
		return () => {
			window.clearTimeout(kick);
			window.clearTimeout(clear);
		};
	}, [bagOpen]);
	(0, import_react.useEffect)(() => {
		if (!searchOpen) return;
		const onDown = (e) => {
			const wrap = searchWrapRef.current;
			if (wrap && !wrap.contains(e.target)) setSearchOpen(false);
		};
		document.addEventListener("pointerdown", onDown);
		return () => document.removeEventListener("pointerdown", onDown);
	}, [searchOpen]);
	(0, import_react.useEffect)(() => {
		if (!searchOpen) return;
		searchSlotRef.current?.scrollIntoView({
			inline: "start",
			block: "nearest"
		});
	}, [searchOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "store-layout",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "store-main",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "shop-hero",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shop-hero-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "sr-only",
									children: restaurant.name
								}),
								settings.tagline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "shop-hero-tag",
									children: settings.tagline
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "shop-hero-hours",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
											size: 14,
											strokeWidth: 2.2
										}),
										settings.hoursSummary || restaurant.hours,
										settings.openNow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "open-pip",
											children: "Open"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "closed-pip",
											children: "Closed"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									size: 14,
									strokeWidth: 2.2
								}), pickupAt] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
									size: 14,
									strokeWidth: 2.2
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: restaurant.phoneHref,
									children: restaurant.phone
								})] })
							]
						})
					}),
					settings.vacationOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "vac-banner",
						role: "status",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Closed for vacation" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: settings.vacationMessage }),
							settings.vacationUntil ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Back ", settings.vacationUntil] }) : null
						]
					}) : !settings.openNow ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "vac-banner",
						role: "status",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Kitchen is closed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["You can still browse. ", settings.hoursSummary] })]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cat-search-wrap",
						ref: searchWrapRef,
						"data-search-open": searchOpen ? "true" : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "cat-sorter",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "cat-skip",
									"aria-label": "Previous category",
									onClick: () => skipCategories(-1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
										size: 20,
										strokeWidth: 2.4
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
									className: "cat-rail",
									"aria-label": "Menu categories",
									ref: railRef,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "cat-search-slot",
										ref: searchSlotRef,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "cat-search",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
												size: 16,
												strokeWidth: 2.2,
												"aria-hidden": true
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: query,
												onChange: (e) => {
													setQuery(e.target.value);
													setSearchOpen(true);
												},
												onFocus: () => setSearchOpen(true),
												onKeyDown: (e) => {
													if (e.key === "Escape") {
														setSearchOpen(false);
														e.target.blur();
													}
													if (e.key === "Enter" && suggestions[0]) {
														e.preventDefault();
														jumpTo(suggestions[0]);
													}
												},
												placeholder: "Search",
												"aria-label": "Search the menu",
												autoComplete: "off",
												enterKeyHint: "search"
											})]
										})
									}), categories.map((cat) => {
										const Icon = iconFor(cat.icon ?? cat.id);
										const on = visible?.id === cat.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											"data-on": on,
											"data-cat": cat.id,
											"aria-current": on ? "true" : void 0,
											onClick: () => {
												setSearchOpen(false);
												pickCategory(cat.id);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												size: 16,
												strokeWidth: 2.2
											}), cat.name]
										}, cat.id);
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "cat-skip",
									"aria-label": "Next category",
									onClick: () => skipCategories(1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
										size: 20,
										strokeWidth: 2.4
									})
								})
							]
						}), searchOpen && query.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "cat-suggest",
							role: "listbox",
							"aria-label": "Menu suggestions",
							children: suggestions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "cat-suggest-empty",
								children: [
									"No matches for “",
									query.trim(),
									"”."
								]
							}) : suggestions.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onMouseDown: (e) => e.preventDefault(),
								onClick: () => jumpTo(hit),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: hit.item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: hit.cat.name })]
							}) }, `${hit.cat.id}-${hit.item.id ?? hit.item.name}`))
						}) : null]
					}),
					visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "cat-panel",
						id: "menu",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "cat-panel-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: visible.name }), visible.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: visible.note }) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "food-grid",
							"data-card-size": settings.cardTextSize,
							"data-card-fit": settings.cardSize,
							style: cardTypeStyle(settings.cardTextColor, settings.cardDescColor, settings.cardPriceColor, settings.cardBg),
							children: visible.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogItem, {
								cat: visible,
								item,
								hit: hitId === (item.id ?? item.name),
								onOpen: () => openItem(visible, item)
							}, item.id ?? item.name))
						})]
					}) : null
				]
			}),
			bagOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartPop, {
				count,
				subtotal,
				vacationOn: settings.vacationOn,
				onClose: closeBag
			}) : null,
			count > 0 && !settings.vacationOn && !bagOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mobile-bag",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/checkout",
					className: "btn-print cart-check",
					children: [
						"Checkout · ",
						count,
						" · ",
						formatUsd(subtotal)
					]
				})
			}) : null,
			custom ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PizzaCustomize, {
				item: custom.item,
				categoryId: custom.cat.id,
				settings,
				initialSize: custom.size,
				onClose: () => setCustom(null),
				onConfirm: (result) => {
					add({
						itemId: custom.item.id ?? custom.item.name,
						categoryId: custom.cat.id,
						name: result.name,
						size: result.size,
						detail: result.detail || void 0,
						comment: result.comment,
						toppings: result.toppings,
						condiments: result.condiments,
						unitPrice: result.unitPrice
					});
					setCustom(null);
				}
			}) : null,
			confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemConfirm, {
				item: confirm.item,
				categoryName: confirm.cat.name,
				onClose: () => setConfirm(null),
				onConfirm: (result) => {
					add({
						itemId: confirm.item.id ?? confirm.item.name,
						categoryId: confirm.cat.id,
						name: confirm.item.name,
						size: result.size,
						detail: result.detail,
						comment: result.comment,
						condiments: result.condiments,
						unitPrice: result.unitPrice
					});
					setConfirm(null);
				}
			}) : null
		]
	});
}
function Home() {
	const data = Route$25.useLoaderData();
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const toggleBag = useCartStore((s) => s.toggleBag);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setProfile(null);
			return;
		}
		retryTransient(() => getMe()).then(setProfile).catch(() => setProfile(null));
	}, [isPending, user]);
	(0, import_react.useEffect)(() => {
		try {
			sessionStorage.removeItem("southend-fetch-retry-n");
		} catch {}
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shop-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopHeader, {
			profile,
			onOpenCart: toggleBag
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "shop-main",
			id: "main",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Storefront, {
				restaurant: data.restaurant,
				categories: data.categories,
				settings: data.settings,
				profile
			})
		})]
	});
}
//#endregion
export { Home as component };

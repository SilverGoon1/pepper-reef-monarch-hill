import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as newPrinter, _ as cardTextContrastOk, c as DEFAULT_RECEIPT_OPTIONS, g as cardColorKind, h as cardColorHex, i as CARD_TEXT_SIZES, m as cardBgKind, n as CARD_SIZES, p as cardBgHex, r as CARD_TEXT_COLORS, t as CARD_BG_COLORS, v as cardTypeStyle } from "./hours-DVH-z3bz.mjs";
import { F as saveShopSettings, N as saveDeliveryZone, P as saveShopMenu, a as checkDeliveryAddress, h as getAdminShop } from "./shop-server-DpagHzjx.mjs";
import { C as Plus, D as Paintbrush, G as Copy, H as Eraser, I as ImagePlus, J as CircleHelp, S as Printer, X as CircleAlert, Y as CircleCheck, Z as ChevronUp, b as RotateCcw, et as ChevronDown, g as Search, k as Minus, l as Trash2, nt as Bluetooth, u as Star, x as RefreshCw } from "../_libs/lucide-react.mjs";
import { s as Route$9 } from "./router-CMr1IWu0.mjs";
import { t as fileToDataImage } from "./image-file-B097txSk.mjs";
import { r as useMenuStore, t as isCustomMenu } from "./menu-store-DZhsiMfF.mjs";
import { n as ICON_CHOICES, r as iconFor } from "./icons-DnfAfNKx.mjs";
import { n as MenuBoard } from "./menu-board-DMqRWQXX.mjs";
import { n as useSaveFlash, t as SaveToast } from "./save-toast-cmTAnDzF.mjs";
import { d as printOrderReceipts, h as subscribePairedPrinter, i as buildReceiptText, l as pingPrinter, n as bluetoothReady, p as sampleOrder, r as bluetoothSupported, s as pairBluetoothPrinter, t as bluetoothDiagnose } from "./bluetooth-printer-BQbVzKwh.mjs";
import { a as TaxPanel, n as HoursPanel, o as ToppingPricePanel, r as PaymentsPanel, s as VacationPanel, t as DeliveryPanel } from "./shop-ops-panels-BUWRTTm4.mjs";
import { c as paintAround, i as cellRect, n as MAP_CENTER, s as googleMapsSearchUrl } from "./geo-O0tEPxB1.mjs";
import { r as condimentMax } from "./condiments-D_hr3wCD.mjs";
import { t as itemPhoto } from "./item-photos-BahCBAvR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-GiKSiqWG.js
var menu_GiKSiqWG_exports = /* @__PURE__ */ __exportAll({ component: () => AdminMenu });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KINDS = [
	{
		id: "pizza",
		label: "Pizza SM/MD/LG"
	},
	{
		id: "split",
		label: "Split prices"
	},
	{
		id: "single",
		label: "Single price"
	}
];
function MenuEditor() {
	const restaurant = useMenuStore((s) => s.restaurant);
	const footer = useMenuStore((s) => s.footer);
	const categories = useMenuStore((s) => s.categories);
	const setRestaurant = useMenuStore((s) => s.setRestaurant);
	const setFooter = useMenuStore((s) => s.setFooter);
	const addCategory = useMenuStore((s) => s.addCategory);
	const reset = useMenuStore((s) => s.reset);
	const [query, setQuery] = (0, import_react.useState)("");
	const [shopOpen, setShopOpen] = (0, import_react.useState)(false);
	const [openCats, setOpenCats] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const custom = isCustomMenu({
		restaurant,
		footer,
		categories
	});
	const q = query.trim().toLowerCase();
	const visible = (0, import_react.useMemo)(() => {
		if (!q) return categories;
		return categories.map((cat) => ({
			...cat,
			items: cat.items.filter((it) => {
				return `${it.name} ${it.description ?? ""} ${cat.name}`.toLowerCase().includes(q);
			})
		})).filter((cat) => cat.items.length > 0 || cat.name.toLowerCase().includes(q));
	}, [categories, q]);
	(0, import_react.useEffect)(() => {
		if (!q) return;
		setOpenCats(new Set(visible.map((c) => c.id)));
	}, [q, visible]);
	function toggleCat(id) {
		setShopOpen(false);
		setOpenCats((prev) => {
			if (prev.has(id) && prev.size === 1) return /* @__PURE__ */ new Set();
			return /* @__PURE__ */ new Set([id]);
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "editor-panel no-print",
		"aria-label": "Menu editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ed-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "ed-title",
					children: "Edit menu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Changes update the wall board and save on this device. Print uses the edited prices."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "ed-btn ed-btn-quiet",
					disabled: !custom,
					onClick: () => {
						if (window.confirm("Restore the original South End Pizza III menu and shop details?")) {
							reset();
							setOpenCats(/* @__PURE__ */ new Set());
							setShopOpen(false);
						}
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
						size: 14,
						strokeWidth: 2.2
					}), "Restore original"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-search",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					size: 16,
					strokeWidth: 2.2,
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search items…",
					"aria-label": "Search menu items"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ed-block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "ed-block-toggle",
					"aria-expanded": shopOpen,
					onClick: () => {
						setShopOpen((v) => !v);
						setOpenCats(/* @__PURE__ */ new Set());
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shop details" }), shopOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 16 })]
				}), shopOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ed-shop",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Address",
							value: restaurant.address,
							onChange: (v) => setRestaurant({ address: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "City",
							value: restaurant.city,
							onChange: (v) => setRestaurant({ city: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							value: restaurant.phone,
							onChange: (v) => setRestaurant({ phone: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Hours",
							value: restaurant.hours,
							onChange: (v) => setRestaurant({ hours: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Established",
							value: restaurant.established,
							onChange: (v) => setRestaurant({ established: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopWebFields, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Footer note" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "ed-input ed-area",
								rows: 2,
								value: footer,
								onChange: (e) => setFooter(e.target.value)
							})]
						})
					]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ed-cat-list",
				children: [visible.map((cat, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, {
					cat,
					open: openCats.has(cat.id),
					onToggle: () => toggleCat(cat.id),
					isFirst: index === 0 && !q,
					isLast: index === visible.length - 1 && !q,
					allCats: categories,
					querying: Boolean(q)
				}, cat.id)), visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-empty",
					children: "No items match that search."
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "ed-btn ed-btn-add",
				onClick: addCategory,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					size: 16,
					strokeWidth: 2.2
				}), "Add section"]
			})
		]
	});
}
function ShopWebFields() {
	const tagline = useMenuStore((s) => s.tagline);
	const showMark = useMenuStore((s) => s.showMark);
	const setShopWeb = useMenuStore((s) => s.setShopWeb);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label: "Tagline",
		value: tagline,
		onChange: (v) => setShopWeb({ tagline: v })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "pay-opt",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked: showMark,
			onChange: (e) => setShopWeb({ showMark: e.target.checked })
		}), "Show the buffalo mark on login and the wall menu"]
	})] });
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "ed-field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "ed-input",
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function CategoryCard({ cat, open, onToggle, isFirst, isLast, allCats, querying }) {
	const patchCategory = useMenuStore((s) => s.patchCategory);
	const setKind = useMenuStore((s) => s.setKind);
	const addItem = useMenuStore((s) => s.addItem);
	const deleteCategory = useMenuStore((s) => s.deleteCategory);
	const moveCategory = useMenuStore((s) => s.moveCategory);
	const [confirmDel, setConfirmDel] = (0, import_react.useState)(false);
	const Icon = iconFor(cat.icon ?? cat.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "ed-cat",
		"data-open": open ? "true" : "false",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ed-cat-bar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "ed-cat-toggle",
				"aria-expanded": open,
				onClick: onToggle,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ed-cat-ico",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { strokeWidth: 2.2 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ed-cat-name",
						children: cat.name || "Untitled section"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ed-cat-count",
						children: cat.items.length
					}),
					open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 16 })
				]
			}), !querying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ed-icon-btns",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
					label: "Move section up",
					disabled: isFirst,
					onClick: () => moveCategory(cat.id, -1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: 15 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
					label: "Move section down",
					disabled: isLast,
					onClick: () => moveCategory(cat.id, 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 15 })
				})]
			}) : null]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ed-cat-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Section name",
					value: cat.name,
					onChange: (v) => patchCategory(cat.id, { name: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Note",
					value: cat.note ?? "",
					onChange: (v) => patchCategory(cat.id, { note: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "ed-input",
						value: cat.icon ?? cat.id,
						onChange: (e) => patchCategory(cat.id, { icon: e.target.value }),
						children: ICON_CHOICES.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: opt.id,
							children: opt.label
						}, opt.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Price layout" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "seg ed-kind",
						role: "group",
						"aria-label": "Price layout",
						children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": cat.kind === k.id,
							onClick: () => setKind(cat.id, k.id),
							children: k.label
						}, k.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ed-items",
					children: [cat.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemCard, {
						cat,
						item,
						isFirst: i === 0,
						isLast: i === cat.items.length - 1,
						allCats
					}, item.id)), cat.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-empty",
						children: "No items in this section yet."
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ed-cat-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "ed-btn",
						onClick: () => addItem(cat.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							size: 15,
							strokeWidth: 2.2
						}), "Add item"]
					}), confirmDel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-btn ed-btn-danger",
						onClick: () => deleteCategory(cat.id),
						children: "Confirm delete section"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "ed-btn ed-btn-quiet",
						onClick: () => setConfirmDel(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 15 }), "Delete section"]
					})]
				})
			]
		}) : null]
	});
}
function ItemCard({ cat, item, isFirst, isLast, allCats }) {
	const patchItem = useMenuStore((s) => s.patchItem);
	const setPrices = useMenuStore((s) => s.setPrices);
	const deleteItem = useMenuStore((s) => s.deleteItem);
	const duplicateItem = useMenuStore((s) => s.duplicateItem);
	const moveItem = useMenuStore((s) => s.moveItem);
	const moveItemTo = useMenuStore((s) => s.moveItemTo);
	const [confirmDel, setConfirmDel] = (0, import_react.useState)(false);
	const [photoBusy, setPhotoBusy] = (0, import_react.useState)(false);
	const [photoErr, setPhotoErr] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "ed-item",
		"data-fav": item.highlight ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "ed-input",
					value: item.name,
					onChange: (e) => patchItem(cat.id, item.id, { name: e.target.value })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "ed-input",
					value: item.description ?? "",
					onChange: (e) => patchItem(cat.id, item.id, { description: e.target.value })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ed-field",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Photo" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "toggle-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "toggle",
							type: "checkbox",
							role: "switch",
							checked: !item.hideImage,
							"aria-checked": !item.hideImage,
							onChange: (e) => patchItem(cat.id, item.id, { hideImage: !e.target.checked })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Show photo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Off shrinks the card to name, description, and price." })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "ed-item-photo",
						src: itemPhoto(item, cat.id),
						alt: "",
						"data-off": item.hideImage ? "true" : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-btn ed-btn-quiet ed-photo-pick",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {
								size: 14,
								strokeWidth: 2.2
							}),
							item.image ? "Replace photo" : "Upload photo",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/png,image/jpeg,image/webp",
								disabled: photoBusy,
								onChange: (e) => {
									const file = e.target.files?.[0];
									e.target.value = "";
									if (!file) return;
									setPhotoBusy(true);
									setPhotoErr("");
									fileToDataImage(file, {
										maxEdge: 1600,
										maxChars: 35e4,
										quality: .92
									}).then((url) => {
										patchItem(cat.id, item.id, { image: url });
									}).catch((err) => {
										setPhotoErr(err instanceof Error ? err.message : "Could not read that photo");
									}).finally(() => setPhotoBusy(false));
								}
							})
						]
					}),
					item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-btn ed-btn-quiet",
						onClick: () => patchItem(cat.id, item.id, { image: "" }),
						children: "Remove photo"
					}) : null,
					photoBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-empty",
						children: "Compressing photo…"
					}) : null,
					photoErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "form-error",
						children: photoErr
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceFields, {
				kind: cat.kind,
				prices: item.prices,
				onChange: (prices) => setPrices(cat.id, item.id, prices)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CondimentFields, {
				condiments: item.condiments ?? [],
				onChange: (condiments) => patchItem(cat.id, item.id, { condiments })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ed-item-tools",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "ed-star",
					"data-on": item.highlight ? "true" : void 0,
					"aria-pressed": Boolean(item.highlight),
					onClick: () => patchItem(cat.id, item.id, { highlight: !item.highlight }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
						size: 14,
						strokeWidth: 2.2,
						fill: item.highlight ? "currentColor" : "none"
					}), "House favorite"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ed-icon-btns",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
							label: "Move up",
							disabled: isFirst,
							onClick: () => moveItem(cat.id, item.id, -1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: 15 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
							label: "Move down",
							disabled: isLast,
							onClick: () => moveItem(cat.id, item.id, 1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 15 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
							label: "Duplicate",
							onClick: () => duplicateItem(cat.id, item.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 })
						}),
						confirmDel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ed-icon-btn ed-btn-danger",
							onClick: () => deleteItem(cat.id, item.id),
							children: "Delete"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
							label: "Delete item",
							onClick: () => setConfirmDel(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
						})
					]
				})]
			}),
			allCats.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field ed-move",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Move to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "ed-input",
					value: cat.id,
					onChange: (e) => {
						if (e.target.value !== cat.id) moveItemTo(cat.id, item.id, e.target.value);
					},
					children: allCats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name || "Untitled section"
					}, c.id))
				})]
			}) : null
		]
	});
}
function CondimentFields({ condiments, onChange }) {
	const rows = condiments;
	function patch(i, patch) {
		onChange(rows.map((r, idx) => idx === i ? {
			...r,
			...patch
		} : r));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ed-field",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Condiments & extras" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-empty",
				children: "Guests can add these in the confirm popup. Qty is the most they can add. Extra is the price after the first."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ed-condiments",
				children: rows.map((c, i) => {
					const cap = condimentMax(c.maxQty);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ed-condiment-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input",
									value: c.name,
									onChange: (e) => patch(i, { name: e.target.value })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Qty" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "qty-step",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `Fewer ${c.name || "condiment"}`,
											disabled: cap <= 1,
											onClick: () => patch(i, { maxQty: String(Math.max(1, cap - 1)) }),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 14 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "ed-input ed-qty",
											inputMode: "numeric",
											"aria-label": `${c.name || "Condiment"} quantity cap`,
											value: c.maxQty ?? String(cap),
											onChange: (e) => {
												const n = Math.max(1, Math.min(9, Math.round(Number(e.target.value.replace(/[^\d]/g, "")) || 1)));
												patch(i, { maxQty: String(n) });
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `More ${c.name || "condiment"}`,
											disabled: cap >= 9,
											onClick: () => patch(i, { maxQty: String(Math.min(9, cap + 1)) }),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add $" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input ed-price",
									inputMode: "decimal",
									value: c.price,
									onChange: (e) => patch(i, { price: e.target.value })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Extra $" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input ed-price",
									inputMode: "decimal",
									value: c.extraPrice,
									onChange: (e) => patch(i, { extraPrice: e.target.value })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								label: "Remove condiment",
								onClick: () => onChange(rows.filter((_, idx) => idx !== i)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
							})
						]
					}, c.id || i);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "ed-btn ed-btn-quiet",
				onClick: () => onChange([...rows, {
					id: `cond-${Math.random().toString(36).slice(2, 8)}`,
					name: "",
					price: "0.75",
					extraPrice: "0.75",
					maxQty: "9"
				}]),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					size: 14,
					strokeWidth: 2.2
				}), "Add condiment"]
			})
		]
	});
}
function PriceFields({ kind, prices, onChange }) {
	if (kind === "pizza") {
		const rows = prices.length ? prices : [{
			label: "SM",
			inches: "12\"",
			price: ""
		}];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ed-prices",
			"data-kind": "pizza",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Type a price to offer that size. Leave it blank to hide it. Add XL or any custom size here — no extra toggle."
				}),
				rows.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ed-price-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: p.label ?? "",
								onChange: (e) => {
									onChange(rows.map((r, idx) => idx === i ? {
										...r,
										label: e.target.value
									} : r));
								},
								placeholder: "SM"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inches" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: p.inches ?? "",
								onChange: (e) => {
									onChange(rows.map((r, idx) => idx === i ? {
										...r,
										inches: e.target.value
									} : r));
								},
								placeholder: "12\""
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Price" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input ed-price",
								inputMode: "decimal",
								value: p.price,
								onChange: (e) => {
									onChange(rows.map((r, idx) => idx === i ? {
										...r,
										price: e.target.value
									} : r));
								},
								placeholder: "0.00"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
							label: "Remove size",
							disabled: rows.length <= 1,
							onClick: () => onChange(rows.filter((_, idx) => idx !== i)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
						})
					]
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "ed-btn ed-btn-quiet",
					onClick: () => {
						const hasXl = rows.some((r) => (r.label ?? "").toUpperCase() === "XL");
						onChange([...rows, hasXl ? {
							label: "",
							inches: "",
							price: ""
						} : {
							label: "XL",
							inches: "18\"",
							price: ""
						}]);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), "Add size"]
				})
			]
		});
	}
	const rows = prices.length ? prices : [{ price: "" }];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ed-prices",
		"data-kind": kind,
		children: [rows.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ed-price-row",
			children: [
				kind === "split" || p.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Label" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						value: p.label ?? "",
						onChange: (e) => {
							onChange(rows.map((r, idx) => idx === i ? {
								...r,
								label: e.target.value
							} : r));
						}
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Price" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input ed-price",
						inputMode: "decimal",
						value: p.price,
						onChange: (e) => {
							onChange(rows.map((r, idx) => idx === i ? {
								...r,
								price: e.target.value
							} : r));
						}
					})]
				}),
				kind === "split" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
					label: "Remove price",
					disabled: rows.length <= 1,
					onClick: () => onChange(rows.filter((_, idx) => idx !== i)),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
				}) : null
			]
		}, i)), kind === "split" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "ed-btn ed-btn-quiet",
			onClick: () => onChange([...rows, {
				label: "",
				price: ""
			}]),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), "Add size"]
		}) : null]
	});
}
function IconBtn({ label, onClick, disabled, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "ed-icon-btn",
		"aria-label": label,
		title: label,
		disabled,
		onClick,
		children
	});
}
function ColorRow({ label, value, onChange, swatches, toHex, kindOf, contrastOk = true }) {
	const kind = kindOf(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ed-field",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ed-color-row",
				children: [swatches.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "ed-color-swatch",
					"data-swatch": opt.id,
					"data-on": kind === opt.id,
					"aria-pressed": kind === opt.id,
					"aria-label": `${opt.label} for ${label.toLowerCase()}`,
					onClick: () => onChange(opt.id)
				}, opt.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-color-custom",
					"data-on": kind === "custom" || void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Custom" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "color",
						value: toHex(value),
						"aria-label": `Custom ${label.toLowerCase()} color`,
						onChange: (e) => onChange(e.target.value)
					})]
				})]
			}),
			!contrastOk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-empty",
				children: "Hard to read on this card paper — pick a darker ink or a lighter background."
			}) : null
		]
	});
}
function SizeRow({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ed-field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "seg ed-kind",
			role: "group",
			"aria-label": label,
			children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"data-on": value === opt.id,
				onClick: () => onChange(opt.id),
				children: opt.label
			}, opt.id))
		})]
	});
}
var PREVIEWS = [{
	name: "Cheese Pizza",
	desc: "Sauce, mozzarella",
	price: "from $14.00"
}, {
	name: "Spinach, Broccoli & Extra Cheese Pizza",
	desc: "House favorite with roasted garlic and a long line of toppings",
	price: "from $18.75"
}];
function CardEditor() {
	const cardSize = useMenuStore((s) => s.cardSize);
	const cardTextSize = useMenuStore((s) => s.cardTextSize);
	const cardTextColor = useMenuStore((s) => s.cardTextColor);
	const cardDescColor = useMenuStore((s) => s.cardDescColor);
	const cardPriceColor = useMenuStore((s) => s.cardPriceColor);
	const cardBg = useMenuStore((s) => s.cardBg);
	const setCardType = useMenuStore((s) => s.setCardType);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-editor-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Card Editor" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Size the menu tiles, paint the paper, and set name, description, and price inks. Preview updates as you tap."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ed-card-type",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeRow, {
							label: "Card size",
							value: cardSize,
							options: CARD_SIZES,
							onChange: (id) => setCardType({ cardSize: id })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeRow, {
							label: "Text size",
							value: cardTextSize,
							options: CARD_TEXT_SIZES,
							onChange: (id) => setCardType({ cardTextSize: id })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorRow, {
							label: "Background",
							value: cardBg,
							onChange: (v) => setCardType({ cardBg: v }),
							swatches: CARD_BG_COLORS,
							toHex: cardBgHex,
							kindOf: cardBgKind
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorRow, {
							label: "Name",
							value: cardTextColor,
							onChange: (v) => setCardType({ cardTextColor: v }),
							swatches: CARD_TEXT_COLORS,
							toHex: cardColorHex,
							kindOf: cardColorKind,
							contrastOk: cardTextContrastOk(cardTextColor, cardBg)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorRow, {
							label: "Description",
							value: cardDescColor,
							onChange: (v) => setCardType({ cardDescColor: v }),
							swatches: CARD_TEXT_COLORS,
							toHex: cardColorHex,
							kindOf: cardColorKind,
							contrastOk: cardTextContrastOk(cardDescColor, cardBg)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorRow, {
							label: "Price",
							value: cardPriceColor,
							onChange: (v) => setCardType({ cardPriceColor: v }),
							swatches: CARD_TEXT_COLORS,
							toHex: cardColorHex,
							kindOf: cardColorKind,
							contrastOk: cardTextContrastOk(cardPriceColor, cardBg)
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-card",
			"aria-label": "Card preview",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Preview" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Long names wrap and clip. Type never stacks over the photo or the price."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "food-grid ed-card-preview-grid",
					"data-card-size": cardTextSize,
					"data-card-fit": cardSize,
					style: cardTypeStyle(cardTextColor, cardDescColor, cardPriceColor, cardBg),
					children: PREVIEWS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "food-card",
						"aria-hidden": true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "food-card-photo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "food-card-photo-empty",
								children: "Aa"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "food-card-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "food-card-name",
									children: item.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "food-card-desc",
									children: item.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "food-price",
									children: item.price
								})
							]
						})]
					}, item.name))
				})
			]
		})]
	});
}
var STEPS = [
	{
		title: "Use Chrome or Edge on the shop tablet",
		body: "Bluetooth printing needs Chrome or Edge on Android or Windows. Safari, Firefox, and iPhone cannot talk to a thermal printer from the browser."
	},
	{
		title: "Turn Bluetooth on",
		body: "Open tablet settings, turn Bluetooth on, and keep the printer awake. Many 58 mm printers sleep after a minute — tap the feed button before pairing."
	},
	{
		title: "Allow the chooser and pop-ups",
		body: "Pairing must happen from a tap. If a second window opens, leave it on top and pick the printer there. Allow pop-ups for this shop if the window is blocked."
	},
	{
		title: "Pick the printer, then save",
		body: "Choose the thermal printer in the list (often named MTP, RPP, XP-, Inner, or similar). After it pairs, tap Save printer setup so the shop remembers it."
	},
	{
		title: "Test print, then accept an order",
		body: "Tap Test print. If a paper preview opens instead, the tablet is not talking to the printer yet — re-pair while it is awake. Auto-print on accept uses the same path."
	}
];
function hintFor(msg, diag) {
	const d = diag;
	if (d?.ios || d?.safari) return "This tablet’s browser cannot pair a Bluetooth printer. Open the shop in Chrome or Edge on Android or Windows.";
	if (d?.ready === "adapter-off") return "Turn Bluetooth on in this tablet’s settings, then tap Diagnose.";
	if (d?.ready === "unavailable") return "This browser has no Bluetooth printer API. Open the shop in Chrome or Edge.";
	if (d?.ready === "blocked") return "Pairing opens a top window so the tablet chooser can appear. Keep that window in front.";
	if (/cancel/i.test(msg)) return "The chooser was closed. Tap Pair again and pick the thermal printer.";
	if (/not paired/i.test(msg)) return "This tablet forgot the printer. Tap Pair Bluetooth on that printer card.";
	if (/characteristic/i.test(msg)) return "Connected, but the printer did not expose a print channel. Re-pair while it is awake and in range.";
	if (/pop-?up/i.test(msg)) return "Allow pop-ups for this shop, then tap Test print or Pair again.";
	if (/timed out/i.test(msg)) return "The printer slept or walked away. Wake it, stay close, then try again.";
	if (/not available/i.test(msg)) return "Use Chrome or Edge on the shop tablet — not the phone preview.";
	return "";
}
function PrinterSetup({ printers, setPrinters, receipt, setReceipt, restaurant, taxRate, onSave, saving }) {
	const [busyId, setBusyId] = (0, import_react.useState)("");
	const [pairMsg, setPairMsg] = (0, import_react.useState)("");
	const [btState, setBtState] = (0, import_react.useState)("");
	const [diag, setDiag] = (0, import_react.useState)(null);
	const [helpOpen, setHelpOpen] = (0, import_react.useState)(false);
	const printersRef = (0, import_react.useRef)(printers);
	printersRef.current = printers;
	const pendingRef = (0, import_react.useRef)(void 0);
	const sample = (0, import_react.useMemo)(() => sampleOrder(), []);
	const customerPreview = buildReceiptText({
		order: sample,
		restaurant,
		receipt,
		kind: "customer",
		taxRate,
		paper: "58mm"
	});
	const storePreview = buildReceiptText({
		order: sample,
		restaurant,
		receipt,
		kind: "store",
		taxRate,
		paper: "58mm"
	});
	const bt = bluetoothSupported();
	const hint = hintFor(pairMsg, diag);
	function runDiagnose() {
		bluetoothDiagnose().then((d) => {
			setDiag(d);
			setBtState(d.ready);
			if (d.ios || d.safari) setPairMsg("This browser cannot pair a Bluetooth printer. Use Chrome or Edge on the shop tablet.");
			else if (d.ready === "adapter-off") setPairMsg("Bluetooth is off on this tablet.");
			else if (d.ready === "unavailable") setPairMsg("Bluetooth printing is not available in this browser.");
			else if (d.ready === "blocked") setPairMsg("Pairing will open a top window so the tablet chooser can appear.");
			else setPairMsg(d.knownDevices ? `Bluetooth is ready. This tablet already knows ${d.knownDevices} printer${d.knownDevices === 1 ? "" : "s"}.` : "Bluetooth is ready. Tap Pair and pick the thermal printer.");
		}).catch((e) => setPairMsg(e instanceof Error ? e.message : "Could not diagnose Bluetooth."));
	}
	(0, import_react.useEffect)(() => {
		bluetoothReady().then(setBtState);
		bluetoothDiagnose().then(setDiag);
	}, []);
	function applyPaired(paired, existing) {
		const list = printersRef.current;
		let next = list;
		if (existing) next = list.map((p) => p.id === existing.id ? {
			...p,
			bluetoothId: paired.bluetoothId,
			bluetoothName: paired.bluetoothName,
			name: p.name === "Receipt printer" ? paired.bluetoothName : p.name
		} : p);
		else if (list.some((p) => p.bluetoothId === paired.bluetoothId)) next = list.map((p) => p.bluetoothId === paired.bluetoothId ? {
			...p,
			bluetoothName: paired.bluetoothName
		} : p);
		else next = [...list, newPrinter({
			name: paired.bluetoothName,
			bluetoothId: paired.bluetoothId,
			bluetoothName: paired.bluetoothName
		})];
		printersRef.current = next;
		setPrinters(next);
		setPairMsg(`Paired ${paired.bluetoothName}. Save to keep it on this shop.`);
	}
	(0, import_react.useEffect)(() => {
		return subscribePairedPrinter((paired) => {
			applyPaired(paired, pendingRef.current);
			setBusyId("");
		});
	}, [setPrinters]);
	function patch(id, next) {
		setPrinters(printers.map((p) => p.id === id ? {
			...p,
			...next
		} : p));
	}
	async function pair(existing) {
		setPairMsg("");
		setBusyId(existing?.id || "new");
		pendingRef.current = existing;
		try {
			applyPaired(await pairBluetoothPrinter(), existing);
		} catch (e) {
			setPairMsg(e instanceof Error ? e.message : "Could not pair the printer.");
			setHelpOpen(true);
		} finally {
			setBusyId("");
			pendingRef.current = void 0;
		}
	}
	async function testPrint(printer) {
		setBusyId(printer.id);
		setPairMsg("");
		try {
			const result = await printOrderReceipts({
				order: sample,
				restaurant,
				receipt,
				printers: [printer],
				taxRate,
				fallback: true
			});
			setPairMsg(result.fallback ? `Opened a paper preview for ${printer.name}. Pair Bluetooth on the tablet to send it to the thermal printer.` : `Sent a test ticket to ${printer.name}.`);
			if (result.fallback) setHelpOpen(true);
		} catch (e) {
			setPairMsg(e instanceof Error ? e.message : "Test print failed.");
			setHelpOpen(true);
		} finally {
			setBusyId("");
		}
	}
	async function checkConnection(printer) {
		if (!printer.bluetoothId) {
			setPairMsg("This printer is not paired on this tablet yet. Tap Pair Bluetooth.");
			setHelpOpen(true);
			return;
		}
		setBusyId(printer.id);
		setPairMsg("");
		try {
			const r = await pingPrinter(printer.bluetoothId);
			setPairMsg(`Connected to ${r.name}. Try a test print next.`);
		} catch (e) {
			setPairMsg(e instanceof Error ? e.message : "Could not reach the printer.");
			setHelpOpen(true);
		} finally {
			setBusyId("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "printer-setup",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Printer setup" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Pair one or more Bluetooth thermal printers. When the tablet accepts an order, each enabled printer prints the customer and store copies you check, as many times as the dropdown says. Slips are itemized with NJ sales tax shown separately."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: btState === "adapter-off" ? "Turn Bluetooth on on this tablet, then tap Pair." : btState === "unavailable" ? "Chrome or Edge on the shop tablet is required to reach the printer." : btState === "blocked" ? "Bluetooth is allowed on this shop. Pairing opens in its own window so the tablet chooser can appear." : "Bluetooth is allowed on this shop. Tap Pair, pick the thermal printer, then save. Chrome or Edge on the shop tablet is required."
					}),
					diag ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "bt-diag",
						"aria-label": "Bluetooth status",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								"data-ok": diag.chrome && !diag.ios && !diag.safari,
								children: [diag.chrome && !diag.ios && !diag.safari ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 14 }), diag.ios || diag.safari ? "Need Chrome or Edge" : "Chrome or Edge"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								"data-ok": diag.ready === "ready" || diag.ready === "blocked",
								children: [diag.ready === "adapter-off" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), diag.ready === "adapter-off" ? "Bluetooth off" : diag.ready === "unavailable" ? "No Bluetooth API" : "Bluetooth on"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								"data-ok": diag.canPairHere,
								children: [diag.canPairHere ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { size: 14 }), diag.canPairHere ? "Can pair here" : "Pairs in a top window"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								"data-ok": diag.knownDevices > 0,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { size: 14 }),
									diag.knownDevices,
									" remembered"
								]
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "printer-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "ed-btn",
							onClick: runDiagnose,
							disabled: Boolean(busyId),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								size: 16,
								strokeWidth: 2.2
							}), "Diagnose"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "ed-btn",
							onClick: () => setHelpOpen((v) => !v),
							"aria-expanded": helpOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, {
								size: 16,
								strokeWidth: 2.2
							}), helpOpen ? "Hide troubleshooting" : "Troubleshooting"]
						})]
					}),
					helpOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "printer-help",
						children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: step.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step.body })] }, step.title))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NJ sales tax ID (printed on receipts)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "ed-input",
							value: receipt.taxId,
							onChange: (e) => setReceipt({
								...receipt,
								taxId: e.target.value
							}),
							placeholder: "Certificate of Authority number"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Customer-copy footer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "ed-input ed-area",
							rows: 2,
							value: receipt.footer,
							onChange: (e) => setReceipt({
								...receipt,
								footer: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "pay-opt",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: receipt.autoPrintOnAccept,
							onChange: (e) => setReceipt({
								...receipt,
								autoPrintOnAccept: e.target.checked
							})
						}), "Print automatically when an order is accepted"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "printer-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn-print",
							onClick: () => void pair(),
							disabled: Boolean(busyId),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bluetooth, {
								size: 16,
								strokeWidth: 2.2
							}), busyId === "new" ? "Waiting for printer…" : "Pair Bluetooth printer"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "ed-btn",
							onClick: () => setPrinters([...printers, newPrinter({ name: `Printer ${printers.length + 1}` })]),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								size: 16,
								strokeWidth: 2.2
							}), "Add printer"]
						})]
					}),
					pairMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: pairMsg
					}) : null,
					hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub printer-hint",
						children: hint
					}) : null,
					!bt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "If the chooser does not appear, pairing opens in its own window."
					}) : null
				]
			}),
			printers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "page-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-empty",
					children: "No printers yet. Pair a Bluetooth printer or add one by name."
				})
			}) : printers.map((printer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card printer-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "printer-card-head",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
								size: 18,
								strokeWidth: 2.2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Printer name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input",
									value: printer.name,
									onChange: (e) => patch(printer.id, { name: e.target.value })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ed-btn ed-btn-danger",
								onClick: () => setPrinters(printers.filter((p) => p.id !== printer.id)),
								"aria-label": `Remove ${printer.name}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: printer.bluetoothId ? `Paired: ${printer.bluetoothName || printer.bluetoothId}` : "Not paired on this tablet yet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "pay-opt",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: printer.enabled,
							onChange: (e) => patch(printer.id, { enabled: e.target.checked })
						}), "Enabled"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "printer-copies",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "pay-opt",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: printer.customerCopy,
									onChange: (e) => patch(printer.id, { customerCopy: e.target.checked })
								}), "Customer copy"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "pay-opt",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: printer.storeCopy,
									onChange: (e) => patch(printer.id, { storeCopy: e.target.checked })
								}), "Store copy"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copies of each" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "ed-input",
									value: printer.copies,
									onChange: (e) => patch(printer.id, { copies: Number(e.target.value) }),
									children: [
										1,
										2,
										3,
										4,
										5
									].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: n,
										children: n
									}, n))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Paper" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "ed-input",
									value: printer.paper,
									onChange: (e) => patch(printer.id, { paper: e.target.value }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "58mm",
										children: "58 mm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "80mm",
										children: "80 mm"
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "printer-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "ed-btn",
								disabled: Boolean(busyId),
								onClick: () => void pair(printer),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bluetooth, {
									size: 16,
									strokeWidth: 2.2
								}), printer.bluetoothId ? "Re-pair" : "Pair Bluetooth"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ed-btn",
								disabled: Boolean(busyId),
								onClick: () => void checkConnection(printer),
								children: "Check connection"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ed-btn",
								disabled: Boolean(busyId) || busyId === printer.id,
								onClick: () => void testPrint(printer),
								children: "Test print"
							})
						]
					})
				]
			}, printer.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "receipt-previews",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "slip",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "slip-kind",
						children: "Customer copy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: customerPreview })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "slip",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "slip-kind",
						children: "Store copy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: storePreview })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn-print",
				disabled: saving,
				onClick: onSave,
				children: saving ? "Saving…" : "Save printer setup"
			})
		]
	});
}
function ZoneMap({ cells, onChange }) {
	const host = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const layerRef = (0, import_react.useRef)(null);
	const cellsRef = (0, import_react.useRef)(new Set(cells));
	const modeRef = (0, import_react.useRef)("paint");
	const drawing = (0, import_react.useRef)(false);
	const [mode, setMode] = (0, import_react.useState)("paint");
	const [brush, setBrush] = (0, import_react.useState)(1);
	const [query, setQuery] = (0, import_react.useState)("");
	const [lookup, setLookup] = (0, import_react.useState)("");
	const brushRef = (0, import_react.useRef)(1);
	(0, import_react.useEffect)(() => {
		cellsRef.current = new Set(cells);
		const layer = layerRef.current;
		if (layer && mapRef.current) import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then((mod) => drawCells(mod, layer, cellsRef.current, tomatoColor()));
	}, [cells]);
	(0, import_react.useEffect)(() => {
		modeRef.current = mode;
	}, [mode]);
	(0, import_react.useEffect)(() => {
		brushRef.current = brush;
	}, [brush]);
	(0, import_react.useEffect)(() => {
		if (!host.current || mapRef.current) return;
		let dead = false;
		import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then((L) => {
			if (dead || !host.current) return;
			const map = L.map(host.current, { zoomControl: true }).setView(MAP_CENTER, 12);
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution: "&copy; OpenStreetMap",
				maxZoom: 18
			}).addTo(map);
			const layer = L.layerGroup().addTo(map);
			mapRef.current = map;
			layerRef.current = layer;
			drawCells(L, layer, cellsRef.current, tomatoColor());
			const apply = (lat, lng) => {
				const keys = paintAround(lat, lng, brushRef.current);
				const set = cellsRef.current;
				let changed = false;
				for (const k of keys) if (modeRef.current === "paint") {
					if (!set.has(k)) {
						set.add(k);
						changed = true;
					}
				} else if (set.delete(k)) changed = true;
				if (changed) {
					drawCells(L, layer, set, tomatoColor());
					onChange([...set]);
				}
			};
			map.on("mousedown", (e) => {
				drawing.current = true;
				map.dragging.disable();
				apply(e.latlng.lat, e.latlng.lng);
			});
			map.on("click", (e) => {
				apply(e.latlng.lat, e.latlng.lng);
			});
			map.on("mousemove", (e) => {
				if (!drawing.current) return;
				apply(e.latlng.lat, e.latlng.lng);
			});
			const stop = () => {
				drawing.current = false;
				map.dragging.enable();
			};
			map.on("mouseup", stop);
			map.on("mouseout", stop);
		});
		return () => {
			dead = true;
			mapRef.current?.remove();
			mapRef.current = null;
		};
	}, []);
	async function lookupAddress() {
		setLookup("Looking up…");
		try {
			const r = await checkDeliveryAddress({ data: { query } });
			if (!r.found) {
				setLookup("No match. Try a street name in Egg Harbor Township.");
				return;
			}
			setLookup(r.deliverable ? `Inside the painted zone — ${r.label}` : `Outside the painted zone — ${r.label}`);
			if (r.lat != null && r.lng != null) mapRef.current?.setView([r.lat, r.lng], 16);
		} catch (e) {
			setLookup(e instanceof Error ? e.message : "Lookup failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "zone-wrap",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "zone-tools",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "seg",
						role: "group",
						"aria-label": "Paint mode",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-on": mode === "paint",
							onClick: () => setMode("paint"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paintbrush, { size: 14 }), "Paint"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-on": mode === "erase",
							onClick: () => setMode("erase"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { size: 14 }), "Erase"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "seg",
						role: "group",
						"aria-label": "Brush size",
						children: [
							0,
							1,
							2
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": brush === n,
							onClick: () => setBrush(n),
							children: n === 0 ? "Fine" : n === 1 ? "Medium" : "Wide"
						}, n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "ed-btn ed-btn-quiet",
						onClick: () => {
							cellsRef.current = /* @__PURE__ */ new Set();
							if (layerRef.current) layerRef.current.clearLayers();
							onChange([]);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }), "Clear"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "zone-count",
						children: [cells.length, " blocks covered"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: host,
				className: "zone-map",
				role: "application",
				"aria-label": "Delivery zone map"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "zone-lookup",
				onSubmit: (e) => {
					e.preventDefault();
					lookupAddress();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Check a street in Egg Harbor Township"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "ed-btn",
						children: "Check"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "ed-btn ed-btn-quiet",
						href: googleMapsSearchUrl(query || "Egg Harbor Township NJ"),
						target: "_blank",
						rel: "noreferrer",
						children: "Google Maps"
					})
				]
			}),
			lookup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "zone-lookup-msg",
				children: lookup
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "Drag to paint streets you deliver. Checkout only accepts addresses inside the red blocks. Open Google Maps to confirm a street, then paint it here."
			})
		]
	});
}
function tomatoColor() {
	if (typeof window === "undefined") return "currentColor";
	return getComputedStyle(document.documentElement).getPropertyValue("--color-tomato").trim() || "currentColor";
}
function drawCells(L, layer, cells, color) {
	layer.clearLayers();
	for (const key of cells) {
		const r = cellRect(key);
		L.rectangle([[r.south, r.west], [r.north, r.east]], {
			color,
			weight: 1,
			fillColor: color,
			fillOpacity: .35
		}).addTo(layer);
	}
}
function AdminMenu() {
	const { tab: wanted } = Route$9.useSearch();
	const tab = wanted ?? "menu";
	const [msg, setMsg] = (0, import_react.useState)("");
	const [settings, setSettings] = (0, import_react.useState)(null);
	const [printers, setPrinters] = (0, import_react.useState)([]);
	const [receipt, setReceipt] = (0, import_react.useState)(DEFAULT_RECEIPT_OPTIONS);
	const [printerStamp, setPrinterStamp] = (0, import_react.useState)("");
	const [cells, setCells] = (0, import_react.useState)([]);
	const [restaurant, setRestaurant] = (0, import_react.useState)(null);
	const { toast, flashOk, flashFail } = useSaveFlash();
	const navigate = Route$9.useNavigate();
	(0, import_react.useEffect)(() => {
		useMenuStore.persist.rehydrate();
		getAdminShop().then((d) => {
			useMenuStore.getState().replaceAll({
				restaurant: d.restaurant,
				footer: d.footer,
				categories: d.categories,
				cardTextSize: d.settings.cardTextSize,
				cardTextColor: d.settings.cardTextColor,
				cardDescColor: d.settings.cardDescColor,
				cardPriceColor: d.settings.cardPriceColor,
				cardSize: d.settings.cardSize,
				cardBg: d.settings.cardBg,
				tagline: d.settings.tagline,
				showMark: d.settings.showMark
			});
			setSettings(d.settings);
			setRestaurant(d.restaurant);
			setPrinters(d.printers);
			setReceipt(d.receiptOptions);
			setPrinterStamp(JSON.stringify({
				printers: d.printers,
				receipt: d.receiptOptions
			}));
			setCells(d.cells);
		});
	}, []);
	function go(next) {
		navigate({
			to: "/admin/menu",
			search: next === "menu" ? {} : { tab: next }
		});
	}
	function saveOps(data, ok = "Saved.") {
		saveShopSettings({ data }).then(() => {
			setMsg(ok);
			flashOk(true);
		}).catch((e) => {
			const text = e instanceof Error ? e.message : "Could not save";
			setMsg(text);
			flashFail(text);
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "menu-ops-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveToast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Menu & shop details" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Menu, cards, hours, payments, tax, delivery, and printers — each tab saves on its own."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "seg center-tabs menu-ops-tabs",
						role: "tablist",
						"aria-label": "Menu and shop details",
						children: [
							["menu", "Menu"],
							["cards", "Card Editor"],
							["hours", "Hours"],
							["payments", "Payments"],
							["tax", "Tax"],
							["delivery", "Delivery"],
							["printers", "Printers"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": tab === id,
							"data-on": tab === id,
							onClick: () => go(id),
							children: label
						}, id))
					})
				]
			}),
			tab === "menu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "admin-menu-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "page-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-print",
							onClick: () => {
								const snap = useMenuStore.getState();
								const nextRestaurant = {
									...snap.restaurant,
									shortName: snap.restaurant.name
								};
								Promise.all([saveShopMenu({ data: {
									restaurant: nextRestaurant,
									footer: snap.footer,
									categories: snap.categories
								} }), saveShopSettings({ data: {
									tagline: snap.tagline,
									showMark: snap.showMark,
									toppingPriceSm: settings?.toppingPriceSm,
									toppingPriceMd: settings?.toppingPriceMd,
									toppingPriceLg: settings?.toppingPriceLg,
									toppingPriceXl: settings?.toppingPriceXl
								} })]).then(() => {
									setRestaurant(nextRestaurant);
									setMsg("Prices and shop details are live.");
									flashOk(true);
								}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not save"));
							},
							children: "Save all"
						}), msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub",
							children: msg
						}) : null]
					}),
					settings ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToppingPricePanel, {
						settings,
						setSettings
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuEditor, {})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "preview-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuBoard, {
						paper: "letter",
						showDesc: false
					})
				})]
			}) : null,
			tab !== "menu" && tab !== "cards" && !settings ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-skel",
				children: "Loading…"
			}) : null,
			tab === "cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "settings-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardEditor, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-print",
						onClick: () => {
							const snap = useMenuStore.getState();
							saveOps({
								cardTextSize: snap.cardTextSize,
								cardTextColor: snap.cardTextColor,
								cardDescColor: snap.cardDescColor,
								cardPriceColor: snap.cardPriceColor,
								cardSize: snap.cardSize,
								cardBg: snap.cardBg
							}, "Card style is live.");
						},
						children: "Save cards"
					}),
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: msg
					}) : null
				]
			}) : null,
			tab === "hours" && settings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "settings-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoursPanel, {
						settings,
						setSettings
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VacationPanel, {
						settings,
						setSettings
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-print",
						onClick: () => saveOps({
							weeklyHours: settings.weeklyHours,
							prepMinutes: settings.prepMinutes,
							deliveryMinutes: settings.deliveryMinutes,
							vacationOn: settings.vacationOn,
							vacationMessage: settings.vacationMessage,
							vacationUntil: settings.vacationUntil
						}, "Hours and vacation are live."),
						children: "Save hours"
					}),
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: msg
					}) : null
				]
			}) : null,
			tab === "payments" && settings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "settings-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentsPanel, {
						settings,
						setSettings
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-print",
						onClick: () => saveOps({
							paymentPlaceholder: settings.paymentPlaceholder,
							guestCardRequired: settings.guestCardRequired
						}, "Payment settings are live."),
						children: "Save payments"
					}),
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: msg
					}) : null
				]
			}) : null,
			tab === "tax" && settings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "settings-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxPanel, {
						settings,
						setSettings
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-print",
						onClick: () => saveOps({ taxRate: settings.taxRate }, "Tax rate is live."),
						children: "Save tax"
					}),
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: msg
					}) : null
				]
			}) : null,
			tab === "delivery" && settings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "settings-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeliveryPanel, {
						settings,
						setSettings
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "page-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Delivery zone" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ed-sub",
								children: "Paint the blocks you cover. Customer checkout geocodes the address and only allows delivery inside the painted area. Use the search to confirm a street, then paint it."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneMap, {
								cells,
								onChange: setCells
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-print",
						onClick: () => {
							Promise.all([saveShopSettings({ data: {
								minOrderDelivery: settings.minOrderDelivery,
								deliveryFee: settings.deliveryFee,
								deliveryMinutes: settings.deliveryMinutes
							} }), saveDeliveryZone({ data: { cells } })]).then(([, zone]) => {
								setSettings({
									...settings,
									hasZones: cells.length > 0
								});
								setMsg(`Delivery settings are live. Saved ${zone.count} blocks.`);
								flashOk(true);
							}).catch((e) => {
								const text = e instanceof Error ? e.message : "Could not save";
								setMsg(text);
								flashFail(text);
							});
						},
						children: "Save delivery"
					}),
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: msg
					}) : null
				]
			}) : null,
			tab === "printers" && settings && restaurant ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "settings-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrinterSetup, {
					printers,
					setPrinters,
					receipt,
					setReceipt,
					restaurant,
					taxRate: settings.taxRate,
					onSave: () => {
						const stamp = JSON.stringify({
							printers,
							receipt
						});
						if (stamp === printerStamp) {
							flashOk(false);
							return;
						}
						saveShopSettings({ data: {
							printers,
							receiptOptions: receipt
						} }).then(() => {
							setPrinterStamp(stamp);
							flashOk(true);
							setMsg("Printer setup is live.");
						}).catch((e) => flashFail(e instanceof Error ? e.message : "Printers were not saved."));
					}
				}), msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: msg
				}) : null]
			}) : null
		]
	});
}
//#endregion
export { AdminMenu as component, menu_GiKSiqWG_exports as t };

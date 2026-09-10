import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BrandMark } from "./brand-mark-DrSWcYOk.mjs";
import { w as Pizza } from "../_libs/lucide-react.mjs";
import { r as useMenuStore } from "./menu-store-B6319uKN.mjs";
import { t as CATEGORY_ICONS } from "./icons-DnfAfNKx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-board-C4QHXLXA.js
var import_jsx_runtime = require_jsx_runtime();
var LETTER_GROUPS = [[
	"pizza",
	"gourmet",
	"appetizers",
	"salads",
	"sides",
	"wings"
], [
	"turnovers",
	"sandwiches",
	"clubs",
	"hot-subs",
	"cold-subs",
	"steak-subs",
	"burgers",
	"wraps",
	"gyros",
	"pasta",
	"desserts",
	"beverages"
]];
var WIDE_GROUPS = [
	[
		"pizza",
		"gourmet",
		"turnovers",
		"pasta"
	],
	[
		"appetizers",
		"salads",
		"sides",
		"wings",
		"sandwiches",
		"clubs",
		"desserts",
		"beverages"
	],
	[
		"hot-subs",
		"cold-subs",
		"steak-subs",
		"burgers",
		"wraps",
		"gyros"
	]
];
function money(price) {
	const t = price.trim().replace(/^\$/, "");
	if (!t) return "—";
	const n = Number(t);
	if (Number.isFinite(n)) return `$${n.toFixed(2)}`;
	return `$${t}`;
}
function displayName(item, cat) {
	let n = item.name;
	if (cat.id === "pizza" || cat.id === "gourmet") n = n.replace(/ Pizza$/, "");
	if (cat.id === "hot-subs") n = n.replace(/ Hot Sub$/, "");
	if (cat.id === "cold-subs") n = n.replace(/ Cold Sub$/, "");
	if (cat.id === "sandwiches") n = n.replace(/ Sandwich$/, "");
	if (cat.id === "clubs") n = n.replace(/ Sandwich$/, "");
	if (cat.id === "wraps") n = n.replace(/ Wrap$/, "");
	if (cat.id === "steak-subs") n = n.replace(/ Sub$/, "");
	if (cat.id === "gyros") n = n.replace(/ Sandwich$/, "");
	return n || "Untitled";
}
function usefulPrices(prices) {
	if (prices.length === 1 && prices[0].label === "LG") return [{
		...prices[0],
		label: void 0
	}];
	return prices;
}
function pizzaHasXl(item) {
	return item.prices.some((p) => p.label === "XL" && p.price);
}
function SizeLegend({ xl, xlInches }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "size-legend",
		"aria-label": "Pizza sizes",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "size-pip",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-disc size-disc-sm",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				}), "SM 12\""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "size-pip",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-disc size-disc-md",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				}), "MD 14\""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "size-pip",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-disc size-disc-lg",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				}), "LG 16\""]
			}),
			xl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "size-pip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-disc size-disc-xl",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
					}),
					"XL ",
					xlInches
				]
			}) : null
		]
	});
}
function PizzaRow({ item, cat, showDesc, xl }) {
	const cols = (xl ? [
		"SM",
		"MD",
		"LG",
		"XL"
	] : [
		"SM",
		"MD",
		"LG"
	]).map((lab) => item.prices.find((p) => p.label === lab));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "item-row",
		"data-kind": "pizza",
		"data-xl": xl ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bullet",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-copy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item-name",
					"data-fav": item.highlight ? "true" : void 0,
					children: [displayName(item, cat), item.highlight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "fav-tag",
						children: "House favorite"
					}) : null]
				}), showDesc && item.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item-desc",
					children: [item.description, "."]
				}) : null]
			}),
			cols.map((col, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "price",
				"data-size": col?.label,
				children: col ? money(col.price) : "—"
			}, i))
		]
	});
}
function ItemRow({ item, cat, showDesc }) {
	const prices = usefulPrices(item.prices);
	const multi = prices.length > 1 || Boolean(prices[0]?.label);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "item-row",
		"data-kind": multi ? "split" : "single",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bullet",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-copy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "item-name",
					children: displayName(item, cat)
				}), showDesc && item.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item-desc",
					children: [item.description, "."]
				}) : null]
			}),
			multi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "split-prices",
				children: prices.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pair",
					children: [p.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "lbl",
						children: p.label
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "price",
						children: money(p.price)
					})]
				}, i))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lead-price",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "dots",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "price",
					children: money(prices[0]?.price ?? "")
				})]
			})
		]
	});
}
function Section({ cat, showDesc }) {
	const Icon = CATEGORY_ICONS[cat.icon ?? cat.id] ?? Pizza;
	const pizza = cat.kind === "pizza";
	const xl = pizza && cat.items.some(pizzaHasXl);
	const xlInches = cat.items.flatMap((it) => it.prices).find((p) => p.label === "XL")?.inches || "18\"";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "menu-section",
		id: cat.id,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "section-icon",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { strokeWidth: 2.2 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section-title",
					children: cat.name || "Untitled"
				})]
			}),
			cat.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-note",
				children: cat.note
			}) : null,
			pizza ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pizza-cols",
				"data-xl": xl ? "true" : void 0,
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["SM", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inches",
						children: "12\""
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["MD", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inches",
						children: "14\""
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["LG", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inches",
						children: "16\""
					})] }),
					xl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["XL", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inches",
						children: xlInches
					})] }) : null
				]
			}) : null,
			cat.items.map((item, i) => pizza ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PizzaRow, {
				item,
				cat,
				showDesc,
				xl
			}, item.id ?? `${item.name}-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemRow, {
				item,
				cat,
				showDesc
			}, item.id ?? `${item.name}-${i}`))
		]
	});
}
function layoutColumns(paper, cats) {
	const presets = paper === "letter" ? LETTER_GROUPS : WIDE_GROUPS;
	const byId = new Map(cats.map((c) => [c.id, c]));
	const used = /* @__PURE__ */ new Set();
	const cols = presets.map((group) => {
		const col = [];
		for (const id of group) {
			const c = byId.get(id);
			if (c) {
				col.push(c);
				used.add(id);
			}
		}
		return col;
	});
	for (const c of cats) if (!used.has(c.id)) cols[cols.length - 1].push(c);
	return cols.filter((col) => col.length > 0);
}
function MenuBoard({ paper, showDesc, showMark = true }) {
	const restaurant = useMenuStore((s) => s.restaurant);
	const footer = useMenuStore((s) => s.footer);
	const categories = useMenuStore((s) => s.categories);
	const page = paper === "letter" ? "letter portrait" : paper === "poster" ? "18in 24in landscape" : "11in 17in landscape";
	const groups = layoutColumns(paper, categories);
	const xl = categories.some((c) => c.kind === "pizza" && c.items.some(pizzaHasXl));
	const xlInches = categories.flatMap((c) => c.items).flatMap((it) => it.prices).find((p) => p.label === "XL")?.inches || "18\"";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "paper",
		"data-paper": paper,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `@media print { @page { size: ${page}; margin: 0.38in; } }` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "masthead",
				children: [
					showMark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { variant: "mast" }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mast-kicker",
						children: ["Egg Harbor Township · Est. ", restaurant.established]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mast-name",
						children: restaurant.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mast-meta",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: restaurant.address }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: restaurant.city }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: restaurant.phoneHref,
								children: restaurant.phone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: restaurant.hours })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeLegend, {
						xl,
						xlInches
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "menu-columns",
				children: groups.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "menu-col",
					children: col.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						cat,
						showDesc
					}, cat.id))
				}, col.map((c) => c.id).join("-")))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "board-foot",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: footer }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Wall menu · ", restaurant.name] })]
			})
		]
	});
}
function CategoryJump() {
	const categories = useMenuStore((s) => s.categories);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "jump-nav no-print",
		"aria-label": "Menu sections",
		children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: `#${cat.id}`,
			children: cat.name || "Untitled"
		}, cat.id))
	});
}
//#endregion
export { MenuBoard as n, CategoryJump as t };

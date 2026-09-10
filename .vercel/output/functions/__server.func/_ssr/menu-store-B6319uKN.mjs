import { G as sanitizeCardSize, K as sanitizeCardTextColor, W as sanitizeCardBg, l as MENU, q as sanitizeCardTextSize, s as DEFAULT_FOOTER, u as RESTAURANT } from "./hours-CePKgkcU.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-store-B6319uKN.js
function nid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
function pizzaPrices(from) {
	const src = (from ?? []).map((p) => ({ ...p }));
	const byLabel = new Map(src.filter((p) => p.label).map((p) => [String(p.label), p]));
	const core = [
		byLabel.get("SM") ?? {
			label: "SM",
			inches: "12\"",
			price: ""
		},
		byLabel.get("MD") ?? {
			label: "MD",
			inches: "14\"",
			price: ""
		},
		byLabel.get("LG") ?? {
			label: "LG",
			inches: "16\"",
			price: ""
		}
	];
	const extras = src.filter((p) => p.label !== "SM" && p.label !== "MD" && p.label !== "LG");
	return [...core, ...extras];
}
function seedItem(item, cat, index) {
	return {
		...item,
		id: item.id ?? `${cat.id}-${index}`,
		prices: item.prices.map((p) => ({ ...p })),
		condiments: (item.condiments ?? []).map((c) => ({ ...c }))
	};
}
function seedMenu() {
	return {
		restaurant: { ...RESTAURANT },
		footer: DEFAULT_FOOTER,
		categories: MENU.map((cat) => ({
			...cat,
			items: cat.items.map((item, i) => seedItem(item, cat, i))
		}))
	};
}
function newItem(kind) {
	if (kind === "pizza") return {
		id: nid("item"),
		name: "New pizza",
		description: "",
		prices: pizzaPrices()
	};
	if (kind === "split") return {
		id: nid("item"),
		name: "New item",
		description: "",
		prices: [{
			label: "Half",
			price: ""
		}]
	};
	return {
		id: nid("item"),
		name: "New item",
		description: "",
		prices: [{ price: "" }]
	};
}
function mapCat(categories, catId, fn) {
	return categories.map((c) => c.id === catId ? fn(c) : c);
}
function mapItem(categories, catId, itemId, fn) {
	return mapCat(categories, catId, (c) => ({
		...c,
		items: c.items.map((it) => it.id === itemId ? fn(it) : it)
	}));
}
function moveIn(list, id, dir) {
	const i = list.findIndex((x) => x.id === id);
	const j = i + dir;
	if (i < 0 || j < 0 || j >= list.length) return list;
	const next = list.slice();
	const [row] = next.splice(i, 1);
	next.splice(j, 0, row);
	return next;
}
function toTel(phone) {
	const digits = phone.replace(/\D/g, "");
	if (digits.length === 10) return `tel:+1${digits}`;
	if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
	if (digits.length) return `tel:+${digits}`;
	return "";
}
function snapshot(s) {
	return JSON.stringify({
		restaurant: s.restaurant,
		footer: s.footer,
		categories: s.categories.map((c) => ({
			id: c.id,
			name: c.name,
			note: c.note ?? "",
			kind: c.kind,
			icon: c.icon ?? "",
			items: c.items.map((it) => ({
				name: it.name,
				description: it.description ?? "",
				highlight: Boolean(it.highlight),
				prices: it.prices,
				image: it.image ?? "",
				hideImage: Boolean(it.hideImage),
				condiments: it.condiments ?? []
			}))
		}))
	});
}
var DEFAULT = {
	...seedMenu(),
	cardTextSize: "md",
	cardTextColor: "ink",
	cardDescColor: "muted",
	cardPriceColor: "ink",
	cardSize: "md",
	cardBg: "paper",
	tagline: "",
	showMark: true
};
var DEFAULT_SNAP = snapshot(DEFAULT);
function isCustomMenu(s) {
	return snapshot(s) !== DEFAULT_SNAP;
}
var useMenuStore = create()(persist((set) => ({
	...DEFAULT,
	setRestaurant: (patch) => set((s) => {
		const restaurant = {
			...s.restaurant,
			...patch
		};
		if (patch.phone !== void 0) restaurant.phoneHref = toTel(patch.phone);
		return { restaurant };
	}),
	setFooter: (footer) => set({ footer }),
	setCardType: (patch) => set((s) => ({
		cardTextSize: patch.cardTextSize !== void 0 ? sanitizeCardTextSize(patch.cardTextSize) : s.cardTextSize,
		cardTextColor: patch.cardTextColor !== void 0 ? sanitizeCardTextColor(patch.cardTextColor) : s.cardTextColor,
		cardDescColor: patch.cardDescColor !== void 0 ? sanitizeCardTextColor(patch.cardDescColor) : s.cardDescColor,
		cardPriceColor: patch.cardPriceColor !== void 0 ? sanitizeCardTextColor(patch.cardPriceColor) : s.cardPriceColor,
		cardSize: patch.cardSize !== void 0 ? sanitizeCardSize(patch.cardSize) : s.cardSize,
		cardBg: patch.cardBg !== void 0 ? sanitizeCardBg(patch.cardBg) : s.cardBg
	})),
	setShopWeb: (patch) => set((s) => ({
		tagline: patch.tagline !== void 0 ? patch.tagline : s.tagline,
		showMark: patch.showMark !== void 0 ? patch.showMark : s.showMark
	})),
	patchCategory: (id, patch) => set((s) => ({ categories: mapCat(s.categories, id, (c) => ({
		...c,
		...patch
	})) })),
	setKind: (id, kind) => set((s) => ({ categories: mapCat(s.categories, id, (c) => ({
		...c,
		kind,
		items: kind === "pizza" ? c.items.map((it) => ({
			...it,
			prices: pizzaPrices(it.prices)
		})) : c.items
	})) })),
	addCategory: () => set((s) => ({ categories: [...s.categories, {
		id: nid("cat"),
		name: "New section",
		kind: "single",
		icon: "appetizers",
		items: []
	}] })),
	deleteCategory: (id) => set((s) => ({ categories: s.categories.filter((c) => c.id !== id) })),
	moveCategory: (id, dir) => set((s) => ({ categories: moveIn(s.categories, id, dir) })),
	patchItem: (catId, itemId, patch) => set((s) => ({ categories: mapItem(s.categories, catId, itemId, (it) => ({
		...it,
		...patch
	})) })),
	setPrices: (catId, itemId, prices) => set((s) => ({ categories: mapItem(s.categories, catId, itemId, (it) => ({
		...it,
		prices
	})) })),
	addItem: (catId) => set((s) => ({ categories: mapCat(s.categories, catId, (c) => ({
		...c,
		items: [...c.items, newItem(c.kind)]
	})) })),
	duplicateItem: (catId, itemId) => set((s) => ({ categories: mapCat(s.categories, catId, (c) => {
		const i = c.items.findIndex((it) => it.id === itemId);
		if (i < 0) return c;
		const src = c.items[i];
		const copy = {
			...src,
			id: nid("item"),
			name: src.name.endsWith(" copy") ? src.name : `${src.name} copy`,
			prices: src.prices.map((p) => ({ ...p })),
			condiments: (src.condiments ?? []).map((c) => ({
				...c,
				id: nid("cond")
			}))
		};
		const items = c.items.slice();
		items.splice(i + 1, 0, copy);
		return {
			...c,
			items
		};
	}) })),
	deleteItem: (catId, itemId) => set((s) => ({ categories: mapCat(s.categories, catId, (c) => ({
		...c,
		items: c.items.filter((it) => it.id !== itemId)
	})) })),
	moveItem: (catId, itemId, dir) => set((s) => ({ categories: mapCat(s.categories, catId, (c) => ({
		...c,
		items: moveIn(c.items, itemId, dir)
	})) })),
	moveItemTo: (fromCat, itemId, toCat) => set((s) => {
		if (fromCat === toCat) return s;
		const item = s.categories.find((c) => c.id === fromCat)?.items.find((it) => it.id === itemId);
		if (!item) return s;
		return { categories: s.categories.map((c) => {
			if (c.id === fromCat) return {
				...c,
				items: c.items.filter((it) => it.id !== itemId)
			};
			if (c.id === toCat) {
				const moved = c.kind === "pizza" ? {
					...item,
					prices: pizzaPrices(item.prices)
				} : {
					...item,
					prices: item.prices.map((p) => ({ ...p }))
				};
				return {
					...c,
					items: [...c.items, moved]
				};
			}
			return c;
		}) };
	}),
	reset: () => set(seedMenu()),
	replaceAll: (next) => set({
		restaurant: next.restaurant,
		footer: next.footer,
		categories: next.categories,
		...next.cardTextSize !== void 0 ? { cardTextSize: sanitizeCardTextSize(next.cardTextSize) } : {},
		...next.cardTextColor !== void 0 ? { cardTextColor: sanitizeCardTextColor(next.cardTextColor) } : {},
		...next.cardDescColor !== void 0 ? { cardDescColor: sanitizeCardTextColor(next.cardDescColor) } : {},
		...next.cardPriceColor !== void 0 ? { cardPriceColor: sanitizeCardTextColor(next.cardPriceColor) } : {},
		...next.cardSize !== void 0 ? { cardSize: sanitizeCardSize(next.cardSize) } : {},
		...next.cardBg !== void 0 ? { cardBg: sanitizeCardBg(next.cardBg) } : {},
		...next.tagline !== void 0 ? { tagline: next.tagline } : {},
		...next.showMark !== void 0 ? { showMark: next.showMark } : {}
	})
}), {
	name: "south-end-menu-v1",
	storage: createJSONStorage(() => {
		if (typeof window === "undefined") return {
			getItem: () => null,
			setItem: () => {},
			removeItem: () => {}
		};
		return localStorage;
	}),
	skipHydration: true,
	version: 1,
	partialize: (s) => ({
		restaurant: s.restaurant,
		footer: s.footer,
		categories: s.categories,
		cardTextSize: s.cardTextSize,
		cardTextColor: s.cardTextColor,
		cardDescColor: s.cardDescColor,
		cardPriceColor: s.cardPriceColor,
		cardSize: s.cardSize,
		cardBg: s.cardBg,
		tagline: s.tagline,
		showMark: s.showMark
	}),
	merge: (persisted, current) => {
		const p = persisted;
		if (!p || !Array.isArray(p.categories) || !p.restaurant) return current;
		return {
			...current,
			restaurant: {
				...current.restaurant,
				...p.restaurant
			},
			footer: typeof p.footer === "string" ? p.footer : current.footer,
			cardTextSize: sanitizeCardTextSize(p.cardTextSize ?? current.cardTextSize),
			cardTextColor: sanitizeCardTextColor(p.cardTextColor ?? current.cardTextColor),
			cardDescColor: sanitizeCardTextColor(p.cardDescColor ?? current.cardDescColor),
			cardPriceColor: sanitizeCardTextColor(p.cardPriceColor ?? current.cardPriceColor),
			cardSize: sanitizeCardSize(p.cardSize ?? current.cardSize),
			cardBg: sanitizeCardBg(p.cardBg ?? current.cardBg),
			tagline: typeof p.tagline === "string" ? p.tagline : current.tagline,
			showMark: typeof p.showMark === "boolean" ? p.showMark : current.showMark,
			categories: p.categories.map((cat) => ({
				...cat,
				items: (cat.items ?? []).map((it, i) => ({
					...it,
					id: it.id ?? `${cat.id}-${i}`,
					prices: Array.isArray(it.prices) ? it.prices.map((pr) => ({ ...pr })) : [{ price: "" }],
					condiments: Array.isArray(it.condiments) ? it.condiments.map((c) => ({ ...c })) : []
				}))
			}))
		};
	}
}));
//#endregion
export { seedMenu as n, useMenuStore as r, isCustomMenu as t };

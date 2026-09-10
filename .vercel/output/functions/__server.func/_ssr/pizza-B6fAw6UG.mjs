import { O as formatUsd, P as moneyNumber } from "./hours-BHiQSWtc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pizza-B6fAw6UG.js
var DEFAULT_TOPPING_PRICES = {
	SM: 1.5,
	MD: 1.75,
	LG: 2,
	XL: 2.5
};
var PIZZA_TOPPINGS = [
	{
		id: "xcheese",
		name: "Extra cheese"
	},
	{
		id: "pepperoni",
		name: "Pepperoni"
	},
	{
		id: "sausage",
		name: "Sausage"
	},
	{
		id: "beef",
		name: "Beef"
	},
	{
		id: "ham",
		name: "Ham"
	},
	{
		id: "bacon",
		name: "Bacon"
	},
	{
		id: "chicken",
		name: "Chicken"
	},
	{
		id: "mushrooms",
		name: "Mushrooms"
	},
	{
		id: "peppers",
		name: "Green peppers"
	},
	{
		id: "olives",
		name: "Olives"
	},
	{
		id: "onions",
		name: "Onions"
	},
	{
		id: "spinach",
		name: "Spinach"
	},
	{
		id: "broccoli",
		name: "Broccoli"
	},
	{
		id: "tomatoes",
		name: "Tomatoes"
	},
	{
		id: "garlic",
		name: "Garlic"
	},
	{
		id: "pineapple",
		name: "Pineapple"
	},
	{
		id: "jalapenos",
		name: "Jalapenos"
	},
	{
		id: "feta",
		name: "Feta"
	}
];
var TOPPING_BY_ID = new Map(PIZZA_TOPPINGS.map((t) => [t.id, t]));
function money2(n) {
	return Math.round((Number.isFinite(n) ? n : 0) * 100) / 100;
}
function isPizzaSize(label) {
	return label === "SM" || label === "MD" || label === "LG" || label === "XL";
}
function toppingName(id) {
	return TOPPING_BY_ID.get(id)?.name ?? id;
}
function sanitizeToppings(raw) {
	if (!Array.isArray(raw)) return [];
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	for (const row of raw) {
		if (out.length >= 12) break;
		const rec = row && typeof row === "object" ? row : { id: row };
		const id = String(rec.id ?? "").trim();
		if (!id || !TOPPING_BY_ID.has(id) || seen.has(id)) continue;
		const side = rec.side === "left" || rec.side === "right" ? rec.side : "whole";
		seen.add(id);
		out.push({
			id,
			side
		});
	}
	return out;
}
function toppingPricesFrom(settings) {
	return {
		SM: money2(settings.toppingPriceSm || DEFAULT_TOPPING_PRICES.SM),
		MD: money2(settings.toppingPriceMd || DEFAULT_TOPPING_PRICES.MD),
		LG: money2(settings.toppingPriceLg || DEFAULT_TOPPING_PRICES.LG),
		XL: money2(settings.toppingPriceXl || DEFAULT_TOPPING_PRICES.XL)
	};
}
function toppingUnit(size, settings) {
	return toppingPricesFrom(settings)[isPizzaSize(size) ? size : "LG"];
}
function toppingCharge(size, side, settings) {
	const unit = toppingUnit(size, settings);
	return money2(side === "whole" ? unit : unit / 2);
}
function colPrice(col) {
	return money2(moneyNumber(col?.price));
}
function itemSizePrice(item, size, settings) {
	const want = size || item.prices[0]?.label || "";
	const exact = item.prices.find((p) => p.label === want);
	if (exact && colPrice(exact) > 0) return colPrice(exact);
	if (want === "XL") {
		const lg = item.prices.find((p) => p.label === "LG") ?? item.prices[item.prices.length - 1];
		if (lg && colPrice(lg) > 0 && settings.xlPriceAdd > 0) return money2(colPrice(lg) + Math.max(0, settings.xlPriceAdd));
	}
	return colPrice(pizzaSizesFor(item, settings).find((p) => colPrice(p) > 0) ?? item.prices[0]);
}
function pizzaSizesFor(item, _settings) {
	const priced = item.prices.filter((p) => String(p.price ?? "").trim() !== "");
	return priced.length ? priced : item.prices;
}
function pizzaNote(settings, items) {
	const t = toppingPricesFrom(settings);
	const bits = [];
	const seen = /* @__PURE__ */ new Set();
	for (const item of items ?? []) for (const p of pizzaSizesFor(item, settings)) {
		const key = `${p.label ?? ""}|${p.inches ?? ""}`;
		if (seen.has(key)) continue;
		seen.add(key);
		const name = [p.inches, p.label].filter(Boolean).join(" ");
		if (name) bits.push(name);
	}
	return `${bits.length ? bits.join(" · ") : `12" small · 14" medium · 16" large`}. Extra toppings ${[...seen].some((k) => k.startsWith("XL")) ? `${formatUsd(t.SM)} / ${formatUsd(t.MD)} / ${formatUsd(t.LG)} / ${formatUsd(t.XL)}` : `${formatUsd(t.SM)} / ${formatUsd(t.MD)} / ${formatUsd(t.LG)}`} by size. Half toppings are half price.`;
}
function applyPizzaSizing(categories, settings) {
	return categories.map((cat) => {
		if (cat.kind !== "pizza") return cat;
		return {
			...cat,
			note: pizzaNote(settings, cat.items),
			items: cat.items.map((item) => ({
				...item,
				prices: pizzaSizesFor(item, settings)
			}))
		};
	});
}
function shortPizzaName(name) {
	return name.replace(/ Pizza$/i, "").trim() || name;
}
function describeBuild(_itemName, _size, toppings, halfName) {
	const bits = [];
	if (halfName) bits.push(`half ${shortPizzaName(halfName)}`);
	const whole = toppings.filter((t) => t.side === "whole").map((t) => toppingName(t.id));
	const left = toppings.filter((t) => t.side === "left").map((t) => toppingName(t.id));
	const right = toppings.filter((t) => t.side === "right").map((t) => toppingName(t.id));
	if (whole.length) bits.push(`+ ${whole.join(", ")}`);
	if (left.length) bits.push(`left: ${left.join(", ")}`);
	if (right.length) bits.push(`right: ${right.join(", ")}`);
	return bits.join(" · ");
}
function pricePizzaBuild(opts) {
	const size = opts.size || "LG";
	const left = itemSizePrice(opts.item, size, opts.settings);
	const right = opts.other ? itemSizePrice(opts.other, size, opts.settings) : 0;
	const unitPrice = money2(money2(Math.max(left, right)) + opts.toppings.reduce((n, t) => n + toppingCharge(size, t.side, opts.settings), 0));
	const halfName = opts.other && opts.other.name !== opts.item.name ? opts.other.name : void 0;
	return {
		unitPrice,
		detail: describeBuild(opts.item.name, size, opts.toppings, halfName),
		name: halfName ? `${shortPizzaName(opts.item.name)} / ${shortPizzaName(halfName)} Pizza` : opts.item.name,
		halfName
	};
}
//#endregion
export { pricePizzaBuild as a, toppingUnit as c, colPrice as i, PIZZA_TOPPINGS as n, sanitizeToppings as o, applyPizzaSizing as r, toppingCharge as s, DEFAULT_TOPPING_PRICES as t };

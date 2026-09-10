import type { MenuCategory, MenuItem, PriceCol } from "@/data/menu";
import { formatUsd, moneyNumber, type ShopSettingsPublic } from "@/lib/shop-types";

export const PIZZA_SIZE_ORDER = ["SM", "MD", "LG", "XL"] as const;
export type PizzaSize = (typeof PIZZA_SIZE_ORDER)[number];
export type ToppingSide = "whole" | "left" | "right";

export const DEFAULT_TOPPING_PRICES: Record<PizzaSize, number> = {
  SM: 1.5,
  MD: 1.75,
  LG: 2,
  XL: 2.5,
};

export const DEFAULT_XL_INCHES = '18"';
export const DEFAULT_XL_ADD = 2;

export const PIZZA_TOPPINGS = [
  { id: "xcheese", name: "Extra cheese" },
  { id: "pepperoni", name: "Pepperoni" },
  { id: "sausage", name: "Sausage" },
  { id: "beef", name: "Beef" },
  { id: "ham", name: "Ham" },
  { id: "bacon", name: "Bacon" },
  { id: "chicken", name: "Chicken" },
  { id: "mushrooms", name: "Mushrooms" },
  { id: "peppers", name: "Green peppers" },
  { id: "olives", name: "Olives" },
  { id: "onions", name: "Onions" },
  { id: "spinach", name: "Spinach" },
  { id: "broccoli", name: "Broccoli" },
  { id: "tomatoes", name: "Tomatoes" },
  { id: "garlic", name: "Garlic" },
  { id: "pineapple", name: "Pineapple" },
  { id: "jalapenos", name: "Jalapenos" },
  { id: "feta", name: "Feta" },
] as const;

export type ToppingId = (typeof PIZZA_TOPPINGS)[number]["id"];

const TOPPING_BY_ID = new Map(PIZZA_TOPPINGS.map((t) => [t.id, t]));

export type PizzaToppingPick = {
  id: string;
  side: ToppingSide;
};

export type PizzaBuild = {
  size: string;
  toppings: PizzaToppingPick[];
  halfItemId?: string;
};

export function money2(n: number) {
  return Math.round((Number.isFinite(n) ? n : 0) * 100) / 100;
}

export function isPizzaSize(label: string | undefined): label is PizzaSize {
  return label === "SM" || label === "MD" || label === "LG" || label === "XL";
}

export function toppingName(id: string) {
  return TOPPING_BY_ID.get(id as ToppingId)?.name ?? id;
}

export function sanitizeToppings(raw: unknown): PizzaToppingPick[] {
  if (!Array.isArray(raw)) return [];
  const out: PizzaToppingPick[] = [];
  const seen = new Set<string>();
  for (const row of raw) {
    if (out.length >= 12) break;
    const rec: Record<string, unknown> = row && typeof row === "object" ? (row as Record<string, unknown>) : { id: row };
    const id = String(rec.id ?? "").trim();
    if (!id || !TOPPING_BY_ID.has(id as ToppingId) || seen.has(id)) continue;
    const side: ToppingSide = rec.side === "left" || rec.side === "right" ? rec.side : "whole";
    seen.add(id);
    out.push({ id, side });
  }
  return out;
}

export function toppingPricesFrom(settings: Pick<ShopSettingsPublic, "toppingPriceSm" | "toppingPriceMd" | "toppingPriceLg" | "toppingPriceXl">) {
  return {
    SM: money2(settings.toppingPriceSm || DEFAULT_TOPPING_PRICES.SM),
    MD: money2(settings.toppingPriceMd || DEFAULT_TOPPING_PRICES.MD),
    LG: money2(settings.toppingPriceLg || DEFAULT_TOPPING_PRICES.LG),
    XL: money2(settings.toppingPriceXl || DEFAULT_TOPPING_PRICES.XL),
  } as Record<PizzaSize, number>;
}

export function toppingUnit(size: string, settings: ShopSettingsPublic) {
  const prices = toppingPricesFrom(settings);
  const key: PizzaSize = isPizzaSize(size) ? size : "LG";
  return prices[key];
}

export function toppingCharge(size: string, side: ToppingSide, settings: ShopSettingsPublic) {
  const unit = toppingUnit(size, settings);
  return money2(side === "whole" ? unit : unit / 2);
}

export function colPrice(col: PriceCol | undefined) {
  return money2(moneyNumber(col?.price));
}

export function itemSizePrice(item: Pick<MenuItem, "prices">, size: string, settings: ShopSettingsPublic) {
	const want = size || item.prices[0]?.label || "";
	const exact = item.prices.find((p) => p.label === want);
	if (exact && colPrice(exact) > 0) return colPrice(exact);
	if (want === "XL") {
		const lg = item.prices.find((p) => p.label === "LG") ?? item.prices[item.prices.length - 1];
		if (lg && colPrice(lg) > 0 && settings.xlPriceAdd > 0) return money2(colPrice(lg) + Math.max(0, settings.xlPriceAdd));
	}
	const first = pizzaSizesFor(item, settings).find((p) => colPrice(p) > 0) ?? item.prices[0];
	return colPrice(first);
}
export function pizzaSizesFor(item: Pick<MenuItem, "prices">, _settings?: ShopSettingsPublic): PriceCol[] {
	const priced = item.prices.filter((p) => String(p.price ?? "").trim() !== "");
	return priced.length ? priced : item.prices;
}
export function pizzaNote(settings: ShopSettingsPublic, items?: MenuItem[]) {
	const t = toppingPricesFrom(settings);
	const bits: string[] = [];
	const seen = new Set<string>();
	for (const item of items ?? []) {
		for (const p of pizzaSizesFor(item, settings)) {
			const key = `${p.label ?? ""}|${p.inches ?? ""}`;
			if (seen.has(key)) continue;
			seen.add(key);
			const name = [p.inches, p.label].filter(Boolean).join(" ");
			if (name) bits.push(name);
		}
	}
	const sizeLine = bits.length ? bits.join(" · ") : `12" small · 14" medium · 16" large`;
	const hasXl = [...seen].some((k) => k.startsWith("XL"));
	const tops = hasXl
		? `${formatUsd(t.SM)} / ${formatUsd(t.MD)} / ${formatUsd(t.LG)} / ${formatUsd(t.XL)}`
		: `${formatUsd(t.SM)} / ${formatUsd(t.MD)} / ${formatUsd(t.LG)}`;
	return `${sizeLine}. Extra toppings ${tops} by size. Half toppings are half price.`;
}
export function applyPizzaSizing(categories: MenuCategory[], settings: ShopSettingsPublic): MenuCategory[] {
	return categories.map((cat) => {
		if (cat.kind !== "pizza") return cat;
		return {
			...cat,
			note: pizzaNote(settings, cat.items),
			items: cat.items.map((item) => ({ ...item, prices: pizzaSizesFor(item, settings) })),
		};
	});
}

export function shortPizzaName(name: string) {
  return name.replace(/ Pizza$/i, "").trim() || name;
}

export function describeBuild(_itemName: string, _size: string | undefined, toppings: PizzaToppingPick[], halfName?: string) {
  const bits: string[] = [];
  if (halfName) bits.push(`half ${shortPizzaName(halfName)}`);
  const whole = toppings.filter((t) => t.side === "whole").map((t) => toppingName(t.id));
  const left = toppings.filter((t) => t.side === "left").map((t) => toppingName(t.id));
  const right = toppings.filter((t) => t.side === "right").map((t) => toppingName(t.id));
  if (whole.length) bits.push(`+ ${whole.join(", ")}`);
  if (left.length) bits.push(`left: ${left.join(", ")}`);
  if (right.length) bits.push(`right: ${right.join(", ")}`);
  return bits.join(" · ");
}

export function pricePizzaBuild(opts: {
  item: Pick<MenuItem, "name" | "prices">;
  other?: Pick<MenuItem, "name" | "prices"> | null;
  size: string;
  toppings: PizzaToppingPick[];
  settings: ShopSettingsPublic;
}) {
  const size = opts.size || "LG";
  const left = itemSizePrice(opts.item, size, opts.settings);
  const right = opts.other ? itemSizePrice(opts.other, size, opts.settings) : 0;
  const base = money2(Math.max(left, right));
  const extras = opts.toppings.reduce((n, t) => n + toppingCharge(size, t.side, opts.settings), 0);
  const unitPrice = money2(base + extras);
  const halfName = opts.other && opts.other.name !== opts.item.name ? opts.other.name : undefined;
  const detail = describeBuild(opts.item.name, size, opts.toppings, halfName);
  const name = halfName ? `${shortPizzaName(opts.item.name)} / ${shortPizzaName(halfName)} Pizza` : opts.item.name;
  return { unitPrice, detail, name, halfName };
}

export function lineCaption(line: { name: string; size?: string; detail?: string }) {
  const size = line.size ? ` · ${line.size}` : "";
  return `${line.name}${size}`;
}

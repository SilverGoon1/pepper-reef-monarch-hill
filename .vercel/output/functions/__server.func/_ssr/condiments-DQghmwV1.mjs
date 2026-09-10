import { P as moneyNumber } from "./hours-BHiQSWtc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/condiments-DQghmwV1.js
function nid(name, index) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24) || `cond-${index + 1}`;
}
function condimentMax(raw) {
	const n = Math.round(Number(raw ?? 9));
	if (!Number.isFinite(n) || n < 1) return 9;
	return Math.min(9, n);
}
function sanitizeCondiments(raw) {
	if (!Array.isArray(raw)) return [];
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const row of raw.slice(0, 24)) {
		const rec = row && typeof row === "object" ? row : {};
		const name = String(rec.name ?? "").trim().slice(0, 40);
		if (!name) continue;
		let id = String(rec.id ?? "").trim().slice(0, 40) || nid(name, out.length);
		if (seen.has(id)) id = `${id}-${out.length + 1}`;
		seen.add(id);
		const price = moneyNumber(rec.price);
		const extraRaw = rec.extraPrice === void 0 || rec.extraPrice === "" ? price : moneyNumber(rec.extraPrice);
		out.push({
			id,
			name,
			price: price > 0 ? String(Math.round(price * 100) / 100) : "0",
			extraPrice: extraRaw > 0 ? String(Math.round(extraRaw * 100) / 100) : "0",
			maxQty: String(condimentMax(rec.maxQty))
		});
	}
	return out;
}
function condimentCharge(c, qty) {
	const cap = condimentMax(c.maxQty);
	const n = Math.max(0, Math.min(cap, Math.round(Number(qty) || 0)));
	if (n <= 0) return 0;
	const add = Math.max(0, moneyNumber(c.price));
	const extra = Math.max(0, moneyNumber(c.extraPrice || c.price));
	return Math.round((add + extra * Math.max(0, n - 1)) * 100) / 100;
}
function sanitizeCondimentPicks(raw, catalog) {
	const list = Array.isArray(raw) ? raw : [];
	const byId = new Map(catalog.map((c) => [c.id, c]));
	const picks = [];
	for (const row of list) {
		const rec = row && typeof row === "object" ? row : {};
		const c = byId.get(String(rec.id ?? ""));
		if (!c) continue;
		const cap = condimentMax(c.maxQty);
		const qty = Math.max(0, Math.min(cap, Math.round(moneyNumber(rec.qty))));
		if (qty <= 0) continue;
		picks.push({
			id: c.id,
			name: c.name,
			qty,
			charge: condimentCharge(c, qty)
		});
	}
	return picks;
}
function condimentTotal(picks) {
	return Math.round(picks.reduce((n, p) => n + p.charge, 0) * 100) / 100;
}
function condimentDetail(picks) {
	return picks.filter((p) => p.qty > 0).map((p) => p.qty > 1 ? `${p.name} ×${p.qty}` : p.name).join(", ");
}
function mergeItemDetail(...parts) {
	return parts.map((p) => String(p ?? "").trim()).filter(Boolean).join(" · ");
}
//#endregion
export { mergeItemDetail as a, condimentTotal as i, condimentDetail as n, sanitizeCondimentPicks as o, condimentMax as r, sanitizeCondiments as s, condimentCharge as t };

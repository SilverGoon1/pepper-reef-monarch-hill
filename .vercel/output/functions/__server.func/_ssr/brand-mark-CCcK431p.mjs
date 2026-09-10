import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/brand-mark-CCcK431p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Admin destinations. Menu & Shop Details is first. Settings stays last. POS lives in the title bar. */
var ADMIN_NAV = [
	{
		to: "/admin/menu",
		label: "Menu & Shop Details",
		pin: "start"
	},
	{
		to: "/admin/center",
		label: "Customer Center",
		pip: true
	},
	{
		to: "/admin/financials",
		label: "Financials"
	},
	{
		to: "/admin/bots",
		label: "Bot access"
	},
	{
		to: "/admin/patches",
		label: "Patches"
	},
	{
		to: "/board",
		label: "Wall menu"
	},
	{
		to: "/admin/background",
		label: "Settings",
		pin: "end"
	}
];
var SHOP_BACKDROP_EVENT = "southend-backdrop";
var SHOP_LOGO_EVENT = "southend-logo";
function emitShopBackdrop() {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new Event(SHOP_BACKDROP_EVENT));
}
function onShopBackdrop(fn) {
	if (typeof window === "undefined") return () => {};
	window.addEventListener(SHOP_BACKDROP_EVENT, fn);
	return () => window.removeEventListener(SHOP_BACKDROP_EVENT, fn);
}
function emitShopLogo() {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new Event(SHOP_LOGO_EVENT));
}
var DEFAULT_BACKDROP = "/buffalo-mark.webp";
var DEFAULT_LOGO = "/mark.jpg";
var DEFAULT_LOGO_SM = "/mark-sm.jpg";
var SMALL = /* @__PURE__ */ new Set(["stamp", "mast"]);
function BrandMark({ variant = "stamp", className = "" }) {
	const compact = SMALL.has(variant);
	const fallback = compact ? DEFAULT_LOGO_SM : DEFAULT_LOGO;
	const [src, setSrc] = (0, import_react.useState)(fallback);
	(0, import_react.useEffect)(() => {
		const sync = () => {
			const custom = document.documentElement.dataset.shopLogo || "";
			setSrc(custom || fallback);
		};
		sync();
		window.addEventListener(SHOP_LOGO_EVENT, sync);
		return () => window.removeEventListener(SHOP_LOGO_EVENT, sync);
	}, [fallback]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `brand-mark brand-mark-${variant} ${className}`.trim(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "South End Pizza III — a chicken riding a buffalo",
			width: compact ? 192 : 800,
			height: compact ? 192 : 800,
			decoding: "async",
			fetchPriority: variant === "hero" || variant === "stamp" ? "high" : "low"
		})
	});
}
//#endregion
export { emitShopBackdrop as a, SHOP_LOGO_EVENT as i, BrandMark as n, emitShopLogo as o, DEFAULT_BACKDROP as r, onShopBackdrop as s, ADMIN_NAV as t };

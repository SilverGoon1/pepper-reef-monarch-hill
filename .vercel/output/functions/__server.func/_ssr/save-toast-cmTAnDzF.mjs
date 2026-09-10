import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/save-toast-cmTAnDzF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useSaveFlash() {
	const [toast, setToast] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const t = window.setTimeout(() => setToast(null), 2400);
		return () => window.clearTimeout(t);
	}, [toast]);
	function flashOk(changed = true) {
		setToast({
			ok: true,
			text: changed ? "Settings saved." : "No changes to save."
		});
	}
	function flashFail(message) {
		setToast({
			ok: false,
			text: message?.trim() || "Settings were not saved."
		});
	}
	return {
		toast,
		flashOk,
		flashFail,
		dismiss: () => setToast(null)
	};
}
function SaveToast({ toast }) {
	if (!toast) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "save-toast",
		"data-ok": toast.ok ? "true" : "false",
		role: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: toast.ok ? "Saved" : "Not saved" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toast.text })]
	});
}
//#endregion
export { useSaveFlash as n, SaveToast as t };

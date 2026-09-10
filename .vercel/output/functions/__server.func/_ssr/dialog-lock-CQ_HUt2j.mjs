import { o as __toESM } from "../_runtime.mjs";
import { U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dialog-lock-CQ_HUt2j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Lock page scroll for a modal. Focus the panel once — never steal it back from inputs. */
function useDialogLock(onClose, panelRef) {
	const closeRef = (0, import_react.useRef)(onClose);
	closeRef.current = onClose;
	(0, import_react.useEffect)(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const root = panelRef.current;
		const active = document.activeElement;
		if (!active || !root?.contains(active)) root?.focus();
		const onKey = (e) => {
			if (e.key === "Escape") closeRef.current();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [panelRef]);
}
//#endregion
export { useDialogLock as t };

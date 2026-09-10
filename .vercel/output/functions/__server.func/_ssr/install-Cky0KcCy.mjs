import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as getMe } from "./shop-server-Dp-2A_aD.mjs";
import { t as useCurrentUserState } from "./use-current-user-R04Koc-0.mjs";
import { h as Share, p as Smartphone } from "../_libs/lucide-react.mjs";
import { S as ShopHeader } from "./router-Df2FptVQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/install-Cky0KcCy.js
var install_Cky0KcCy_exports = /* @__PURE__ */ __exportAll({ component: () => InstallPage });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function detectIos() {
	if (typeof navigator === "undefined") return false;
	const ua = navigator.userAgent || "";
	return /iPad|iPhone|iPod/.test(ua) || /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
}
function detectStandalone() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches || Boolean(navigator.standalone);
}
function InstallPage() {
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [promptEvent, setPromptEvent] = (0, import_react.useState)(null);
	const [ios, setIos] = (0, import_react.useState)(false);
	const [standalone, setStandalone] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setProfile(null);
			return;
		}
		getMe().then(setProfile).catch(() => setProfile(null));
	}, [isPending, user]);
	(0, import_react.useEffect)(() => {
		setIos(detectIos());
		setStandalone(detectStandalone());
		const onPrompt = (e) => {
			e.preventDefault();
			setPromptEvent(e);
		};
		window.addEventListener("beforeinstallprompt", onPrompt);
		return () => window.removeEventListener("beforeinstallprompt", onPrompt);
	}, []);
	async function install() {
		if (!promptEvent) return;
		setBusy(true);
		try {
			await promptEvent.prompt();
			const choice = await promptEvent.userChoice;
			setDone(choice.outcome === "accepted");
			setPromptEvent(null);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shop-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopHeader, { profile }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "shop-main install-main",
			id: "main",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "page-card install-hero",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "install-icon",
							src: "/icon-512.png",
							width: 180,
							height: 180,
							alt: "SouthEnd"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "shop-brand-kicker",
							children: "South End Pizza III"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "SouthEnd" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub",
							children: "Put the shop on your home screen. Same menu, same account — opens like an app."
						}),
						standalone || done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "points-chip",
							children: "SouthEnd is on this device"
						}) : promptEvent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn-print",
							disabled: busy,
							onClick: () => void install(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
								size: 18,
								strokeWidth: 2.2
							}), busy ? "Installing…" : "Add SouthEnd"]
						}) : ios ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "install-cta",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share, {
								size: 16,
								strokeWidth: 2.2,
								"aria-hidden": true
							}), "Tap Share, then Add to Home Screen"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "install-cta",
							children: "Use your browser menu to install or add to the home screen."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "page-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "iPhone & iPad" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "install-steps",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open this page in Safari." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Tap the Share button." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Choose Add to Home Screen, then Add." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Look for the buffalo mark named SouthEnd." })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "page-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Android" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "install-steps",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open this page in Chrome." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Tap the browser menu." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Choose Install app or Add to Home screen." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Confirm SouthEnd." })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub install-back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Back to the menu"
					})
				})
			]
		})]
	});
}
//#endregion
export { InstallPage as component, install_Cky0KcCy_exports as t };

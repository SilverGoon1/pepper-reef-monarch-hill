import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as getMe } from "./shop-server-DpagHzjx.mjs";
import { t as useCurrentUserState } from "./use-current-user-bU2h6wsg.mjs";
import { L as Headset, T as Phone } from "../_libs/lucide-react.mjs";
import { A as SignedIn, d as Route$20, g as CustomerChat, j as SignedOut, x as ShopHeader } from "./router-CMr1IWu0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/help-DisARy5R.js
var help_DisARy5R_exports = /* @__PURE__ */ __exportAll({ component: () => HelpPage });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HelpPage() {
	const contact = Route$20.useLoaderData();
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setProfile(null);
			return;
		}
		getMe().then(setProfile).catch(() => setProfile(null));
	}, [isPending, user]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shop-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopHeader, { profile }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "shop-main help-main",
			id: "main",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "page-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Customer service" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Call the shop, or use the chat bubble in the corner. The crew sees the request on the messaging center."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "help-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "page-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
							size: 18,
							strokeWidth: 2.2
						}), " Call the shop"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ed-sub",
							children: [
								contact.name,
								" · ",
								contact.address,
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "btn-print",
							href: contact.phoneHref,
							children: contact.phone
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "page-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headset, {
							size: 18,
							strokeWidth: 2.2
						}), " Chat with the shop"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedOut, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub",
							children: "Sign in to send a chat. The crew sees it with your latest ticket."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: { next: "/help" },
							className: "btn-print",
							children: "Sign in to chat"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerChat, {}) })
					]
				})]
			})]
		})]
	});
}
//#endregion
export { HelpPage as component, help_DisARy5R_exports as t };

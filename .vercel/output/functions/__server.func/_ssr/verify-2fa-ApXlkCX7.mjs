import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Y as verifyTotpChallenge } from "./shop-server-MBWgsS8d.mjs";
import { t as useCurrentUserState } from "./use-current-user-Q8r4NahO.mjs";
import { k as RedirectToSignIn, l as Route$15 } from "./router-BdhSMl-o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-2fa-ApXlkCX7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Verify2fa() {
	const { user, isPending } = useCurrentUserState();
	const { next } = Route$15.useSearch();
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-skel",
		children: "Checking sign-in…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (done) {
		if (next) {
			window.location.replace(next);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-skel",
				children: "Continuing…"
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "login-card",
			onSubmit: (e) => {
				e.preventDefault();
				setBusy(true);
				setError("");
				verifyTotpChallenge({ data: { code } }).then(() => setDone(true)).catch((err) => setError(err instanceof Error ? err.message : "Could not verify")).finally(() => setBusy(false));
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Two-factor code" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Open your authenticator app and enter the 6-digit code."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Code" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						inputMode: "numeric",
						autoComplete: "one-time-code",
						value: code,
						onChange: (e) => setCode(e.target.value),
						required: true
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "form-error",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "btn-print",
					disabled: busy,
					children: busy ? "Checking…" : "Verify"
				})
			]
		})
	});
}
//#endregion
export { Verify2fa as component };

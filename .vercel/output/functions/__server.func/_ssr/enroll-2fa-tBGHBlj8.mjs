import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as startTotpSetup, c as confirmTotpSetup } from "./shop-server-Dp-2A_aD.mjs";
import { t as useCurrentUserState } from "./use-current-user-R04Koc-0.mjs";
import { O as RedirectToSignIn, f as Route$23 } from "./router-Df2FptVQ.mjs";
import { t as InviteQr } from "./invite-qr-DU6GqLmr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enroll-2fa-tBGHBlj8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Enroll2fa() {
	const { user, isPending } = useCurrentUserState();
	const { next } = Route$23.useSearch();
	const [secret, setSecret] = (0, import_react.useState)("");
	const [uri, setUri] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		startTotpSetup().then((r) => {
			setSecret(r.secret);
			setUri(r.uri);
		}).catch((err) => setError(err instanceof Error ? err.message : "Could not start setup"));
	}, [user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-skel",
		children: "Checking sign-in…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (done) {
		const dest = next || "/admin/pos";
		window.location.replace(dest);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-skel",
			children: "Opening the shop desk…"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "login-card",
			onSubmit: (e) => {
				e.preventDefault();
				setBusy(true);
				setError("");
				confirmTotpSetup({ data: { code } }).then(() => setDone(true)).catch((err) => setError(err instanceof Error ? err.message : "Could not confirm")).finally(() => setBusy(false));
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shop-brand-kicker",
					children: "Shop desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Set up two-factor" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Admin requires an authenticator app (Google Authenticator, Authy, 1Password). Scan the code or type the key, then enter a 6-digit code to confirm."
				}),
				uri ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InviteQr, {
					value: uri,
					label: "Authenticator QR code"
				}) : null,
				secret ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "totp-secret",
					children: secret
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Preparing a key…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirm code" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
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
					disabled: busy || !secret,
					children: busy ? "Saving…" : "Confirm and continue"
				})
			]
		})
	});
}
//#endregion
export { Enroll2fa as component };

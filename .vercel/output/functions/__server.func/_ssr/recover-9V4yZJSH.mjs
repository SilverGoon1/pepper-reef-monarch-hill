import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as recoverPassword } from "./shop-server-Dp-2A_aD.mjs";
import { n as BrandMark } from "./brand-mark-CCcK431p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recover-9V4yZJSH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Recover() {
	const [identifier, setIdentifier] = (0, import_react.useState)("");
	const [proof, setProof] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setError("");
		if (password !== confirm) {
			setError("The new passwords do not match.");
			return;
		}
		if (password.length < 8) {
			setError("Use at least 8 characters for the new password.");
			return;
		}
		setBusy(true);
		try {
			await recoverPassword({ data: {
				identifier,
				proof,
				password
			} });
			setDone(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not recover the account.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { variant: "login" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shop-brand-kicker",
					children: "South End Pizza III"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Recover password" }),
				done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Password updated. Sign in with the new one."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "btn-print",
					children: "Sign in"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Enter the email or phone on the account, then the phone or name saved on the profile. Google and X accounts sign in with those buttons — they do not use a shop password."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "login-form",
						onSubmit: (e) => void submit(e),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email or phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input",
									value: identifier,
									onChange: (e) => setIdentifier(e.target.value),
									autoComplete: "username",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Phone or name on file" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input",
									value: proof,
									onChange: (e) => setProof(e.target.value),
									autoComplete: "tel",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "New password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input",
									type: "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									autoComplete: "new-password",
									minLength: 8,
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirm password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input",
									type: "password",
									value: confirm,
									onChange: (e) => setConfirm(e.target.value),
									autoComplete: "new-password",
									minLength: 8,
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
								children: busy ? "Saving…" : "Set new password"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "login-back",
						children: "Back to sign in"
					})
				] })
			]
		})
	});
}
//#endregion
export { Recover as component };

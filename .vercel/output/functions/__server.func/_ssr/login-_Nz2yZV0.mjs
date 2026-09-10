import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, b as Navigate, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as identifierToEmail } from "./phone-PlVj3DDJ.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-OKua9B5D.mjs";
import { n as BrandMark } from "./brand-mark-DrSWcYOk.mjs";
import { J as updateProfile, s as claimReferral, y as getStorefront } from "./shop-server-MBWgsS8d.mjs";
import { t as useCurrentUserState } from "./use-current-user-Q8r4NahO.mjs";
import { T as peekReferral, u as Route$18, w as captureReferral } from "./router-CXnXlITz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-_Nz2yZV0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const { next, ref } = Route$18.useSearch();
	const [mode, setMode] = (0, import_react.useState)("email");
	const [tab, setTab] = (0, import_react.useState)("in");
	const [identifier, setIdentifier] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [password2, setPassword2] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [showMark, setShowMark] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		captureReferral(ref);
	}, [ref]);
	(0, import_react.useEffect)(() => {
		getStorefront().then((d) => setShowMark(d.settings.showMark)).catch(() => setShowMark(true));
	}, []);
	if (isPending && !busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-skel",
		children: "Checking sign-in…"
	});
	if (user && !busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: next || "/",
		replace: true
	});
	async function submit(e) {
		e.preventDefault();
		setError("");
		setBusy(true);
		const parsed = identifierToEmail(identifier);
		if (mode === "phone" && !parsed.phone) {
			setBusy(false);
			setError("Enter a 10-digit US phone number.");
			return;
		}
		if (mode === "email" && !parsed.email.includes("@")) {
			setBusy(false);
			setError("Enter a valid email or the shop username.");
			return;
		}
		if (tab === "up" && password.length < 8) {
			setBusy(false);
			setError("Password needs at least 8 characters.");
			return;
		}
		if (tab === "up" && password !== password2) {
			setBusy(false);
			setError("Password and confirm password do not match.");
			return;
		}
		try {
			if (tab === "up") {
				const { error: err } = await authClient.signUp.email({
					email: parsed.email,
					password,
					name: name || (parsed.phone ? parsed.phone : parsed.email.split("@")[0])
				});
				if (err) throw new Error(err.message || "Could not create the account.");
				if (parsed.phone || name) updateProfile({ data: {
					phone: parsed.phone ?? "",
					displayName: name
				} }).catch(() => void 0);
				const invite = peekReferral();
				if (invite) claimReferral({ data: { code: invite } }).catch(() => void 0);
			} else {
				const { error: err } = await authClient.signIn.email({
					email: parsed.email,
					password
				});
				if (err) throw new Error(err.message || "Could not sign in.");
			}
			navigate({
				to: next || "/",
				replace: true
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign-in failed.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-card",
			children: [
				showMark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { variant: "login" }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shop-brand-kicker",
					children: "South End Pizza III"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: tab === "up" ? "Create account" : "Sign in" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: next === "/checkout" ? "Sign in to place your order, or go back and check out as a guest. Your cart stays on this device." : "Use email, the shop username, or a US phone number plus a password. Google and X work too."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "seg",
					role: "group",
					"aria-label": "Identifier type",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-on": mode === "email",
						onClick: () => setMode("email"),
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-on": mode === "phone",
						onClick: () => setMode("phone"),
						children: "Phone"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "seg",
					role: "group",
					"aria-label": "Create or sign in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-on": tab === "in",
						onClick: () => setTab("in"),
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-on": tab === "up",
						onClick: () => setTab("up"),
						children: "Create account"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "login-form",
					onSubmit: (e) => void submit(e),
					children: [
						tab === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: name,
								onChange: (e) => setName(e.target.value),
								autoComplete: "name"
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mode === "phone" ? "Phone" : "Email or username" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: identifier,
								onChange: (e) => setIdentifier(e.target.value),
								autoComplete: mode === "phone" ? "tel" : "username",
								inputMode: mode === "phone" ? "tel" : "email",
								placeholder: mode === "phone" ? "(609) 555-0100" : "Admin or you@email.com",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								autoComplete: tab === "up" ? "new-password" : "current-password",
								minLength: 8,
								required: true
							})]
						}),
						tab === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirm password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								type: "password",
								value: password2,
								onChange: (e) => setPassword2(e.target.value),
								autoComplete: "new-password",
								minLength: 8,
								required: true
							})]
						}) : null,
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "form-error",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn-print",
							disabled: busy,
							children: busy ? "Please wait…" : tab === "up" ? "Create account" : "Sign in"
						}),
						tab === "in" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/recover",
							className: "login-back",
							children: "Forgot password?"
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "login-split",
					children: "or"
				}),
				GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "ed-btn",
					disabled: busy,
					onClick: () => void signIn(p.providerId, { callbackURL: next || "/" }),
					children: ["Continue with ", p.label]
				}, p.providerId)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "login-back",
					children: "Back to the menu"
				}),
				next === "/checkout" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/checkout",
					className: "login-back",
					children: "Checkout as a guest"
				}) : null
			]
		})
	});
}
//#endregion
export { Login as component };

import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, b as Navigate, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as runPreSignInSignOut, i as signIn, r as getBearerToken, t as authClient } from "./client-BNc6SJGC.mjs";
import { n as identifierToEmail } from "./phone-Be_Se2od.mjs";
import { J as updateProfile, s as claimReferral, y as getStorefront } from "./shop-server-Dp-2A_aD.mjs";
import { n as BrandMark } from "./brand-mark-CCcK431p.mjs";
import { t as useCurrentUserState } from "./use-current-user-R04Koc-0.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { t as GROK_PROVIDERS } from "./server-CN2TkthH.mjs";
import { C as captureReferral, u as Route$20, w as peekReferral } from "./router-Df2FptVQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BkgzGuxI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BEARER_KEY = "grok-auth.bearer-token";
function friendlyAuthError(err) {
	const raw = err instanceof Error ? err.message : "Sign-in failed.";
	const lower = raw.toLowerCase();
	if (lower.includes("invalid origin")) return "This shop address is not on the sign-in list. Open the published shop link and try again.";
	if (lower.includes("pop-up") || lower.includes("popup")) return "Allow pop-ups for this shop, then try Google or X again.";
	if (lower.includes("cancelled") || lower.includes("canceled") || lower.includes("did not finish")) return "Sign-in did not finish. Try again.";
	return raw;
}
function inSandboxPreview() {
	return typeof window !== "undefined" && window.location.hostname.endsWith(".grok-sandbox.com");
}
function pageIsFramed() {
	if (typeof window === "undefined") return false;
	try {
		return window.self !== window.top;
	} catch {
		return true;
	}
}
function waitForPopupToken(popup, origin) {
	return new Promise((resolve) => {
		let settled = false;
		let closeTimer;
		const settle = (token) => {
			if (settled) return;
			settled = true;
			cleanup();
			resolve(token);
		};
		const onMessage = (event) => {
			if (event.origin !== origin) return;
			const data = event.data;
			if (!data || data.source !== "grok-auth-popup") return;
			settle(data.token ?? null);
		};
		const pollTimer = window.setInterval(() => {
			if (!popup.closed) return;
			window.clearInterval(pollTimer);
			closeTimer = window.setTimeout(() => settle(null), 400);
		}, 300);
		function cleanup() {
			window.clearInterval(pollTimer);
			if (closeTimer !== void 0) window.clearTimeout(closeTimer);
			window.removeEventListener("message", onMessage);
		}
		window.addEventListener("message", onMessage);
	});
}
async function signInWithAuthPopup(providerId) {
	const origin = window.location.origin;
	const popup = window.open(`${origin}/auth/popup?providerId=${encodeURIComponent(providerId)}`, `southend-signin-${Date.now()}`, "popup,width=500,height=650");
	await runPreSignInSignOut({
		livePreview: true,
		hasBearer: Boolean(getBearerToken()),
		requestSignOut: () => authClient.signOut(),
		clearToken: () => {
			try {
				window.sessionStorage.removeItem(BEARER_KEY);
			} catch {}
		}
	});
	if (!popup) throw new Error("Pop-up blocked — allow pop-ups for Google and X sign-in.");
	const token = await waitForPopupToken(popup, origin);
	if (!token) throw new Error("Sign-in was cancelled or did not finish.");
	try {
		window.sessionStorage.setItem(BEARER_KEY, token);
	} catch {}
	try {
		await authClient.getSession();
	} catch {}
}
/**
* Google / X sign-in. The sandbox preview already popups from `signIn()`.
* A GitHub live build inside an iframe is not that host, so Google/X block a
* full-page redirect — open `/auth/popup` ourselves in that case.
*/
async function startSocialSignIn(providerId, opts) {
	if (pageIsFramed() && !inSandboxPreview()) {
		await signInWithAuthPopup(providerId);
		return;
	}
	await signIn(providerId, opts);
}
function GoogleMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		width: "18",
		height: "18",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M21.35 11.1h-9.18v2.96h5.27c-.23 1.37-1.55 4.02-5.27 4.02A6.13 6.13 0 1 1 12.17 5.9c1.75 0 2.93.75 3.6 1.4l2.45-2.36C16.8 3.54 14.7 2.6 12.17 2.6A9.4 9.4 0 1 0 21.57 12c0-.6-.06-.9-.22-.9Z"
		})
	});
}
function XMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		width: "16",
		height: "16",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M14.1 10.35 21.2 2h-1.68l-6.16 7.24L8.44 2H2.5l7.45 10.86L2.5 22h1.68l6.52-7.66L15.56 22H21.5l-7.4-11.65Zm-2.3 2.71-.76-1.08-6.02-8.6h2.59l4.86 6.95.76 1.08 6.32 9.04h-2.59l-5.16-7.39Z"
		})
	});
}
function providerMark(label) {
	if (label === "X") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XMark, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleMark, {});
}
function Login() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const { next, ref, error: searchError } = Route$20.useSearch();
	const [mode, setMode] = (0, import_react.useState)("email");
	const [tab, setTab] = (0, import_react.useState)("in");
	const [identifier, setIdentifier] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [password2, setPassword2] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(searchError ? friendlyAuthError(new Error(searchError)) : "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [showMark, setShowMark] = (0, import_react.useState)(true);
	const closeTo = next || "/";
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
		to: closeTo,
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
				to: closeTo,
				replace: true
			});
		} catch (err) {
			setError(friendlyAuthError(err));
			setBusy(false);
		}
	}
	async function social(providerId) {
		setError("");
		setBusy(true);
		try {
			await startSocialSignIn(providerId, {
				callbackURL: next || "/",
				errorCallbackURL: "/login"
			});
			navigate({
				to: closeTo,
				replace: true
			});
		} catch (err) {
			setError(friendlyAuthError(err));
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "login-page",
		"data-popup": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: closeTo,
			className: "login-scrim",
			"aria-label": "Close sign-in"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "login-card login-dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "login-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: closeTo,
					className: "login-close",
					"aria-label": "Back to the menu",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						size: 18,
						strokeWidth: 2.4,
						"aria-hidden": true
					})
				}),
				showMark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { variant: "login" }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shop-brand-kicker",
					children: "South End Pizza III"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					id: "login-title",
					children: tab === "up" ? "Create account" : "Welcome back"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: next === "/checkout" ? "Sign in to place your order, or check out as a guest. Your cart stays on this device." : "Email, the shop username, or a US phone number. Google and X work too."
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
								placeholder: mode === "phone" ? "(609) 555-0100" : "you@email.com or username",
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
								placeholder: "Password",
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
					children: "or continue with"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "login-socials",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "login-social",
						disabled: busy,
						onClick: () => void social(p.providerId),
						children: [providerMark(p.label), p.label]
					}, p.providerId))
				}),
				next === "/checkout" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/checkout",
					className: "login-back",
					children: "Checkout as a guest"
				}) : null
			]
		})]
	});
}
//#endregion
export { Login as component };

import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, b as Navigate, f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as getTwoFactorStatus, g as getMe, o as claimAdmin } from "./shop-server-Dp-2A_aD.mjs";
import { t as useCurrentUserState } from "./use-current-user-R04Koc-0.mjs";
import { b as isTransientFetchError } from "./router-Df2FptVQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guards-PPFf8hmh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function accountLoadMessage(err) {
	const raw = err instanceof Error ? err.message : "";
	const lower = raw.toLowerCase();
	if (lower.includes("profiles_pkey") || lower.includes("duplicate key") || lower.includes("unique constraint")) return "The shop is still opening your staff account. Tap Try again.";
	if (isTransientFetchError(err)) return "The shop did not answer. Tap Try again.";
	return raw.trim() || "Could not load your staff account.";
}
async function loadStaffAccount() {
	let last;
	for (let i = 0; i < 3; i += 1) try {
		return await Promise.all([getMe(), getTwoFactorStatus()]);
	} catch (err) {
		last = err;
		const msg = err instanceof Error ? err.message : "";
		if (!(isTransientFetchError(err) || /profiles_pkey|duplicate key|unique constraint/i.test(msg)) || i === 2) throw err;
		await new Promise((resolve) => setTimeout(resolve, 280 * (i + 1)));
	}
	throw last;
}
function SessionGate({ children, needAdmin }) {
	const { user, isPending } = useCurrentUserState();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [twoFactor, setTwoFactor] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [claiming, setClaiming] = (0, import_react.useState)(false);
	const [retry, setRetry] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		let live = true;
		const timeout = window.setTimeout(() => {
			if (!live) return;
			setError("Account is taking too long. Tap Try again.");
		}, 14e3);
		loadStaffAccount().then(([p, t]) => {
			if (!live) return;
			window.clearTimeout(timeout);
			setProfile(p);
			setTwoFactor(t);
		}).catch((e) => {
			if (!live) return;
			window.clearTimeout(timeout);
			setError(accountLoadMessage(e));
		});
		return () => {
			live = false;
			window.clearTimeout(timeout);
		};
	}, [
		isPending,
		user,
		retry
	]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-skel",
		children: "Loading account…"
	});
	if (!user) {
		const next = pathname.startsWith("/") && !pathname.startsWith("//") ? pathname : "/";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/login",
			search: { next }
		});
	}
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Could not load your account" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "Nothing was lost. Tap Try again to open the shop desk."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn-print",
				onClick: () => {
					setError("");
					setProfile(null);
					setTwoFactor(null);
					setRetry((n) => n + 1);
				},
				children: "Try again"
			})
		]
	});
	if (!profile || !twoFactor) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-skel",
		children: "Loading account…"
	});
	if (profile.banned) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Account restricted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This account has been restricted. Call the shop if you need help." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "btn-ghost",
				children: "Back to menu"
			})
		]
	});
	if (twoFactor.enroll) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Set up two-factor" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Shop admin needs an authenticator app before the desk can open." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/enroll-2fa",
				search: { next: pathname },
				className: "btn-print",
				children: "Enroll authenticator"
			})
		]
	});
	if (twoFactor.required) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Two-factor check" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Enter the code from your authenticator app to continue." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/verify-2fa",
				search: { next: pathname },
				className: "btn-print",
				children: "Verify"
			})
		]
	});
	if (needAdmin && profile.role !== "admin") {
		if (!profile.adminExists) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Set up shop admin" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No administrator exists yet. Claim this account as the shop admin to manage delivery zones, rewards, vacation mode, and the live menu." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-print",
					disabled: claiming,
					onClick: () => {
						setClaiming(true);
						claimAdmin().then(() => getMe().then(setProfile)).catch((e) => setError(e instanceof Error ? e.message : "Could not claim admin")).finally(() => setClaiming(false));
					},
					children: claiming ? "Saving…" : "Make this the admin account"
				})
			]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Staff only" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This area is for the shop administrator." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "btn-ghost",
					children: "Back to menu"
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: children({
		profile,
		twoFactor
	}) });
}
//#endregion
export { SessionGate as t };

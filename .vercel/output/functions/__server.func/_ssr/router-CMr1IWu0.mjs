import { o as __toESM } from "../_runtime.mjs";
import { Q as literal, at as union, et as number, it as string, tt as object } from "../_libs/@better-auth/core+[...].mjs";
import { C as require_jsx_runtime, S as useRouter, U as require_react, _ as createFileRoute, b as Navigate, d as HeadContent, f as useRouterState, g as lazyRouteComponent, h as Outlet, l as require_react_dom, m as createRouter, u as Scripts, v as createRootRoute, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as __exportAll } from "./ssr.mjs";
import { D as formatTicketNo, E as formatShopWhen, J as sanitizeSeasonEffect, M as isActiveOrderStatus, O as formatUsd, U as payMethodLabel, u as RESTAURANT, w as formatShopClock } from "./hours-DVH-z3bz.mjs";
import { o as signOut } from "./client-ClTYstkY.mjs";
import { i as SHOP_LOGO_EVENT, n as BrandMark, r as DEFAULT_BACKDROP, s as onShopBackdrop } from "./brand-mark-DrSWcYOk.mjs";
import { E as listMyOrders, G as startChat, I as sendChatMessage, O as loadChatMessages, S as listAllOrders, T as listMyChats, g as getMe, m as getAdminInsights, p as getAdminInboxCount, r as attachChatOrder, s as claimReferral, v as getShopContact, y as getStorefront } from "./shop-server-DpagHzjx.mjs";
import { t as useCurrentUserState } from "./use-current-user-bU2h6wsg.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { A as MessageCircle, E as PenLine, J as CircleHelp, N as LogOut, O as Monitor, T as Phone, c as TriangleAlert, et as ChevronDown, m as ShoppingBag, ot as ArrowUp, s as UserRound, t as X } from "../_libs/lucide-react.mjs";
import { n as auth } from "./server-DtsUK-Dx.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gates-Bw7-jHvJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/** Render children only when a user is present (real session, or the disabled-auth dev user). */
function SignedIn({ children }) {
	const { user } = useCurrentUserState();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
}
/**
* Render children only once we KNOW the visitor is signed out (`isPending` has
* cleared and there is no user). Hidden while the session is still loading.
*/
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/page-visible-BhB8cX_9.js
/** Run `fn` immediately and on an interval, skipping ticks while the tab is hidden. */
function onVisibleInterval(ms, fn) {
	if (typeof window === "undefined") return () => {};
	let timer = 0;
	const tick = () => {
		if (document.hidden) return;
		fn();
	};
	fn();
	timer = window.setInterval(tick, ms);
	const onVis = () => {
		if (!document.hidden) fn();
	};
	document.addEventListener("visibilitychange", onVis);
	return () => {
		window.clearInterval(timer);
		document.removeEventListener("visibilitychange", onVis);
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/admin-inbox-Bpd_Puo4.js
var ADMIN_INBOX_EVENT = "southend-admin-inbox";
function emitAdminInbox(count) {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new CustomEvent(ADMIN_INBOX_EVENT, { detail: Math.max(0, Math.round(count)) }));
}
function onAdminInbox(fn) {
	if (typeof window === "undefined") return () => {};
	const handler = (e) => {
		const n = e.detail;
		if (typeof n === "number" && Number.isFinite(n)) fn(n);
	};
	window.addEventListener(ADMIN_INBOX_EVENT, handler);
	return () => window.removeEventListener(ADMIN_INBOX_EVENT, handler);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/referral-Bdd58xwf.js
var KEY = "se3-invite-code";
var CODE = /^[A-Z0-9]{4,16}$/;
function normalizeInviteCode(raw) {
	const s = String(raw ?? "").trim().toUpperCase();
	return CODE.test(s) ? s : "";
}
function captureReferral(raw) {
	if (typeof window === "undefined") return;
	let code = normalizeInviteCode(raw);
	if (!code) try {
		code = normalizeInviteCode(new URLSearchParams(window.location.search).get("ref"));
	} catch {
		code = "";
	}
	if (!code) return;
	try {
		window.localStorage.setItem(KEY, code);
	} catch {}
}
function peekReferral() {
	if (typeof window === "undefined") return "";
	try {
		return normalizeInviteCode(window.localStorage.getItem(KEY));
	} catch {
		return "";
	}
}
function clearReferral() {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.removeItem(KEY);
	} catch {}
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/shop-header-BZGs4ZnD.js
function lineKey(line) {
	const tops = (line.toppings ?? []).map((t) => `${t.id}:${t.side}`).sort().join(",");
	const conds = (line.condiments ?? []).map((c) => `${c.id}:${c.qty}`).sort().join(",");
	return `${line.itemId}::${line.size ?? ""}::${line.halfItemId ?? ""}::${tops}::${conds}::${line.detail ?? ""}::${line.comment ?? ""}`;
}
var useCartStore = create()(persist((set) => ({
	lines: [],
	notes: "",
	bagOpen: false,
	openBag: () => set({ bagOpen: true }),
	closeBag: () => set({ bagOpen: false }),
	toggleBag: () => set((s) => ({ bagOpen: !s.bagOpen })),
	add: (line) => set((s) => {
		const key = lineKey(line);
		const qtyAdd = Math.max(1, line.qty ?? 1);
		if (s.lines.find((l) => l.key === key)) return { lines: s.lines.map((l) => l.key === key ? {
			...l,
			qty: l.qty + qtyAdd
		} : l) };
		return { lines: [...s.lines, {
			key,
			itemId: line.itemId,
			categoryId: line.categoryId,
			name: line.name,
			size: line.size,
			detail: line.detail,
			comment: line.comment,
			toppings: line.toppings,
			halfItemId: line.halfItemId,
			condiments: line.condiments,
			unitPrice: line.unitPrice,
			qty: qtyAdd
		}] };
	}),
	setQty: (key, qty) => set((s) => ({ lines: qty <= 0 ? s.lines.filter((l) => l.key !== key) : s.lines.map((l) => l.key === key ? {
		...l,
		qty
	} : l) })),
	remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
	setNotes: (notes) => set({ notes }),
	clear: () => set({
		lines: [],
		notes: ""
	})
}), {
	name: "south-end-cart-v1",
	storage: createJSONStorage(() => {
		if (typeof window === "undefined") return {
			getItem: () => null,
			setItem: () => {},
			removeItem: () => {}
		};
		return localStorage;
	}),
	skipHydration: true,
	partialize: (s) => ({
		lines: s.lines,
		notes: s.notes
	})
}));
if (typeof window !== "undefined") useCartStore.persist.rehydrate();
function cartTotals(lines) {
	return {
		count: lines.reduce((n, l) => n + l.qty, 0),
		subtotal: Math.round(lines.reduce((n, l) => n + l.unitPrice * l.qty, 0) * 100) / 100
	};
}
function accountLabel(profile, user) {
	const raw = String(profile?.displayName || user?.displayName || "").trim();
	if (raw) return raw;
	const email = String(profile?.email || user?.primaryEmail || "").trim();
	const at = email.indexOf("@");
	if (at > 0) return email.slice(0, at);
	return "You";
}
function SignOutItem() {
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const [outMsg, setOutMsg] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "menuitem",
		className: "account-menu-out",
		disabled: signingOut,
		onClick: () => {
			setSigningOut(true);
			setOutMsg("");
			signOut().catch((e) => {
				setSigningOut(false);
				setOutMsg(e instanceof Error ? e.message : "Could not sign out. Try again.");
			});
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
			size: 16,
			strokeWidth: 2.2,
			"aria-hidden": true
		}), signingOut ? "Signing out…" : "Sign out"]
	}), outMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "ed-sub account-menu-out-msg",
		children: outMsg
	}) : null] });
}
function AccountMenu({ label, isAdmin, adminUnread, unreadChats, adminExists }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const wrapRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDoc = (e) => {
			if (!wrapRef.current?.contains(e.target)) setOpen(false);
		};
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("mousedown", onDoc);
		window.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDoc);
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "account-menu",
		ref: wrapRef,
		"data-open": open ? "true" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "shop-nav-link shop-nav-name",
			"aria-expanded": open,
			"aria-haspopup": "menu",
			"aria-label": `Account menu, ${label}`,
			onClick: () => setOpen((v) => !v),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shop-nav-name-text",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					size: 14,
					strokeWidth: 2.2,
					"aria-hidden": true
				}),
				adminUnread + unreadChats > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "nav-pip",
					children: adminUnread + unreadChats
				}) : null
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "account-menu-pop",
			role: "menu",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/account",
					role: "menuitem",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
						size: 16,
						strokeWidth: 2.2,
						"aria-hidden": true
					}), "Your account"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/install",
					role: "menuitem",
					className: "account-menu-app",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/icon-180.png",
						alt: "",
						width: 20,
						height: 20,
						className: "account-menu-app-icon"
					}), "Download App"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/help",
					role: "menuitem",
					onClick: () => setOpen(false),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, {
							size: 16,
							strokeWidth: 2.2,
							"aria-hidden": true
						}),
						"Help",
						unreadChats > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "nav-pip",
							children: unreadChats
						}) : null
					]
				}),
				isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/menu",
					search: {},
					role: "menuitem",
					onClick: () => setOpen(false),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
							size: 16,
							strokeWidth: 2.2,
							"aria-hidden": true
						}),
						"Admin",
						adminUnread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "nav-pip",
							children: adminUnread
						}) : null
					]
				}) : null,
				!isAdmin && !adminExists ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/menu",
					search: {},
					role: "menuitem",
					onClick: () => setOpen(false),
					children: "Shop admin"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutItem, {})
			]
		}) : null]
	});
}
function ShopHeader({ title, profile, onOpenCart }) {
	const { isPending, user } = useCurrentUserState();
	const [authReady, setAuthReady] = (0, import_react.useState)(false);
	const [adminUnread, setAdminUnread] = (0, import_react.useState)(profile?.adminInbox ?? 0);
	const lines = useCartStore((s) => s.lines);
	const bagOpen = useCartStore((s) => s.bagOpen);
	const { count } = cartTotals(lines);
	const isAdmin = profile?.role === "admin";
	const headerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setAuthReady(true);
		captureReferral();
	}, []);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		const code = peekReferral();
		if (!code) return;
		claimReferral({ data: { code } }).then(() => clearReferral()).catch(() => clearReferral());
	}, [isPending, user]);
	(0, import_react.useEffect)(() => {
		setAdminUnread(profile?.adminInbox ?? 0);
	}, [profile?.adminInbox]);
	(0, import_react.useEffect)(() => {
		const el = headerRef.current;
		if (!el) return;
		const apply = () => {
			document.documentElement.style.setProperty("--shop-sticky-top", `${el.offsetHeight}px`);
		};
		apply();
		const ro = new ResizeObserver(apply);
		ro.observe(el);
		return () => ro.disconnect();
	}, [
		isAdmin,
		adminUnread,
		count,
		authReady,
		isPending,
		user,
		profile?.displayName
	]);
	(0, import_react.useEffect)(() => {
		if (!isAdmin) return;
		const stopListen = onAdminInbox(setAdminUnread);
		const stopPoll = onVisibleInterval(1e4, () => {
			getAdminInboxCount().then((r) => setAdminUnread(r.unread)).catch(() => void 0);
		});
		return () => {
			stopListen();
			stopPoll();
		};
	}, [isAdmin]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "shop-header no-print",
		ref: headerRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shop-header-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "shop-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { variant: "stamp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shop-brand-text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shop-brand-kicker",
							children: "Egg Harbor Township"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shop-brand-name",
							children: title ?? "South End Pizza III"
						})]
					})]
				}),
				authReady && !isPending && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "shop-nav",
					"aria-label": "Shop",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountMenu, {
						label: accountLabel(profile, user),
						isAdmin,
						adminUnread,
						unreadChats: profile?.unreadChats ?? 0,
						adminExists: profile?.adminExists ?? true
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shop-header-actions",
					children: [
						!authReady || isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "auth-skel",
							"aria-hidden": true
						}) : null,
						isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/pos",
							className: "btn-print pos-title-btn",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
								size: 18,
								strokeWidth: 2.2
							}), "POS"]
						}) : null,
						authReady && !isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/login",
							className: "btn-ghost",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
								size: 16,
								strokeWidth: 2.2
							}), "Sign in"]
						}) }) : null,
						onOpenCart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn-print cart-btn",
							onClick: onOpenCart,
							"aria-expanded": bagOpen,
							"aria-haspopup": "dialog",
							"aria-controls": "bag",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
									size: 18,
									strokeWidth: 2.2
								}),
								"Cart",
								count ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "cart-count",
									"aria-live": "polite",
									children: count
								}) : null
							]
						}) : null
					]
				})
			]
		})
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/fetch-retry-DS-iBWMJ.js
function isTransientFetchError(error) {
	if (!error) return false;
	const name = error instanceof Error ? error.name : "";
	const msg = error instanceof Error ? error.message : String(error);
	return name === "AbortError" || name === "TimeoutError" || /failed to fetch|networkerror|network request failed|load failed|fetch failed|aborted|econnreset|socket/i.test(msg);
}
async function retryTransient(fn, tries = 5, delayMs = 350) {
	let last;
	for (let i = 0; i < tries; i += 1) try {
		return await fn();
	} catch (error) {
		last = error;
		if (!isTransientFetchError(error) || i === tries - 1) throw error;
		await new Promise((resolve) => setTimeout(resolve, delayMs * (i + 1)));
	}
	throw last;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CMr1IWu0.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var RETRY_N = "southend-fetch-retry-n";
var MAX_AUTO = 5;
function AppErrorComponent({ error }) {
	const transient = isTransientFetchError(error);
	(0, import_react.useEffect)(() => {
		if (!transient || typeof window === "undefined") return;
		let n = 0;
		try {
			n = Number(sessionStorage.getItem(RETRY_N) || 0);
		} catch {
			n = 0;
		}
		if (n >= MAX_AUTO) return;
		try {
			sessionStorage.setItem(RETRY_N, String(n + 1));
		} catch {}
		const delay = Math.min(5e3, 500 + n * 650);
		const t = window.setTimeout(() => window.location.reload(), delay);
		return () => window.clearTimeout(t);
	}, [transient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shop-brand-kicker",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						size: 28,
						strokeWidth: 2.2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: transient ? "Reconnecting" : "Something went wrong" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: transient ? "The menu is coming back. This page will refresh in a moment." : error.message || "An unexpected error occurred. Try reloading the page."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-print",
					onClick: () => {
						try {
							sessionStorage.removeItem(RETRY_N);
						} catch {}
						window.location.reload();
					},
					children: "Try again"
				})
			]
		})
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/** Rehydrate the persisted bag once for the whole shop shell. */
function CartHydrate() {
	(0, import_react.useEffect)(() => {
		useCartStore.persist.rehydrate();
	}, []);
	return null;
}
function useCartHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(() => typeof window === "undefined" ? false : useCartStore.persist.hasHydrated());
	(0, import_react.useEffect)(() => {
		if (useCartStore.persist.hasHydrated()) {
			setHydrated(true);
			return;
		}
		const unsub = useCartStore.persist.onFinishHydration(() => setHydrated(true));
		useCartStore.persist.rehydrate();
		return unsub;
	}, []);
	return hydrated;
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function isTyping() {
	const el = document.activeElement;
	if (!el) return false;
	const tag = el.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	(0, import_react.useEffect)(() => {
		let timer = 0;
		let last = 0;
		let seenHidden = false;
		const revive = (e) => {
			if (document.hidden) {
				seenHidden = true;
				return;
			}
			if (isTyping()) return;
			if (document.querySelector("[role=\"dialog\"], .pizza-modal-root")) return;
			if (e?.type === "pageshow" && !e.persisted) return;
			if (e?.type === "visibilitychange" && !seenHidden) return;
			if (Date.now() - last < 1500) return;
			window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				if (document.hidden || isTyping()) return;
				if (document.querySelector("[role=\"dialog\"], .pizza-modal-root")) return;
				last = Date.now();
				router.invalidate().catch((err) => {
					if (!isTransientFetchError(err)) return;
				});
			}, 280);
		};
		window.addEventListener("pageshow", revive);
		document.addEventListener("visibilitychange", revive);
		window.addEventListener("online", revive);
		return () => {
			window.clearTimeout(timer);
			window.removeEventListener("pageshow", revive);
			document.removeEventListener("visibilitychange", revive);
			window.removeEventListener("online", revive);
		};
	}, [router]);
	return null;
}
function applyLogo(data) {
	if (typeof document === "undefined") return;
	const url = data || "";
	document.documentElement.dataset.shopLogo = url;
	const icon = document.querySelector("link[rel=\"icon\"]");
	if (icon) icon.href = url || "/favicon.svg";
	window.dispatchEvent(new Event(SHOP_LOGO_EVENT));
}
function ShopBackdrop() {
	const [src, setSrc] = (0, import_react.useState)(DEFAULT_BACKDROP);
	const [host, setHost] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const node = document.getElementById("shop-backdrop-host") ?? document.createElement("div");
		node.id = "shop-backdrop-host";
		node.className = "shop-backdrop-host";
		if (!node.parentNode) document.body.insertBefore(node, document.body.firstChild);
		setHost(node);
	}, []);
	(0, import_react.useEffect)(() => {
		const load = () => {
			getStorefront().then((d) => {
				setSrc(d.settings.backdropData || "/buffalo-mark.webp");
				applyLogo(d.settings.logoData || "");
			}).catch(() => {
				setSrc(DEFAULT_BACKDROP);
				applyLogo("");
			});
		};
		load();
		return onShopBackdrop(load);
	}, []);
	if (!host) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "shop-backdrop-layer no-print",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "",
			decoding: "async",
			fetchPriority: "low"
		})
	}), host);
}
var DOTS = Array.from({ length: 20 }, (_, i) => i);
function SeasonFx() {
	const [fx, setFx] = (0, import_react.useState)("none");
	(0, import_react.useEffect)(() => {
		const load = () => {
			getStorefront().then((d) => setFx(sanitizeSeasonEffect(d.settings.seasonEffect))).catch(() => setFx("none"));
		};
		load();
		return onShopBackdrop(load);
	}, []);
	if (fx === "none") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "season-fx no-print",
		"data-fx": fx,
		"aria-hidden": true,
		children: DOTS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { "--i": i } }, i))
	});
}
function OrderTicketCard({ order }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "order-ticket",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "shop-brand-kicker",
				children: "Linked ticket"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
				"#",
				formatTicketNo(order.ticketNo),
				" · ",
				order.fulfillment === "delivery" ? "Delivery" : "Pickup"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
				order.status.replaceAll("_", " "),
				" · ",
				formatUsd(order.total),
				order.createdAt ? ` · placed ${formatShopWhen(order.createdAt)}` : ""
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: order.items.slice(0, 6).map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				it.qty,
				"× ",
				it.name,
				it.size ? ` · ${it.size}` : "",
				it.detail ? ` · ${it.detail}` : "",
				it.comment ? ` · Cook: ${it.comment}` : ""
			] }, `${it.name}-${i}`)) }),
			order.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "order-ticket-notes",
				children: order.notes
			}) : null
		]
	});
}
function CustomerChat({ compact }) {
	const [threads, setThreads] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [active, setActive] = (0, import_react.useState)("");
	const [orderId, setOrderId] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [fresh, setFresh] = (0, import_react.useState)(false);
	const logRef = (0, import_react.useRef)(null);
	const freshStart = (0, import_react.useRef)(false);
	const hadMail = (0, import_react.useRef)(false);
	function beginFresh() {
		freshStart.current = true;
		setFresh(true);
		setActive("");
		setDraft("");
		setMessages([]);
		setError("");
		hadMail.current = false;
	}
	function refreshThreads() {
		return listMyChats().then((list) => {
			const live = list.filter((t) => t.status !== "solved");
			setThreads(live);
			setActive((cur) => {
				if (freshStart.current) return "";
				if (cur && live.some((t) => t.id === cur)) return cur;
				if (cur) {
					freshStart.current = true;
					setFresh(true);
					setMessages([]);
					return "";
				}
				return live.find((t) => t.unreadCustomer > 0)?.id || live[0]?.id || "";
			});
			return live;
		}).catch(() => setThreads([]));
	}
	(0, import_react.useEffect)(() => {
		refreshThreads();
		listMyOrders().then((list) => {
			const live = list.filter((o) => isActiveOrderStatus(o.status));
			setOrders(live);
			setOrderId((cur) => cur && live.some((o) => o.id === cur) ? cur : "");
		}).catch(() => setOrders([]));
		const t = window.setInterval(() => {
			if (!document.hidden) refreshThreads();
		}, 8e3);
		const onVis = () => {
			if (!document.hidden) refreshThreads();
		};
		document.addEventListener("visibilitychange", onVis);
		return () => {
			window.clearInterval(t);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!active || freshStart.current) {
			if (!active) setMessages([]);
			return;
		}
		let live = true;
		hadMail.current = false;
		const pull = () => {
			if (freshStart.current) return;
			loadChatMessages({ data: { threadId: active } }).then((msgs) => {
				if (!live) return;
				if (msgs.length === 0 && hadMail.current) {
					beginFresh();
					return;
				}
				if (msgs.length > 0) hadMail.current = true;
				setMessages(msgs);
			}).catch(() => void 0);
		};
		pull();
		const onVis = () => {
			if (!document.hidden) pull();
		};
		const t = window.setInterval(() => {
			if (!document.hidden) pull();
		}, 8e3);
		document.addEventListener("visibilitychange", onVis);
		return () => {
			live = false;
			window.clearInterval(t);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, [active]);
	(0, import_react.useEffect)(() => {
		const el = logRef.current;
		if (!el) return;
		el.scrollTop = el.scrollHeight;
	}, [messages]);
	const current = threads.find((t) => t.id === active);
	const blank = fresh || !active;
	const chosenTicket = current?.order?.id || orderId;
	const canSend = Boolean(draft.trim()) && !busy && Boolean(chosenTicket);
	function send(e) {
		e?.preventDefault();
		const body = draft.trim();
		if (!body) return;
		const startNew = !active || freshStart.current;
		const ticket = current?.order?.id || orderId;
		if (startNew && !ticket) {
			setError("Pick an active order first.");
			return;
		}
		setBusy(true);
		setError("");
		(startNew ? startChat({ data: {
			body,
			orderId: ticket,
			forceNew: true
		} }).then((r) => String(r.threadId)) : sendChatMessage({ data: {
			threadId: active,
			body
		} }).then(() => active)).then(async (id) => {
			freshStart.current = false;
			setFresh(false);
			setDraft("");
			setActive(id);
			await refreshThreads();
			const msgs = await loadChatMessages({ data: { threadId: id } });
			setMessages(msgs);
		}).catch((err) => {
			const msg = err instanceof Error ? err.message : "Could not send";
			if (/concluded/i.test(msg)) {
				freshStart.current = true;
				setFresh(true);
				setActive("");
				setMessages([]);
				setError("");
				hadMail.current = false;
			} else setError(msg);
		}).finally(() => setBusy(false));
	}
	function linkTicket() {
		if (!active || !orderId) return;
		setBusy(true);
		attachChatOrder({ data: {
			threadId: active,
			orderId
		} }).then(async () => {
			await refreshThreads();
		}).catch((err) => setError(err instanceof Error ? err.message : "Could not link ticket")).finally(() => setBusy(false));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "chat-box",
		"data-compact": compact ? "true" : "false",
		children: [
			blank || !current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "About this order" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "ed-input",
					value: orderId,
					onChange: (e) => setOrderId(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "No ticket yet"
					}), orders.slice(0, 12).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: o.id,
						children: [
							"#",
							formatTicketNo(o.ticketNo),
							" · ",
							o.fulfillment,
							" · ",
							formatUsd(o.total),
							" · ",
							formatShopWhen(o.createdAt)
						]
					}, o.id))]
				})]
			}) : current.order ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderTicketCard, { order: current.order }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Link a ticket" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "ed-input",
						value: orderId,
						onChange: (e) => setOrderId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Choose ticket"
						}), orders.slice(0, 12).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: o.id,
							children: [
								"#",
								formatTicketNo(o.ticketNo),
								" · ",
								o.fulfillment,
								" · ",
								formatUsd(o.total),
								" · ",
								formatShopWhen(o.createdAt)
							]
						}, o.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-btn",
						disabled: busy || !orderId,
						onClick: linkTicket,
						children: "Link ticket"
					})
				]
			}),
			!fresh && threads.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Conversation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "ed-input",
					value: active,
					onChange: (e) => setActive(e.target.value),
					children: threads.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: t.id,
						children: [t.unreadCustomer > 0 ? "New · " : "", t.lastMessage.slice(0, 36) || "Chat"]
					}, t.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "chat-history",
				"aria-label": "Sent messages",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "chat-history-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "chat-log-kicker",
						children: "Sent messages"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "chat-history-hint",
						children: "What you and the shop already sent. This is not where you type."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "chat-log",
					"aria-live": "polite",
					ref: logRef,
					children: messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-empty",
						children: "Nothing sent yet. Write below to message the kitchen."
					}) : messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "chat-bubble",
						"data-role": m.senderRole,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [m.senderRole === "admin" ? "Shop replied" : "You sent", m.createdAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							dateTime: m.createdAt,
							children: formatShopClock(m.createdAt)
						}) : null] }), m.body]
					}, m.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "chat-compose",
				"aria-label": "Write a new message",
				onSubmit: (e) => send(e),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chat-compose-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {
							size: 16,
							strokeWidth: 2.2,
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "chat-compose-kicker",
							children: "Type a new message here"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your new message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "ed-input ed-area chat-draft",
							rows: compact ? 2 : 3,
							maxLength: 1e3,
							value: draft,
							onChange: (e) => setDraft(e.target.value),
							placeholder: "Write your new message to the shop…",
							"aria-label": "Type a new message to the shop",
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									if (canSend) send();
								}
							}
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "form-error",
						children: error
					}) : null,
					orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-empty",
						children: "Place an order first, then chat about that ticket."
					}) : !chosenTicket ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-empty",
						children: "Pick an active order to send a message."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-print",
						disabled: !canSend,
						children: busy ? "Sending…" : "Send"
					})
				]
			})
		]
	});
}
var HIDDEN = [
	/^\/admin/,
	/^\/board/,
	/^\/login/,
	/^\/verify-2fa/,
	/^\/auth/,
	/^\/help/,
	/^\/pair-printer/
];
function SupportDock() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user, isPending } = useCurrentUserState();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [unread, setUnread] = (0, import_react.useState)(0);
	const [phone, setPhone] = (0, import_react.useState)(RESTAURANT.phone);
	const [phoneHref, setPhoneHref] = (0, import_react.useState)(RESTAURANT.phoneHref);
	const [titleVisible, setTitleVisible] = (0, import_react.useState)(true);
	const hide = HIDDEN.some((re) => re.test(pathname));
	(0, import_react.useEffect)(() => {
		const el = document.querySelector(".shop-header");
		if (!el) {
			setTitleVisible(false);
			return;
		}
		const io = new IntersectionObserver(([entry]) => setTitleVisible(Boolean(entry?.isIntersecting)), { threshold: 0 });
		io.observe(el);
		return () => io.disconnect();
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		getShopContact().then((d) => {
			setPhone(d.phone);
			setPhoneHref(d.phoneHref);
		}).catch(() => void 0);
	}, []);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setUnread(0);
			return;
		}
		return onVisibleInterval(open ? 8e3 : 3e4, () => {
			getMe().then((p) => {
				setUnread(p.unreadChats);
			}).catch(() => void 0);
		});
	}, [
		isPending,
		user,
		open
	]);
	if (hide) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "support-dock no-print",
		children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "dock-panel",
			"aria-label": "Chat with the shop",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "dock-panel-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: "South End Pizza III"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Chat" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-icon-btn",
						"aria-label": "Close chat",
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							size: 16,
							strokeWidth: 2.2
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedOut, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Sign in to message the shop. Calling does not need an account."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					search: { next: pathname },
					className: "btn-print",
					children: "Sign in to chat"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerChat, { compact: true }) })
			]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dock-fabs",
			children: [
				!titleVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "dock-fab dock-top",
					"aria-label": "Back to top",
					onClick: () => window.scrollTo({
						top: 0,
						behavior: "smooth"
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
						size: 20,
						strokeWidth: 2.2
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Top" })]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "dock-fab dock-call",
					href: phoneHref,
					"aria-label": `Call the shop at ${phone}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
						size: 20,
						strokeWidth: 2.2
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Call" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "dock-fab dock-chat",
					"aria-label": "Chat with the shop",
					"aria-expanded": open,
					onClick: () => setOpen((v) => !v),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							size: 20,
							strokeWidth: 2.2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Chat" }),
						unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: "nav-pip",
							children: unread
						}) : null
					]
				})
			]
		})]
	});
}
var styles_default = "/assets/styles-BpL_tt98.css";
var APP_NAME = "South End Pizza III";
var Route$26 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Order from South End Pizza III in Egg Harbor Township, NJ. Pizza, subs, wings, and more — pickup or delivery."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/icon-32.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preload",
				href: "/mark.jpg",
				as: "image"
			},
			{
				rel: "preload",
				href: "/mark-sm.jpg",
				as: "image"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fraunces:wght@500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "skip-link",
				href: "#main",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-root",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopBackdrop, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonFx, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartHydrate, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportDock, {})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$24 = () => import("./routes-C4epghM1.mjs").then((n) => n.t);
var Route$25 = createFileRoute("/")({
	loader: () => retryTransient(() => getStorefront()),
	staleTime: 3e4,
	pendingMs: 8e3,
	pendingComponent: HomePending,
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
function HomePending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shop-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "shop-main",
			id: "main",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "store-layout",
				"aria-busy": "true",
				"aria-label": "Loading the menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "store-main",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-skel" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "cat-rail",
							children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "skel-chip" }, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "food-grid",
							children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skel-card" }, i))
						})
					]
				})
			})
		})]
	});
}
var TABS$2 = [
	"summary",
	"details",
	"security",
	"rewards"
];
function asTab(raw) {
	const s = String(raw ?? "summary");
	return TABS$2.includes(s) ? s : "summary";
}
var $$splitComponentImporter$23 = () => import("./account-DcjidlER.mjs").then((n) => n.t);
var Route$24 = createFileRoute("/account")({
	validateSearch: (search) => {
		const tab = asTab(search.tab);
		return tab === "summary" ? {} : { tab };
	},
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./admin-CqbET3hG.mjs").then((n) => n.t);
var Route$23 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./board-UntgYjH-.mjs");
var Route$22 = createFileRoute("/board")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./checkout-gvMdHkGs.mjs");
var Route$21 = createFileRoute("/checkout")({
	loader: () => retryTransient(() => getStorefront()),
	staleTime: 3e4,
	pendingMs: 8e3,
	pendingComponent: CheckoutPending,
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
function CheckoutPending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shop-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "shop-main",
			id: "main",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-skel",
				children: "Loading checkout…"
			})
		})]
	});
}
var $$splitComponentImporter$19 = () => import("./help-DisARy5R.mjs").then((n) => n.t);
var Route$20 = createFileRoute("/help")({
	loader: () => getShopContact(),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./install-DQDKku18.mjs").then((n) => n.t);
var Route$19 = createFileRoute("/install")({
	head: () => ({ meta: [{ title: "Download App" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./login-Bk8bSML2.mjs");
function safeNext$1(raw) {
	if (typeof raw !== "string") return void 0;
	if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/login")) return void 0;
	if (raw === "/") return void 0;
	return raw;
}
var Route$18 = createFileRoute("/login")({
	validateSearch: (search) => {
		const next = safeNext$1(search.next);
		const ref = typeof search.ref === "string" ? search.ref.trim().toUpperCase() : "";
		const error = typeof search.error === "string" ? search.error.trim() : "";
		const out = {};
		if (next) out.next = next;
		if (/^[A-Z0-9]{4,16}$/.test(ref)) out.ref = ref;
		if (error) out.error = error.slice(0, 180);
		return out;
	},
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./pair-printer-DxbjukUj.mjs");
var Route$17 = createFileRoute("/pair-printer")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./recover-Ddoy_E94.mjs");
var Route$16 = createFileRoute("/recover")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./verify-2fa-Diz_fec6.mjs");
function safeNext(raw) {
	if (typeof raw !== "string") return void 0;
	if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/login")) return void 0;
	return raw;
}
var Route$15 = createFileRoute("/verify-2fa")({
	validateSearch: (search) => {
		const next = safeNext(search.next);
		return next ? { next } : {};
	},
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./admin-B05XTXIw.mjs");
var Route$14 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./background-ClV4ou6g.mjs");
var Route$13 = createFileRoute("/admin/background")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./center-TYTcDvgY.mjs").then((n) => n.t);
var TABS$1 = /* @__PURE__ */ new Set([
	"messages",
	"orders",
	"customers",
	"rewards"
]);
var Route$12 = createFileRoute("/admin/center")({
	validateSearch: (search) => {
		const tab = typeof search.tab === "string" && TABS$1.has(search.tab) ? search.tab : void 0;
		const thread = typeof search.thread === "string" && search.thread.trim() ? search.thread.trim() : void 0;
		const customer = typeof search.customer === "string" && search.customer.trim() ? search.customer.trim() : void 0;
		return {
			...tab ? { tab } : {},
			...thread ? { thread } : {},
			...customer ? { customer } : {}
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./customers-DnxyNtAs.mjs");
var Route$11 = createFileRoute("/admin/customers")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./financials-BcC8ogQP.mjs");
var Route$10 = createFileRoute("/admin/financials")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./menu-GiKSiqWG.mjs").then((n) => n.t);
var TABS = [
	"menu",
	"cards",
	"hours",
	"payments",
	"tax",
	"delivery",
	"printers"
];
var Route$9 = createFileRoute("/admin/menu")({
	validateSearch: (search) => {
		const raw = typeof search.tab === "string" ? search.tab : void 0;
		const tab = raw === "vacation" ? "hours" : raw;
		const ok = tab && TABS.includes(tab) ? tab : void 0;
		return ok ? { tab: ok } : {};
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./messages-JOsPYwRC.mjs");
var Route$8 = createFileRoute("/admin/messages")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./orders-B75zScgR.mjs");
var Route$7 = createFileRoute("/admin/orders")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./patches-0O5d1UCj.mjs");
var Route$6 = createFileRoute("/admin/patches")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./pos-B-XRyhWx.mjs");
var Route$5 = createFileRoute("/admin/pos")({
	validateSearch: (search) => {
		const ticket = typeof search.ticket === "string" ? search.ticket : void 0;
		return ticket ? { ticket } : {};
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./rewards-B7pK1rnW.mjs");
var Route$4 = createFileRoute("/admin/rewards")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./service-K97qaukB.mjs");
var Route$3 = createFileRoute("/admin/service")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./settings-B_Ia4zvw.mjs");
var Route$2 = createFileRoute("/admin/settings")({
	validateSearch: (search) => {
		const tab = typeof search.tab === "string" ? search.tab : void 0;
		return tab ? { tab } : {};
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var EMPTY_INSIGHTS = {
	customers: {
		total: 0,
		new7d: 0,
		twoFactor: 0,
		avgPoints: 0,
		repeat: 0,
		top: []
	},
	sales: {
		today: 0,
		week: 0,
		month: 0,
		allTime: 0,
		tickets: 0,
		avgTicket: 0,
		canceled: 0,
		series: [],
		topItems: []
	},
	financials: {
		food: 0,
		tax: 0,
		discounts: 0,
		deliveryFees: 0,
		tips: 0,
		collected: 0,
		pickup: 0,
		delivery: 0,
		awaitingPayment: 0,
		byPay: []
	}
};
function AdminFinancialsPage() {
	const [insights, setInsights] = (0, import_react.useState)(null);
	const [orders, setOrders] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getAdminInsights().then(setInsights).catch(() => setInsights(EMPTY_INSIGHTS));
		listAllOrders().then(setOrders).catch(() => setOrders([]));
	}, []);
	const insightsView = insights ?? EMPTY_INSIGHTS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "settings-page finance-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Financials" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Today, this week, and tips live here — the till mix, tax, and ticket history follow. Tips stay off the New Jersey sales-tax line."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "kpi-grid kpi-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Today",
						value: formatUsd(insightsView.sales.today)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "This week",
						value: formatUsd(insightsView.sales.week)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Tips",
						value: formatUsd(insightsView.financials.tips)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Collected",
						value: formatUsd(insightsView.financials.collected)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialsPanel, { insights: insightsView }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesPanel, {
				insights: insightsView,
				orders
			})
		]
	});
}
function AnalyticsPanel({ insights }) {
	const c = insights.customers;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Customer analytics" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "kpi-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Customers",
						value: String(c.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "New (7d)",
						value: String(c.new7d)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Repeat",
						value: String(c.repeat)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Avg points",
						value: String(c.avgPoints)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ed-sub",
				children: [c.twoFactor, " accounts have two-factor on."]
			}),
			c.top.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "settings-subhead",
				children: "Top guests"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "rank-list",
				children: c.top.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					row.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
						row.orders,
						" orders · ",
						row.points,
						" pts"
					] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUsd(row.spend) })] }, row.userId))
			})] }) : null
		]
	});
}
function FinancialsPanel({ insights }) {
	const f = insights.financials;
	const s = insights.sales;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "kpi-grid",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
				label: "Food",
				value: formatUsd(f.food)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
				label: "Tax collected",
				value: formatUsd(f.tax)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
				label: "Discounts",
				value: formatUsd(f.discounts)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
				label: "Delivery fees",
				value: formatUsd(f.deliveryFees)
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Till mix" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mix-track",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mix-seg mix-food",
						style: {
							flexGrow: Math.max(f.food, 0),
							flexBasis: 0
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mix-seg mix-tax",
						style: {
							flexGrow: Math.max(f.tax, 0),
							flexBasis: 0
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mix-seg mix-fee",
						style: {
							flexGrow: Math.max(f.deliveryFees, 0),
							flexBasis: 0
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mix-seg mix-disc",
						style: {
							flexGrow: Math.max(f.discounts, 0),
							flexBasis: 0
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mix-legend ed-sub",
				children: "Tomato is food · cream is tax · muted is delivery fees · dark is discounts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "totals",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Food (before tax)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(f.food) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Tips (not taxed)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(f.tips) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Pickup" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(f.pickup) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(f.delivery) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Awaiting card" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(f.awaitingPayment) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Canceled tickets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: s.canceled })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Tickets counted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: s.tickets })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "settings-subhead",
				children: "Payment mix"
			}),
			f.byPay.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-empty",
				children: "No payments yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "rank-list",
				children: f.byPay.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					payMethodLabel(p.method),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [p.count, " tickets"] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUsd(p.total) })] }, p.method))
			})
		]
	})] });
}
function SalesPanel({ insights, orders }) {
	const s = insights.sales;
	const recent = (0, import_react.useMemo)(() => orders.slice(0, 12), [orders]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Sales" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "kpi-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Month",
						value: formatUsd(s.month)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "All time",
						value: formatUsd(s.allTime)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Avg ticket",
						value: formatUsd(s.avgTicket)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Tickets",
						value: String(s.tickets)
					})
				]
			}),
			s.series.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chart-frame",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: s.series,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--color-studio-line)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "day",
								tick: {
									fill: "var(--color-studio-muted)",
									fontSize: 11
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
								fill: "var(--color-studio-muted)",
								fontSize: 11
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "total",
								fill: "var(--color-tomato)",
								radius: 4
							})
						]
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-empty",
				children: "No sales yet."
			}),
			s.topItems.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "settings-subhead",
				children: "Top items"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "rank-list",
				children: s.topItems.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					it.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [it.qty, " sold"] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUsd(it.sales) })] }, it.name))
			})] }) : null
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Recent tickets" }), recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "ed-empty",
			children: "No tickets yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "table-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "plain-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Ticket" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "When" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Name" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Total" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: recent.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["#", formatTicketNo(o.ticketNo)] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.createdAt ? new Date(o.createdAt).toLocaleString() : "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.pickupName || "Guest" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatUsd(o.total) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.status.replaceAll("_", " ") })
				] }, o.id)) })]
			})
		})]
	})] });
}
function Kpi({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "kpi",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value })]
	});
}
var $$splitComponentImporter = () => import("./zones-BViylJaK.mjs");
var Route$1 = createFileRoute("/admin/zones")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$25.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$26
});
var AccountRoute = Route$24.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$26
});
var AdminRoute = Route$23.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$26
});
var BoardRoute = Route$22.update({
	id: "/board",
	path: "/board",
	getParentRoute: () => Route$26
});
var CheckoutRoute = Route$21.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$26
});
var HelpRoute = Route$20.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => Route$26
});
var InstallRoute = Route$19.update({
	id: "/install",
	path: "/install",
	getParentRoute: () => Route$26
});
var LoginRoute = Route$18.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$26
});
var PairPrinterRoute = Route$17.update({
	id: "/pair-printer",
	path: "/pair-printer",
	getParentRoute: () => Route$26
});
var RecoverRoute = Route$16.update({
	id: "/recover",
	path: "/recover",
	getParentRoute: () => Route$26
});
var Verify2faRoute = Route$15.update({
	id: "/verify-2fa",
	path: "/verify-2fa",
	getParentRoute: () => Route$26
});
var AdminIndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminBackgroundRoute = Route$13.update({
	id: "/background",
	path: "/background",
	getParentRoute: () => AdminRoute
});
var AdminCenterRoute = Route$12.update({
	id: "/center",
	path: "/center",
	getParentRoute: () => AdminRoute
});
var AdminCustomersRoute = Route$11.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AdminRoute
});
var AdminFinancialsRoute = Route$10.update({
	id: "/financials",
	path: "/financials",
	getParentRoute: () => AdminRoute
});
var AdminMenuRoute = Route$9.update({
	id: "/menu",
	path: "/menu",
	getParentRoute: () => AdminRoute
});
var AdminMessagesRoute = Route$8.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => AdminRoute
});
var AdminOrdersRoute = Route$7.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AdminRoute
});
var AdminPatchesRoute = Route$6.update({
	id: "/patches",
	path: "/patches",
	getParentRoute: () => AdminRoute
});
var AdminPosRoute = Route$5.update({
	id: "/pos",
	path: "/pos",
	getParentRoute: () => AdminRoute
});
var AdminRewardsRoute = Route$4.update({
	id: "/rewards",
	path: "/rewards",
	getParentRoute: () => AdminRoute
});
var AdminServiceRoute = Route$3.update({
	id: "/service",
	path: "/service",
	getParentRoute: () => AdminRoute
});
var AdminSettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var AdminZonesRoute = Route$1.update({
	id: "/zones",
	path: "/zones",
	getParentRoute: () => AdminRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$26
});
var AdminRouteChildren = {
	AdminBackgroundRoute,
	AdminCenterRoute,
	AdminCustomersRoute,
	AdminFinancialsRoute,
	AdminMenuRoute,
	AdminMessagesRoute,
	AdminOrdersRoute,
	AdminPatchesRoute,
	AdminPosRoute,
	AdminRewardsRoute,
	AdminServiceRoute,
	AdminSettingsRoute,
	AdminZonesRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AccountRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	BoardRoute,
	CheckoutRoute,
	HelpRoute,
	InstallRoute,
	LoginRoute,
	PairPrinterRoute,
	RecoverRoute,
	Verify2faRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$26._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: false,
		defaultPreloadStaleTime: 3e4
	});
}
//#endregion
export { SignedIn as A, useCartStore as C, onAdminInbox as D, emitAdminInbox as E, onVisibleInterval as O, cartTotals as S, peekReferral as T, OrderTicketCard as _, Route$2 as a, retryTransient as b, Route$12 as c, Route$20 as d, Route$21 as f, CustomerChat as g, Route$25 as h, EMPTY_INSIGHTS as i, SignedOut as j, RedirectToSignIn as k, Route$15 as l, asTab as m, AdminFinancialsPage as n, Route$5 as o, Route$24 as p, AnalyticsPanel as r, Route$9 as s, router_exports as t, Route$18 as u, useCartHydrated as v, captureReferral as w, ShopHeader as x, isTransientFetchError as y };

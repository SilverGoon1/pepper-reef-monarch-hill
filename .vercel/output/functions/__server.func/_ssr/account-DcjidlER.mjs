import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as formatTicketNo, E as formatShopWhen, O as formatUsd } from "./hours-DVH-z3bz.mjs";
import { a as formatPhone } from "./phone-PlVj3DDJ.mjs";
import { E as listMyOrders, J as updateProfile, K as startTotpSetup, L as sendPasswordResetCode, _ as getMyRewards, c as confirmTotpSetup, f as disableTotp, i as changeMyPassword } from "./shop-server-DpagHzjx.mjs";
import { G as Copy, P as Link2 } from "../_libs/lucide-react.mjs";
import { t as OrderDateTrays } from "./order-trays-CWJERqGR.mjs";
import { C as useCartStore, m as asTab, p as Route$24, x as ShopHeader } from "./router-CMr1IWu0.mjs";
import { t as SessionGate } from "./guards-CR7a7dXN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-DcjidlER.js
var account_DcjidlER_exports = /* @__PURE__ */ __exportAll({ component: () => AccountPage });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Byte-mode QR (versions 1–6, ECC M) as a module matrix and SVG path. */
var EXP = /* @__PURE__ */ new Uint8Array(256);
var LOG = /* @__PURE__ */ new Uint8Array(256);
(() => {
	let x = 1;
	for (let i = 0; i < 255; i++) {
		EXP[i] = x;
		LOG[x] = i;
		x <<= 1;
		if (x & 256) x ^= 285;
	}
})();
function mul(a, b) {
	if (!a || !b) return 0;
	return EXP[(LOG[a] + LOG[b]) % 255];
}
var DATA_CW = [
	0,
	16,
	28,
	44,
	64,
	86,
	108
];
var BLOCKS_M = [
	[],
	[[
		1,
		16,
		10
	]],
	[[
		1,
		28,
		16
	]],
	[[
		1,
		44,
		26
	]],
	[[
		2,
		32,
		18
	]],
	[[
		2,
		43,
		24
	]],
	[[
		4,
		27,
		16
	]]
];
function rsGenerator(nsym) {
	let poly = [1];
	for (let i = 0; i < nsym; i++) {
		const next = new Array(poly.length + 1).fill(0);
		for (let j = 0; j < poly.length; j++) {
			next[j] ^= poly[j];
			next[j + 1] ^= mul(poly[j], EXP[i]);
		}
		poly = next;
	}
	return poly;
}
function rsEncode(data, nsym) {
	const gen = rsGenerator(nsym);
	const ecc = new Array(nsym).fill(0);
	for (const b of data) {
		const factor = b ^ ecc[0];
		ecc.shift();
		ecc.push(0);
		if (!factor) continue;
		for (let i = 0; i < nsym; i++) ecc[i] ^= mul(gen[i + 1], factor);
	}
	return ecc;
}
function bitLen(n) {
	let d = 0;
	while (n) {
		d += 1;
		n >>>= 1;
	}
	return d;
}
function bchTypeInfo(data) {
	let d = data << 10;
	while (bitLen(d) - 11 >= 0) d ^= 1335 << bitLen(d) - 11;
	return (data << 10 | d) ^ 21522;
}
function setFinder(grid, x0, y0) {
	for (let y = -1; y <= 7; y++) for (let x = -1; x <= 7; x++) {
		const xx = x0 + x;
		const yy = y0 + y;
		if (yy < 0 || xx < 0 || yy >= grid.length || xx >= grid.length) continue;
		const on = x >= 0 && x <= 6 && y >= 0 && y <= 6 && (x === 0 || x === 6 || y === 0 || y === 6 || x >= 2 && x <= 4 && y >= 2 && y <= 4);
		grid[yy][xx] = on ? 1 : 0;
	}
}
function setAlignment(grid, cx, cy) {
	for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) {
		const on = x === -2 || x === 2 || y === -2 || y === 2 || x === 0 && y === 0;
		grid[cy + y][cx + x] = on ? 1 : 0;
	}
}
function isMasked(mask, x, y) {
	switch (mask) {
		case 0: return (x + y) % 2 === 0;
		case 1: return y % 2 === 0;
		case 2: return x % 3 === 0;
		case 3: return (x + y) % 3 === 0;
		case 4: return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0;
		case 5: return x * y % 2 + x * y % 3 === 0;
		case 6: return (x * y % 2 + x * y % 3) % 2 === 0;
		default: return ((x + y) % 2 + x * y % 3) % 2 === 0;
	}
}
function penalty(grid) {
	const n = grid.length;
	let s = 0;
	for (let y = 0; y < n; y++) {
		let run = 1;
		for (let x = 1; x <= n; x++) if (x < n && grid[y][x] === grid[y][x - 1]) run += 1;
		else {
			if (run >= 5) s += run - 2;
			run = 1;
		}
	}
	for (let x = 0; x < n; x++) {
		let run = 1;
		for (let y = 1; y <= n; y++) if (y < n && grid[y][x] === grid[y - 1][x]) run += 1;
		else {
			if (run >= 5) s += run - 2;
			run = 1;
		}
	}
	for (let y = 0; y < n - 1; y++) for (let x = 0; x < n - 1; x++) {
		const v = grid[y][x];
		if (v === grid[y][x + 1] && v === grid[y + 1][x] && v === grid[y + 1][x + 1]) s += 3;
	}
	const finder = [
		1,
		0,
		1,
		1,
		1,
		0,
		1,
		0,
		0,
		0,
		0
	];
	const match = (get) => {
		for (let i = 0; i <= n - 11; i++) {
			let ok = true;
			for (let k = 0; k < 11; k++) if (get(i + k) !== finder[k] && get(i + k) !== finder[10 - k]) {
				ok = false;
				break;
			}
			if (ok) s += 40;
		}
	};
	for (let y = 0; y < n; y++) match((i) => grid[y][i]);
	for (let x = 0; x < n; x++) match((i) => grid[i][x]);
	let dark = 0;
	for (const row of grid) for (const c of row) if (c) dark += 1;
	s += Math.abs(dark * 100 / (n * n) - 50) / 5 * 10;
	return s;
}
function bytesOf(text) {
	return Array.from(new TextEncoder().encode(text));
}
function chooseVersion(len) {
	for (let v = 1; v <= 6; v++) if (len <= DATA_CW[v] - 2) return v;
	throw new Error("Invite link is too long for a QR code.");
}
function buildCodewords(text, version) {
	const data = bytesOf(text);
	const bits = [];
	const push = (val, n) => {
		for (let i = n - 1; i >= 0; i--) bits.push(val >> i & 1);
	};
	push(4, 4);
	push(data.length, 8);
	for (const b of data) push(b, 8);
	const remain = DATA_CW[version] * 8 - bits.length;
	push(0, Math.min(4, Math.max(0, remain)));
	while (bits.length % 8) bits.push(0);
	const bytes = [];
	for (let i = 0; i < bits.length; i += 8) {
		let b = 0;
		for (let k = 0; k < 8; k++) b = b << 1 | bits[i + k];
		bytes.push(b);
	}
	const pads = [236, 17];
	let p = 0;
	while (bytes.length < DATA_CW[version]) {
		bytes.push(pads[p % 2]);
		p += 1;
	}
	return bytes;
}
function interleave(bytes, version) {
	const groups = BLOCKS_M[version];
	const blocks = [];
	let offset = 0;
	for (const [count, dataLen, ecLen] of groups) for (let i = 0; i < count; i++) {
		const data = bytes.slice(offset, offset + dataLen);
		offset += dataLen;
		blocks.push({
			data,
			ecc: rsEncode(data, ecLen)
		});
	}
	const out = [];
	const maxData = Math.max(...blocks.map((b) => b.data.length));
	for (let i = 0; i < maxData; i++) for (const b of blocks) if (i < b.data.length) out.push(b.data[i]);
	const maxEcc = Math.max(...blocks.map((b) => b.ecc.length));
	for (let i = 0; i < maxEcc; i++) for (const b of blocks) if (i < b.ecc.length) out.push(b.ecc[i]);
	return out;
}
function reservedGrid(size, version) {
	const grid = Array.from({ length: size }, () => Array(size).fill(null));
	setFinder(grid, 0, 0);
	setFinder(grid, size - 7, 0);
	setFinder(grid, 0, size - 7);
	for (let i = 8; i < size - 8; i++) {
		grid[6][i] = i % 2 === 0 ? 1 : 0;
		grid[i][6] = i % 2 === 0 ? 1 : 0;
	}
	if (version >= 2) {
		const pos = [
			18,
			22,
			26,
			30,
			34
		][version - 2];
		setAlignment(grid, pos, pos);
	}
	grid[size - 8][8] = 1;
	for (let i = 0; i < 9; i++) {
		if (grid[8][i] === null) grid[8][i] = 0;
		if (grid[i][8] === null) grid[i][8] = 0;
	}
	for (let i = 0; i < 8; i++) {
		if (grid[8][size - 1 - i] === null) grid[8][size - 1 - i] = 0;
		if (grid[size - 1 - i][8] === null) grid[size - 1 - i][8] = 0;
	}
	return grid;
}
function placeData(grid, codewords, mask) {
	const size = grid.length;
	const bits = [];
	for (const b of codewords) for (let i = 7; i >= 0; i--) bits.push(b >> i & 1);
	let bi = 0;
	let dir = -1;
	let y = size - 1;
	for (let x = size - 1; x > 0; x -= 2) {
		if (x === 6) x -= 1;
		for (;;) {
			for (const dx of [0, -1]) {
				const xx = x + dx;
				if (grid[y][xx] !== null) continue;
				const bit = bi < bits.length ? bits[bi] : 0;
				bi += 1;
				grid[y][xx] = bit ^ (isMasked(mask, xx, y) ? 1 : 0);
			}
			y += dir;
			if (y < 0 || y >= size) {
				y -= dir;
				dir = -dir;
				break;
			}
		}
	}
}
function applyFormat(grid, mask) {
	const size = grid.length;
	const bits = bchTypeInfo(0 | mask);
	const pos = [
		[8, 0],
		[8, 1],
		[8, 2],
		[8, 3],
		[8, 4],
		[8, 5],
		[8, 7],
		[8, 8],
		[7, 8],
		[5, 8],
		[4, 8],
		[3, 8],
		[2, 8],
		[1, 8],
		[0, 8]
	];
	const pos2 = [
		[size - 1, 8],
		[size - 2, 8],
		[size - 3, 8],
		[size - 4, 8],
		[size - 5, 8],
		[size - 6, 8],
		[size - 7, 8],
		[8, size - 8],
		[8, size - 7],
		[8, size - 6],
		[8, size - 5],
		[8, size - 4],
		[8, size - 3],
		[8, size - 2],
		[8, size - 1]
	];
	for (let i = 0; i < 15; i++) {
		const bit = bits >> i & 1;
		grid[pos[i][1]][pos[i][0]] = bit;
		grid[pos2[i][1]][pos2[i][0]] = bit;
	}
}
function qrMatrix(text) {
	const version = chooseVersion(bytesOf(text).length);
	const size = 21 + 4 * (version - 1);
	const codewords = interleave(buildCodewords(text, version), version);
	let best = null;
	let bestScore = Infinity;
	for (let mask = 0; mask < 8; mask++) {
		const grid = reservedGrid(size, version);
		placeData(grid, codewords, mask);
		applyFormat(grid, mask);
		const filled = grid.map((row) => row.map((c) => c ? 1 : 0));
		const score = penalty(filled);
		if (score < bestScore) {
			bestScore = score;
			best = filled;
		}
	}
	return best ?? [];
}
function qrPath(text, quiet = 4) {
	const matrix = qrMatrix(text);
	const n = matrix.length;
	const parts = [];
	for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (matrix[y][x]) parts.push(`M${x + quiet} ${y + quiet}h1v1h-1z`);
	return {
		d: parts.join(""),
		dim: n + quiet * 2
	};
}
function InviteQr({ value, label }) {
	const drawn = (0, import_react.useMemo)(() => {
		try {
			return qrPath(value);
		} catch {
			return null;
		}
	}, [value]);
	if (!drawn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "ed-sub",
		children: "Could not draw a QR code for this link."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "invite-qr",
		viewBox: `0 0 ${drawn.dim} ${drawn.dim}`,
		role: "img",
		"aria-label": label,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: drawn.dim,
			height: drawn.dim,
			fill: "var(--color-cream)"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: drawn.d,
			fill: "var(--color-ink)"
		})]
	});
}
function AccountPage() {
	const { tab } = Route$24.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "shop-shell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionGate, { children: ({ profile }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopHeader, { profile }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "shop-main account-main",
			id: "main",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountBody, {
				profile,
				tab: asTab(tab)
			})
		})] }) })
	});
}
function AccountBody({ profile, tab }) {
	const navigate = useNavigate();
	const add = useCartStore((s) => s.add);
	const setNotes = useCartStore((s) => s.setNotes);
	const [phone, setPhone] = (0, import_react.useState)(profile.phone);
	const [name, setName] = (0, import_react.useState)(profile.displayName);
	const [address, setAddress] = (0, import_react.useState)(profile.addressLine);
	const [city, setCity] = (0, import_react.useState)(profile.city);
	const [zip, setZip] = (0, import_react.useState)(profile.zip);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [rewards, setRewards] = (0, import_react.useState)(null);
	const [msg, setMsg] = (0, import_react.useState)("");
	const [secret, setSecret] = (0, import_react.useState)("");
	const [uri, setUri] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [totpOn, setTotpOn] = (0, import_react.useState)(profile.totpEnabled);
	const email = profile.email;
	const [newPass, setNewPass] = (0, import_react.useState)("");
	const [confirmPass, setConfirmPass] = (0, import_react.useState)("");
	const [passBusy, setPassBusy] = (0, import_react.useState)(false);
	const [otp, setOtp] = (0, import_react.useState)("");
	const [otpSent, setOtpSent] = (0, import_react.useState)("");
	const [previewCode, setPreviewCode] = (0, import_react.useState)("");
	const [otpLeft, setOtpLeft] = (0, import_react.useState)(0);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		listMyOrders().then(setOrders).catch(() => setOrders([]));
		getMyRewards().then(setRewards).catch(() => setRewards(null));
	}, []);
	(0, import_react.useEffect)(() => {
		if (otpLeft <= 0) return;
		const t = window.setInterval(() => setOtpLeft((n) => Math.max(0, n - 1)), 1e3);
		return () => window.clearInterval(t);
	}, [otpLeft]);
	const inviteUrl = (0, import_react.useMemo)(() => {
		const code = rewards?.referralCode || profile.referralCode;
		if (typeof window === "undefined" || !code) return "";
		return `${window.location.origin}/login?ref=${encodeURIComponent(code)}`;
	}, [rewards?.referralCode, profile.referralCode]);
	function go(next) {
		navigate({
			to: "/account",
			search: next === "summary" ? {} : { tab: next }
		});
	}
	const who = name.trim() || profile.displayName || "there";
	const points = rewards?.points ?? profile.points;
	const recent = orders.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "page-card account-hero",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shop-brand-kicker",
					children: "Your account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Hello, ", who] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "ed-sub",
					children: [email || "Signed in", phone ? ` · ${formatPhone(phone) || phone}` : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "points-chip",
					children: [points, " reward points"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "account-tabs",
			role: "tablist",
			"aria-label": "Account",
			children: [
				["summary", "Summary"],
				["details", "Details"],
				["security", "Security"],
				["rewards", "Rewards"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": tab === id,
				"data-on": tab === id,
				onClick: () => go(id),
				children: label
			}, id))
		}),
		tab === "summary" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Account summary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "kpi-grid account-kpis",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kpi",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Points" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: points })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kpi",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Orders" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: profile.orderCount || orders.length })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kpi",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Friends invited" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: rewards?.inviteCount ?? profile.inviteCount })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kpi",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Security" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: totpOn ? "2FA on" : "2FA off" })]
							})
						]
					}),
					profile.memberSince ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ed-sub",
						children: ["Member since ", formatShopWhen(profile.memberSince)]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Recent orders" }), recent.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "account-recent",
					children: recent.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "account-order",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["#", formatTicketNo(o.ticketNo)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "order-meta",
							children: [
								formatShopWhen(o.createdAt),
								" · ",
								o.fulfillment,
								" · ",
								o.status
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUsd(o.total) })]
					}, o.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "No orders yet. Your tickets will land here."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Order history" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderDateTrays, {
					orders,
					empty: "No orders yet.",
					children: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "account-order",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["#", formatTicketNo(o.ticketNo)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "order-meta",
								children: [
									formatShopWhen(o.createdAt),
									" · ",
									o.fulfillment,
									" · ",
									o.status,
									o.tax ? ` · tax ${formatUsd(o.tax)}` : ""
								]
							}),
							o.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "ed-sub",
								children: ["Note: ", o.notes]
							}) : null,
							o.pickupName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "ed-sub",
								children: ["Pickup for ", o.pickupName]
							}) : null,
							o.scheduledFor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "ed-sub",
								children: ["Scheduled ", formatShopWhen(o.scheduledFor)]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: o.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								it.qty,
								"× ",
								it.name,
								it.size ? ` (${it.size})` : "",
								it.detail ? ` — ${it.detail}` : "",
								it.comment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "cook-note",
									children: it.comment
								}) : null
							] }, i)) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ed-btn",
								onClick: () => {
									for (const it of o.items) add({
										itemId: it.itemId,
										categoryId: it.categoryId,
										name: it.name,
										size: it.size,
										detail: it.detail,
										comment: it.comment,
										toppings: it.toppings,
										halfItemId: it.halfItemId,
										unitPrice: it.unitPrice,
										qty: it.qty
									});
									if (o.notes) setNotes(o.notes);
									navigate({ to: "/" });
								},
								children: "Reorder"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUsd(o.total) })]
					}, o.id)
				})]
			})
		] }) : null,
		tab === "details" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Account details" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "The name on tickets, the phone the shop texts, and the address used for delivery."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ed-shop",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: name,
								onChange: (e) => setName(e.target.value),
								autoComplete: "name"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								inputMode: "tel",
								autoComplete: "tel"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								type: "email",
								value: email,
								readOnly: true,
								autoComplete: "email"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Street address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: address,
								onChange: (e) => setAddress(e.target.value),
								autoComplete: "street-address",
								placeholder: "123 Main St"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "account-cityzip",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "City" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input",
									value: city,
									onChange: (e) => setCity(e.target.value),
									autoComplete: "address-level2",
									placeholder: "Egg Harbor Township"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ZIP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input",
									value: zip,
									onChange: (e) => setZip(e.target.value),
									autoComplete: "postal-code",
									inputMode: "numeric",
									placeholder: "08234"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ed-btn",
							onClick: () => {
								updateProfile({ data: {
									phone,
									displayName: name,
									addressLine: address,
									city,
									zip
								} }).then(() => setMsg("Saved.")).catch((e) => setMsg(e instanceof Error ? e.message : "Could not save"));
							},
							children: "Save profile"
						}),
						msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub",
							children: msg
						}) : null
					]
				})
			]
		}) : null,
		tab === "security" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Reset password" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "We email a 60-second one-time code to the address on this account. Enter that code, then choose a new password. Google and X logins keep using those buttons."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "login-form",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email on this account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								type: "email",
								value: email,
								readOnly: true,
								autoComplete: "email"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ed-btn",
							disabled: passBusy || otpLeft > 0,
							onClick: () => {
								setPassBusy(true);
								setMsg("");
								sendPasswordResetCode().then((r) => {
									setOtpSent(r.email);
									setPreviewCode(r.previewCode || "");
									setOtpLeft(r.expiresIn);
									setOtp("");
									setMsg(`Code sent to ${r.email}. It expires in 60 seconds.`);
								}).catch((err) => setMsg(err instanceof Error ? err.message : "Could not send the code")).finally(() => setPassBusy(false));
							},
							children: otpLeft > 0 ? `Send again in ${otpLeft}s` : "Send one-time code"
						}),
						otpSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mail-slip",
							role: "status",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "slip-kind",
									children: ["Inbox · ", otpSent]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Your South End Pizza III reset code" }),
								previewCode && otpLeft > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "otp-code",
									children: previewCode
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "ed-sub",
									children: otpLeft > 0 ? `Enter the 6-digit code. ${otpLeft}s left.` : "That code expired. Send a new one."
								}),
								previewCode && otpLeft > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "ed-sub",
									children: [
										"This shop preview shows the message here. It expires in ",
										otpLeft,
										"s."
									]
								}) : null
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "login-form",
							onSubmit: (e) => {
								e.preventDefault();
								if (newPass !== confirmPass) {
									setMsg("The new passwords do not match.");
									return;
								}
								setPassBusy(true);
								setMsg("");
								changeMyPassword({ data: {
									code: otp,
									password: newPass
								} }).then(() => {
									setNewPass("");
									setConfirmPass("");
									setOtp("");
									setPreviewCode("");
									setOtpLeft(0);
									setMsg("Password updated. Use it the next time you sign in.");
								}).catch((err) => setMsg(err instanceof Error ? err.message : "Could not update password")).finally(() => setPassBusy(false));
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "ed-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "One-time code" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "ed-input",
										inputMode: "numeric",
										autoComplete: "one-time-code",
										value: otp,
										onChange: (e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)),
										maxLength: 6,
										required: true,
										placeholder: "6 digits"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "ed-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "New password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "ed-input",
										type: "password",
										value: newPass,
										onChange: (e) => setNewPass(e.target.value),
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
										value: confirmPass,
										onChange: (e) => setConfirmPass(e.target.value),
										autoComplete: "new-password",
										minLength: 8,
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "btn-print",
									disabled: passBusy || otp.length !== 6,
									children: passBusy ? "Saving…" : "Set new password"
								})
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Two-factor authentication" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Protect the account with an authenticator app (Google Authenticator, Authy, 1Password). This is app-based 2FA — not SMS."
				}),
				totpOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "login-form",
					onSubmit: (e) => {
						e.preventDefault();
						disableTotp({ data: { code } }).then(() => {
							setTotpOn(false);
							setCode("");
							setMsg("Two-factor turned off.");
						}).catch((err) => setMsg(err instanceof Error ? err.message : "Could not disable"));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Code to turn off" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "ed-input",
							value: code,
							onChange: (e) => setCode(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "ed-btn",
						children: "Turn off 2FA"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "login-form",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-btn",
						onClick: () => {
							startTotpSetup().then((r) => {
								setSecret(r.secret);
								setUri(r.uri);
							});
						},
						children: "Set up authenticator"
					}), secret ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ed-sub",
							children: ["Add this key in your app, then enter a code to confirm. ", formatPhone(phone)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "totp-secret",
							children: secret
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub break-all",
							children: uri
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirm code" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: code,
								onChange: (e) => setCode(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-print",
							onClick: () => {
								confirmTotpSetup({ data: { code } }).then(() => {
									setTotpOn(true);
									setSecret("");
									setMsg("Two-factor is on.");
								}).catch((err) => setMsg(err instanceof Error ? err.message : "Could not enable"));
							},
							children: "Confirm 2FA"
						})
					] }) : null]
				}),
				msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: msg
				}) : null
			]
		})] }) : null,
		tab === "rewards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardsTab, {
			rewards,
			inviteUrl,
			copied,
			onCopied: () => {
				setCopied(true);
				window.setTimeout(() => setCopied(false), 1600);
			}
		}) : null
	] });
}
function kindLabel(kind) {
	if (kind === "welcome") return "Welcome";
	if (kind === "earn") return "Earned";
	if (kind === "redeem") return "Redeemed";
	if (kind === "invite") return "Invite bonus";
	if (kind === "invitee") return "Friend invite";
	return "Adjustment";
}
function RewardsTab({ rewards, inviteUrl, copied, onCopied }) {
	if (!rewards) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-skel",
		children: "Loading rewards…"
	});
	const earn = Math.round(20 * (rewards.pointsPerDollar || 0));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Rewards program" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "ed-sub",
					children: [
						"Earn ",
						rewards.pointsPerDollar,
						" point",
						rewards.pointsPerDollar === 1 ? "" : "s",
						" per dollar on food. ",
						rewards.redeemRate,
						" ",
						"points = $1 off at checkout."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rewards-preview",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "points-chip",
							children: [rewards.points, " pts in wallet"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "points-chip",
							children: [earn, " pts on a $20 pie"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "points-chip",
							children: [rewards.welcomeBonus, " welcome pts"]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Invite friends" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "ed-sub",
					children: [
						"Share your link or QR. A friend who creates an account gets ",
						rewards.inviteeBonus,
						" extra points. You get",
						" ",
						rewards.inviteBonus,
						" points when they join."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your invite link" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						value: inviteUrl,
						readOnly: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "account-quick",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "ed-btn",
						onClick: () => {
							if (!inviteUrl) return;
							navigator.clipboard.writeText(inviteUrl).then(onCopied).catch(() => void 0);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							size: 16,
							strokeWidth: 2.2
						}), copied ? "Copied" : "Copy link"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "ed-btn",
						href: inviteUrl || "#",
						onClick: (e) => !inviteUrl && e.preventDefault(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
							size: 16,
							strokeWidth: 2.2
						}), "Open link"]
					})]
				}),
				inviteUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "invite-qr-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InviteQr, {
						value: inviteUrl,
						label: "Invite QR code"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ed-sub",
						children: [
							"Code ",
							rewards.referralCode,
							". ",
							rewards.inviteCount,
							" friend",
							rewards.inviteCount === 1 ? "" : "s",
							" joined."
						]
					})]
				}) : null,
				rewards.invited.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "invite-friends",
					children: rewards.invited.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.at ? formatShopWhen(row.at) : "" })] }, `${row.at}-${i}`))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "No friends have joined with your code yet."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Rewards history" }), rewards.history.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "rewards-log",
				children: rewards.history.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: kindLabel(row.kind) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "order-meta",
					children: [row.createdAt ? formatShopWhen(row.createdAt) : "", row.note ? ` · ${row.note}` : ""]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
					"data-neg": row.points < 0 ? "true" : void 0,
					children: [row.points > 0 ? "+" : "", row.points]
				})] }, row.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "No points movement yet. Place an order or invite a friend."
			})]
		})
	] });
}
//#endregion
export { AccountPage as component, account_DcjidlER_exports as t };

import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as useCartStore } from "./client-BNc6SJGC.mjs";
import { D as formatTicketNo, E as formatShopWhen, O as formatUsd } from "./hours-BHiQSWtc.mjs";
import { t as formatPhone } from "./phone-Be_Se2od.mjs";
import { E as listMyOrders, J as updateProfile, K as startTotpSetup, L as sendPasswordResetCode, _ as getMyRewards, c as confirmTotpSetup, f as disableTotp, i as changeMyPassword } from "./shop-server-Dp-2A_aD.mjs";
import { G as Copy, P as Link2 } from "../_libs/lucide-react.mjs";
import { t as OrderDateTrays } from "./order-trays-BBMJtsHv.mjs";
import { S as ShopHeader, h as asTab, m as Route$27 } from "./router-Df2FptVQ.mjs";
import { t as InviteQr } from "./invite-qr-DU6GqLmr.mjs";
import { t as SessionGate } from "./guards-PPFf8hmh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-PipqAAmy.js
var account_PipqAAmy_exports = /* @__PURE__ */ __exportAll({ component: () => AccountPage });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const { tab } = Route$27.useSearch();
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
				totpOn ? profile.role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Shop admin two-factor stays on. You can rotate the authenticator from a new enrollment after a verified session."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
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
export { AccountPage as component, account_PipqAAmy_exports as t };

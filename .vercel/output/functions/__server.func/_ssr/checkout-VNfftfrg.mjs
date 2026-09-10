import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as etaMinutes, D as formatTicketNo, E as formatShopWhen, I as nextOpenSlot, L as nyHm, N as isOpenNow, O as formatUsd, R as nyWallToDate, Y as tipFromPercent, b as computeTax, y as clampTip, z as nyYmd } from "./hours-DVH-z3bz.mjs";
import { A as placeGuestOrder, a as checkDeliveryAddress, j as placeOrder } from "./shop-server-DpagHzjx.mjs";
import { t as useCurrentUserState } from "./use-current-user-bU2h6wsg.mjs";
import { C as Plus, k as Minus, l as Trash2 } from "../_libs/lucide-react.mjs";
import { C as useCartStore, S as cartTotals, f as Route$21, v as useCartHydrated, x as ShopHeader } from "./router-C6vZUAg_.mjs";
import { t as SessionGate } from "./guards-vd_DbvAt.mjs";
import { o as googleMapsCoordUrl } from "./geo-O0tEPxB1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-VNfftfrg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const data = Route$21.useLoaderData();
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "shop-shell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionGate, { children: ({ profile }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopHeader, { profile }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "shop-main",
			id: "main",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutForm, {
				profile,
				restaurant: data.restaurant,
				settings: data.settings
			})
		})] }) })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shop-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "shop-main",
			id: "main",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutForm, {
				profile: null,
				restaurant: data.restaurant,
				settings: data.settings
			})
		})]
	});
}
function CheckoutForm({ profile, restaurant, settings: loadedSettings }) {
	const hydrated = useCartHydrated();
	const lines = useCartStore((s) => s.lines);
	const notes = useCartStore((s) => s.notes);
	const setNotes = useCartStore((s) => s.setNotes);
	const setQty = useCartStore((s) => s.setQty);
	const remove = useCartStore((s) => s.remove);
	const clear = useCartStore((s) => s.clear);
	const { subtotal } = cartTotals(lines);
	const settings = loadedSettings;
	const [fulfillment, setFulfillment] = (0, import_react.useState)("pickup");
	const [address, setAddress] = (0, import_react.useState)(profile?.addressLine || "");
	const [city, setCity] = (0, import_react.useState)(profile?.city || "Egg Harbor Township");
	const [zip, setZip] = (0, import_react.useState)(profile?.zip || "08234");
	const [geo, setGeo] = (0, import_react.useState)(null);
	const [redeem, setRedeem] = (0, import_react.useState)(0);
	const [pay, setPay] = (0, import_react.useState)("pay_pickup");
	const [tipMode, setTipMode] = (0, import_react.useState)("none");
	const [customTip, setCustomTip] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [placed, setPlaced] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)("form");
	const [pickupName, setPickupName] = (0, import_react.useState)(profile?.displayName || "");
	const [guestName, setGuestName] = (0, import_react.useState)(profile?.displayName || "");
	const [guestPhone, setGuestPhone] = (0, import_react.useState)(profile?.phone || "");
	const guest = !profile;
	const guestMustCard = guest && settings.guestCardRequired;
	const [whenMode, setWhenMode] = (0, import_react.useState)(loadedSettings.openNow ? "asap" : "schedule");
	const [schedDate, setSchedDate] = (0, import_react.useState)("");
	const [schedTime, setSchedTime] = (0, import_react.useState)("");
	const pickupAt = `${restaurant.address}, ${restaurant.city}`;
	const dateBounds = (0, import_react.useMemo)(() => {
		const min = nyYmd();
		const maxAt = new Date(Date.now() + 12096e5);
		return {
			min,
			max: nyYmd(maxAt)
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (guestMustCard) {
			setPay("pay_card");
			return;
		}
		setPay(fulfillment === "delivery" ? "pay_delivery" : "pay_pickup");
	}, [fulfillment, guestMustCard]);
	(0, import_react.useEffect)(() => {
		if (!settings.openNow) setWhenMode("schedule");
	}, [settings.openNow]);
	(0, import_react.useEffect)(() => {
		if (whenMode !== "schedule") return;
		if (schedDate && schedTime) return;
		const slot = nextOpenSlot(settings.weeklyHours);
		if (slot) {
			setSchedDate(nyYmd(slot));
			setSchedTime(nyHm(slot));
		} else {
			setSchedDate(dateBounds.min);
			setSchedTime("12:00");
		}
	}, [
		whenMode,
		schedDate,
		schedTime,
		dateBounds.min,
		settings.weeklyHours
	]);
	const eta = etaMinutes(settings.prepMinutes, settings.deliveryMinutes, fulfillment);
	const scheduledAt = whenMode === "schedule" && schedDate && schedTime ? nyWallToDate(schedDate, schedTime) : null;
	const scheduledOpen = scheduledAt ? isOpenNow(settings.weeklyHours, scheduledAt) : true;
	const whenLabel = whenMode === "schedule" && scheduledAt ? `Scheduled ${formatShopWhen(scheduledAt.toISOString())}` : `About ${eta} minutes`;
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-skel",
		children: "Loading your bag…"
	});
	if (lines.length === 0 && !placed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Cart is empty" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "Add something from the menu, then come back to check out."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "btn-print",
				children: "Browse the menu"
			})
		]
	});
	if (placed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "shop-brand-kicker",
				children: "South End Pizza III"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Order received" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Ticket #",
				formatTicketNo(placed.ticketNo),
				" · ",
				formatUsd(placed.total),
				" · ",
				placed.status.replaceAll("_", " ")
			] }),
			placed.status === "awaiting_payment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: settings.paymentPlaceholder
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ed-sub",
				children: [
					guest ? "The kitchen has the ticket. Save this number — guest orders are not on an account." : "The kitchen has the ticket. Track it under Account",
					fulfillment === "pickup" ? ` · pickup at ${pickupAt}` : "",
					whenMode === "schedule" && scheduledAt ? ` · ${whenLabel}.` : guest ? "" : "."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "confirm-actions",
				children: [guest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					search: { next: "/account" },
					className: "btn-print",
					children: "Create an account"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account",
					className: "btn-print",
					children: "View history"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "ed-btn",
					children: "Back to the menu"
				})]
			})
		]
	});
	if (settings.vacationOn) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Closed for vacation" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: settings.vacationMessage }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "btn-ghost",
				children: "Back"
			})
		]
	});
	const redeemRate = settings.redeemRate;
	const points = profile?.points ?? 0;
	const maxRedeem = Math.min(Math.floor(points / redeemRate) * redeemRate, Math.floor(subtotal * redeemRate));
	const discount = redeem / redeemRate;
	const deliveryFee = fulfillment === "delivery" ? settings.deliveryFee : 0;
	const { tax, total: preTip } = computeTax(subtotal, discount, deliveryFee, settings.taxRate);
	const tip = tipMode === "custom" ? clampTip(Number(customTip) || 0) : tipMode === "none" ? 0 : tipFromPercent(subtotal, discount, tipMode);
	const total = Math.round((preTip + tip) * 100) / 100;
	function validateCheckout() {
		if (fulfillment === "delivery") {
			if (!settings.hasZones) {
				setError("Delivery zones are not set yet. Please choose pickup.");
				return false;
			}
			if (!geo?.deliverable) {
				setError("Check a deliverable address first.");
				return false;
			}
		}
		if (whenMode === "schedule") {
			if (!scheduledAt) {
				setError("Pick a date and time for pickup or delivery.");
				return false;
			}
			if (scheduledAt.getTime() < Date.now() + 9e5) {
				setError("Pick a time at least 15 minutes from now.");
				return false;
			}
			if (!scheduledOpen) {
				setError(`The kitchen is closed at that time. ${settings.hoursSummary}`);
				return false;
			}
		} else if (!settings.openNow) {
			setError("The kitchen is closed. Schedule a later pickup or delivery.");
			return false;
		}
		return true;
	}
	function submitOrder() {
		if (guest) {
			if (!guestName.trim()) {
				setError("Enter your name.");
				return;
			}
			if (guestPhone.replace(/\D/g, "").length < 10) {
				setError("Enter a 10-digit US phone number.");
				return;
			}
		}
		if (fulfillment === "pickup" && !(pickupName.trim() || guestName.trim())) {
			setError("Enter the name for pickup.");
			return;
		}
		if (guest && settings.guestCardRequired && pay !== "pay_card") {
			setError("Guests pay by card.");
			return;
		}
		setBusy(true);
		setError("");
		const payload = {
			fulfillment,
			notes,
			addressLine: address,
			city,
			zip,
			lat: geo?.lat,
			lng: geo?.lng,
			lines: lines.map((l) => ({
				itemId: l.itemId,
				categoryId: l.categoryId,
				size: l.size,
				qty: l.qty,
				toppings: l.toppings,
				halfItemId: l.halfItemId,
				comment: l.comment,
				condiments: l.condiments
			})),
			redeemPoints: guest ? 0 : redeem,
			paymentMethod: pay,
			tip,
			pickupName: fulfillment === "pickup" ? pickupName.trim() || guestName.trim() : "",
			scheduledDate: whenMode === "schedule" ? schedDate : "",
			scheduledTime: whenMode === "schedule" ? schedTime : "",
			guestName: guestName.trim(),
			guestPhone
		};
		(guest ? placeGuestOrder({ data: payload }) : placeOrder({ data: payload })).then((r) => {
			clear();
			setPlaced({
				id: r.id,
				ticketNo: r.ticketNo,
				total: r.total,
				status: r.status
			});
		}).catch((err) => setError(err instanceof Error ? err.message : "Could not place the order")).finally(() => setBusy(false));
	}
	function payLabel() {
		if (pay === "pay_pickup") return "Pay at pickup";
		if (pay === "pay_delivery") return "Cash";
		return "Card (processor placeholder)";
	}
	if (step === "review") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "confirm-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shop-brand-kicker",
					children: "Review before placing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Confirm your order" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Check every line. Nothing goes to the kitchen until you confirm."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-ticket",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "shop-brand-kicker",
							children: fulfillment === "delivery" ? "Deliver to" : "Pickup"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fulfillment === "delivery" ? `${address}, ${city} ${zip}` : pickupAt }),
						fulfillment === "pickup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Name for pickup" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: pickupName,
								onChange: (e) => setPickupName(e.target.value),
								required: true,
								autoComplete: "name"
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
							whenLabel,
							" · ",
							payLabel(),
							geo?.deliverable && fulfillment === "delivery" ? " · In the painted zone" : ""
						] }),
						geo?.mapsUrl && fulfillment === "delivery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: geo.mapsUrl,
								target: "_blank",
								rel: "noreferrer",
								children: "Open in Google Maps"
							})
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "cart-lines",
					children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						l.qty,
						"× ",
						l.name,
						l.size ? ` · ${l.size}` : "",
						l.detail ? ` · ${l.detail}` : "",
						l.comment ? ` · Cook: ${l.comment}` : ""
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "bag-line-tools",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatUsd(l.unitPrice * l.qty) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "bag-remove",
							"aria-label": `Remove ${l.name}`,
							onClick: () => remove(l.key),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
								size: 15,
								strokeWidth: 2.2
							})
						})]
					})] }, l.key))
				}),
				notes.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pos-notes",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Kitchen notes" }), notes]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "totals",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(subtotal) })] }),
						discount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Rewards" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["−", formatUsd(discount)] })] }) : null,
						deliveryFee ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(deliveryFee) })] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", { children: [
							"Tax (",
							settings.taxRate,
							"%)"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(tax) })] }),
						tip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Tip" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(tip) })] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "totals-grand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(total) })]
						})
					]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "form-error",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "confirm-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ed-btn",
						disabled: busy,
						onClick: () => setStep("form"),
						children: "Edit order"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-print",
						disabled: busy,
						onClick: submitOrder,
						children: busy ? "Placing…" : "Confirm and place"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "check-grid",
		onSubmit: (e) => {
			e.preventDefault();
			if (!validateCheckout()) return;
			setError("");
			setStep("review");
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Checkout" }),
				guest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "guest-banner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ed-sub",
							children: [
								"Checking out as a guest. We only need a name and phone for the ticket",
								settings.guestCardRequired ? ", and payment is by card" : "",
								".",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									search: { next: "/checkout" },
									children: "Sign in"
								}),
								" ",
								"to use reward points and track orders."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: guestName,
								onChange: (e) => {
									setGuestName(e.target.value);
									if (!pickupName || pickupName === guestName) setPickupName(e.target.value);
								},
								autoComplete: "name",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: guestPhone,
								onChange: (e) => setGuestPhone(e.target.value),
								autoComplete: "tel",
								inputMode: "tel",
								placeholder: "(609) 555-0100",
								required: true
							})]
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "seg",
					role: "group",
					"aria-label": "Fulfillment",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-on": fulfillment === "pickup",
						onClick: () => setFulfillment("pickup"),
						children: "Pickup"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-on": fulfillment === "delivery",
						onClick: () => setFulfillment("delivery"),
						disabled: !settings.hasZones,
						children: "Delivery"
					})]
				}),
				fulfillment === "pickup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "ed-sub",
					children: [
						"Pickup at ",
						pickupAt,
						". Pay when you arrive, or use the card placeholder. We will ask for a name at confirmation."
					]
				}) : null,
				!settings.openNow ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "ed-sub",
					children: [
						"The kitchen is closed right now. ",
						settings.hoursSummary,
						" You can still schedule a later pickup or delivery."
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "tip-box",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "When" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub",
							children: "Times are Eastern, for Egg Harbor Township. Scheduled orders need 15 minutes of notice."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "seg",
							role: "group",
							"aria-label": "When to fulfill",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-on": whenMode === "asap",
								disabled: !settings.openNow,
								onClick: () => setWhenMode("asap"),
								children: "As soon as ready"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-on": whenMode === "schedule",
								onClick: () => setWhenMode("schedule"),
								children: "Schedule"
							})]
						}),
						whenMode === "schedule" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "two-col sched-fields",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input",
									type: "date",
									min: dateBounds.min,
									max: dateBounds.max,
									value: schedDate,
									onChange: (e) => setSchedDate(e.target.value),
									required: true
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ed-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "ed-input",
									type: "time",
									step: 900,
									value: schedTime,
									onChange: (e) => setSchedTime(e.target.value),
									required: true
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ed-sub",
							children: [
								"About ",
								eta,
								" minutes for ",
								fulfillment === "delivery" ? "delivery" : "pickup",
								"."
							]
						})
					]
				}),
				!settings.hasZones ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "Delivery is off until the shop paints a zone on the admin map."
				}) : null,
				fulfillment === "delivery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ed-shop",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ed-sub",
							children: [
								"Delivery minimum ",
								formatUsd(settings.minOrderDelivery),
								". Fee ",
								formatUsd(settings.deliveryFee),
								". We check the painted zone after you look up the address."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Street" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: address,
								onChange: (e) => setAddress(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "City" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: city,
								onChange: (e) => setCity(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ZIP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								value: zip,
								onChange: (e) => setZip(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ed-btn",
							onClick: () => {
								checkDeliveryAddress({ data: { query: `${address}, ${city} ${zip}` } }).then((r) => {
									if (!r.found || r.lat == null || r.lng == null) {
										setGeo(null);
										setError("We could not find that address.");
										return;
									}
									setGeo({
										lat: r.lat,
										lng: r.lng,
										label: r.label,
										deliverable: r.deliverable,
										mapsUrl: r.mapsUrl
									});
									setError(r.deliverable ? "" : "That pin is outside the delivery zone.");
								});
							},
							children: "Check delivery zone"
						}),
						geo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ed-sub",
							children: [
								geo.deliverable ? "We deliver here." : "Outside the zone.",
								" ",
								geo.label,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: geo.mapsUrl || googleMapsCoordUrl(geo.lat, geo.lng),
									target: "_blank",
									rel: "noreferrer",
									children: "Google Maps"
								})
							]
						}) : null
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Notes for the kitchen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "ed-input ed-area",
						rows: 3,
						maxLength: 500,
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						placeholder: "Well done, extra ranch, doorbell is broken…",
						suppressHydrationWarning: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "tip-box",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Tip" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub",
							children: "Quick percents are on food after rewards. Tips are not taxed in New Jersey."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "tip-chips",
							role: "group",
							"aria-label": "Tip percent",
							children: [
								["none", "No tip"],
								[10, "10%"],
								[15, "15%"],
								[20, "20%"],
								["custom", "Custom"]
							].map(([mode, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-on": tipMode === mode,
								onClick: () => setTipMode(mode),
								children: [label, typeof mode === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: formatUsd(tipFromPercent(subtotal, discount, mode)) }) : null]
							}, String(mode)))
						}),
						tipMode === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Custom tip" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								inputMode: "decimal",
								value: customTip,
								onChange: (e) => setCustomTip(e.target.value.replace(/[^\d.]/g, "")),
								placeholder: "0.00"
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "pay-box",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Payment" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ed-sub",
							children: guestMustCard ? "Guest checkout is card-only. Sign in if you need to pay at pickup or with cash." : settings.paymentPlaceholder
						}),
						guestMustCard ? null : fulfillment === "pickup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "pay-opt",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "pay",
								checked: pay === "pay_pickup",
								onChange: () => setPay("pay_pickup")
							}), "Pay at pickup"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "pay-opt",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "pay",
								checked: pay === "pay_delivery",
								onChange: () => setPay("pay_delivery")
							}), "Cash"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: guestMustCard ? "pay-opt" : "pay-opt pay-disabled",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "pay",
									checked: pay === "pay_card",
									onChange: () => setPay("pay_card")
								}),
								"Card ",
								guestMustCard ? "(required for guests)" : "(processor placeholder)"
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Bag" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "cart-lines",
					children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: l.name }),
						l.size ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cart-size",
							children: l.size
						}) : null,
						l.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cart-size",
							children: l.detail
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "cart-line-price",
							children: formatUsd(l.unitPrice * l.qty)
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bag-line-tools",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "qty-step",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Fewer ${l.name}`,
									onClick: () => setQty(l.key, l.qty - 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 14 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.qty }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `More ${l.name}`,
									onClick: () => setQty(l.key, l.qty + 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "bag-remove",
							"aria-label": `Remove ${l.name}`,
							onClick: () => remove(l.key),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
								size: 16,
								strokeWidth: 2.2
							})
						})]
					})] }, l.key))
				}),
				guest ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Redeem points (",
						points,
						" available, ",
						redeemRate,
						" pts = $1)"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						type: "number",
						min: 0,
						step: redeemRate,
						max: maxRedeem,
						value: redeem,
						onChange: (e) => setRedeem(Math.max(0, Math.min(maxRedeem, Number(e.target.value) || 0)))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "totals",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(subtotal) })] }),
						discount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Rewards" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["−", formatUsd(discount)] })] }) : null,
						deliveryFee ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(deliveryFee) })] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", { children: [
							"Tax (",
							settings.taxRate,
							"%)"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(tax) })] }),
						tip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Tip" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(tip) })] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "totals-grand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatUsd(total) })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: whenMode === "schedule" ? whenLabel : `About ${eta} minutes for ${fulfillment === "delivery" ? "delivery" : "pickup"}.`
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "form-error",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "btn-print",
					disabled: busy,
					children: "Review order"
				})
			]
		})]
	});
}
//#endregion
export { CheckoutPage as component };

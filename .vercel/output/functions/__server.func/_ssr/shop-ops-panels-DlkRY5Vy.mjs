import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as etaMinutes, O as formatUsd, a as DAY_KEYS, b as computeTax, o as DAY_LABELS } from "./hours-CePKgkcU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-ops-panels-DlkRY5Vy.js
var import_jsx_runtime = require_jsx_runtime();
function PaymentProcessorPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card pay-soon",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "soon-banner",
				children: "Under construction"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Payment processor" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "These fields are the shop inputs for a card processor. They are shown so the wiring is ready — nothing is charged and nothing is saved until the processor is connected."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "pay-soon-fields",
				disabled: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "sr-only",
						children: "Processor fields, not yet active"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "two-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Processor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "ed-input",
								defaultValue: "stripe",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "stripe",
										children: "Stripe"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "square",
										children: "Square"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "clover",
										children: "Clover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "paypal",
										children: "PayPal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "authorize",
										children: "Authorize.net"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Environment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "ed-input",
								defaultValue: "sandbox",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "sandbox",
									children: "Sandbox"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "live",
									children: "Live"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Merchant ID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "ed-input",
							placeholder: "acct_ or location ID",
							readOnly: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Publishable / public key" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "ed-input",
							placeholder: "pk_…",
							readOnly: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Secret key" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "ed-input",
							type: "password",
							placeholder: "sk_…",
							readOnly: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Webhook signing secret" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "ed-input",
							type: "password",
							placeholder: "whsec_…",
							readOnly: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "two-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Statement descriptor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								defaultValue: "SOUTH END PIZZA",
								readOnly: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ed-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Currency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "ed-input",
								defaultValue: "usd",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "usd",
									children: "USD"
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "pay-opt",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							disabled: true
						}), "Card present (tablet / terminal)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "pay-opt",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							disabled: true
						}), "Online checkout"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "pay-opt",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							disabled: true
						}), "Tips on the receipt"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn-print",
				disabled: true,
				children: "Save processor"
			})
		]
	});
}
function HoursPanel({ settings, setSettings }) {
	function patchDay(key, next) {
		setSettings({
			...settings,
			weeklyHours: {
				...settings.weeklyHours,
				[key]: {
					...settings.weeklyHours[key],
					...next
				}
			}
		});
	}
	const etaPickup = etaMinutes(settings.prepMinutes, settings.deliveryMinutes, "pickup");
	const etaDelivery = etaMinutes(settings.prepMinutes, settings.deliveryMinutes, "delivery");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Time management" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "Kitchen hours use America/New_York. Checkout blocks new tickets when the shop is closed (vacation still overrides this)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "points-chip",
				children: settings.openNow ? "Kitchen is open" : "Kitchen is closed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hours-grid",
				children: DAY_KEYS.map((key) => {
					const day = settings.weeklyHours[key];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hours-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: DAY_LABELS[key] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "pay-opt",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: day.closed,
									onChange: (e) => patchDay(key, { closed: e.target.checked })
								}), "Closed"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								type: "time",
								value: day.open,
								disabled: day.closed,
								onChange: (e) => patchDay(key, { open: e.target.value })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ed-input",
								type: "time",
								value: day.close,
								disabled: day.closed,
								onChange: (e) => patchDay(key, { close: e.target.value })
							})
						]
					}, key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "two-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kitchen prep (minutes)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						type: "number",
						min: 5,
						value: settings.prepMinutes,
						onChange: (e) => setSettings({
							...settings,
							prepMinutes: Number(e.target.value)
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery travel (minutes)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						type: "number",
						min: 5,
						value: settings.deliveryMinutes,
						onChange: (e) => setSettings({
							...settings,
							deliveryMinutes: Number(e.target.value)
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ed-sub",
				children: [
					"Shown at checkout: pickup about ",
					etaPickup,
					" min · delivery about ",
					etaDelivery,
					" min."
				]
			})
		]
	});
}
function VacationPanel({ settings, setSettings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Vacation" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "Vacation pauses new tickets. The shop stays browsable; checkout is closed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "pay-opt",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: settings.vacationOn,
					onChange: (e) => setSettings({
						...settings,
						vacationOn: e.target.checked
					})
				}), "Vacation mode — shop closed for orders"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vacation message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "ed-input ed-area",
					rows: 3,
					value: settings.vacationMessage,
					onChange: (e) => setSettings({
						...settings,
						vacationMessage: e.target.value
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "ed-input",
					value: settings.vacationUntil,
					onChange: (e) => setSettings({
						...settings,
						vacationUntil: e.target.value
					}),
					placeholder: "Monday, Sept 14"
				})]
			})
		]
	});
}
function PaymentsPanel({ settings, setSettings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Payments" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "This copy shows at checkout until a card processor is wired in."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment note at checkout" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "ed-input ed-area",
					rows: 3,
					value: settings.paymentPlaceholder,
					onChange: (e) => setSettings({
						...settings,
						paymentPlaceholder: e.target.value
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "pay-opt",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: settings.guestCardRequired,
					onChange: (e) => setSettings({
						...settings,
						guestCardRequired: e.target.checked
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Require card payment for guests", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Guests cannot pay at pickup or with cash. Signed-in customers still can." })] })]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentProcessorPanel, {})] });
}
function TaxPanel({ settings, setSettings }) {
	const sampleFood = 20;
	const sampleFee = settings.deliveryFee;
	const { tax, total } = computeTax(sampleFood, 0, sampleFee, settings.taxRate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Tax rate" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "Applied at checkout on food after rewards, plus the delivery fee. Pickup has no delivery fee. New Jersey prepared-food default is 6.625%. Tips are collected after tax and are not taxed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sales tax percent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "ed-input",
					type: "number",
					step: "0.001",
					min: 0,
					max: 25,
					value: settings.taxRate,
					onChange: (e) => setSettings({
						...settings,
						taxRate: Number(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ed-sub",
				children: [
					"A ",
					formatUsd(sampleFood),
					" pie plus a ",
					formatUsd(sampleFee),
					" delivery fee adds ",
					formatUsd(tax),
					" tax (",
					settings.taxRate || 0,
					"%). Checkout would collect ",
					formatUsd(total),
					"."
				]
			})
		]
	});
}
function ToppingPricePanel({ settings, setSettings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Extra topping prices" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "Used when a guest adds toppings on a pizza. Half-and-half toppings charge half. Offer XL on a pie by typing an XL price on that item — no separate toggle."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "topping-price-grid",
				children: [
					["toppingPriceSm", "Small"],
					["toppingPriceMd", "Medium"],
					["toppingPriceLg", "Large"],
					["toppingPriceXl", "Extra large"]
				].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						type: "number",
						step: "0.25",
						min: 0,
						max: 20,
						value: settings[key],
						onChange: (e) => setSettings({
							...settings,
							[key]: Number(e.target.value)
						})
					})]
				}, key))
			})
		]
	});
}
function DeliveryPanel({ settings, setSettings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Delivery settings" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "Checkout only allows delivery inside the painted map below. Addresses outside it stay pickup-only."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "two-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Minimum order" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						type: "number",
						step: "0.01",
						min: 0,
						value: settings.minOrderDelivery,
						onChange: (e) => setSettings({
							...settings,
							minOrderDelivery: Number(e.target.value)
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery fee" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						type: "number",
						step: "0.01",
						min: 0,
						value: settings.deliveryFee,
						onChange: (e) => setSettings({
							...settings,
							deliveryFee: Number(e.target.value)
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Travel time added at checkout (minutes)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "ed-input",
					type: "number",
					min: 5,
					value: settings.deliveryMinutes,
					onChange: (e) => setSettings({
						...settings,
						deliveryMinutes: Number(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: settings.hasZones ? "A delivery zone is painted. Addresses outside it stay pickup-only." : "No zone painted yet — customers can only choose pickup."
			})
		]
	});
}
function RewardsPanel({ settings, setSettings }) {
	const earn = Math.round(20 * (settings.pointsPerDollar || 0));
	const dollar = settings.redeemRate > 0 ? 1 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Points program" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ed-sub",
				children: "Points accrue on paid food totals (minus delivery). Guests do not earn or redeem — that stays on signed-in accounts. Customers redeem at checkout."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rewards-preview",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "points-chip",
						children: [earn, " pts on a $20 pie"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "points-chip",
						children: [
							settings.redeemRate || 0,
							" pts = ",
							formatUsd(dollar)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "points-chip",
						children: [settings.welcomeBonus || 0, " welcome pts"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "points-chip",
						children: [settings.inviteBonus || 0, " for inviting"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "points-chip",
						children: [settings.inviteeBonus || 0, " for joining with a code"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "two-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Points per dollar spent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						type: "number",
						step: "0.1",
						min: 0,
						value: settings.pointsPerDollar,
						onChange: (e) => setSettings({
							...settings,
							pointsPerDollar: Number(e.target.value)
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Points needed for $1 off" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						type: "number",
						min: 1,
						value: settings.redeemRate,
						onChange: (e) => setSettings({
							...settings,
							redeemRate: Number(e.target.value)
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ed-field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Welcome bonus for new accounts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "ed-input",
					type: "number",
					min: 0,
					value: settings.welcomeBonus,
					onChange: (e) => setSettings({
						...settings,
						welcomeBonus: Number(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "two-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Points you get when a friend joins" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						type: "number",
						min: 0,
						value: settings.inviteBonus,
						onChange: (e) => setSettings({
							...settings,
							inviteBonus: Number(e.target.value)
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ed-field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Extra points the friend gets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "ed-input",
						type: "number",
						min: 0,
						value: settings.inviteeBonus,
						onChange: (e) => setSettings({
							...settings,
							inviteeBonus: Number(e.target.value)
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { TaxPanel as a, RewardsPanel as i, HoursPanel as n, ToppingPricePanel as o, PaymentsPanel as r, VacationPanel as s, DeliveryPanel as t };

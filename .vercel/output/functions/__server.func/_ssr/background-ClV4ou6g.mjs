import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as sanitizeSeasonEffect, d as SEASON_EFFECTS } from "./hours-DVH-z3bz.mjs";
import { a as emitShopBackdrop, n as BrandMark, o as emitShopLogo } from "./brand-mark-DrSWcYOk.mjs";
import { F as saveShopSettings, h as getAdminShop } from "./shop-server-DpagHzjx.mjs";
import { t as fileToDataImage } from "./image-file-B097txSk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/background-ClV4ou6g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminBackground() {
	const [backdrop, setBackdrop] = (0, import_react.useState)("");
	const [backdropPreview, setBackdropPreview] = (0, import_react.useState)("");
	const [logo, setLogo] = (0, import_react.useState)("");
	const [logoPreview, setLogoPreview] = (0, import_react.useState)("");
	const [notify, setNotify] = (0, import_react.useState)("");
	const [season, setSeason] = (0, import_react.useState)("none");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)("");
	const [previewAspect, setPreviewAspect] = (0, import_react.useState)("16 / 9");
	(0, import_react.useEffect)(() => {
		getAdminShop().then((d) => {
			setBackdrop(d.settings.backdropData || "");
			setBackdropPreview(d.settings.backdropData || "/buffalo-mark.webp");
			setLogo(d.settings.logoData || "");
			setLogoPreview(d.settings.logoData || "/mark.jpg");
			setNotify(d.notifyAudio || "");
			setSeason(sanitizeSeasonEffect(d.settings.seasonEffect));
		}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not load"));
	}, []);
	(0, import_react.useEffect)(() => {
		const apply = () => {
			const w = Math.max(1, window.innerWidth);
			const h = Math.max(1, window.innerHeight);
			setPreviewAspect(`${w} / ${h}`);
		};
		apply();
		window.addEventListener("resize", apply);
		return () => window.removeEventListener("resize", apply);
	}, []);
	function applyBackdrop(data) {
		setBusy(true);
		setMsg("");
		saveShopSettings({ data: { backdropData: data } }).then(() => {
			setBackdrop(data);
			setBackdropPreview(data || "/buffalo-mark.webp");
			emitShopBackdrop();
			setMsg(data ? "Backdrop saved. It covers the screen at this window’s shape." : "Restored the buffalo-and-chicken mark.");
		}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not save")).finally(() => setBusy(false));
	}
	function applyLogo(data) {
		setBusy(true);
		setMsg("");
		saveShopSettings({ data: { logoData: data } }).then(() => {
			setLogo(data);
			setLogoPreview(data || "/mark.jpg");
			emitShopBackdrop();
			emitShopLogo();
			setMsg(data ? "Shop icon saved. Header, login, and the tab icon use it." : "Restored the original shop icon.");
		}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not save")).finally(() => setBusy(false));
	}
	function applySeason(next) {
		setBusy(true);
		setMsg("");
		saveShopSettings({ data: { seasonEffect: next } }).then(() => {
			setSeason(next);
			emitShopBackdrop();
			setMsg(next === "none" ? "Seasonal effects are off." : "Seasonal effect is on across the shop.");
		}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not save")).finally(() => setBusy(false));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "settings-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Settings" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Swap the website icon, the full-page backdrop, seasonal effects, and the incoming-order alarm. The icon shows in the header, login, and browser tab. The backdrop covers the screen at the visitor’s window size, faded so the menu stays readable."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Website icon" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "This is the stamp customers see next to the shop name."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "logo-preview",
						children: logoPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logoPreview,
							alt: "Shop icon preview"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { variant: "settings" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Icon file" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "ed-input",
							type: "file",
							accept: "image/png,image/jpeg,image/webp,image/gif",
							disabled: busy,
							onChange: (e) => {
								const file = e.target.files?.[0];
								e.target.value = "";
								if (!file) return;
								setBusy(true);
								setMsg("");
								fileToDataImage(file, {
									maxEdge: 320,
									maxChars: 12e4,
									quality: .86
								}).then((url) => {
									setLogoPreview(url);
									applyLogo(url);
								}).catch((err) => {
									setMsg(err instanceof Error ? err.message : "Could not read that image");
									setBusy(false);
								});
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "confirm-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ed-btn",
							disabled: busy || !logo,
							onClick: () => applyLogo(""),
							children: "Restore original icon"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Page backdrop" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Covers the whole window. The photo keeps its own shape; the shop scales it to this screen with cover, so nothing is cropped at upload."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "backdrop-preview",
						style: { aspectRatio: previewAspect },
						children: backdropPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: backdropPreview,
							alt: "Shop background preview"
						}) : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Backdrop file" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "ed-input",
							type: "file",
							accept: "image/png,image/jpeg,image/webp,image/gif",
							disabled: busy,
							onChange: (e) => {
								const file = e.target.files?.[0];
								e.target.value = "";
								if (!file) return;
								setBusy(true);
								setMsg("");
								fileToDataImage(file, {
									maxEdge: 1920,
									maxChars: 28e4,
									quality: .84
								}).then((url) => {
									setBackdropPreview(url);
									applyBackdrop(url);
								}).catch((err) => {
									setMsg(err instanceof Error ? err.message : "Could not read that image");
									setBusy(false);
								});
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "confirm-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ed-btn",
							disabled: busy || !backdrop,
							onClick: () => applyBackdrop(""),
							children: "Restore buffalo mark"
						})
					}),
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: msg
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Seasonal effects" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Quiet motion for holidays. Off by default. Respects reduced-motion, and never covers buttons or text contrast."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Occasion" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "ed-input",
							value: season,
							disabled: busy,
							onChange: (e) => applySeason(sanitizeSeasonEffect(e.target.value)),
							children: SEASON_EFFECTS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: opt.id,
								children: opt.label
							}, opt.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Incoming-order alarm" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: "Plays when a new ticket lands, including a queue of several at once. Default is a two-tone alarm-clock ring."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
						className: "notify-audio",
						controls: true,
						src: notify || "/order-alarm.wav",
						preload: "none",
						children: "Alarm preview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ed-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Alarm file" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "ed-input",
							type: "file",
							accept: "audio/wav,audio/mpeg,audio/mp3,audio/ogg,audio/webm",
							disabled: busy,
							onChange: (e) => {
								const file = e.target.files?.[0];
								e.target.value = "";
								if (!file) return;
								if (file.size > 28e4) {
									setMsg("Keep the alarm under 280 KB.");
									return;
								}
								setBusy(true);
								setMsg("");
								const reader = new FileReader();
								reader.onload = () => {
									const url = String(reader.result || "");
									saveShopSettings({ data: { notifyAudio: url } }).then(() => {
										setNotify(url);
										setMsg("Incoming-order alarm saved.");
									}).catch((err) => setMsg(err instanceof Error ? err.message : "Could not save")).finally(() => setBusy(false));
								};
								reader.onerror = () => {
									setMsg("Could not read that audio file.");
									setBusy(false);
								};
								reader.readAsDataURL(file);
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "confirm-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ed-btn",
							disabled: busy || !notify,
							onClick: () => {
								setBusy(true);
								setMsg("");
								saveShopSettings({ data: { notifyAudio: "" } }).then(() => {
									setNotify("");
									setMsg("Restored the default alarm-clock ring.");
								}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not save")).finally(() => setBusy(false));
							},
							children: "Restore default alarm"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { AdminBackground as component };

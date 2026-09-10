import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as getStorefront } from "./shop-server-Dp-2A_aD.mjs";
import { S as Printer } from "../_libs/lucide-react.mjs";
import { t as SessionGate } from "./guards-PPFf8hmh.mjs";
import { r as useMenuStore } from "./menu-store-qDZ-Bgax.mjs";
import { n as MenuBoard, t as CategoryJump } from "./menu-board-MAFlIjsu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/board-Bna6VJiG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BoardPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionGate, {
		needAdmin: true,
		children: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardInner, {})
	});
}
function BoardInner() {
	const [paper, setPaper] = (0, import_react.useState)("tabloid");
	const [showDesc, setShowDesc] = (0, import_react.useState)(false);
	const [showMark, setShowMark] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		useMenuStore.persist.rehydrate();
		getStorefront().then((data) => {
			setShowMark(data.settings.showMark);
			useMenuStore.getState().replaceAll({
				restaurant: data.restaurant,
				footer: data.footer,
				categories: data.categories.map((c) => ({
					...c,
					items: c.items.map((it, i) => ({
						...it,
						id: it.id ?? `${c.id}-${i}`
					}))
				}))
			});
		});
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.dataset.paper = paper;
		return () => {
			delete document.documentElement.dataset.paper;
		};
	}, [paper]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "studio-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "studio-toolbar no-print",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "toolbar-title",
					children: "South End Pizza III · Wall Menu"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "toolbar-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "btn-ghost",
						children: "Customer menu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn-print",
						onClick: () => window.print(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
							size: 16,
							strokeWidth: 2.2
						}), "Print / Save PDF"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "toolbar-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "seg",
						role: "group",
						"aria-label": "Paper size",
						children: [
							["letter", "Letter"],
							["tabloid", "Tabloid 11×17"],
							["poster", "Poster 18×24"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": paper === id,
							onClick: () => setPaper(id),
							children: label
						}, id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "seg",
						role: "group",
						"aria-label": "Descriptions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": showDesc,
							onClick: () => setShowDesc(true),
							children: "Full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": !showDesc,
							onClick: () => setShowDesc(false),
							children: "Compact"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "toolbar-hint",
					children: "Print this board and post it on the wall. Turn on background graphics so the cream paper and red headers come through."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryJump, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "preview-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuBoard, {
				paper,
				showDesc,
				showMark
			})
		})]
	});
}
//#endregion
export { BoardPage as component };

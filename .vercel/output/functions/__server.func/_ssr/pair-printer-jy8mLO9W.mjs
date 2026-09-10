import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BrandMark } from "./brand-mark-DrSWcYOk.mjs";
import { nt as Bluetooth } from "../_libs/lucide-react.mjs";
import { a as bytesFromPrintJob, c as pairBluetoothPrinterHere, f as publishPairedPrinter, g as takePrintJob, m as stashPrintJob, n as bluetoothReady, o as notifyPrintResult, u as printEscPos } from "./bluetooth-printer-i6teuJoZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pair-printer-jy8mLO9W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PairPrinterPage() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [printing, setPrinting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		bluetoothReady().then((ready) => {
			if (ready === "ready") setStatus("Bluetooth is on for this shop. Tap pair and pick the printer.");
			else if (ready === "adapter-off") setStatus("Turn Bluetooth on on this tablet, then tap pair.");
			else if (ready === "blocked") setStatus("This window must stay on top. If the chooser does not appear, open this page in Chrome or Edge.");
			else setStatus("Use Chrome or Edge on the shop tablet to connect a Bluetooth printer.");
		});
		if (!(new URLSearchParams(window.location.search).get("print") === "1")) return;
		const job = takePrintJob();
		if (!job) {
			setMsg("No ticket waiting. Close this window and print again from the shop.");
			return;
		}
		sendTicket(job);
	}, []);
	function sendTicket(job) {
		setPrinting(true);
		setBusy(true);
		return printEscPos(job.bluetoothId, bytesFromPrintJob(job)).then(() => {
			notifyPrintResult(true);
			setMsg("Ticket sent to the printer. You can close this window.");
			window.setTimeout(() => {
				try {
					window.close();
				} catch {}
			}, 700);
		}).catch((e) => {
			stashPrintJob(job.bluetoothId, bytesFromPrintJob(job));
			const error = e instanceof Error ? e.message : "Bluetooth print failed";
			setMsg(`${error} Pair the printer below, then the ticket will send.`);
			setPrinting(false);
		}).finally(() => setBusy(false));
	}
	function pair() {
		setBusy(true);
		setMsg("");
		pairBluetoothPrinterHere().then(async (paired) => {
			publishPairedPrinter(paired);
			const job = takePrintJob();
			if (job) try {
				await printEscPos(paired.bluetoothId, bytesFromPrintJob(job));
				notifyPrintResult(true);
				setMsg(`Paired ${paired.bluetoothName} and sent the ticket.`);
			} catch (e) {
				notifyPrintResult(false, e instanceof Error ? e.message : "Bluetooth print failed");
				setMsg(`Paired ${paired.bluetoothName}, but the ticket did not send. ${e instanceof Error ? e.message : "Try test print from Printer setup."}`);
				return;
			}
			else setMsg(`Paired ${paired.bluetoothName}. You can close this window.`);
			window.setTimeout(() => {
				try {
					window.close();
				} catch {}
			}, 800);
		}).catch((e) => setMsg(e instanceof Error ? e.message : "Could not pair the printer.")).finally(() => setBusy(false));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "shop-shell pair-shell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "login-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "login-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { variant: "login" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: "Printer pairing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: printing ? "Sending ticket" : "Connect the printer" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn-print",
						onClick: pair,
						disabled: busy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bluetooth, {
							size: 16,
							strokeWidth: 2.2
						}), busy ? "Waiting for printer…" : "Pair Bluetooth printer"]
					}),
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ed-sub",
						children: msg
					}) : null
				]
			})
		})
	});
}
//#endregion
export { PairPrinterPage as component };

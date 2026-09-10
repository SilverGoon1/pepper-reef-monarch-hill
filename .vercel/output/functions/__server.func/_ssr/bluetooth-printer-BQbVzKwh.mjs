import { D as formatTicketNo, O as formatUsd } from "./hours-DVH-z3bz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bluetooth-printer-BQbVzKwh.js
var PAPER_COLS = {
	"58mm": 32,
	"80mm": 48
};
function paperCols(paper = "58mm") {
	return PAPER_COLS[paper] ?? 32;
}
function pad(left, right, width) {
	const gap = Math.max(1, width - left.length - right.length);
	return `${left}${" ".repeat(gap)}${right}`;
}
function wrap(text, width) {
	const words = String(text || "").split(/\s+/).filter(Boolean);
	const lines = [];
	let cur = "";
	for (const w of words) {
		if (!cur) {
			cur = w.slice(0, width);
			continue;
		}
		if ((cur + " " + w).length <= width) cur += " " + w;
		else {
			lines.push(cur);
			cur = w.slice(0, width);
		}
	}
	if (cur) lines.push(cur);
	return lines;
}
function rule(width, ch = "-") {
	return ch.repeat(width);
}
function payLabel(method) {
	if (method === "pay_pickup") return "Pay at pickup";
	if (method === "pay_delivery") return "Cash";
	if (method === "pay_card") return "Card";
	return method.replaceAll("_", " ");
}
function buildReceiptText(opts) {
	const width = paperCols(opts.paper);
	const r = opts.restaurant;
	const o = opts.order;
	const when = new Date(o.createdAt);
	const lines = [];
	const center = (s) => {
		const t = s.slice(0, width);
		const padL = Math.max(0, Math.floor((width - t.length) / 2));
		return " ".repeat(padL) + t;
	};
	lines.push(center(r.name.toUpperCase()));
	for (const row of wrap(r.address, width)) lines.push(center(row));
	for (const row of wrap(r.city, width)) lines.push(center(row));
	lines.push(center(r.phone));
	if (opts.receipt.taxId.trim()) lines.push(center(`NJ Tax ID ${opts.receipt.taxId.trim()}`));
	lines.push(rule(width));
	lines.push(center(opts.kind === "store" ? "*** STORE COPY ***" : "*** CUSTOMER COPY ***"));
	lines.push(rule(width));
	if (o.notes.trim()) {
		lines.push("NOTES");
		lines.push(...wrap(o.notes, width));
		lines.push(rule(width));
	}
	lines.push(pad("Ticket", formatTicketNo(o.ticketNo), width));
	lines.push(pad("Date", when.toLocaleDateString(), width));
	lines.push(pad("Time", when.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	}), width));
	lines.push(pad("Type", o.fulfillment === "delivery" ? "Delivery" : "Pickup", width));
	if (o.scheduledFor) {
		const whenAt = new Date(o.scheduledFor);
		lines.push(pad("When", whenAt.toLocaleString([], {
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit"
		}), width));
	}
	if (o.fulfillment === "pickup" && o.pickupName) lines.push(pad("Name", o.pickupName, width));
	lines.push(pad("Status", o.status.replaceAll("_", " "), width));
	lines.push(rule(width));
	for (const it of o.items) {
		const name = `${it.qty} ${it.name}${it.size ? ` ${it.size}` : ""}`;
		const price = formatUsd(it.unitPrice * it.qty);
		const chunks = wrap(name, Math.max(10, width - price.length - 1));
		lines.push(pad(chunks[0] ?? name, price, width));
		for (const extra of chunks.slice(1)) lines.push(extra);
		if (it.detail) for (const extra of wrap(it.detail, width - 2)) lines.push(`  ${extra}`);
		if (it.comment) {
			if (opts.kind === "store") {
				lines.push("  *** COOK NOTE ***");
				for (const extra of wrap(it.comment.toUpperCase(), width - 2)) lines.push(`  ${extra}`);
			} else for (const extra of wrap(`Cook: ${it.comment}`, width - 2)) lines.push(`  ${extra}`);
		}
		if (it.qty > 1) lines.push(`  ${formatUsd(it.unitPrice)} each`);
	}
	lines.push(rule(width));
	lines.push(pad("Subtotal", formatUsd(o.subtotal), width));
	if (o.discount) lines.push(pad("Discounts", `-${formatUsd(o.discount)}`, width));
	if (o.deliveryFee) lines.push(pad("Delivery", formatUsd(o.deliveryFee), width));
	lines.push(pad(`NJ sales tax ${opts.taxRate}%`, formatUsd(o.tax), width));
	if (o.tip) lines.push(pad("Tip", formatUsd(o.tip), width));
	lines.push(pad("TOTAL", formatUsd(o.total), width));
	lines.push(rule(width));
	lines.push(pad("Tender", payLabel(o.paymentMethod), width));
	if (o.pointsEarned) lines.push(pad("Points earned", String(o.pointsEarned), width));
	if (o.pointsSpent) lines.push(pad("Points redeemed", String(o.pointsSpent), width));
	if (opts.kind === "store") {
		if (o.fulfillment === "delivery" && o.addressLine) {
			lines.push(rule(width));
			lines.push("Deliver to");
			lines.push(...wrap(`${o.addressLine}, ${o.city} ${o.zip}`.trim(), width));
		}
		lines.push(rule(width));
		lines.push(center("Not a customer receipt"));
	} else {
		if (o.fulfillment === "pickup") lines.push(...wrap("Pickup at 443 Zion Rd, Egg Harbor Township.", width));
		lines.push(rule(width));
		const footer = opts.receipt.footer.trim() || "Thank you. Keep this receipt.";
		for (const row of wrap(footer, width)) lines.push(center(row));
		lines.push(center("Sales tax separately stated"));
	}
	lines.push("");
	return lines.join("\n");
}
function sampleOrder() {
	return {
		id: "ord-sample-001",
		ticketNo: 1,
		userId: "sample",
		status: "preparing",
		fulfillment: "pickup",
		notes: "Well done, extra ranch",
		addressLine: "",
		city: "",
		zip: "",
		items: [{
			itemId: "pep",
			categoryId: "pizza",
			name: "Pepperoni Pizza",
			size: "LG",
			unitPrice: 18.75,
			qty: 1
		}, {
			itemId: "sticks",
			categoryId: "appetizers",
			name: "Mozzarella Sticks",
			size: "5 pc",
			unitPrice: 8.5,
			qty: 1
		}],
		subtotal: 27.25,
		discount: 0,
		deliveryFee: 0,
		tax: 1.81,
		tip: 4.09,
		total: 33.15,
		pointsEarned: 27,
		pointsSpent: 0,
		paymentMethod: "pay_pickup",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function ascii(text) {
	return text.replace(/[^\x09\x0a\x0d\x20-\x7e]/g, "?");
}
function textToEscPos(text) {
	const init = [27, 64];
	const left = [
		27,
		97,
		0
	];
	const body = Array.from(new TextEncoder().encode(ascii(text).replaceAll("\n", "\r\n")));
	const feed = [
		10,
		10,
		10,
		10
	];
	const cut = [
		29,
		86,
		65,
		16
	];
	return Uint8Array.from([
		...init,
		...left,
		...body,
		...feed,
		...cut
	]);
}
function jobsForPrinters(printers, kinds) {
	const jobs = [];
	for (const printer of printers) {
		if (!printer.enabled) continue;
		const copies = Math.max(1, Math.min(5, Math.round(printer.copies || 1)));
		const want = [];
		if (printer.customerCopy && kinds.includes("customer")) want.push("customer");
		if (printer.storeCopy && kinds.includes("store")) want.push("store");
		for (let i = 0; i < copies; i++) for (const kind of want) jobs.push({
			printer,
			kind
		});
	}
	return jobs;
}
var NUS = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
var NUS_RX = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
var ISSC = "49535343-fe7d-4ae5-8fa9-9fafd205e455";
var ISSC_RX = "49535343-8841-43f4-a8d4-ecbe34729bb3";
var ISSC_TX = "49535343-aca3-481c-91ec-d85e28a60318";
var FFE0 = "0000ffe0-0000-1000-8000-00805f9b34fb";
var FFE1 = "0000ffe1-0000-1000-8000-00805f9b34fb";
var FF00 = "0000ff00-0000-1000-8000-00805f9b34fb";
var FF02 = "0000ff02-0000-1000-8000-00805f9b34fb";
var AE30 = "0000ae30-0000-1000-8000-00805f9b34fb";
var FEASY = "e7810a71-73ae-499d-8c15-faa9aef0c3f2";
var PRINT_SVC = "000018f0-0000-1000-8000-00805f9b34fb";
var PRINT_DATA = "00002af1-0000-1000-8000-00805f9b34fb";
var FFF0 = "0000fff0-0000-1000-8000-00805f9b34fb";
var FFF1 = "0000fff1-0000-1000-8000-00805f9b34fb";
var OPTIONAL_SERVICES = [
	NUS,
	ISSC,
	FFE0,
	FF00,
	AE30,
	FEASY,
	PRINT_SVC,
	FFF0,
	"0000ff10-0000-1000-8000-00805f9b34fb"
];
var WRITE_CHARS = [
	NUS_RX,
	ISSC_RX,
	ISSC_TX,
	FFE1,
	FF02,
	PRINT_DATA,
	FFF1
];
var PRINTER_PAIR_CHANNEL = "southend-printer-pair";
var PRINTER_PAIR_PATH = "/pair-printer";
var PRINT_JOB_KEY = "southend-print-job";
var live = /* @__PURE__ */ new Map();
function framed() {
	if (typeof window === "undefined") return false;
	try {
		return window.self !== window.top;
	} catch {
		return true;
	}
}
function policyAllowsBluetooth() {
	if (typeof document === "undefined") return false;
	const doc = document;
	try {
		if (doc.permissionsPolicy?.allowsFeature) return doc.permissionsPolicy.allowsFeature("bluetooth");
		if (doc.featurePolicy?.allowsFeature) return doc.featurePolicy.allowsFeature("bluetooth");
	} catch {}
	return false;
}
function bluetoothSupported() {
	if (typeof navigator === "undefined") return false;
	if (navigator.bluetooth) return true;
	return /Chrome|Edg|Chromium|CriOS/i.test(navigator.userAgent);
}
/** True when this document can call requestDevice without opening another window. */
function canPairInThisFrame() {
	if (!(typeof navigator !== "undefined" ? navigator.bluetooth : void 0)) return false;
	if (!framed()) return true;
	return policyAllowsBluetooth();
}
async function bluetoothReady() {
	const bt = typeof navigator !== "undefined" ? navigator.bluetooth : void 0;
	if (!bt) return framed() ? "blocked" : "unavailable";
	if (framed() && !policyAllowsBluetooth()) return "blocked";
	try {
		if (await bt.getAvailability?.() === false) return "adapter-off";
	} catch {}
	return "ready";
}
async function bluetoothDiagnose() {
	const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
	const chrome = /Chrome|Edg|Chromium|CriOS/i.test(ua);
	const safari = /Safari/i.test(ua) && !/Chrome|Chromium|Edg/i.test(ua);
	const ios = /iPhone|iPad|iPod/i.test(ua);
	const bt = typeof navigator !== "undefined" ? navigator.bluetooth : void 0;
	let knownDevices = 0;
	try {
		knownDevices = bt?.getDevices ? (await bt.getDevices()).length : 0;
	} catch {
		knownDevices = 0;
	}
	return {
		chrome,
		safari,
		ios,
		framed: framed(),
		api: Boolean(bt),
		policy: policyAllowsBluetooth(),
		ready: await bluetoothReady(),
		knownDevices,
		canPairHere: canPairInThisFrame()
	};
}
async function pingPrinter(bluetoothId) {
	const device = await deviceFor(bluetoothId);
	if (!device?.gatt) throw new Error("Printer is not paired on this tablet. Tap Pair Bluetooth on that printer card.");
	if (!(await device.gatt.connect()).connected) throw new Error("The printer did not stay connected. Wake it, then tap Check connection.");
	return {
		name: device.name || "Printer",
		connected: true
	};
}
function remember(device) {
	live.set(device.id, device);
	return {
		bluetoothId: device.id,
		bluetoothName: device.name || "Bluetooth printer"
	};
}
async function requestPair(bt) {
	let device;
	try {
		device = await bt.requestDevice({
			acceptAllDevices: true,
			optionalServices: OPTIONAL_SERVICES
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : "";
		if (!/filter|acceptAllDevices|TypeError/i.test(String(err)) && !/must provide/i.test(msg)) throw err;
		device = await bt.requestDevice({
			filters: [
				{ namePrefix: "Printer" },
				{ namePrefix: "POS" },
				{ namePrefix: "MTP" },
				{ namePrefix: "MPT" },
				{ namePrefix: "RPP" },
				{ namePrefix: "XP-" },
				{ namePrefix: "Blue" },
				{ namePrefix: "BT" },
				{ namePrefix: "Inner" },
				{ namePrefix: "Gooj" },
				{ namePrefix: "Star" },
				{ namePrefix: "TM-" },
				{ namePrefix: "TSP" },
				{ services: [NUS] },
				{ services: [ISSC] },
				{ services: [PRINT_SVC] }
			],
			optionalServices: OPTIONAL_SERVICES
		});
	}
	const paired = remember(device);
	try {
		if (device.gatt) await device.gatt.connect();
	} catch {}
	return paired;
}
function openTopLevel(path) {
	const url = `${window.location.origin}${path}`;
	const name = "southend-printer-pair";
	let popup = null;
	try {
		popup = window.open(url, name);
	} catch {
		popup = null;
	}
	if (popup) return popup;
	try {
		popup = window.open(url, name, "popup=yes,width=440,height=640");
	} catch {
		popup = null;
	}
	if (popup) return popup;
	const a = document.createElement("a");
	a.href = url;
	a.target = name;
	a.rel = "opener";
	a.style.display = "none";
	document.body.appendChild(a);
	a.click();
	a.remove();
	return null;
}
function pairViaTopLevelWindow() {
	return new Promise((resolve, reject) => {
		const popup = openTopLevel(PRINTER_PAIR_PATH);
		let settled = false;
		const finish = (ok, error) => {
			if (settled) return;
			settled = true;
			window.removeEventListener("message", onMessage);
			window.clearInterval(watch);
			window.clearTimeout(timer);
			try {
				ch.close();
			} catch {}
			if (ok) resolve(ok);
			else reject(new Error(error || "Pairing window closed before a printer was chosen."));
		};
		const onPayload = (data) => {
			const d = data && typeof data === "object" ? data : null;
			if (!d || d.type !== "paired") return;
			const bluetoothId = String(d.bluetoothId || "");
			const bluetoothName = String(d.bluetoothName || "Bluetooth printer");
			if (!bluetoothId) return;
			finish({
				bluetoothId,
				bluetoothName
			});
			try {
				popup?.close();
			} catch {}
		};
		const onMessage = (ev) => {
			if (ev.origin !== window.location.origin) return;
			onPayload(ev.data);
		};
		const ch = new BroadcastChannel(PRINTER_PAIR_CHANNEL);
		ch.addEventListener("message", (ev) => onPayload(ev.data));
		window.addEventListener("message", onMessage);
		const watch = window.setInterval(() => {
			if (popup && popup.closed) finish(null, "Pairing window closed before a printer was chosen.");
		}, 400);
		const timer = window.setTimeout(() => {
			finish(null, "Pairing timed out. Tap Pair Bluetooth printer and choose the printer again.");
		}, 12e4);
	});
}
async function pairBluetoothPrinter() {
	const bt = typeof navigator !== "undefined" ? navigator.bluetooth : void 0;
	if (!canPairInThisFrame()) {
		if (typeof window === "undefined") throw new Error("Bluetooth is not available in this browser. Use Chrome or Edge on the shop tablet.");
		return pairViaTopLevelWindow();
	}
	if (!bt) throw new Error("Bluetooth is not available in this browser. Use Chrome or Edge on the shop tablet.");
	return requestPair(bt);
}
/** Used by the top-level pairing page. */
async function pairBluetoothPrinterHere() {
	const bt = navigator.bluetooth;
	if (!bt) throw new Error("Bluetooth is not available in this browser. Use Chrome or Edge on the shop tablet.");
	return requestPair(bt);
}
function publishPairedPrinter(paired) {
	const payload = {
		type: "paired",
		...paired
	};
	try {
		const ch = new BroadcastChannel(PRINTER_PAIR_CHANNEL);
		ch.postMessage(payload);
		ch.close();
	} catch {}
	try {
		window.opener?.postMessage(payload, window.location.origin);
	} catch {}
}
function subscribePairedPrinter(onPaired) {
	if (typeof window === "undefined") return () => {};
	const onPayload = (data) => {
		const d = data && typeof data === "object" ? data : null;
		if (!d || d.type !== "paired") return;
		const bluetoothId = String(d.bluetoothId || "");
		if (!bluetoothId) return;
		onPaired({
			bluetoothId,
			bluetoothName: String(d.bluetoothName || "Bluetooth printer")
		});
	};
	const onMessage = (ev) => {
		if (ev.origin !== window.location.origin) return;
		onPayload(ev.data);
	};
	let ch = null;
	try {
		ch = new BroadcastChannel(PRINTER_PAIR_CHANNEL);
		ch.addEventListener("message", (ev) => onPayload(ev.data));
	} catch {
		ch = null;
	}
	window.addEventListener("message", onMessage);
	return () => {
		window.removeEventListener("message", onMessage);
		try {
			ch?.close();
		} catch {}
	};
}
function uint8ToB64(bytes) {
	let s = "";
	const chunk = 32768;
	for (let i = 0; i < bytes.length; i += chunk) s += String.fromCharCode(...bytes.subarray(i, i + chunk));
	return btoa(s);
}
function b64ToUint8(s) {
	const bin = atob(s);
	const out = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
	return out;
}
function stashPrintJob(bluetoothId, bytes) {
	const job = {
		bluetoothId,
		b64: uint8ToB64(bytes),
		ts: Date.now()
	};
	try {
		localStorage.setItem(PRINT_JOB_KEY, JSON.stringify(job));
	} catch {}
	return job;
}
function takePrintJob() {
	try {
		const raw = localStorage.getItem(PRINT_JOB_KEY);
		if (!raw) return null;
		localStorage.removeItem(PRINT_JOB_KEY);
		const job = JSON.parse(raw);
		if (!job?.bluetoothId || !job.b64) return null;
		if (Date.now() - Number(job.ts || 0) > 6e4) return null;
		return job;
	} catch {
		return null;
	}
}
function bytesFromPrintJob(job) {
	return b64ToUint8(job.b64);
}
function publishPrintResult(ok, error) {
	const payload = ok ? { type: "printed" } : {
		type: "print-error",
		error: error || "Bluetooth print failed"
	};
	try {
		const ch = new BroadcastChannel(PRINTER_PAIR_CHANNEL);
		ch.postMessage(payload);
		ch.close();
	} catch {}
	try {
		window.opener?.postMessage(payload, window.location.origin);
	} catch {}
}
function notifyPrintResult(ok, error) {
	publishPrintResult(ok, error);
}
async function deviceFor(id) {
	const cached = live.get(id);
	if (cached) return cached;
	const bt = navigator.bluetooth;
	if (!bt?.getDevices) return null;
	const found = (await bt.getDevices()).find((d) => d.id === id) ?? null;
	if (found) live.set(id, found);
	return found;
}
async function writableChar(server) {
	const tryService = async (uuid, charUuid) => {
		try {
			const svc = await server.getPrimaryService(uuid);
			if (charUuid) return await svc.getCharacteristic(charUuid);
			const w = (await svc.getCharacteristics()).find((c) => c.properties.writeWithoutResponse || c.properties.write);
			if (w) return w;
		} catch {
			return null;
		}
		return null;
	};
	for (const uuid of OPTIONAL_SERVICES) {
		for (const charUuid of WRITE_CHARS) {
			const hit = await tryService(uuid, charUuid);
			if (hit) return hit;
		}
		const any = await tryService(uuid);
		if (any) return any;
	}
	const services = await server.getPrimaryServices();
	for (const svc of services) {
		const w = (await svc.getCharacteristics()).find((c) => c.properties.writeWithoutResponse || c.properties.write);
		if (w) return w;
	}
	throw new Error("That printer did not expose a writable Bluetooth characteristic.");
}
async function writeChunks(char, bytes) {
	const size = 20;
	for (let i = 0; i < bytes.length; i += size) {
		const chunk = bytes.slice(i, i + size);
		if (char.writeValueWithoutResponse) await char.writeValueWithoutResponse(chunk);
		else await char.writeValue(chunk);
		await new Promise((r) => setTimeout(r, 20));
	}
}
async function printEscPosHere(bluetoothId, bytes) {
	const device = await deviceFor(bluetoothId);
	if (!device?.gatt) throw new Error("Printer is not paired on this device.");
	await writeChunks(await writableChar(await device.gatt.connect()), bytes);
}
function printViaTopLevelWindow(bluetoothId, bytes) {
	stashPrintJob(bluetoothId, bytes);
	const popup = openTopLevel(`${PRINTER_PAIR_PATH}?print=1`);
	return new Promise((resolve, reject) => {
		let settled = false;
		const finish = (ok, error) => {
			if (settled) return;
			settled = true;
			window.removeEventListener("message", onMessage);
			window.clearInterval(watch);
			window.clearTimeout(timer);
			try {
				ch.close();
			} catch {}
			if (ok) resolve();
			else reject(new Error(error || "Print window closed before the ticket was sent."));
		};
		const onPayload = (data) => {
			const d = data && typeof data === "object" ? data : null;
			if (!d) return;
			if (d.type === "printed") finish(true);
			if (d.type === "print-error") finish(false, String(d.error || "Bluetooth print failed"));
		};
		const onMessage = (ev) => {
			if (ev.origin !== window.location.origin) return;
			onPayload(ev.data);
		};
		const ch = new BroadcastChannel(PRINTER_PAIR_CHANNEL);
		ch.addEventListener("message", (ev) => onPayload(ev.data));
		window.addEventListener("message", onMessage);
		const watch = window.setInterval(() => {
			if (popup && popup.closed) finish(false, "Print window closed before the ticket was sent.");
		}, 400);
		const timer = window.setTimeout(() => {
			finish(false, "Print timed out. Tap Test print again with the printer on.");
		}, 45e3);
	});
}
async function printEscPos(bluetoothId, bytes) {
	const bt = typeof navigator !== "undefined" ? navigator.bluetooth : void 0;
	if (bt && (!framed() || policyAllowsBluetooth())) try {
		await printEscPosHere(bluetoothId, bytes);
		return;
	} catch (err) {
		if (!framed()) throw err;
	}
	if (framed() && typeof window !== "undefined") {
		await printViaTopLevelWindow(bluetoothId, bytes);
		return;
	}
	if (!bt) throw new Error("Bluetooth is not available in this browser. Use Chrome or Edge on the shop tablet.");
	throw new Error("Printer is not paired on this device.");
}
function openFallbackWindow(slips) {
	const html = `<!doctype html><html><head><title>Receipts</title>
<style>
  @page { size: 80mm auto; margin: 6mm; }
  body { background: #fbf6ec; color: #1a1410; font: 13px/1.35 ui-monospace, Menlo, Consolas, monospace; margin: 0; }
  .slip { width: 72mm; margin: 12px auto; white-space: pre; background: #fff; padding: 10px 12px; border: 1px dashed #c9b79a; }
  .kind { letter-spacing: .12em; text-transform: uppercase; font-size: 11px; color: #9a221c; }
  @media print { body { background: #fff; } .slip { border: 0; page-break-after: always; } }
</style></head><body>
${slips.map((s) => `<section class="slip"><div class="kind">${escapeHtml(s.title)}</div><pre>${escapeHtml(s.body)}</pre></section>`).join("")}
<script>window.onload=function(){setTimeout(function(){window.print()},150)}<\/script>
</body></html>`;
	const w = window.open("", "receipts", "width=420,height=720");
	if (!w) throw new Error("Allow pop-ups to print a paper copy.");
	w.document.write(html);
	w.document.close();
}
function escapeHtml(s) {
	return s.replaceAll("&", "&").replaceAll("<", "<").replaceAll(">", ">");
}
async function printOrderReceipts(opts) {
	const kinds = opts.kinds ?? ["customer", "store"];
	const jobs = jobsForPrinters(opts.printers, kinds);
	if (!jobs.length) throw new Error("No enabled printers with a customer or store copy selected.");
	const slips = [];
	const errors = [];
	for (const job of jobs) {
		const body = buildReceiptText({
			order: opts.order,
			restaurant: opts.restaurant,
			receipt: opts.receipt,
			kind: job.kind,
			taxRate: opts.taxRate,
			paper: job.printer.paper
		});
		const title = `${job.printer.name} · ${job.kind === "store" ? "Store copy" : "Customer copy"}`;
		if (job.printer.bluetoothId) try {
			await printEscPos(job.printer.bluetoothId, textToEscPos(body));
			continue;
		} catch (e) {
			errors.push(`${job.printer.name}: ${e instanceof Error ? e.message : "Bluetooth print failed"}`);
		}
		slips.push({
			title,
			body
		});
	}
	if (slips.length && opts.fallback !== false) openFallbackWindow(slips);
	if (errors.length && !slips.length) throw new Error(errors.join(" "));
	return {
		printed: jobs.length,
		fallback: slips.length,
		errors
	};
}
//#endregion
export { bytesFromPrintJob as a, pairBluetoothPrinterHere as c, printOrderReceipts as d, publishPairedPrinter as f, takePrintJob as g, subscribePairedPrinter as h, buildReceiptText as i, pingPrinter as l, stashPrintJob as m, bluetoothReady as n, notifyPrintResult as o, sampleOrder as p, bluetoothSupported as r, pairBluetoothPrinter as s, bluetoothDiagnose as t, printEscPos as u };

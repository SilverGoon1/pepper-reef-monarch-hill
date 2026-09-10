//#region node_modules/.nitro/vite/services/ssr/assets/image-file-B097txSk.js
var TYPES = [
	"image/webp",
	"image/jpeg",
	"image/png"
];
async function fileToDataImage(file, opts) {
	if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
	const probe = await createImageBitmap(file);
	const scale = Math.min(1, opts.maxEdge / Math.max(probe.width, probe.height));
	const w = Math.max(1, Math.round(probe.width * scale));
	const h = Math.max(1, Math.round(probe.height * scale));
	probe.close();
	let bmp;
	try {
		bmp = await createImageBitmap(file, {
			resizeWidth: w,
			resizeHeight: h,
			resizeQuality: "high"
		});
	} catch {
		bmp = await createImageBitmap(file);
	}
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		bmp.close();
		throw new Error("Could not read that image.");
	}
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	ctx.clearRect(0, 0, w, h);
	ctx.drawImage(bmp, 0, 0, w, h);
	bmp.close();
	const cap = opts.maxChars ?? 35e4;
	const startQ = opts.quality ?? .9;
	let best = "";
	for (const type of TYPES) {
		let q = startQ;
		for (let i = 0; i < 6; i += 1) {
			const url = canvas.toDataURL(type, q);
			if (!best || url.length < best.length) best = url;
			if (url.length <= cap) return url;
			q -= .08;
		}
	}
	if (best && best.length <= cap + 7e4) return best;
	throw new Error("That image is too large. Try a smaller photo.");
}
//#endregion
export { fileToDataImage as t };

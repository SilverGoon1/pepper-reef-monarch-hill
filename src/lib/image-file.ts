const TYPES = ["image/webp", "image/jpeg", "image/png"] as const;

export async function fileToDataImage(
  file: File,
  opts: { maxEdge: number; maxChars?: number; quality?: number },
): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  const probe = await createImageBitmap(file);
  const scale = Math.min(1, opts.maxEdge / Math.max(probe.width, probe.height));
  const w = Math.max(1, Math.round(probe.width * scale));
  const h = Math.max(1, Math.round(probe.height * scale));
  probe.close();
  let bmp: ImageBitmap;
  try {
    bmp = await createImageBitmap(file, { resizeWidth: w, resizeHeight: h, resizeQuality: "high" });
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
  const cap = opts.maxChars ?? 350000;
  const startQ = opts.quality ?? 0.9;
  let best = "";
  for (const type of TYPES) {
    let q = startQ;
    for (let i = 0; i < 6; i += 1) {
      const url = canvas.toDataURL(type, q);
      if (!best || url.length < best.length) best = url;
      if (url.length <= cap) return url;
      q -= 0.08;
    }
  }
  if (best && best.length <= cap + 70000) return best;
  throw new Error("That image is too large. Try a smaller photo.");
}

export function sanitizeImageData(raw: unknown, maxChars = 420000) {
  const s = String(raw ?? "").trim();
  if (!s) return "";
  if (!s.startsWith("data:image/")) return "";
  if (s.length > maxChars) throw new Error("That photo is too large. Try a smaller one.");
  return s;
}

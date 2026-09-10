const KEY = "se3-invite-code";
const CODE = /^[A-Z0-9]{4,16}$/;

export function normalizeInviteCode(raw: unknown) {
  const s = String(raw ?? "").trim().toUpperCase();
  return CODE.test(s) ? s : "";
}

export function captureReferral(raw?: unknown) {
  if (typeof window === "undefined") return;
  let code = normalizeInviteCode(raw);
  if (!code) {
    try {
      code = normalizeInviteCode(new URLSearchParams(window.location.search).get("ref"));
    } catch {
      code = "";
    }
  }
  if (!code) return;
  try {
    window.localStorage.setItem(KEY, code);
  } catch {
    /* ignore */
  }
}

export function peekReferral() {
  if (typeof window === "undefined") return "";
  try {
    return normalizeInviteCode(window.localStorage.getItem(KEY));
  } catch {
    return "";
  }
}

export function clearReferral() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

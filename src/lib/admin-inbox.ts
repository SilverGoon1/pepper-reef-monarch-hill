export const ADMIN_INBOX_EVENT = "southend-admin-inbox";

export function emitAdminInbox(count: number) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ADMIN_INBOX_EVENT, { detail: Math.max(0, Math.round(count)) }));
}

export function onAdminInbox(fn: (count: number) => void) {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const n = (e as CustomEvent<number>).detail;
    if (typeof n === "number" && Number.isFinite(n)) fn(n);
  };
  window.addEventListener(ADMIN_INBOX_EVENT, handler);
  return () => window.removeEventListener(ADMIN_INBOX_EVENT, handler);
}

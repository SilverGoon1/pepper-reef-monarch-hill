/**
 * Production `/auth/popup` — same handler the Vite plugin serves in `npm run
 * dev`. Google and X cannot complete inside an iframe (GitHub live inside the
 * Grok chat), so the login card opens this path in a top-level window.
 *
 * Do not add `src/routes/auth/popup.tsx`; a React page paints the shop in the
 * popup instead of sending the visitor to Google/X.
 */
import { handleAuthPopupRequest } from "../../src/lib/auth/popup.server";

type AuthPopupEvent = {
  url: URL;
  req: { method: string; headers: Headers };
};

export default async function authPopupMiddleware(
  event: AuthPopupEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const method = (event.req.method ?? "GET").toUpperCase();
  if (event.url.pathname !== "/auth/popup") return next();
  if (method !== "GET") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const headers = new Headers(event.req.headers);
  const host = String(headers.get("x-forwarded-host") ?? headers.get("host") ?? event.url.host)
    .split(",")[0]
    .trim();
  const proto = String(headers.get("x-forwarded-proto") ?? event.url.protocol.replace(":", "") ?? "https")
    .split(",")[0]
    .trim();
  if (!headers.has("host") && host) headers.set("host", host);

  const request = new Request(`${proto}://${host}${event.url.pathname}${event.url.search}`, {
    method: "GET",
    headers,
  });
  return handleAuthPopupRequest(request);
}

/**
 * Stamp Web Bluetooth (and USB / serial / HID) on every response so a shop
 * tablet can pair thermal printers from this origin. Nested preview frames
 * still inherit the *parent* policy — pairing then opens a top-level window
 * at `/pair-printer`, which is first-party and uses these headers.
 */
import {
  DEVICE_FEATURE_POLICY,
  DEVICE_PERMISSIONS_POLICY,
} from "../../scripts/device-permissions.mjs";

type EventLike = {
  res?: { setHeader?: (key: string, value: string) => void };
  node?: { res?: { setHeader?: (key: string, value: string) => void } };
};

function stamp(headers: Headers) {
  headers.set("Permissions-Policy", DEVICE_PERMISSIONS_POLICY);
  headers.set("Feature-Policy", DEVICE_FEATURE_POLICY);
}

function trySet(event: EventLike) {
  const set =
    event.res?.setHeader?.bind(event.res) ?? event.node?.res?.setHeader?.bind(event.node.res);
  set?.("Permissions-Policy", DEVICE_PERMISSIONS_POLICY);
  set?.("Feature-Policy", DEVICE_FEATURE_POLICY);
}

export default async function devicePermissionsMiddleware(
  event: EventLike,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  try {
    trySet(event);
  } catch {
    // Streaming handlers may have already flushed; wrap the Response below.
  }

  const result = await next();
  if (result instanceof Response) {
    const headers = new Headers(result.headers);
    stamp(headers);
    return new Response(result.body, {
      status: result.status,
      statusText: result.statusText,
      headers,
    });
  }
  return result;
}

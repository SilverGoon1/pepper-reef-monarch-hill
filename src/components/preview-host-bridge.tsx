/**
 * Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
 * (and later receive registered routes). Noops when the app is not embedded.
 */

import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { isTransientFetchError } from "@/lib/fetch-retry";
import {
  collectRoutePathsFromTree,
  installPreviewHostBridge,
} from "@/lib/preview-host-bridge";

function isTyping() {
  const el = document.activeElement as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}

export function PreviewHostBridge() {
  const router = useRouter();

  useEffect(() => {
    return installPreviewHostBridge({
      navigate: (path) => {
        router.history.push(path);
      },
      getRoutePaths: () => collectRoutePathsFromTree(router.routeTree),
    });
  }, [router]);

  useEffect(() => {
    let timer = 0;
    let last = 0;
    let seenHidden = false;
    const revive = (e?: Event) => {
      if (document.hidden) {
        seenHidden = true;
        return;
      }
      if (isTyping()) return;
      if (document.querySelector('[role="dialog"], .pizza-modal-root')) return;
      if (e?.type === "pageshow" && !(e as PageTransitionEvent).persisted) return;
      if (e?.type === "visibilitychange" && !seenHidden) return;
      const now = Date.now();
      if (now - last < 1500) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (document.hidden || isTyping()) return;
        if (document.querySelector('[role="dialog"], .pizza-modal-root')) return;
        last = Date.now();
        void router.invalidate().catch((err) => {
          if (!isTransientFetchError(err)) return;
        });
      }, 280);
    };
    window.addEventListener("pageshow", revive);
    document.addEventListener("visibilitychange", revive);
    window.addEventListener("online", revive);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pageshow", revive);
      document.removeEventListener("visibilitychange", revive);
      window.removeEventListener("online", revive);
    };
  }, [router]);

  return null;
}

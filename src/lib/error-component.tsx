import { useEffect } from "react";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { isTransientFetchError } from "@/lib/fetch-retry";

const RETRY_N = "southend-fetch-retry-n";
const MAX_AUTO = 5;

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const transient = isTransientFetchError(error);

  useEffect(() => {
    if (!transient || typeof window === "undefined") return;
    let n = 0;
    try {
      n = Number(sessionStorage.getItem(RETRY_N) || 0);
    } catch {
      n = 0;
    }
    if (n >= MAX_AUTO) return;
    try {
      sessionStorage.setItem(RETRY_N, String(n + 1));
    } catch {
      /* ignore */
    }
    const delay = Math.min(5000, 500 + n * 650);
    const t = window.setTimeout(() => window.location.reload(), delay);
    return () => window.clearTimeout(t);
  }, [transient]);

  return (
    <main className="login-page">
      <div className="login-card">
        <span className="shop-brand-kicker" aria-hidden>
          <TriangleAlert size={28} strokeWidth={2.2} />
        </span>
        <h1>{transient ? "Reconnecting" : "Something went wrong"}</h1>
        <p className="ed-sub">
          {transient
            ? "The menu is coming back. This page will refresh in a moment."
            : error.message || "An unexpected error occurred. Try reloading the page."}
        </p>
        <button
          type="button"
          className="btn-print"
          onClick={() => {
            try {
              sessionStorage.removeItem(RETRY_N);
            } catch {
              /* ignore */
            }
            window.location.reload();
          }}
        >
          Try again
        </button>
      </div>
    </main>
  );
}

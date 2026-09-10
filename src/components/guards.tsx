import { useEffect, useState, type ReactNode } from "react";
import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { claimAdmin, getMe, getTwoFactorStatus } from "@/lib/shop-server";
import type { ProfileView, TwoFactorStatus } from "@/lib/shop-types";

export function SessionGate({
  children,
  needAdmin,
}: {
  children: (ctx: { profile: ProfileView; twoFactor: TwoFactorStatus }) => ReactNode;
  needAdmin?: boolean;
}) {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [profile, setProfile] = useState<ProfileView | null>(null);
  const [twoFactor, setTwoFactor] = useState<TwoFactorStatus | null>(null);
  const [error, setError] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (isPending || !user) return;
    let live = true;
    const timeout = window.setTimeout(() => {
      if (!live) return;
      setError("Account is taking too long. Try again.");
    }, 12000);
    Promise.all([getMe(), getTwoFactorStatus()])
      .then(([p, t]) => {
        if (!live) return;
        window.clearTimeout(timeout);
        setProfile(p);
        setTwoFactor(t);
      })
      .catch((e) => {
        if (!live) return;
        window.clearTimeout(timeout);
        setError(e instanceof Error ? e.message : "Could not load account");
      });
    return () => {
      live = false;
      window.clearTimeout(timeout);
    };
  }, [isPending, user, retry]);

  if (isPending) return <div className="page-skel">Loading account…</div>;
  if (!user) {
    const next = pathname.startsWith("/") && !pathname.startsWith("//") ? pathname : "/";
    return <Navigate to="/login" search={{ next }} />;
  }
  if (error) {
    return (
      <div className="page-card">
        <h1>Could not load account</h1>
        <p>{error}</p>
        <button
          type="button"
          className="btn-print"
          onClick={() => {
            setError("");
            setProfile(null);
            setTwoFactor(null);
            setRetry((n) => n + 1);
          }}
        >
          Try again
        </button>
      </div>
    );
  }
  if (!profile || !twoFactor) return <div className="page-skel">Loading account…</div>;
  if (profile.banned) {
    return (
      <div className="page-card">
        <h1>Account restricted</h1>
        <p>This account has been restricted. Call the shop if you need help.</p>
        <Link to="/" className="btn-ghost">
          Back to menu
        </Link>
      </div>
    );
  }
  if (twoFactor.required) {
    return (
      <div className="page-card">
        <h1>Two-factor check</h1>
        <p>Enter the code from your authenticator app to continue.</p>
        <Link to="/verify-2fa" className="btn-print">
          Verify
        </Link>
      </div>
    );
  }
  if (needAdmin && profile.role !== "admin") {
    if (!profile.adminExists) {
      return (
        <div className="page-card">
          <h1>Set up shop admin</h1>
          <p>
            No administrator exists yet. Claim this account as the shop admin to manage delivery
            zones, rewards, vacation mode, and the live menu.
          </p>
          <button
            type="button"
            className="btn-print"
            disabled={claiming}
            onClick={() => {
              setClaiming(true);
              void claimAdmin()
                .then(() => getMe().then(setProfile))
                .catch((e) => setError(e instanceof Error ? e.message : "Could not claim admin"))
                .finally(() => setClaiming(false));
            }}
          >
            {claiming ? "Saving…" : "Make this the admin account"}
          </button>
        </div>
      );
    }
    return (
      <div className="page-card">
        <h1>Staff only</h1>
        <p>This area is for the shop administrator.</p>
        <Link to="/" className="btn-ghost">
          Back to menu
        </Link>
      </div>
    );
  }
  return <>{children({ profile, twoFactor })}</>;
}

import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { GROK_PROVIDERS, authClient, authEnabled } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { friendlyAuthError, startSocialSignIn } from "@/lib/login-social";
import { identifierToEmail } from "@/lib/phone";
import { captureReferral, peekReferral } from "@/lib/referral";
import { claimReferral, getStorefront, updateProfile } from "@/lib/shop-server";
import { BrandMark } from "@/components/brand-mark";

function safeNext(raw: unknown) {
  if (typeof raw !== "string") return undefined;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/login")) return undefined;
  if (raw === "/") return undefined;
  return raw;
}

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { next?: string; ref?: string; error?: string } => {
    const next = safeNext(search.next);
    const ref = typeof search.ref === "string" ? search.ref.trim().toUpperCase() : "";
    const error = typeof search.error === "string" ? search.error.trim() : "";
    const out: { next?: string; ref?: string; error?: string } = {};
    if (next) out.next = next;
    if (/^[A-Z0-9]{4,16}$/.test(ref)) out.ref = ref;
    if (error) out.error = error.slice(0, 180);
    return out;
  },
  component: Login,
});

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.35 11.1h-9.18v2.96h5.27c-.23 1.37-1.55 4.02-5.27 4.02A6.13 6.13 0 1 1 12.17 5.9c1.75 0 2.93.75 3.6 1.4l2.45-2.36C16.8 3.54 14.7 2.6 12.17 2.6A9.4 9.4 0 1 0 21.57 12c0-.6-.06-.9-.22-.9Z"
      />
    </svg>
  );
}

function XMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.1 10.35 21.2 2h-1.68l-6.16 7.24L8.44 2H2.5l7.45 10.86L2.5 22h1.68l6.52-7.66L15.56 22H21.5l-7.4-11.65Zm-2.3 2.71-.76-1.08-6.02-8.6h2.59l4.86 6.95.76 1.08 6.32 9.04h-2.59l-5.16-7.39Z"
      />
    </svg>
  );
}

function providerMark(label: string) {
  if (label === "X") return <XMark />;
  return <GoogleMark />;
}

function Login() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const { next, ref, error: searchError } = Route.useSearch();
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [tab, setTab] = useState<"in" | "up">("in");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(searchError ? friendlyAuthError(new Error(searchError)) : "");
  const [busy, setBusy] = useState(false);
  const [showMark, setShowMark] = useState(true);

  const closeTo = (next || "/") as "/";

  useEffect(() => {
    captureReferral(ref);
  }, [ref]);

  useEffect(() => {
    void getStorefront()
      .then((d) => setShowMark(d.settings.showMark))
      .catch(() => setShowMark(true));
  }, []);

  // Keep the form up while a submit is in flight so a session refetch cannot
  // trap the visitor on "Checking sign-in…" after email login.
  if (isPending && !busy) return <div className="page-skel">Checking sign-in…</div>;
  if (user && !busy) return <Navigate to={closeTo} replace />;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const parsed = identifierToEmail(identifier);
    if (mode === "phone" && !parsed.phone) {
      setBusy(false);
      setError("Enter a 10-digit US phone number.");
      return;
    }
    if (mode === "email" && !parsed.email.includes("@")) {
      setBusy(false);
      setError("Enter a valid email or the shop username.");
      return;
    }
    if (tab === "up" && password.length < 8) {
      setBusy(false);
      setError("Password needs at least 8 characters.");
      return;
    }
    if (tab === "up" && password !== password2) {
      setBusy(false);
      setError("Password and confirm password do not match.");
      return;
    }
    try {
      if (!authEnabled) throw new Error("Sign-in is disabled.");
      if (tab === "up") {
        const { error: err } = await authClient.signUp.email({
          email: parsed.email,
          password,
          name: name || (parsed.phone ? parsed.phone : parsed.email.split("@")[0]),
        });
        if (err) throw new Error(err.message || "Could not create the account.");
        if (parsed.phone || name) {
          void updateProfile({ data: { phone: parsed.phone ?? "", displayName: name } }).catch(() => undefined);
        }
        const invite = peekReferral();
        if (invite) {
          void claimReferral({ data: { code: invite } }).catch(() => undefined);
        }
      } else {
        const { error: err } = await authClient.signIn.email({
          email: parsed.email,
          password,
        });
        if (err) throw new Error(err.message || "Could not sign in.");
      }
      void navigate({ to: closeTo, replace: true });
    } catch (err) {
      setError(friendlyAuthError(err));
      setBusy(false);
    }
  }

  async function social(providerId: string) {
    setError("");
    setBusy(true);
    try {
      if (!authEnabled) throw new Error("Sign-in is disabled.");
      await startSocialSignIn(providerId, {
        callbackURL: next || "/",
        errorCallbackURL: "/login",
      });
      void navigate({ to: closeTo, replace: true });
    } catch (err) {
      setError(friendlyAuthError(err));
      setBusy(false);
    }
  }

  return (
    <main className="login-page" data-popup="true">
      <Link to={closeTo} className="login-scrim" aria-label="Close sign-in" />
      <section
        className="login-card login-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <Link to={closeTo} className="login-close" aria-label="Back to the menu">
          <X size={18} strokeWidth={2.4} aria-hidden />
        </Link>
        {showMark ? <BrandMark variant="login" /> : null}
        <p className="shop-brand-kicker">South End Pizza III</p>
        <h1 id="login-title">{tab === "up" ? "Create account" : "Welcome back"}</h1>
        <p className="ed-sub">
          {next === "/checkout"
            ? "Sign in to place your order, or check out as a guest. Your cart stays on this device."
            : "Email, the shop username, or a US phone number. Google and X work too."}
        </p>
        <div className="seg" role="group" aria-label="Identifier type">
          <button type="button" data-on={mode === "email"} onClick={() => setMode("email")}>
            Email
          </button>
          <button type="button" data-on={mode === "phone"} onClick={() => setMode("phone")}>
            Phone
          </button>
        </div>
        <div className="seg" role="group" aria-label="Create or sign in">
          <button type="button" data-on={tab === "in"} onClick={() => setTab("in")}>
            Sign in
          </button>
          <button type="button" data-on={tab === "up"} onClick={() => setTab("up")}>
            Create account
          </button>
        </div>
        <form className="login-form" onSubmit={(e) => void submit(e)}>
          {tab === "up" ? (
            <label className="ed-field">
              <span>Name</span>
              <input className="ed-input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
          ) : null}
          <label className="ed-field">
            <span>{mode === "phone" ? "Phone" : "Email or username"}</span>
            <input
              className="ed-input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete={mode === "phone" ? "tel" : "username"}
              inputMode={mode === "phone" ? "tel" : "email"}
              placeholder={mode === "phone" ? "(609) 555-0100" : "Admin or you@email.com"}
              required
            />
          </label>
          <label className="ed-field">
            <span>Password</span>
            <input
              className="ed-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={tab === "up" ? "new-password" : "current-password"}
              minLength={8}
              required
            />
          </label>
          {tab === "up" ? (
            <label className="ed-field">
              <span>Confirm password</span>
              <input
                className="ed-input"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>
          ) : null}
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" className="btn-print" disabled={busy}>
            {busy ? "Please wait…" : tab === "up" ? "Create account" : "Sign in"}
          </button>
          {tab === "in" ? (
            <Link to="/recover" className="login-back">
              Forgot password?
            </Link>
          ) : null}
        </form>
        <div className="login-split">or continue with</div>
        <div className="login-socials">
          {GROK_PROVIDERS.map((p) => (
            <button
              key={p.providerId}
              type="button"
              className="login-social"
              disabled={busy}
              onClick={() => void social(p.providerId)}
            >
              {providerMark(p.label)}
              {p.label}
            </button>
          ))}
        </div>
        {next === "/checkout" ? (
          <Link to="/checkout" className="login-back">
            Checkout as a guest
          </Link>
        ) : null}
      </section>
    </main>
  );
}

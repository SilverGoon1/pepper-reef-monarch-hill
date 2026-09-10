import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
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
  validateSearch: (search: Record<string, unknown>): { next?: string; ref?: string } => {
    const next = safeNext(search.next);
    const ref = typeof search.ref === "string" ? search.ref.trim().toUpperCase() : "";
    const out: { next?: string; ref?: string } = {};
    if (next) out.next = next;
    if (/^[A-Z0-9]{4,16}$/.test(ref)) out.ref = ref;
    return out;
  },
  component: Login,
});

function Login() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const { next, ref } = Route.useSearch();
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [tab, setTab] = useState<"in" | "up">("in");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showMark, setShowMark] = useState(true);

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
  if (user && !busy) return <Navigate to={(next || "/") as "/"} replace />;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const parsed =
      mode === "phone"
        ? identifierToEmail(identifier)
        : { email: identifier.trim().toLowerCase(), phone: undefined as string | undefined };
    if (mode === "phone" && !parsed.phone) {
      setBusy(false);
      setError("Enter a 10-digit US phone number.");
      return;
    }
    if (mode === "email" && !parsed.email.includes("@")) {
      setBusy(false);
      setError("Enter a valid email.");
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
      const dest = (next || "/") as "/";
      // Leave `busy` set so a session refetch cannot swap this form for
      // "Checking sign-in…". Do not wait on getSession — Better Auth already
      // updated the client store, and a hung session call felt like a stall.
      void navigate({ to: dest, replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
      setBusy(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        {showMark ? <BrandMark variant="login" /> : null}
        <p className="shop-brand-kicker">South End Pizza III</p>
        <h1>{tab === "up" ? "Create account" : "Sign in"}</h1>
        <p className="ed-sub">
          {next === "/checkout"
            ? "Sign in to place your order, or go back and check out as a guest. Your cart stays on this device."
            : "Use email or a US phone number plus a password. Google and X work too."}
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
            <span>{mode === "phone" ? "Phone" : "Email"}</span>
            <input
              className="ed-input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete={mode === "phone" ? "tel" : "email"}
              inputMode={mode === "phone" ? "tel" : "email"}
              placeholder={mode === "phone" ? "(609) 555-0100" : "you@email.com"}
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
        <div className="login-split">or</div>
        {GROK_PROVIDERS.map((p) => (
          <button
            key={p.providerId}
            type="button"
            className="ed-btn"
            disabled={busy}
            onClick={() => void signIn(p.providerId, { callbackURL: next || "/" })}
          >
            Continue with {p.label}
          </button>
        ))}
        <Link to="/" className="login-back">
          Back to the menu
        </Link>
        {next === "/checkout" ? (
          <Link to="/checkout" className="login-back">
            Checkout as a guest
          </Link>
        ) : null}
      </div>
    </main>
  );
}

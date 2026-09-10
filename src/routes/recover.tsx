import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand-mark";
import { recoverPassword } from "@/lib/shop-server";

export const Route = createFileRoute("/recover")({
  component: Recover,
});

function Recover() {
  const [identifier, setIdentifier] = useState("");
  const [proof, setProof] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("The new passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Use at least 8 characters for the new password.");
      return;
    }
    setBusy(true);
    try {
      await recoverPassword({ data: { identifier, proof, password } });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not recover the account.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <BrandMark variant="login" />
        <p className="shop-brand-kicker">South End Pizza III</p>
        <h1>Recover password</h1>
        {done ? (
          <>
            <p className="ed-sub">Password updated. Sign in with the new one.</p>
            <Link to="/login" className="btn-print">
              Sign in
            </Link>
          </>
        ) : (
          <>
            <p className="ed-sub">
              Enter the email or phone on the account, then the phone or name saved on the profile.
              Google and X accounts sign in with those buttons — they do not use a shop password.
            </p>
            <form className="login-form" onSubmit={(e) => void submit(e)}>
              <label className="ed-field">
                <span>Email or phone</span>
                <input
                  className="ed-input"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                />
              </label>
              <label className="ed-field">
                <span>Phone or name on file</span>
                <input
                  className="ed-input"
                  value={proof}
                  onChange={(e) => setProof(e.target.value)}
                  autoComplete="tel"
                  required
                />
              </label>
              <label className="ed-field">
                <span>New password</span>
                <input
                  className="ed-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </label>
              <label className="ed-field">
                <span>Confirm password</span>
                <input
                  className="ed-input"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </label>
              {error ? <p className="form-error">{error}</p> : null}
              <button type="submit" className="btn-print" disabled={busy}>
                {busy ? "Saving…" : "Set new password"}
              </button>
            </form>
            <Link to="/login" className="login-back">
              Back to sign in
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, CircleHelp, LogOut, Monitor, ShoppingBag, UserRound } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { SignedOut } from "@/lib/auth/gates";
import { authEnabled, signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { useCurrentUserState, type AppUser } from "@/lib/auth/use-current-user";
import { onAdminInbox } from "@/lib/admin-inbox";
import { cartTotals, useCartStore } from "@/lib/cart-store";
import { onVisibleInterval } from "@/lib/page-visible";
import { captureReferral, clearReferral, peekReferral } from "@/lib/referral";
import { claimReferral, getAdminInboxCount } from "@/lib/shop-server";
import type { ProfileView } from "@/lib/shop-types";

const subscribeToNothing = () => () => {};
const noGateSessionOnServer = () => false;

function accountLabel(profile?: ProfileView | null, user?: AppUser | null) {
  const raw = String(profile?.displayName || user?.displayName || "").trim();
  if (raw) return raw;
  const email = String(profile?.email || user?.primaryEmail || "").trim();
  const at = email.indexOf("@");
  if (at > 0) return email.slice(0, at);
  return "You";
}

function SignOutItem({ onDone }: { onDone: () => void }) {
  const [signingOut, setSigningOut] = useState(false);
  const gateSession = useSyncExternalStore(
    subscribeToNothing,
    hasGateSessionMarker,
    noGateSessionOnServer,
  );
  if (!authEnabled || gateSession) return null;
  return (
    <button
      type="button"
      role="menuitem"
      className="account-menu-out"
      disabled={signingOut}
      onClick={() => {
        setSigningOut(true);
        onDone();
        void signOut().catch(() => setSigningOut(false));
      }}
    >
      <LogOut size={16} strokeWidth={2.2} aria-hidden />
      {signingOut ? "Signing out…" : "Sign out"}
    </button>
  );
}

function AccountMenu({
  label,
  isAdmin,
  adminUnread,
  unreadChats,
  adminExists,
}: {
  label: string;
  isAdmin: boolean;
  adminUnread: number;
  unreadChats: number;
  adminExists: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="account-menu" ref={wrapRef} data-open={open ? "true" : undefined}>
      <button
        type="button"
        className="shop-nav-link shop-nav-name"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Account menu, ${label}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="shop-nav-name-text">{label}</span>
        <ChevronDown size={14} strokeWidth={2.2} aria-hidden />
        {adminUnread + unreadChats > 0 ? <span className="nav-pip">{adminUnread + unreadChats}</span> : null}
      </button>
      {open ? (
        <div className="account-menu-pop" role="menu">
          <Link to="/account" role="menuitem" onClick={() => setOpen(false)}>
            <UserRound size={16} strokeWidth={2.2} aria-hidden />
            Your account
          </Link>
          <Link to="/install" role="menuitem" className="account-menu-app" onClick={() => setOpen(false)}>
            <img src="/icon-180.png" alt="" width={20} height={20} className="account-menu-app-icon" />
            Download App
          </Link>
          <Link to="/help" role="menuitem" onClick={() => setOpen(false)}>
            <CircleHelp size={16} strokeWidth={2.2} aria-hidden />
            Help
            {unreadChats > 0 ? <span className="nav-pip">{unreadChats}</span> : null}
          </Link>
          {isAdmin ? (
            <Link to="/admin/menu" search={{}} role="menuitem" onClick={() => setOpen(false)}>
              <Monitor size={16} strokeWidth={2.2} aria-hidden />
              Admin
              {adminUnread > 0 ? <span className="nav-pip">{adminUnread}</span> : null}
            </Link>
          ) : null}
          {!isAdmin && !adminExists ? (
            <Link to="/admin/menu" search={{}} role="menuitem" onClick={() => setOpen(false)}>
              Shop admin
            </Link>
          ) : null}
          <SignOutItem onDone={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}

export function ShopHeader({
  title,
  profile,
  onOpenCart,
}: {
  title?: string;
  profile?: ProfileView | null;
  onOpenCart?: () => void;
}) {
  const { isPending, user } = useCurrentUserState();
  const [authReady, setAuthReady] = useState(false);
  const [adminUnread, setAdminUnread] = useState(profile?.adminInbox ?? 0);
  const lines = useCartStore((s) => s.lines);
  const bagOpen = useCartStore((s) => s.bagOpen);
  const { count } = cartTotals(lines);
  const isAdmin = profile?.role === "admin";
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setAuthReady(true);
    captureReferral();
  }, []);

  useEffect(() => {
    if (isPending || !user) return;
    const code = peekReferral();
    if (!code) return;
    void claimReferral({ data: { code } })
      .then(() => clearReferral())
      .catch(() => clearReferral());
  }, [isPending, user]);

  useEffect(() => {
    setAdminUnread(profile?.adminInbox ?? 0);
  }, [profile?.adminInbox]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const apply = () => {
      document.documentElement.style.setProperty("--shop-sticky-top", `${el.offsetHeight}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isAdmin, adminUnread, count, authReady, isPending, user, profile?.displayName]);

  useEffect(() => {
    if (!isAdmin) return;
    const stopListen = onAdminInbox(setAdminUnread);
    const stopPoll = onVisibleInterval(10000, () => {
      void getAdminInboxCount()
        .then((r) => setAdminUnread(r.unread))
        .catch(() => undefined);
    });
    return () => {
      stopListen();
      stopPoll();
    };
  }, [isAdmin]);

  return (
    <header className="shop-header no-print" ref={headerRef}>
      <div className="shop-header-inner">
        <Link to="/" className="shop-brand">
          <BrandMark variant="stamp" />
          <span className="shop-brand-text">
            <span className="shop-brand-kicker">Egg Harbor Township</span>
            <span className="shop-brand-name">{title ?? "South End Pizza III"}</span>
          </span>
        </Link>
        {authReady && !isPending && user ? (
          <nav className="shop-nav" aria-label="Shop">
            <AccountMenu
              label={accountLabel(profile, user)}
              isAdmin={isAdmin}
              adminUnread={adminUnread}
              unreadChats={profile?.unreadChats ?? 0}
              adminExists={profile?.adminExists ?? true}
            />
          </nav>
        ) : null}
        <div className="shop-header-actions">
          {!authReady || isPending ? <div className="auth-skel" aria-hidden /> : null}
          {isAdmin ? (
            <Link to="/admin/pos" className="btn-print pos-title-btn">
              <Monitor size={18} strokeWidth={2.2} />
              POS
            </Link>
          ) : null}
          {authReady && !isPending ? (
            <SignedOut>
              <Link to="/login" className="btn-ghost">
                <UserRound size={16} strokeWidth={2.2} />
                Sign in
              </Link>
            </SignedOut>
          ) : null}
          {onOpenCart ? (
            <button
              type="button"
              className="btn-print cart-btn"
              onClick={onOpenCart}
              aria-expanded={bagOpen}
              aria-haspopup="dialog"
              aria-controls="bag"
            >
              <ShoppingBag size={18} strokeWidth={2.2} />
              Cart
              {count ? (
                <span className="cart-count" aria-live="polite">
                  {count}
                </span>
              ) : null}
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Headset, Phone } from "lucide-react";
import { CustomerChat } from "@/components/customer-chat";
import { ShopHeader } from "@/components/shop-header";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMe, getShopContact } from "@/lib/shop-server";
import type { ProfileView } from "@/lib/shop-types";

export const Route = createFileRoute("/help")({
  loader: () => getShopContact(),
  component: HelpPage,
});

function HelpPage() {
  const contact = Route.useLoaderData();
  const { user, isPending } = useCurrentUserState();
  const [profile, setProfile] = useState<ProfileView | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setProfile(null);
      return;
    }
    void getMe()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [isPending, user]);

  return (
    <div className="shop-shell">
      <ShopHeader profile={profile} />
      <main className="shop-main help-main" id="main">
        <header className="page-card">
          <h1>Customer service</h1>
          <p className="ed-sub">
            Call the shop, or use the chat bubble in the corner. The crew sees the request on the messaging center.
          </p>
        </header>
        <div className="help-grid">
          <section className="page-card">
            <h2>
              <Phone size={18} strokeWidth={2.2} /> Call the shop
            </h2>
            <p className="ed-sub">
              {contact.name} · {contact.address}.
            </p>
            <a className="btn-print" href={contact.phoneHref}>
              {contact.phone}
            </a>
          </section>
          <section className="page-card">
            <h2>
              <Headset size={18} strokeWidth={2.2} /> Chat with the shop
            </h2>
            <SignedOut>
              <p className="ed-sub">Sign in to send a chat. The crew sees it with your latest ticket.</p>
              <Link to="/login" search={{ next: "/help" }} className="btn-print">
                Sign in to chat
              </Link>
            </SignedOut>
            <SignedIn>
              <CustomerChat />
            </SignedIn>
          </section>
        </div>
      </main>
    </div>
  );
}

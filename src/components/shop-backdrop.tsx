import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DEFAULT_BACKDROP, DEFAULT_FAVICON, SHOP_LOGO_EVENT, onShopBackdrop } from "@/lib/admin-nav";
import { getStorefront } from "@/lib/shop-server";

function applyLogo(data: string) {
  if (typeof document === "undefined") return;
  const url = data || "";
  document.documentElement.dataset.shopLogo = url;
  const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (icon) icon.href = url || DEFAULT_FAVICON;
  window.dispatchEvent(new Event(SHOP_LOGO_EVENT));
}

export function ShopBackdrop() {
  const [src, setSrc] = useState(DEFAULT_BACKDROP);
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const existing = document.getElementById("shop-backdrop-host");
    const node = existing ?? document.createElement("div");
    node.id = "shop-backdrop-host";
    node.className = "shop-backdrop-host";
    if (!node.parentNode) document.body.insertBefore(node, document.body.firstChild);
    setHost(node);
  }, []);

  useEffect(() => {
    const load = () => {
      void getStorefront()
        .then((d) => {
          setSrc(d.settings.backdropData || DEFAULT_BACKDROP);
          applyLogo(d.settings.logoData || "");
        })
        .catch(() => {
          setSrc(DEFAULT_BACKDROP);
          applyLogo("");
        });
    };
    load();
    return onShopBackdrop(load);
  }, []);

  if (!host) return null;
  return createPortal(
    <div className="shop-backdrop-layer no-print" aria-hidden>
      <img src={src} alt="" decoding="async" fetchPriority="low" />
    </div>,
    host,
  );
}

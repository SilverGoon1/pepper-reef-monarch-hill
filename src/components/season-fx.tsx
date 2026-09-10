import { useEffect, useState, type CSSProperties } from "react";
import { onShopBackdrop } from "@/lib/admin-nav";
import { getStorefront } from "@/lib/shop-server";
import { sanitizeSeasonEffect, type SeasonEffect } from "@/lib/shop-types";

const DOTS = Array.from({ length: 20 }, (_, i) => i);

export function SeasonFx() {
  const [fx, setFx] = useState<SeasonEffect>("none");

  useEffect(() => {
    const load = () => {
      void getStorefront()
        .then((d) => setFx(sanitizeSeasonEffect(d.settings.seasonEffect)))
        .catch(() => setFx("none"));
    };
    load();
    return onShopBackdrop(load);
  }, []);

  if (fx === "none") return null;

  return (
    <div className="season-fx no-print" data-fx={fx} aria-hidden>
      {DOTS.map((i) => (
        <span key={i} style={{ "--i": i } as CSSProperties} />
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";

/** Rehydrate the persisted bag once for the whole shop shell. */
export function CartHydrate() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);
  return null;
}

export function useCartHydrated() {
  const [hydrated, setHydrated] = useState(() =>
    typeof window === "undefined" ? false : useCartStore.persist.hasHydrated(),
  );
  useEffect(() => {
    if (useCartStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    const unsub = useCartStore.persist.onFinishHydration(() => setHydrated(true));
    void useCartStore.persist.rehydrate();
    return unsub;
  }, []);
  return hydrated;
}

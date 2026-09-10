import { useEffect, useRef, type RefObject } from "react";

/** Lock page scroll for a modal. Focus the panel once — never steal it back from inputs. */
export function useDialogLock(onClose: () => void, panelRef: RefObject<HTMLElement | null>) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const root = panelRef.current;
    const active = document.activeElement as HTMLElement | null;
    if (!active || !root?.contains(active)) root?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [panelRef]);
}

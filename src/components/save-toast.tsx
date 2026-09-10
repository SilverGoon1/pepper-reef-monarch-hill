import { useEffect, useState } from "react";

export type SaveFlash = { ok: boolean; text: string };

export function useSaveFlash() {
  const [toast, setToast] = useState<SaveFlash | null>(null);
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  function flashOk(changed = true) {
    setToast({ ok: true, text: changed ? "Settings saved." : "No changes to save." });
  }
  function flashFail(message?: string) {
    setToast({ ok: false, text: message?.trim() || "Settings were not saved." });
  }

  return { toast, flashOk, flashFail, dismiss: () => setToast(null) };
}

export function SaveToast({ toast }: { toast: SaveFlash | null }) {
  if (!toast) return null;
  return (
    <div className="save-toast" data-ok={toast.ok ? "true" : "false"} role="status">
      <strong>{toast.ok ? "Saved" : "Not saved"}</strong>
      <span>{toast.text}</span>
    </div>
  );
}

import { useMemo } from "react";
import { qrPath } from "@/lib/qr";

export function InviteQr({ value, label }: { value: string; label: string }) {
  const drawn = useMemo(() => {
    try {
      return qrPath(value);
    } catch {
      return null;
    }
  }, [value]);

  if (!drawn) return <p className="ed-sub">Could not draw a QR code for this link.</p>;

  return (
    <svg
      className="invite-qr"
      viewBox={`0 0 ${drawn.dim} ${drawn.dim}`}
      role="img"
      aria-label={label}
    >
      <rect width={drawn.dim} height={drawn.dim} fill="var(--color-cream)" />
      <path d={drawn.d} fill="var(--color-ink)" />
    </svg>
  );
}

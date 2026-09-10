import { useId, useRef, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { CookNoteField, cookNoteValue } from "@/components/cook-note-field";
import {
  condimentCharge,
  condimentDetail,
  condimentMax,
  condimentTotal,
  type CondimentPick,
} from "@/lib/condiments";
import { useDialogLock } from "@/lib/dialog-lock";
import { formatUsd, moneyNumber } from "@/lib/shop-types";

export type ItemConfirmResult = {
  size?: string;
  unitPrice: number;
  detail?: string;
  comment?: string;
  condiments: CondimentPick[];
};

function priceNum(p: string) {
  const n = Number(String(p).replace(/^\$/, ""));
  return Number.isFinite(n) ? n : 0;
}

export function ItemConfirm({
  item,
  categoryName,
  onClose,
  onConfirm,
}: {
  item: MenuItem;
  categoryName: string;
  onClose: () => void;
  onConfirm: (result: ItemConfirmResult) => void;
}) {
  const titleId = useId();
  const noteId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const sizes = item.prices.filter((p) => p.price);
  const [size, setSize] = useState(sizes[0]?.label || "");
  const [qty, setQty] = useState<Record<string, number>>({});
  const condiments = item.condiments ?? [];
  useDialogLock(onClose, panelRef);

  const chosen = sizes.find((p) => p.label === size) ?? sizes[0];
  const picks: CondimentPick[] = condiments
    .map((c) => {
      const n = qty[c.id] ?? 0;
      if (n <= 0) return null;
      return { id: c.id, name: c.name, qty: n, charge: condimentCharge(c, n) };
    })
    .filter((p): p is CondimentPick => Boolean(p));
  const extras = condimentTotal(picks);
  const unitPrice = Math.round((priceNum(chosen?.price ?? "0") + extras) * 100) / 100;
  const detail = condimentDetail(picks);

  function confirm() {
    const note = cookNoteValue(noteRef);
    onConfirm({
      size: chosen?.label || size || undefined,
      unitPrice,
      detail: detail || undefined,
      comment: note || undefined,
      condiments: picks,
    });
  }

  return (
    <div className="pizza-modal-root" role="presentation">
      <button type="button" className="pizza-modal-scrim" aria-label="Close" onClick={onClose} />
      <div
        ref={panelRef}
        className="pizza-modal size-add-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="pizza-modal-head">
          <div>
            <p className="shop-brand-kicker">{categoryName}</p>
            <h2 id={titleId}>{item.name}</h2>
            <p className="ed-sub">Confirm this item, add extras, and leave a note for the cook.</p>
          </div>
          <button type="button" className="ed-icon-btn" aria-label="Close" onClick={onClose}>
            <X size={16} strokeWidth={2.2} />
          </button>
        </header>

        {sizes.length > 1 ? (
          <fieldset className="pizza-modal-block">
            <legend>Size</legend>
            <div className="size-pick pizza-size-pick" role="group" aria-label="Size">
              {sizes.map((p) => {
                const lab = p.label || "Regular";
                return (
                  <button key={lab} type="button" data-on={(chosen?.label || "") === lab} onClick={() => setSize(lab)}>
                    {lab}
                    <span>{formatUsd(priceNum(p.price))}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        {condiments.length ? (
          <fieldset className="pizza-modal-block">
            <legend>Condiments & extras</legend>
            <ul className="condiment-list">
              {condiments.map((c) => {
                const cap = condimentMax(c.maxQty);
                const n = qty[c.id] ?? 0;
                const add = moneyNumber(c.price);
                const extra = moneyNumber(c.extraPrice || c.price);
                return (
                  <li key={c.id}>
                    <span>
                      <strong>{c.name}</strong>
                      <em>
                        {add > 0 ? `${formatUsd(add)} to add` : "Included"}
                        {extra > 0 ? ` · extra ${formatUsd(extra)}` : ""}
                        {` · up to ${cap}`}
                      </em>
                    </span>
                    <span className="qty-step">
                      <button
                        type="button"
                        aria-label={`Fewer ${c.name}`}
                        disabled={n <= 0}
                        onClick={() => setQty((cur) => ({ ...cur, [c.id]: Math.max(0, n - 1) }))}
                      >
                        <Minus size={14} />
                      </button>
                      <strong>{n}</strong>
                      <button
                        type="button"
                        aria-label={`More ${c.name}`}
                        disabled={n >= cap}
                        onClick={() => setQty((cur) => ({ ...cur, [c.id]: Math.min(cap, n + 1) }))}
                      >
                        <Plus size={14} />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ) : null}

        <CookNoteField id={noteId} noteRef={noteRef} placeholder="No onions, sauce on the side, well done…" />

        <footer className="pizza-modal-foot">
          <div className="pizza-modal-total">
            <span>This item</span>
            <strong>{formatUsd(unitPrice)}</strong>
          </div>
          {detail ? <p className="ed-sub">{detail}</p> : null}
          <div className="pizza-modal-actions">
            <button type="button" className="ed-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn-print" onClick={confirm}>
              Add to bag
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

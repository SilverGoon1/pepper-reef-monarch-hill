import { useEffect, useRef, useState } from "react";
import { Bell, Volume2, VolumeX, X } from "lucide-react";
import { acceptOrder, getAdminShop, listIncomingOrders } from "@/lib/shop-server";
import { formatShopWhen } from "@/lib/hours";
import { formatUsd, formatTicketNo, type PosTicket } from "@/lib/shop-types";
import { onVisibleInterval } from "@/lib/page-visible";

const DEFAULT_ALARM = "/order-alarm.wav";
const SNOOZE_KEY = "southend-order-snooze";

function loadSnooze() {
  try {
    const raw = sessionStorage.getItem(SNOOZE_KEY);
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    return new Set(Array.isArray(list) ? list : []);
  } catch {
    return new Set<string>();
  }
}

function saveSnooze(ids: Set<string>) {
  try {
    sessionStorage.setItem(SNOOZE_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

export function IncomingOrderQueue() {
  const [queue, setQueue] = useState<PosTicket[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [muted, setMuted] = useState(false);
  const [src, setSrc] = useState(DEFAULT_ALARM);
  const seen = useRef(new Set<string>());
  const snoozed = useRef(loadSnooze());
  const primed = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);

  useEffect(() => {
    void getAdminShop()
      .then((d) => setSrc(d.notifyAudio || DEFAULT_ALARM))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const el = new Audio(src);
    el.preload = "auto";
    audioRef.current = el;
    return () => {
      el.pause();
      audioRef.current = null;
    };
  }, [src]);

  function ring() {
    if (mutedRef.current) return;
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    void el.play().catch(() => undefined);
  }

  useEffect(() => {
    return onVisibleInterval(4000, () => {
      void listIncomingOrders()
        .then((list) => {
          const live = list.filter((t) => !snoozed.current.has(t.id));
          setQueue(live);
          const fresh = live.filter((t) => !seen.current.has(t.id));
          for (const t of live) seen.current.add(t.id);
          if (fresh.length) ring();
          else if (!primed.current && live.length) ring();
          primed.current = true;
        })
        .catch(() => undefined);
    });
  }, [muted, src]);

  useEffect(() => {
    if (!queue.length || muted) return;
    const t = window.setInterval(() => ring(), 10000);
    return () => window.clearInterval(t);
  }, [queue.length, muted, src]);

  const current = queue[0];
  if (!current) return null;

  function take() {
    setBusy(true);
    setError("");
    void acceptOrder({ data: { id: current.id } })
      .then(() => {
        setQueue((list) => list.filter((t) => t.id !== current.id));
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Could not accept"))
      .finally(() => setBusy(false));
  }

  const where =
    current.fulfillment === "delivery"
      ? `${current.addressLine}${current.city ? `, ${current.city}` : ""} ${current.zip}`.trim()
      : current.pickupName
        ? `Pickup for ${current.pickupName}`
        : "Pickup at the counter";

  return (
    <div className="order-alert-scrim" role="dialog" aria-modal="true" aria-labelledby="order-alert-title">
      <section className="order-alert">
        <header className="order-alert-head">
          <p className="shop-brand-kicker">
            <Bell size={14} strokeWidth={2.4} /> Incoming
          </p>
          <h2 id="order-alert-title">Ticket #{formatTicketNo(current.ticketNo)}</h2>
          {queue.length > 1 ? (
            <em className="order-alert-q">
              {queue.length} waiting · showing 1 of {queue.length}
            </em>
          ) : (
            <em className="order-alert-q">Kitchen queue</em>
          )}
          <button
            type="button"
            className="ed-icon-btn"
            aria-label={muted ? "Unmute alarm" : "Mute alarm"}
            onClick={() => {
              mutedRef.current = !mutedRef.current;
              setMuted(mutedRef.current);
              audioRef.current?.pause();
            }}
          >
            {muted ? <VolumeX size={16} strokeWidth={2.2} /> : <Volume2 size={16} strokeWidth={2.2} />}
          </button>
        </header>
        <p className="order-alert-who">
          <strong>{current.customerName}</strong>
          <span>
            {current.fulfillment === "delivery" ? "Delivery" : "Pickup"} · {formatUsd(current.total)}
          </span>
        </p>
        <p className="ed-sub">
          Placed {formatShopWhen(current.createdAt)}
          {current.scheduledFor ? ` · scheduled ${formatShopWhen(current.scheduledFor)}` : " · as soon as ready"}
        </p>
        <p className="ed-sub">{where}</p>
        <ul className="cart-lines">
          {current.items.slice(0, 8).map((it, i) => (
            <li key={`${it.itemId}-${i}`}>
              <span>
                {it.qty}× {it.name}
                {it.size ? ` · ${it.size}` : ""}
              </span>
              <span>{formatUsd(it.unitPrice * it.qty)}</span>
            </li>
          ))}
        </ul>
        {current.notes ? (
          <p className="pos-notes">
            <strong>Notes</strong> {current.notes}
          </p>
        ) : null}
        {error ? <p className="form-error">{error}</p> : null}
        <div className="confirm-actions">
          <button type="button" className="btn-print" disabled={busy} onClick={take}>
            {busy ? "Accepting…" : "Accept order"}
          </button>
          {queue.length > 1 ? (
            <button
              type="button"
              className="ed-btn"
              disabled={busy}
              onClick={() => setQueue((list) => [...list.slice(1), list[0]])}
            >
              Next in queue
            </button>
          ) : null}
        </div>
        <p className="ed-sub">Accepting sends the ticket to the kitchen. Remaining tickets stay in this queue.</p>
        <button
          type="button"
          className="order-alert-hide"
          aria-label="Keep ticket waiting"
          onClick={() => {
            for (const t of queue) snoozed.current.add(t.id);
            saveSnooze(snoozed.current);
            setQueue([]);
            audioRef.current?.pause();
          }}
        >
          <X size={14} strokeWidth={2.4} /> Keep waiting on POS
        </button>
      </section>
    </div>
  );
}

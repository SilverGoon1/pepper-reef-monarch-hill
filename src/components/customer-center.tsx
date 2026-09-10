import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Ban, Flag, FlagOff, MessageCircle, Search, Trash2, Volume2, VolumeX } from "lucide-react";
import { printOrderReceipts } from "@/lib/bluetooth-printer";
import { emitAdminInbox } from "@/lib/admin-inbox";
import { formatShopClock, formatShopWhen } from "@/lib/hours";
import { formatPhone, looksLikePhone } from "@/lib/phone";
import {
  acceptOrder,
  attachChatOrder,
  deleteChatMessage,
  deleteChatThread,
  deleteOrder,
  getAdminInboxCount,
  getAdminInsights,
  getAdminShop,
  listAdminChats,
  listAllOrders,
  listCustomers,
  loadChatMessages,
  saveShopSettings,
  sendChatMessage,
  setAccountBanned,
  setChatFlagged,
  setChatMuted,
  setChatResolution,
  setChatStaffNote,
  startAdminChat,
  updateOrderStatus,
} from "@/lib/shop-server";
import {
  formatUsd,
  formatTicketNo,
  payMethodLabel,
  type ChatMessageView,
  type ChatThreadView,
  type CustomerRecord,
  type OrderView,
  type PrinterProfile,
  type ReceiptOptions,
  type ShopSettingsPublic,
  DEFAULT_RECEIPT_OPTIONS,
} from "@/lib/shop-types";
import type { RestaurantInfo } from "@/data/menu";
import { RESTAURANT } from "@/data/menu";
import { OrderTicketCard } from "@/components/customer-chat";
import { CustomersPanel } from "@/components/customers-panel";
import { OrderDateTrays } from "@/components/order-trays";
import { RewardsPanel } from "@/components/shop-ops-panels";
import { SaveToast, useSaveFlash } from "@/components/save-toast";
import { AnalyticsPanel, EMPTY_INSIGHTS } from "@/routes/admin/settings";

export type CenterTab = "messages" | "orders" | "customers" | "rewards";

const ORDER_STATUSES = [
  "placed",
  "accepted",
  "awaiting_payment",
  "preparing",
  "ready",
  "out_for_delivery",
  "completed",
  "canceled",
];

type Filter = "open" | "unread" | "flagged" | "solved" | "all";

export function CustomerCenter({
  tab,
  thread,
  customer,
}: {
  tab: CenterTab;
  thread?: string;
  customer?: string;
}) {
  const navigate = useNavigate();
  function go(next: { tab?: CenterTab; thread?: string; customer?: string }) {
    void navigate({
      to: "/admin/center",
      search: {
        tab: next.tab ?? tab,
        thread: next.thread,
        customer: next.customer,
      },
    });
  }

  const [unread, setUnread] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [custCount, setCustCount] = useState(0);

  useEffect(() => {
    void getAdminInboxCount()
      .then((r) => setUnread(r.unread))
      .catch(() => undefined);
    void listAllOrders()
      .then((list) => setOrderCount(list.filter((o) => o.status !== "canceled" && o.status !== "completed").length))
      .catch(() => undefined);
    void listCustomers()
      .then((list) => setCustCount(list.length))
      .catch(() => undefined);
  }, [tab]);

  return (
    <div className="center-page">
      <header className="page-card center-head">
        <div>
          <p className="shop-brand-kicker">Admin</p>
          <h1>Customer Center</h1>
          <p className="ed-sub">Messages, tickets, the customer book, and rewards in one place.</p>
        </div>
        <div className="seg center-tabs" role="tablist" aria-label="Customer Center">
          <button type="button" role="tab" aria-selected={tab === "messages"} data-on={tab === "messages"} onClick={() => go({ tab: "messages" })}>
            Messages{unread > 0 ? <em>{unread}</em> : null}
          </button>
          <button type="button" role="tab" aria-selected={tab === "orders"} data-on={tab === "orders"} onClick={() => go({ tab: "orders" })}>
            Orders{orderCount > 0 ? <em>{orderCount}</em> : null}
          </button>
          <button type="button" role="tab" aria-selected={tab === "customers"} data-on={tab === "customers"} onClick={() => go({ tab: "customers" })}>
            Customers{custCount > 0 ? <em>{custCount}</em> : null}
          </button>
          <button type="button" role="tab" aria-selected={tab === "rewards"} data-on={tab === "rewards"} onClick={() => go({ tab: "rewards" })}>
            Rewards
          </button>
        </div>
      </header>
      {tab === "messages" ? (
        <CenterMessages
          wantedThread={thread}
          wantedCustomer={customer}
          onOpenOrder={() => go({ tab: "orders" })}
          onOpenCustomer={(id) => go({ tab: "customers", customer: id })}
          onThread={(id) => go({ tab: "messages", thread: id })}
        />
      ) : null}
      {tab === "orders" ? (
        <CenterOrders
          onMessage={(userId) => go({ tab: "messages", customer: userId })}
        />
      ) : null}
      {tab === "customers" ? (
        <CenterCustomers
          focusId={customer}
          onMessage={(id, threadId) => go({ tab: "messages", customer: id, thread: threadId })}
        />
      ) : null}
      {tab === "rewards" ? <CenterRewards /> : null}
    </div>
  );
}

function CenterMessages({
  wantedThread,
  wantedCustomer,
  onOpenOrder,
  onOpenCustomer,
  onThread,
}: {
  wantedThread?: string;
  wantedCustomer?: string;
  onOpenOrder: () => void;
  onOpenCustomer: (id: string) => void;
  onThread: (id: string) => void;
}) {
  const [threads, setThreads] = useState<ChatThreadView[]>([]);
  const [active, setActive] = useState(wantedThread ?? "");
  const [filter, setFilter] = useState<Filter>("open");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessageView[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [orders, setOrders] = useState<OrderView[]>([]);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [linkOrderId, setLinkOrderId] = useState("");
  const [note, setNote] = useState("");
  const [pane, setPane] = useState<"list" | "thread">("list");
  const logRef = useRef<HTMLDivElement>(null);

  function loadInbox() {
    return listAdminChats()
      .then((list) => {
        setThreads(list);
        return list;
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Could not load chats");
        return [] as ChatThreadView[];
      });
  }

  useEffect(() => {
    void loadInbox().then((list) => {
      const want =
        (wantedThread && list.find((t) => t.id === wantedThread)) ||
        (wantedCustomer && list.find((t) => t.userId === wantedCustomer && t.status !== "solved")) ||
        (wantedCustomer && list.find((t) => t.userId === wantedCustomer)) ||
        list.find((t) => t.status !== "solved" && !t.muted) ||
        list[0];
      if (want) {
        setActive(want.id);
        if (wantedThread || wantedCustomer) setPane("thread");
      }
    });
    void listAllOrders()
      .then(setOrders)
      .catch(() => setOrders([]));
    void listCustomers()
      .then(setCustomers)
      .catch(() => setCustomers([]));
    const t = window.setInterval(() => {
      void loadInbox();
      void getAdminInboxCount()
        .then((r) => emitAdminInbox(r.unread))
        .catch(() => undefined);
    }, 8000);
    return () => window.clearInterval(t);
  }, [wantedThread, wantedCustomer]);

  useEffect(() => {
    if (!active) {
      setMessages([]);
      return;
    }
    const current = threads.find((t) => t.id === active);
    setNote(current?.staffNote ?? "");
    void loadChatMessages({ data: { threadId: active } })
      .then(async (msgs) => {
        setMessages(msgs);
        const list = await loadInbox();
        const waiting = list.filter((t) => t.unreadAdmin > 0 && t.status !== "solved" && !t.muted).length;
        emitAdminInbox(waiting);
      })
      .catch(() => setMessages([]));
    const t = window.setInterval(() => {
      void loadChatMessages({ data: { threadId: active } })
        .then(setMessages)
        .catch(() => undefined);
    }, 6000);
    return () => window.clearInterval(t);
  }, [active]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return threads.filter((t) => {
      if (filter === "open" && t.status === "solved") return false;
      if (filter === "solved" && t.status !== "solved") return false;
      if (filter === "unread" && !(t.unreadAdmin > 0 && t.status !== "solved")) return false;
      if (filter === "flagged" && !t.flagged) return false;
      if (wantedCustomer && filter === "open" && t.userId === wantedCustomer) return true;
      if (!q) return true;
      return [t.customerName, t.customerPhone, t.lastMessage, t.order?.id, formatTicketNo(t.order?.ticketNo), t.staffNote]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [threads, filter, query, wantedCustomer]);

  const current = threads.find((t) => t.id === active);
  const profile = customers.find((c) => c.userId === current?.userId);
  const theirOrders = orders.filter((o) => o.userId === current?.userId && o.status !== "canceled").slice(0, 8);

  function pick(id: string) {
    setActive(id);
    setPane("thread");
    onThread(id);
  }

  function send(body = draft) {
    const text = body.trim();
    if (!active || !text) return;
    setBusy(true);
    setError("");
    void sendChatMessage({ data: { threadId: active, body: text } })
      .then(async () => {
        setDraft("");
        setMessages(await loadChatMessages({ data: { threadId: active } }));
        await loadInbox();
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not send"))
      .finally(() => setBusy(false));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send();
  }

  function resolve(solved: boolean) {
    if (!active) return;
    setBusy(true);
    void setChatResolution({ data: { threadId: active, solved } })
      .then(async () => {
        const list = await loadInbox();
        if (solved) {
          const nextOpen = list.find((t) => t.status !== "solved") ?? list[0];
          if (nextOpen) pick(nextOpen.id);
        }
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not update"))
      .finally(() => setBusy(false));
  }

  return (
    <div className="center-stage" data-pane={pane}>
      <aside className="center-inbox page-card">
        <label className="ed-field">
          <span>Find a conversation</span>
          <span className="cat-search">
            <Search size={16} strokeWidth={2.2} aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, phone, ticket"
              aria-label="Search conversations"
            />
          </span>
        </label>
        <div className="seg center-filters" role="group" aria-label="Filter chats">
          {(["open", "unread", "flagged", "solved", "all"] as const).map((id) => (
            <button key={id} type="button" data-on={filter === id} onClick={() => setFilter(id)}>
              {id[0]!.toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        {visible.length === 0 ? (
          <p className="ed-empty">{threads.length === 0 ? "No chats yet." : "Nothing in this filter."}</p>
        ) : (
          <ol className="service-inbox">
            {visible.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  className="service-item"
                  data-on={active === t.id}
                  onClick={() => pick(t.id)}
                >
                  <strong>
                    {t.customerName}
                    {t.flagged ? <span className="center-chip">Flagged</span> : null}
                    {t.muted ? <span className="center-chip">Muted</span> : null}
                    {t.customerBanned ? <span className="center-chip" data-tone="warn">Banned</span> : null}
                    {t.unreadAdmin > 0 && t.status !== "solved" ? <span className="nav-pip">{t.unreadAdmin}</span> : null}
                  </strong>
                  <em>{t.lastMessage || "New chat request"}</em>
                  <span>
                    {t.status === "solved" ? "Solved · " : ""}
                    {t.order ? `${t.order.fulfillment === "delivery" ? "Delivery" : "Pickup"} · ${formatUsd(t.order.total)} · ` : ""}
                    {t.lastAt ? formatShopWhen(t.lastAt) : ""}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </aside>

      <section className="page-card service-thread center-thread">
        {!current ? (
          <p className="ed-empty">Pick a conversation, or message a customer from the book.</p>
        ) : (
          <>
            <header className="msg-thread-head">
              <div>
                <button type="button" className="center-back" onClick={() => setPane("list")}>
                  Inbox
                </button>
                <h2>{current.customerName}</h2>
                {current.customerPhone && looksLikePhone(current.customerPhone) ? (
                  <p className="ed-sub">{formatPhone(current.customerPhone)}</p>
                ) : null}
              </div>
              <div className="msg-resolve">
                {current.status === "solved" ? (
                  <button type="button" className="ed-btn" disabled={busy} onClick={() => resolve(false)}>
                    Reopen
                  </button>
                ) : (
                  <button type="button" className="btn-print" disabled={busy} onClick={() => resolve(true)}>
                    Mark solved
                  </button>
                )}
              </div>
            </header>
            {current.order ? <OrderTicketCard order={current.order} /> : (
              <div className="link-ticket">
                <p className="ed-empty">No ticket on this chat.</p>
                <label className="ed-field">
                  <span>Link a ticket</span>
                  <select className="ed-input" value={linkOrderId} onChange={(e) => setLinkOrderId(e.target.value)}>
                    <option value="">Choose ticket</option>
                    {theirOrders.map((o) => (
                      <option key={o.id} value={o.id}>
                        #{formatTicketNo(o.ticketNo)} · {o.fulfillment} · {formatUsd(o.total)} · {formatShopWhen(o.createdAt)}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="ed-btn"
                    disabled={busy || !linkOrderId}
                    onClick={() => {
                      setBusy(true);
                      void attachChatOrder({ data: { threadId: current.id, orderId: linkOrderId } })
                        .then(async () => {
                          await loadInbox();
                          setLinkOrderId("");
                        })
                        .catch((err) => setError(err instanceof Error ? err.message : "Could not link"))
                        .finally(() => setBusy(false));
                    }}
                  >
                    Link ticket
                  </button>
                </label>
              </div>
            )}
            <section className="chat-history" aria-label="Conversation">
              <header className="chat-history-head">
                <p className="chat-log-kicker">Sent messages</p>
                <p className="chat-history-hint">What the customer and the shop already sent.</p>
              </header>
              <div className="chat-log" ref={logRef} aria-live="polite">
              {messages.length === 0 ? (
                <p className="ed-empty">No messages yet. Send the first line from the shop.</p>
              ) : (
                messages.map((m) => (
                  <p key={m.id} className="chat-bubble" data-role={m.senderRole}>
                    <span>
                      {m.senderRole === "admin" ? "Shop" : current.customerName}
                      {m.createdAt ? <time dateTime={m.createdAt}>{formatShopClock(m.createdAt)}</time> : null}
                      <button
                        type="button"
                        className="chat-del"
                        aria-label="Delete message"
                        onClick={() => {
                          if (!window.confirm("Remove this message?")) return;
                          void deleteChatMessage({ data: { id: m.id } })
                            .then(async () => setMessages(await loadChatMessages({ data: { threadId: current.id } })))
                            .catch((err) => setError(err instanceof Error ? err.message : "Could not delete"));
                        }}
                      >
                        <Trash2 size={12} strokeWidth={2.2} />
                      </button>
                    </span>
                    {m.body}
                  </p>
                ))
              )}
              </div>
            </section>
            <form className="chat-compose" aria-label="Write a reply" onSubmit={onSubmit}>
              <div className="chat-compose-head">
                <p className="chat-compose-kicker">Type a reply here</p>
              </div>
              <label className="ed-field">
                <span>Your new message</span>
                <textarea
                  className="ed-input ed-area chat-draft"
                  rows={3}
                  maxLength={1000}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  disabled={current.status === "solved"}
                  placeholder="Write a new reply to the customer…"
                  onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                />
              </label>
              {error ? <p className="form-error">{error}</p> : null}
              <button type="submit" className="btn-print" disabled={busy || current.status === "solved"}>
                {busy ? "Sending…" : "Send reply"}
              </button>
            </form>
          </>
        )}
      </section>

      <aside className="page-card center-context">
        {!current ? (
          <p className="ed-empty">Customer tools show up when a thread is open.</p>
        ) : (
          <>
            <p className="shop-brand-kicker">Moderate</p>
            <h2>{current.customerName}</h2>
            {profile ? (
              <p className="ed-sub">
                {profile.orderCount} orders · {formatUsd(profile.spend)} · {profile.points} pts
                {profile.banned ? " · Banned" : ""}
              </p>
            ) : null}
            <div className="center-tools">
              <button
                type="button"
                className="ed-btn"
                disabled={busy}
                onClick={() => {
                  void setChatFlagged({ data: { threadId: current.id, flagged: !current.flagged } })
                    .then(() => loadInbox())
                    .catch((err) => setError(err instanceof Error ? err.message : "Could not flag"));
                }}
              >
                {current.flagged ? <FlagOff size={14} strokeWidth={2.2} /> : <Flag size={14} strokeWidth={2.2} />}
                {current.flagged ? "Clear flag" : "Flag follow-up"}
              </button>
              <button
                type="button"
                className="ed-btn"
                disabled={busy}
                onClick={() => {
                  void setChatMuted({ data: { threadId: current.id, muted: !current.muted } })
                    .then(() => loadInbox())
                    .catch((err) => setError(err instanceof Error ? err.message : "Could not mute"));
                }}
              >
                {current.muted ? <Volume2 size={14} strokeWidth={2.2} /> : <VolumeX size={14} strokeWidth={2.2} />}
                {current.muted ? "Unmute pip" : "Mute pip"}
              </button>
              <button
                type="button"
                className="ed-btn"
                disabled={busy || !current.userId}
                onClick={() => {
                  const on = !current.customerBanned;
                  if (on && !window.confirm(`Ban ${current.customerName}? They will not be able to order or chat.`)) return;
                  void setAccountBanned({ data: { userId: current.userId, banned: on } })
                    .then(() => loadInbox())
                    .catch((err) => setError(err instanceof Error ? err.message : "Could not ban"));
                }}
              >
                <Ban size={14} strokeWidth={2.2} />
                {current.customerBanned ? "Lift ban" : "Ban account"}
              </button>
              <button
                type="button"
                className="ed-btn ed-btn-danger"
                disabled={busy}
                onClick={() => {
                  if (!window.confirm("Delete this entire conversation?")) return;
                  void deleteChatThread({ data: { threadId: current.id } })
                    .then(async () => {
                      const list = await loadInbox();
                      setActive(list[0]?.id ?? "");
                      setPane("list");
                    })
                    .catch((err) => setError(err instanceof Error ? err.message : "Could not delete"));
                }}
              >
                <Trash2 size={14} strokeWidth={2.2} />
                Delete chat
              </button>
            </div>
            <label className="ed-field">
              <span>Staff note (not shown to the customer)</span>
              <textarea
                className="ed-input ed-area"
                rows={3}
                maxLength={800}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={() => {
                  if (note === (current.staffNote ?? "")) return;
                  void setChatStaffNote({ data: { threadId: current.id, note } })
                    .then(() => loadInbox())
                    .catch((err) => setError(err instanceof Error ? err.message : "Could not save note"));
                }}
              />
            </label>
            {current.order ? (
              <Link to="/admin/pos" search={{ ticket: current.order.id }} className="ed-btn">
                Open ticket on POS
              </Link>
            ) : null}
            <button type="button" className="ed-btn" onClick={() => onOpenCustomer(current.userId)}>
              Open in the book
            </button>
            <button type="button" className="ed-btn" onClick={() => onOpenOrder()}>
              View tickets
            </button>
            <h3 className="settings-subhead">Tickets</h3>
            <OrderDateTrays orders={theirOrders} empty="No tickets on this account.">
              {(o) => (
                <li key={o.id}>
                  <span>
                    #{formatTicketNo(o.ticketNo)} · {formatShopWhen(o.createdAt)} · {o.fulfillment}
                    {o.scheduledFor ? ` · ${formatShopWhen(o.scheduledFor)}` : ""}
                  </span>
                  <strong>
                    {formatUsd(o.total)} <em>{o.status.replaceAll("_", " ")}</em>
                  </strong>
                </li>
              )}
            </OrderDateTrays>
          </>
        )}
      </aside>
    </div>
  );
}

function CenterOrders({ onMessage }: { onMessage: (userId: string) => void }) {
  const [orders, setOrders] = useState<OrderView[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("live");
  const [printers, setPrinters] = useState<PrinterProfile[]>([]);
  const [receipt, setReceipt] = useState<ReceiptOptions>(DEFAULT_RECEIPT_OPTIONS);
  const [restaurant, setRestaurant] = useState<RestaurantInfo>(RESTAURANT);
  const [taxRate, setTaxRate] = useState(6.625);
  const [autoPrint, setAutoPrint] = useState(true);
  const [msg, setMsg] = useState("");
  const [busyId, setBusyId] = useState("");

  useEffect(() => {
    void listAllOrders().then(setOrders);
    void getAdminShop().then((d) => {
      setPrinters(d.printers);
      setReceipt(d.receiptOptions);
      setRestaurant(d.restaurant);
      setTaxRate(d.settings.taxRate);
      setAutoPrint(d.receiptOptions.autoPrintOnAccept);
    });
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (status === "live" && (o.status === "completed" || o.status === "canceled")) return false;
      if (status !== "live" && status !== "all" && o.status !== status) return false;
      if (!q) return true;
      return [formatTicketNo(o.ticketNo), o.id, o.fulfillment, o.pickupName, o.addressLine, o.notes, o.paymentMethod, o.status]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [orders, query, status]);

  async function runPrint(order: OrderView) {
    if (!printers.some((p) => p.enabled && (p.customerCopy || p.storeCopy))) {
      throw new Error("Add a printer under Settings first.");
    }
    await printOrderReceipts({ order, restaurant, receipt, printers, taxRate, fallback: true });
  }

  return (
    <div className="center-orders">
      <section className="page-card">
        <div className="center-toolbar">
          <label className="ed-field">
            <span>Find a ticket</span>
            <span className="cat-search">
              <Search size={16} strokeWidth={2.2} aria-hidden />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name, ticket, notes" />
            </span>
          </label>
          <label className="ed-field">
            <span>Status</span>
            <select className="ed-input" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="live">Open tickets</option>
              <option value="all">All</option>
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>
        </div>
        {msg ? <p className="ed-sub">{msg}</p> : null}
      </section>
      {visible.length === 0 ? (
        <section className="page-card">
          <p className="ed-empty">No tickets match.</p>
        </section>
      ) : (
        <ul className="center-order-grid">
          {visible.map((o) => {
            const canAccept = o.status === "placed" || o.status === "awaiting_payment";
            return (
              <li key={o.id} className="page-card center-order-card">
                <header>
                  <strong>#{formatTicketNo(o.ticketNo)}</strong>
                  <span className="pos-st" data-tone={o.status === "completed" ? "completed" : o.status === "placed" ? "placed" : "accepted"}>
                    {o.status.replaceAll("_", " ")}
                  </span>
                </header>
                <p className="order-meta">
                  {formatShopWhen(o.createdAt)} · {o.fulfillment} · {payMethodLabel(o.paymentMethod)}
                  {o.scheduledFor ? ` · ${formatShopWhen(o.scheduledFor)}` : ""}
                </p>
                {o.pickupName ? <p className="ed-sub">Pickup for {o.pickupName}</p> : null}
                {o.notes ? <p className="ed-sub">Note: {o.notes}</p> : null}
                <ul>
                  {o.items.map((it, i) => (
                    <li key={i}>
                      {it.qty}× {it.name}
                      {it.size ? ` (${it.size})` : ""}
                    </li>
                  ))}
                </ul>
                <p className="center-order-total">{formatUsd(o.total)}</p>
                <div className="order-actions">
                  {canAccept ? (
                    <button
                      type="button"
                      className="btn-print"
                      disabled={busyId === o.id}
                      onClick={() => {
                        setBusyId(o.id);
                        void acceptOrder({ data: { id: o.id } })
                          .then(async (next) => {
                            setOrders((list) => list.map((x) => (x.id === next.id ? next : x)));
                            if (autoPrint) {
                              try {
                                await runPrint(next);
                                setMsg(`Accepted #${formatTicketNo(next.ticketNo)}. Receipts sent.`);
                              } catch (e) {
                                setMsg(e instanceof Error ? `Accepted, but print failed: ${e.message}` : "Accepted.");
                              }
                            } else setMsg(`Accepted #${formatTicketNo(next.ticketNo)}.`);
                          })
                          .catch((e) => setMsg(e instanceof Error ? e.message : "Could not accept"))
                          .finally(() => setBusyId(""));
                      }}
                    >
                      {busyId === o.id ? "Accepting…" : "Accept"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="ed-btn"
                      disabled={busyId === o.id || o.status === "canceled"}
                      onClick={() => {
                        setBusyId(o.id);
                        void runPrint(o)
                          .then(() => setMsg(`Reprinted #${formatTicketNo(o.ticketNo)}.`))
                          .catch((e) => setMsg(e instanceof Error ? e.message : "Could not print"))
                          .finally(() => setBusyId(""));
                      }}
                    >
                      Reprint
                    </button>
                  )}
                  <select
                    className="ed-input"
                    value={o.status}
                    onChange={(e) => {
                      const next = e.target.value;
                      void updateOrderStatus({ data: { id: o.id, status: next } }).then((r) =>
                        setOrders((list) => list.map((x) => (x.id === o.id ? (r.order ?? { ...x, status: next }) : x))),
                      );
                    }}
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                  <button type="button" className="ed-btn" onClick={() => onMessage(o.userId)}>
                    <MessageCircle size={14} strokeWidth={2.2} />
                    Message
                  </button>
                  <button
                    type="button"
                    className="ed-btn ed-btn-danger"
                    disabled={busyId === o.id}
                    onClick={() => {
                      if (!window.confirm(`Remove ticket #${formatTicketNo(o.ticketNo)}?`)) return;
                      setBusyId(o.id);
                      void deleteOrder({ data: { id: o.id } })
                        .then(() => {
                          setOrders((list) => list.filter((x) => x.id !== o.id));
                          setMsg(`Removed #${formatTicketNo(o.ticketNo)}.`);
                        })
                        .catch((e) => setMsg(e instanceof Error ? e.message : "Could not remove"))
                        .finally(() => setBusyId(""));
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function CenterCustomers({
  focusId,
  onMessage,
}: {
  focusId?: string;
  onMessage: (userId: string, threadId?: string) => void;
}) {
  const [insights, setInsights] = useState<Awaited<ReturnType<typeof getAdminInsights>> | null>(null);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    void getAdminInsights()
      .then(setInsights)
      .catch(() => setInsights(null));
    void listCustomers()
      .then(setCustomers)
      .catch(() => setCustomers([]));
  }, []);

  return (
    <div className="center-customers">
      {msg ? <p className="ed-sub">{msg}</p> : null}
      <AnalyticsPanel insights={insights ?? EMPTY_INSIGHTS} />
      <CustomersPanel
        customers={customers}
        setCustomers={setCustomers}
        onMsg={setMsg}
        focusId={focusId}
        onMessage={(c) => {
          void startAdminChat({ data: { userId: c.userId } })
            .then((r) => onMessage(c.userId, r.threadId))
            .catch(() => onMessage(c.userId));
        }}
      />
      {focusId ? <p className="sr-only">Focused customer {focusId}</p> : null}
    </div>
  );
}

function CenterRewards() {
  const [settings, setSettings] = useState<ShopSettingsPublic | null>(null);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [insights, setInsights] = useState<Awaited<ReturnType<typeof getAdminInsights>> | null>(null);
  const [msg, setMsg] = useState("");
  const { toast, flashOk, flashFail } = useSaveFlash();

  useEffect(() => {
    void getAdminShop()
      .then((d) => setSettings(d.settings))
      .catch(() => undefined);
    void listCustomers()
      .then(setCustomers)
      .catch(() => setCustomers([]));
    void getAdminInsights()
      .then(setInsights)
      .catch(() => setInsights(null));
  }, []);

  const view = insights ?? EMPTY_INSIGHTS;
  const holding = customers.reduce((n, c) => n + (c.points || 0), 0);

  function saveProgram() {
    if (!settings) return;
    void saveShopSettings({
      data: {
        pointsPerDollar: settings.pointsPerDollar,
        redeemRate: settings.redeemRate,
        welcomeBonus: settings.welcomeBonus,
        inviteBonus: settings.inviteBonus,
        inviteeBonus: settings.inviteeBonus,
      },
    })
      .then(() => {
        setMsg("Rewards program is live.");
        flashOk(true);
      })
      .catch((e) => {
        const text = e instanceof Error ? e.message : "Could not save rewards";
        setMsg(text);
        flashFail(text);
      });
  }

  if (!settings) return <div className="page-skel">Loading rewards…</div>;

  return (
    <div className="center-rewards">
      <SaveToast toast={toast} />
      <header className="page-card">
        <p className="shop-brand-kicker">Rewards</p>
        <h2>Points program</h2>
        <p className="ed-sub">
          Earn and redeem live here. Guests do not earn points — signed-in accounts do. Adjust a wallet in the book
          below.
        </p>
      </header>
      <div className="kpi-grid">
        <div className="kpi rewards-bubble">
          <span>Points in wallets</span>
          <strong>{holding}</strong>
        </div>
        <div className="kpi rewards-bubble">
          <span>Average wallet</span>
          <strong>{view.customers.avgPoints}</strong>
        </div>
        <div className="kpi rewards-bubble">
          <span>Welcome bonus</span>
          <strong>{settings.welcomeBonus}</strong>
        </div>
        <div className="kpi rewards-bubble">
          <span>Redeem rate</span>
          <strong>{settings.redeemRate} / $1</strong>
        </div>
      </div>
      <RewardsPanel settings={settings} setSettings={setSettings} />
      <button type="button" className="btn-print" onClick={saveProgram}>
        Save rewards program
      </button>
      {msg ? <p className="ed-sub">{msg}</p> : null}
      <CustomersPanel customers={customers} setCustomers={setCustomers} onMsg={setMsg} />
    </div>
  );
}

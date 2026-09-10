import { memo, useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Clock, MapPin, Minus, Phone, Plus, Search, X } from "lucide-react";
import { ItemConfirm } from "@/components/item-confirm";
import { PizzaCustomize } from "@/components/pizza-customize";
import { iconFor } from "@/data/icons";
import { itemPhoto } from "@/data/item-photos";
import type { MenuCategory, MenuItem, RestaurantInfo } from "@/data/menu";
import { useCartStore, cartTotals } from "@/lib/cart-store";
import { useDialogLock } from "@/lib/dialog-lock";
import { cardTypeStyle, formatUsd, type ProfileView, type ShopSettingsPublic } from "@/lib/shop-types";

function priceNum(p: string) {
  const n = Number(String(p).replace(/^\$/, ""));
  return Number.isFinite(n) ? n : 0;
}

type MenuHit = { cat: MenuCategory; item: MenuItem; score: number };

function rankMenu(categories: MenuCategory[], query: string): MenuHit[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const hits: MenuHit[] = [];
  for (const cat of categories) {
    for (const item of cat.items) {
      const name = item.name.toLowerCase();
      const desc = (item.description ?? "").toLowerCase();
      const catName = cat.name.toLowerCase();
      let score = 0;
      if (name === needle) score = 100;
      else if (name.startsWith(needle)) score = 80;
      else if (name.split(/\s+/).some((w) => w.startsWith(needle))) score = 70;
      else if (name.includes(needle)) score = 60;
      else if (desc.includes(needle)) score = 40;
      else if (catName.includes(needle)) score = 20;
      if (score) hits.push({ cat, item, score });
    }
  }
  hits.sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));
  return hits.slice(0, 8);
}

const CatalogItem = memo(function CatalogItem({
  cat,
  item,
  hit,
  onOpen,
}: {
  cat: MenuCategory;
  item: MenuItem;
  hit?: boolean;
  onOpen: () => void;
}) {
  const first = item.prices[0];
  const pizza = cat.kind === "pizza";
  const itemKey = item.id ?? item.name;
  const photo = item.hideImage ? "" : itemPhoto(item, cat.id);
  const price = pizza
    ? `from ${formatUsd(priceNum(item.prices[0]?.price ?? "0"))}`
    : formatUsd(priceNum(first?.price ?? "0"));

  return (
    <button
      type="button"
      className="food-card"
      data-fav={item.highlight ? "true" : undefined}
      data-hit={hit || undefined}
      data-has-photo={photo ? "true" : undefined}
      data-text-only={photo ? undefined : "true"}
      id={`item-${itemKey}`}
      onClick={onOpen}
      aria-label={`${item.name}, ${price}`}
    >
      {photo ? (
        <span className="food-card-photo">
          <img src={photo} alt="" decoding="async" loading="lazy" />
        </span>
      ) : null}
      <span className="food-card-copy">
        <span className="food-card-name">
          {item.name}
          {item.highlight ? <em className="fav-tag">House favorite</em> : null}
        </span>
        {item.description ? <span className="food-card-desc">{item.description}</span> : null}
        <span className="food-price">{price}</span>
      </span>
    </button>
  );
});

function CartPop({
  count,
  subtotal,
  vacationOn,
  onClose,
}: {
  count: number;
  subtotal: number;
  vacationOn: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const lines = useCartStore((s) => s.lines);
  const setQty = useCartStore((s) => s.setQty);
  const notes = useCartStore((s) => s.notes);
  const setNotes = useCartStore((s) => s.setNotes);
  useDialogLock(onClose, panelRef);

  return (
    <div className="pizza-modal-root cart-pop-root" role="presentation">
      <button type="button" className="pizza-modal-scrim" aria-label="Close cart" onClick={onClose} />
      <div
        ref={panelRef}
        id="bag"
        className="pizza-modal cart-pop"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="pizza-modal-head">
          <div>
            <p className="shop-brand-kicker">Bag</p>
            <h2 id={titleId}>Your order</h2>
          </div>
          <button type="button" className="ed-icon-btn" aria-label="Close cart" onClick={onClose}>
            <X size={16} strokeWidth={2.2} />
          </button>
        </header>
        {lines.length === 0 ? (
          <p className="ed-empty">Add pies, subs, and sides. Pickup or delivery at checkout.</p>
        ) : (
          <ul className="cart-lines">
            {lines.map((l) => (
              <li key={l.key}>
                <div>
                  <strong>{l.name}</strong>
                  {l.size ? <span className="cart-size">{l.size}</span> : null}
                  {l.detail ? <span className="cart-size">{l.detail}</span> : null}
                  {l.comment ? <span className="cook-note">{l.comment}</span> : null}
                  <div className="cart-line-price">{formatUsd(l.unitPrice * l.qty)}</div>
                </div>
                <div className="qty-step">
                  <button type="button" aria-label={`Fewer ${l.name}`} onClick={() => setQty(l.key, l.qty - 1)}>
                    <Minus size={14} />
                  </button>
                  <span>{l.qty}</span>
                  <button type="button" aria-label={`More ${l.name}`} onClick={() => setQty(l.key, l.qty + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <label className="ed-field cart-notes">
          <span>Order notes</span>
          <textarea
            className="ed-input ed-area"
            rows={3}
            maxLength={500}
            placeholder="Extra napkins, no onions, gate code…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            suppressHydrationWarning
          />
        </label>
        <div className="cart-total">
          <span>
            {count} item{count === 1 ? "" : "s"}
          </span>
          <strong>{formatUsd(subtotal)}</strong>
        </div>
        {vacationOn ? (
          <p className="ed-empty">Ordering is paused until the shop reopens.</p>
        ) : count === 0 ? (
          <button type="button" className="btn-print cart-check" disabled>
            Add items to check out
          </button>
        ) : (
          <Link to="/checkout" className="btn-print cart-check" onClick={onClose}>
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
}

export function Storefront({
  restaurant,
  categories,
  settings,
}: {
  restaurant: RestaurantInfo;
  categories: MenuCategory[];
  settings: ShopSettingsPublic;
  profile?: ProfileView | null;
}) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const [custom, setCustom] = useState<{ cat: MenuCategory; item: MenuItem; size: string } | null>(null);
  const [confirm, setConfirm] = useState<{ cat: MenuCategory; item: MenuItem } | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [hitId, setHitId] = useState("");
  const railRef = useRef<HTMLElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const searchSlotRef = useRef<HTMLDivElement>(null);
  const add = useCartStore((s) => s.add);
  const bagOpen = useCartStore((s) => s.bagOpen);
  const closeBag = useCartStore((s) => s.closeBag);
  const lines = useCartStore((s) => s.lines);
  const { count, subtotal } = cartTotals(lines);
  const visible = useMemo(
    () => categories.find((c) => c.id === active) ?? categories[0],
    [categories, active],
  );
  const suggestions = useMemo(() => rankMenu(categories, query), [categories, query]);
  const pickupAt = `${restaurant.address}, ${restaurant.city}`;

  function pickCategory(id: string) {
    setActive(id);
    window.setTimeout(() => {
      const btn = railRef.current?.querySelector<HTMLElement>(`[data-cat="${id}"]`);
      btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      const wrap = document.querySelector(".cat-search-wrap");
      const panel = document.getElementById("menu");
      if (!wrap || !panel) return;
      if (wrap.getBoundingClientRect().top > 2) return;
      const y = window.scrollY + panel.getBoundingClientRect().top - wrap.getBoundingClientRect().height;
      window.scrollTo({ top: Math.max(0, y) });
    }, 10);
  }

  function openItem(cat: MenuCategory, item: MenuItem) {
    if (cat.kind === "pizza") {
      setCustom({ cat, item, size: item.prices[0]?.label || "" });
      return;
    }
    setConfirm({ cat, item });
  }

  function skipCategories(dir: -1 | 1) {
    const n = categories.length;
    if (!n) return;
    const i = Math.max(0, categories.findIndex((c) => c.id === active));
    const next = (i + dir + n) % n;
    if (categories[next]) pickCategory(categories[next].id);
  }

  function jumpTo(hit: MenuHit) {
    setActive(hit.cat.id);
    setHitId(hit.item.id ?? hit.item.name);
    setSearchOpen(false);
    setQuery("");
    openItem(hit.cat, hit.item);
  }

  useEffect(() => {
    if (!bagOpen) return;
    const kick = window.setTimeout(() => {
      document.querySelectorAll(".cart-pop .cart-check").forEach((el) => {
        el.classList.remove("is-glow");
        window.requestAnimationFrame(() => el.classList.add("is-glow"));
      });
    }, 40);
    const clear = window.setTimeout(() => {
      document.querySelectorAll(".cart-pop .cart-check").forEach((el) => el.classList.remove("is-glow"));
    }, 1240);
    return () => {
      window.clearTimeout(kick);
      window.clearTimeout(clear);
    };
  }, [bagOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onDown = (e: PointerEvent) => {
      const wrap = searchWrapRef.current;
      if (wrap && !wrap.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    searchSlotRef.current?.scrollIntoView({ inline: "start", block: "nearest" });
  }, [searchOpen]);

  return (
    <div className="store-layout">
      <div className="store-main">
        <section className="shop-hero">
          <div className="shop-hero-copy">
            <h1 className="sr-only">{restaurant.name}</h1>
            {settings.tagline ? <p className="shop-hero-tag">{settings.tagline}</p> : null}
            <p className="shop-hero-hours">
              <Clock size={14} strokeWidth={2.2} />
              {settings.hoursSummary || restaurant.hours}
              {settings.openNow ? <span className="open-pip">Open</span> : <span className="closed-pip">Closed</span>}
            </p>
            <p>
              <MapPin size={14} strokeWidth={2.2} />
              {pickupAt}
            </p>
            <p>
              <Phone size={14} strokeWidth={2.2} />
              <a href={restaurant.phoneHref}>{restaurant.phone}</a>
            </p>
          </div>
        </section>
        {settings.vacationOn ? (
          <div className="vac-banner" role="status">
            <strong>Closed for vacation</strong>
            <p>{settings.vacationMessage}</p>
            {settings.vacationUntil ? <p>Back {settings.vacationUntil}</p> : null}
          </div>
        ) : !settings.openNow ? (
          <div className="vac-banner" role="status">
            <strong>Kitchen is closed</strong>
            <p>You can still browse. {settings.hoursSummary}</p>
          </div>
        ) : null}
        <div className="cat-search-wrap" ref={searchWrapRef} data-search-open={searchOpen ? "true" : undefined}>
          <div className="cat-sorter">
            <button
              type="button"
              className="cat-skip"
              aria-label="Previous category"
              onClick={() => skipCategories(-1)}
            >
              <ChevronLeft size={20} strokeWidth={2.4} />
            </button>
            <nav className="cat-rail" aria-label="Menu categories" ref={railRef}>
              <div className="cat-search-slot" ref={searchSlotRef}>
                <label className="cat-search">
                  <Search size={16} strokeWidth={2.2} aria-hidden />
                  <input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSearchOpen(true);
                    }}
                    onFocus={() => setSearchOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSearchOpen(false);
                        (e.target as HTMLInputElement).blur();
                      }
                      if (e.key === "Enter" && suggestions[0]) {
                        e.preventDefault();
                        jumpTo(suggestions[0]);
                      }
                    }}
                    placeholder="Search"
                    aria-label="Search the menu"
                    autoComplete="off"
                    enterKeyHint="search"
                  />
                </label>
              </div>
              {categories.map((cat) => {
                const Icon = iconFor(cat.icon ?? cat.id);
                const on = visible?.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    data-on={on}
                    data-cat={cat.id}
                    aria-current={on ? "true" : undefined}
                    onClick={() => {
                      setSearchOpen(false);
                      pickCategory(cat.id);
                    }}
                  >
                    <Icon size={16} strokeWidth={2.2} />
                    {cat.name}
                  </button>
                );
              })}
            </nav>
            <button
              type="button"
              className="cat-skip"
              aria-label="Next category"
              onClick={() => skipCategories(1)}
            >
              <ChevronRight size={20} strokeWidth={2.4} />
            </button>
          </div>
          {searchOpen && query.trim() ? (
            <ul className="cat-suggest" role="listbox" aria-label="Menu suggestions">
              {suggestions.length === 0 ? (
                <li className="cat-suggest-empty">No matches for “{query.trim()}”.</li>
              ) : (
                suggestions.map((hit) => (
                  <li key={`${hit.cat.id}-${hit.item.id ?? hit.item.name}`}>
                    <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => jumpTo(hit)}>
                      <strong>{hit.item.name}</strong>
                      <em>{hit.cat.name}</em>
                    </button>
                  </li>
                ))
              )}
            </ul>
          ) : null}
        </div>
        {visible ? (
          <section className="cat-panel" id="menu">
            <header className="cat-panel-head">
              <h2>{visible.name}</h2>
              {visible.note ? <p>{visible.note}</p> : null}
            </header>
            <div
              className="food-grid"
              data-card-size={settings.cardTextSize}
              data-card-fit={settings.cardSize}
              style={cardTypeStyle(settings.cardTextColor, settings.cardDescColor, settings.cardPriceColor, settings.cardBg)}
            >
              {visible.items.map((item) => (
                <CatalogItem
                  key={item.id ?? item.name}
                  cat={visible}
                  item={item}
                  hit={hitId === (item.id ?? item.name)}
                  onOpen={() => openItem(visible, item)}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
      {bagOpen ? (
        <CartPop
          count={count}
          subtotal={subtotal}
          vacationOn={settings.vacationOn}
          onClose={closeBag}
        />
      ) : null}
      {count > 0 && !settings.vacationOn && !bagOpen ? (
        <div className="mobile-bag">
          <Link to="/checkout" className="btn-print cart-check">
            Checkout · {count} · {formatUsd(subtotal)}
          </Link>
        </div>
      ) : null}
      {custom ? (
        <PizzaCustomize
          item={custom.item}
          categoryId={custom.cat.id}
          settings={settings}
          initialSize={custom.size}
          onClose={() => setCustom(null)}
          onConfirm={(result) => {
            add({
              itemId: custom.item.id ?? custom.item.name,
              categoryId: custom.cat.id,
              name: result.name,
              size: result.size,
              detail: result.detail || undefined,
              comment: result.comment,
              toppings: result.toppings,
              condiments: result.condiments,
              unitPrice: result.unitPrice,
            });
            setCustom(null);
          }}
        />
      ) : null}
      {confirm ? (
        <ItemConfirm
          item={confirm.item}
          categoryName={confirm.cat.name}
          onClose={() => setConfirm(null)}
          onConfirm={(result) => {
            add({
              itemId: confirm.item.id ?? confirm.item.name,
              categoryId: confirm.cat.id,
              name: confirm.item.name,
              size: result.size,
              detail: result.detail,
              comment: result.comment,
              condiments: result.condiments,
              unitPrice: result.unitPrice,
            });
            setConfirm(null);
          }}
        />
      ) : null}
    </div>
  );
}

import {
  CARD_BG_COLORS,
  CARD_SIZES,
  CARD_TEXT_COLORS,
  CARD_TEXT_SIZES,
  cardBgHex,
  cardBgKind,
  cardColorHex,
  cardColorKind,
  cardTextContrastOk,
  cardTypeStyle,
} from "@/lib/shop-types";
import { useMenuStore } from "@/lib/menu-store";

function ColorRow({
  label,
  value,
  onChange,
  swatches,
  toHex,
  kindOf,
  contrastOk = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  swatches: readonly { id: string; label: string }[];
  toHex: (v: string) => string;
  kindOf: (v: string) => string;
  contrastOk?: boolean;
}) {
  const kind = kindOf(value);
  return (
    <div className="ed-field">
      <span>{label}</span>
      <div className="ed-color-row">
        {swatches.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className="ed-color-swatch"
            data-swatch={opt.id}
            data-on={kind === opt.id}
            aria-pressed={kind === opt.id}
            aria-label={`${opt.label} for ${label.toLowerCase()}`}
            onClick={() => onChange(opt.id)}
          />
        ))}
        <label className="ed-color-custom" data-on={kind === "custom" || undefined}>
          <span>Custom</span>
          <input
            type="color"
            value={toHex(value)}
            aria-label={`Custom ${label.toLowerCase()} color`}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      </div>
      {!contrastOk ? <p className="ed-empty">Hard to read on this card paper — pick a darker ink or a lighter background.</p> : null}
    </div>
  );
}

function SizeRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly { id: string; label: string }[];
  onChange: (id: string) => void;
}) {
  return (
    <div className="ed-field">
      <span>{label}</span>
      <div className="seg ed-kind" role="group" aria-label={label}>
        {options.map((opt) => (
          <button key={opt.id} type="button" data-on={value === opt.id} onClick={() => onChange(opt.id)}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const PREVIEWS = [
  { name: "Cheese Pizza", desc: "Sauce, mozzarella", price: "from $14.00" },
  {
    name: "Spinach, Broccoli & Extra Cheese Pizza",
    desc: "House favorite with roasted garlic and a long line of toppings",
    price: "from $18.75",
  },
];

export function CardEditor() {
  const cardSize = useMenuStore((s) => s.cardSize);
  const cardTextSize = useMenuStore((s) => s.cardTextSize);
  const cardTextColor = useMenuStore((s) => s.cardTextColor);
  const cardDescColor = useMenuStore((s) => s.cardDescColor);
  const cardPriceColor = useMenuStore((s) => s.cardPriceColor);
  const cardBg = useMenuStore((s) => s.cardBg);
  const setCardType = useMenuStore((s) => s.setCardType);

  return (
    <div className="card-editor-page">
      <section className="page-card">
        <h2>Card Editor</h2>
        <p className="ed-sub">Size the menu tiles, paint the paper, and set name, description, and price inks. Preview updates as you tap.</p>
        <div className="ed-card-type">
          <SizeRow
            label="Card size"
            value={cardSize}
            options={CARD_SIZES}
            onChange={(id) => setCardType({ cardSize: id as typeof cardSize })}
          />
          <SizeRow
            label="Text size"
            value={cardTextSize}
            options={CARD_TEXT_SIZES}
            onChange={(id) => setCardType({ cardTextSize: id as typeof cardTextSize })}
          />
          <ColorRow
            label="Background"
            value={cardBg}
            onChange={(v) => setCardType({ cardBg: v })}
            swatches={CARD_BG_COLORS}
            toHex={cardBgHex}
            kindOf={cardBgKind}
          />
          <ColorRow
            label="Name"
            value={cardTextColor}
            onChange={(v) => setCardType({ cardTextColor: v })}
            swatches={CARD_TEXT_COLORS}
            toHex={cardColorHex}
            kindOf={cardColorKind}
            contrastOk={cardTextContrastOk(cardTextColor, cardBg)}
          />
          <ColorRow
            label="Description"
            value={cardDescColor}
            onChange={(v) => setCardType({ cardDescColor: v })}
            swatches={CARD_TEXT_COLORS}
            toHex={cardColorHex}
            kindOf={cardColorKind}
            contrastOk={cardTextContrastOk(cardDescColor, cardBg)}
          />
          <ColorRow
            label="Price"
            value={cardPriceColor}
            onChange={(v) => setCardType({ cardPriceColor: v })}
            swatches={CARD_TEXT_COLORS}
            toHex={cardColorHex}
            kindOf={cardColorKind}
            contrastOk={cardTextContrastOk(cardPriceColor, cardBg)}
          />
        </div>
      </section>
      <section className="page-card" aria-label="Card preview">
        <h2>Preview</h2>
        <p className="ed-sub">Long names wrap and clip. Type never stacks over the photo or the price.</p>
        <div
          className="food-grid ed-card-preview-grid"
          data-card-size={cardTextSize}
          data-card-fit={cardSize}
          style={cardTypeStyle(cardTextColor, cardDescColor, cardPriceColor, cardBg)}
        >
          {PREVIEWS.map((item) => (
            <div key={item.name} className="food-card" aria-hidden>
              <span className="food-card-photo">
                <span className="food-card-photo-empty">Aa</span>
              </span>
              <span className="food-card-copy">
                <span className="food-card-name">{item.name}</span>
                <span className="food-card-desc">{item.desc}</span>
                <span className="food-price">{item.price}</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

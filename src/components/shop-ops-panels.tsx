import { PaymentProcessorPanel } from "@/components/payment-processor";
import { DAY_KEYS, DAY_LABELS, etaMinutes, type DayKey, type WeeklyHours } from "@/lib/hours";
import { computeTax, formatUsd, type ShopSettingsPublic } from "@/lib/shop-types";

export function HoursPanel({
  settings,
  setSettings,
}: {
  settings: ShopSettingsPublic;
  setSettings: (s: ShopSettingsPublic) => void;
}) {
  function patchDay(key: DayKey, next: Partial<WeeklyHours[DayKey]>) {
    setSettings({
      ...settings,
      weeklyHours: {
        ...settings.weeklyHours,
        [key]: { ...settings.weeklyHours[key], ...next },
      },
    });
  }
  const etaPickup = etaMinutes(settings.prepMinutes, settings.deliveryMinutes, "pickup");
  const etaDelivery = etaMinutes(settings.prepMinutes, settings.deliveryMinutes, "delivery");
  return (
    <section className="page-card">
      <h2>Time management</h2>
      <p className="ed-sub">
        Kitchen hours use America/New_York. Checkout blocks new tickets when the shop is closed (vacation still
        overrides this).
      </p>
      <p className="points-chip">{settings.openNow ? "Kitchen is open" : "Kitchen is closed"}</p>
      <div className="hours-grid">
        {DAY_KEYS.map((key) => {
          const day = settings.weeklyHours[key];
          return (
            <div className="hours-row" key={key}>
              <span>{DAY_LABELS[key]}</span>
              <label className="pay-opt">
                <input
                  type="checkbox"
                  checked={day.closed}
                  onChange={(e) => patchDay(key, { closed: e.target.checked })}
                />
                Closed
              </label>
              <input
                className="ed-input"
                type="time"
                value={day.open}
                disabled={day.closed}
                onChange={(e) => patchDay(key, { open: e.target.value })}
              />
              <input
                className="ed-input"
                type="time"
                value={day.close}
                disabled={day.closed}
                onChange={(e) => patchDay(key, { close: e.target.value })}
              />
            </div>
          );
        })}
      </div>
      <div className="two-col">
        <label className="ed-field">
          <span>Kitchen prep (minutes)</span>
          <input
            className="ed-input"
            type="number"
            min={5}
            value={settings.prepMinutes}
            onChange={(e) => setSettings({ ...settings, prepMinutes: Number(e.target.value) })}
          />
        </label>
        <label className="ed-field">
          <span>Delivery travel (minutes)</span>
          <input
            className="ed-input"
            type="number"
            min={5}
            value={settings.deliveryMinutes}
            onChange={(e) => setSettings({ ...settings, deliveryMinutes: Number(e.target.value) })}
          />
        </label>
      </div>
      <p className="ed-sub">
        Shown at checkout: pickup about {etaPickup} min · delivery about {etaDelivery} min.
      </p>
    </section>
  );
}

export function VacationPanel({
  settings,
  setSettings,
}: {
  settings: ShopSettingsPublic;
  setSettings: (s: ShopSettingsPublic) => void;
}) {
  return (
    <section className="page-card">
      <h2>Vacation</h2>
      <p className="ed-sub">Vacation pauses new tickets. The shop stays browsable; checkout is closed.</p>
      <label className="pay-opt">
        <input
          type="checkbox"
          checked={settings.vacationOn}
          onChange={(e) => setSettings({ ...settings, vacationOn: e.target.checked })}
        />
        Vacation mode — shop closed for orders
      </label>
      <label className="ed-field">
        <span>Vacation message</span>
        <textarea
          className="ed-input ed-area"
          rows={3}
          value={settings.vacationMessage}
          onChange={(e) => setSettings({ ...settings, vacationMessage: e.target.value })}
        />
      </label>
      <label className="ed-field">
        <span>Back date</span>
        <input
          className="ed-input"
          value={settings.vacationUntil}
          onChange={(e) => setSettings({ ...settings, vacationUntil: e.target.value })}
          placeholder="Monday, Sept 14"
        />
      </label>
    </section>
  );
}

export function PaymentsPanel({
  settings,
  setSettings,
}: {
  settings: ShopSettingsPublic;
  setSettings: (s: ShopSettingsPublic) => void;
}) {
  return (
    <>
      <section className="page-card">
        <h2>Payments</h2>
        <p className="ed-sub">This copy shows at checkout until a card processor is wired in.</p>
        <label className="ed-field">
          <span>Payment note at checkout</span>
          <textarea
            className="ed-input ed-area"
            rows={3}
            value={settings.paymentPlaceholder}
            onChange={(e) => setSettings({ ...settings, paymentPlaceholder: e.target.value })}
          />
        </label>
        <label className="pay-opt">
          <input
            type="checkbox"
            checked={settings.guestCardRequired}
            onChange={(e) => setSettings({ ...settings, guestCardRequired: e.target.checked })}
          />
          <span>
            Require card payment for guests
            <em>Guests cannot pay at pickup or with cash. Signed-in customers still can.</em>
          </span>
        </label>
      </section>
      <PaymentProcessorPanel />
    </>
  );
}

export function TaxPanel({
  settings,
  setSettings,
}: {
  settings: ShopSettingsPublic;
  setSettings: (s: ShopSettingsPublic) => void;
}) {
  const sampleFood = 20;
  const sampleFee = settings.deliveryFee;
  const { tax, total } = computeTax(sampleFood, 0, sampleFee, settings.taxRate);
  return (
    <section className="page-card">
      <h2>Tax rate</h2>
      <p className="ed-sub">
        Applied at checkout on food after rewards, plus the delivery fee. Pickup has no delivery fee. New Jersey
        prepared-food default is 6.625%. Tips are collected after tax and are not taxed.
      </p>
      <label className="ed-field">
        <span>Sales tax percent</span>
        <input
          className="ed-input"
          type="number"
          step="0.001"
          min={0}
          max={25}
          value={settings.taxRate}
          onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
        />
      </label>
      <p className="ed-sub">
        A {formatUsd(sampleFood)} pie plus a {formatUsd(sampleFee)} delivery fee adds {formatUsd(tax)} tax (
        {settings.taxRate || 0}%). Checkout would collect {formatUsd(total)}.
      </p>
    </section>
  );
}

export function ToppingPricePanel({
  settings,
  setSettings,
}: {
  settings: ShopSettingsPublic;
  setSettings: (s: ShopSettingsPublic) => void;
}) {
  return (
    <section className="page-card">
      <h2>Extra topping prices</h2>
      <p className="ed-sub">
        Used when a guest adds toppings on a pizza. Half-and-half toppings charge half. Offer XL on a pie by typing an
        XL price on that item — no separate toggle.
      </p>
      <div className="topping-price-grid">
        {(
          [
            ["toppingPriceSm", "Small"],
            ["toppingPriceMd", "Medium"],
            ["toppingPriceLg", "Large"],
            ["toppingPriceXl", "Extra large"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="ed-field">
            <span>{label}</span>
            <input
              className="ed-input"
              type="number"
              step="0.25"
              min={0}
              max={20}
              value={settings[key]}
              onChange={(e) => setSettings({ ...settings, [key]: Number(e.target.value) })}
            />
          </label>
        ))}
      </div>
    </section>
  );
}

export function DeliveryPanel({
  settings,
  setSettings,
}: {
  settings: ShopSettingsPublic;
  setSettings: (s: ShopSettingsPublic) => void;
}) {
  return (
    <section className="page-card">
      <h2>Delivery settings</h2>
      <p className="ed-sub">
        Checkout only allows delivery inside the painted map below. Addresses outside it stay pickup-only.
      </p>
      <div className="two-col">
        <label className="ed-field">
          <span>Minimum order</span>
          <input
            className="ed-input"
            type="number"
            step="0.01"
            min={0}
            value={settings.minOrderDelivery}
            onChange={(e) => setSettings({ ...settings, minOrderDelivery: Number(e.target.value) })}
          />
        </label>
        <label className="ed-field">
          <span>Delivery fee</span>
          <input
            className="ed-input"
            type="number"
            step="0.01"
            min={0}
            value={settings.deliveryFee}
            onChange={(e) => setSettings({ ...settings, deliveryFee: Number(e.target.value) })}
          />
        </label>
      </div>
      <label className="ed-field">
        <span>Travel time added at checkout (minutes)</span>
        <input
          className="ed-input"
          type="number"
          min={5}
          value={settings.deliveryMinutes}
          onChange={(e) => setSettings({ ...settings, deliveryMinutes: Number(e.target.value) })}
        />
      </label>
      <p className="ed-sub">
        {settings.hasZones
          ? "A delivery zone is painted. Addresses outside it stay pickup-only."
          : "No zone painted yet — customers can only choose pickup."}
      </p>
    </section>
  );
}

export function RewardsPanel({
  settings,
  setSettings,
}: {
  settings: ShopSettingsPublic;
  setSettings: (s: ShopSettingsPublic) => void;
}) {
  const earn = Math.round(20 * (settings.pointsPerDollar || 0));
  const dollar = settings.redeemRate > 0 ? 1 : 0;
  return (
    <section className="page-card">
      <h2>Points program</h2>
      <p className="ed-sub">
        Points accrue on paid food totals (minus delivery). Guests do not earn or redeem — that stays on signed-in
        accounts. Customers redeem at checkout.
      </p>
      <div className="rewards-preview" aria-hidden>
        <span className="points-chip">{earn} pts on a $20 pie</span>
        <span className="points-chip">
          {settings.redeemRate || 0} pts = {formatUsd(dollar)}
        </span>
        <span className="points-chip">{settings.welcomeBonus || 0} welcome pts</span>
        <span className="points-chip">{settings.inviteBonus || 0} for inviting</span>
        <span className="points-chip">{settings.inviteeBonus || 0} for joining with a code</span>
      </div>
      <div className="two-col">
        <label className="ed-field">
          <span>Points per dollar spent</span>
          <input
            className="ed-input"
            type="number"
            step="0.1"
            min={0}
            value={settings.pointsPerDollar}
            onChange={(e) => setSettings({ ...settings, pointsPerDollar: Number(e.target.value) })}
          />
        </label>
        <label className="ed-field">
          <span>Points needed for $1 off</span>
          <input
            className="ed-input"
            type="number"
            min={1}
            value={settings.redeemRate}
            onChange={(e) => setSettings({ ...settings, redeemRate: Number(e.target.value) })}
          />
        </label>
      </div>
      <label className="ed-field">
        <span>Welcome bonus for new accounts</span>
        <input
          className="ed-input"
          type="number"
          min={0}
          value={settings.welcomeBonus}
          onChange={(e) => setSettings({ ...settings, welcomeBonus: Number(e.target.value) })}
        />
      </label>
      <div className="two-col">
        <label className="ed-field">
          <span>Points you get when a friend joins</span>
          <input
            className="ed-input"
            type="number"
            min={0}
            value={settings.inviteBonus}
            onChange={(e) => setSettings({ ...settings, inviteBonus: Number(e.target.value) })}
          />
        </label>
        <label className="ed-field">
          <span>Extra points the friend gets</span>
          <input
            className="ed-input"
            type="number"
            min={0}
            value={settings.inviteeBonus}
            onChange={(e) => setSettings({ ...settings, inviteeBonus: Number(e.target.value) })}
          />
        </label>
      </div>
    </section>
  );
}

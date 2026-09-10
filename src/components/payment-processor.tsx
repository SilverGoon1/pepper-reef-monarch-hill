export function PaymentProcessorPanel() {
  return (
    <section className="page-card pay-soon">
      <p className="soon-banner">Under construction</p>
      <h2>Payment processor</h2>
      <p className="ed-sub">
        Card capture is frozen. These fields are the shop inputs for a future processor — nothing
        is charged and nothing is saved until Stripe, Square, or another processor is connected.
      </p>
      <fieldset className="pay-soon-fields" disabled>
        <legend className="sr-only">Processor fields, not yet active</legend>
        <div className="two-col">
          <label className="ed-field">
            <span>Processor</span>
            <select className="ed-input" defaultValue="stripe">
              <option value="stripe">Stripe</option>
              <option value="square">Square</option>
              <option value="clover">Clover</option>
              <option value="paypal">PayPal</option>
              <option value="authorize">Authorize.net</option>
            </select>
          </label>
          <label className="ed-field">
            <span>Environment</span>
            <select className="ed-input" defaultValue="sandbox">
              <option value="sandbox">Sandbox</option>
              <option value="live">Live</option>
            </select>
          </label>
        </div>
        <label className="ed-field">
          <span>Merchant ID</span>
          <input className="ed-input" placeholder="acct_ or location ID" readOnly />
        </label>
        <label className="ed-field">
          <span>Publishable / public key</span>
          <input className="ed-input" placeholder="pk_…" readOnly />
        </label>
        <label className="ed-field">
          <span>Secret key</span>
          <input className="ed-input" type="password" placeholder="sk_…" readOnly />
        </label>
        <label className="ed-field">
          <span>Webhook signing secret</span>
          <input className="ed-input" type="password" placeholder="whsec_…" readOnly />
        </label>
        <div className="two-col">
          <label className="ed-field">
            <span>Statement descriptor</span>
            <input className="ed-input" defaultValue="SOUTH END PIZZA" readOnly />
          </label>
          <label className="ed-field">
            <span>Currency</span>
            <select className="ed-input" defaultValue="usd">
              <option value="usd">USD</option>
            </select>
          </label>
        </div>
        <label className="pay-opt">
          <input type="checkbox" disabled />
          Card present (tablet / terminal)
        </label>
        <label className="pay-opt">
          <input type="checkbox" disabled />
          Online checkout
        </label>
        <label className="pay-opt">
          <input type="checkbox" disabled />
          Tips on the receipt
        </label>
      </fieldset>
      <button type="button" className="btn-print" disabled>
        Save processor
      </button>
    </section>
  );
}

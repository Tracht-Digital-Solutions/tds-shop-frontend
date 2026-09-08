import { useState } from "react";

import { formatPrice, startCheckout, WITHDRAWAL_TEXT } from "../lib/checkout";
import type { Lang } from "../lib/i18n";

interface Props {
  slug: string;
  title: string;
  lang: Lang;
  netCents: number;
  taxCents: number;
  grossCents: number;
  vatRateBp: number;
  currency: string;
}

const TX = {
  de: {
    heading: "Bestellung abschließen",
    summary: "Ihre Bestellung",
    net: "Netto",
    vat: "zzgl. USt",
    total: "Gesamt",
    email: "E-Mail-Adresse",
    emailHint: "An diese Adresse geht die Bestellbestätigung.",
    name: "Name (optional)",
    country: "Land",
    delivery: "Sofortige Erbringung nach Zahlung. Kein Versand.",
    // The order button. § 312j Abs. 3 BGB prescribes this wording, and it
    // must sit immediately below the mandatory details.
    submit: "Zahlungspflichtig bestellen",
    working: "Wird vorbereitet …",
    consentLabel: "Ich stimme zu und bestätige:",
    onlyGermany: "Wir verkaufen diese Leistung derzeit nur nach Deutschland.",
  },
  en: {
    heading: "Complete your order",
    summary: "Your order",
    net: "Net",
    vat: "plus VAT",
    total: "Total",
    email: "Email address",
    emailHint: "The order confirmation goes to this address.",
    name: "Name (optional)",
    country: "Country",
    delivery: "Performed immediately after payment. Nothing is shipped.",
    submit: "Order with obligation to pay",
    working: "Preparing …",
    consentLabel: "I agree and confirm:",
    onlyGermany: "We currently sell this service to Germany only.",
  },
} as const;

/**
 * The order form — and specifically, the place the legally required
 * declarations are made.
 *
 * ### Why this page exists at all, rather than a link to Stripe
 *
 * § 312j Abs. 3 BGB requires an order button labelled "Zahlungspflichtig
 * bestellen" with the mandatory details (what is being bought, the total
 * price, VAT, delivery) immediately above it. Stripe's hosted button says
 * "Bezahlen" and its page is not ours to relabel. So the declaration happens
 * here, and Stripe is only the payment step that follows. Linking a visitor
 * straight into Stripe would skip it.
 *
 * ### The consent checkbox is a precondition, not a preference
 *
 * For a digital service the right of withdrawal lapses on full performance
 * only if the customer expressly agreed beforehand (§ 356 Abs. 4 BGB). It is
 * therefore **not pre-ticked**, the button stays disabled without it, and the
 * server refuses the order too — the browser check is a courtesy, the server
 * check is the rule.
 *
 * The wording shown here travels with the request, so the order records the
 * sentence the customer actually read.
 */
export default function CheckoutForm({
  slug,
  title,
  lang,
  netCents,
  taxCents,
  grossCents,
  vatRateBp,
  currency,
}: Props) {
  const t = TX[lang];
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("DE");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
    const result = await startCheckout({ slug, lang, email, name, country, withdrawalConsent: consent });
    if (result.url) {
      window.location.href = result.url;
      return;
    }
    setBusy(false);
    setError(result.error ?? "Unbekannter Fehler.");
  };

  return (
    <form className="checkout" onSubmit={submit}>
      <h2>{t.heading}</h2>

      {/* The mandatory details, immediately above the button — that adjacency
          is the requirement, not a layout preference. */}
      <section className="checkout__summary" aria-label={t.summary}>
        <p className="checkout__item">{title}</p>
        <dl>
          <div>
            <dt>{t.net}</dt>
            <dd>{formatPrice(netCents, currency, lang)}</dd>
          </div>
          <div>
            <dt>
              {t.vat} ({(vatRateBp / 100).toFixed(0)} %)
            </dt>
            <dd>{formatPrice(taxCents, currency, lang)}</dd>
          </div>
          <div className="checkout__total">
            <dt>{t.total}</dt>
            <dd>{formatPrice(grossCents, currency, lang)}</dd>
          </div>
        </dl>
        <p className="checkout__delivery">{t.delivery}</p>
      </section>

      <label>
        {t.email}
        <input
          className="field-boxed"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small>{t.emailHint}</small>
      </label>

      <label>
        {t.name}
        <input className="field-boxed" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        {t.country}
        <select className="field-boxed" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="DE">Deutschland</option>
        </select>
        <small>{t.onlyGermany}</small>
      </label>

      <label className="checkout__consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
        />
        <span>
          <strong>{t.consentLabel}</strong> {WITHDRAWAL_TEXT[lang]}
        </span>
      </label>

      {error ? <p className="checkout__error" role="alert">{error}</p> : null}

      <button type="submit" className="btn btn-primary" disabled={busy || !consent} aria-busy={busy}>
        {busy ? t.working : t.submit}
      </button>
    </form>
  );
}

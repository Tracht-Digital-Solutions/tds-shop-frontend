import { useEffect, useRef, useState } from "react";

import { clearCart, readCart, type CartLine } from "../lib/cart";
import {
  formatPrice,
  paymentMethods,
  quoteCart,
  startCheckout,
  WITHDRAWAL_TEXT,
  type DeliveryAddress,
  type PaymentMethod,
  type Quote,
} from "../lib/checkout";
import { tx, type Lang } from "../lib/i18n";

interface Props {
  lang: Lang;
  /**
   * Buy exactly this, ignoring the basket — the express path from a product
   * page. Omitted means "check out the basket".
   */
  slug?: string;
}

const TX = {
  de: {
    heading: "Bestellung abschließen",
    summary: "Ihre Bestellung",
    net: "Netto",
    vat: "zzgl. USt",
    shipping: "Versand",
    shippingFree: "kostenlos",
    total: "Gesamt",
    email: "E-Mail-Adresse",
    emailHint: "An diese Adresse geht die Bestellbestätigung.",
    name: "Name (optional)",
    country: "Land",
    payment: "Zahlungsart",
    noPayment: "Zurzeit ist keine Zahlungsart verfügbar. Bitte später erneut versuchen.",
    address: "Lieferanschrift",
    shipName: "Name",
    shipLine1: "Straße und Hausnummer",
    shipLine2: "Adresszusatz (optional)",
    shipPostcode: "Postleitzahl",
    shipCity: "Ort",
    deliveryDigital: "Sofortige Erbringung nach Zahlung. Kein Versand.",
    deliveryGoods: "Lieferung innerhalb Deutschlands.",
    deliveryMixed: "Leistungen sofort nach Zahlung, Waren per Versand.",
    submit: "Zahlungspflichtig bestellen",
    working: "Wird vorbereitet …",
    loading: "Ihre Bestellung wird geladen …",
    consentLabel: "Ich stimme zu und bestätige:",
    withdrawalInfo: "Widerrufsrecht:",
    onlyGermany: "Wir liefern derzeit nur nach Deutschland.",
    emptyCart: "Ihr Warenkorb ist leer.",
    gone: "Mindestens ein Artikel ist nicht mehr verfügbar.",
  },
  en: {
    heading: "Complete your order",
    summary: "Your order",
    net: "Net",
    vat: "plus VAT",
    shipping: "Delivery",
    shippingFree: "free",
    total: "Total",
    email: "Email address",
    emailHint: "The order confirmation goes to this address.",
    name: "Name (optional)",
    country: "Country",
    payment: "Payment method",
    noPayment: "No payment method is available right now. Please try again later.",
    address: "Delivery address",
    shipName: "Name",
    shipLine1: "Street and number",
    shipLine2: "Additional address line (optional)",
    shipPostcode: "Postcode",
    shipCity: "Town",
    deliveryDigital: "Performed immediately after payment. Nothing is shipped.",
    deliveryGoods: "Delivered within Germany.",
    deliveryMixed: "Services immediately after payment, goods by post.",
    submit: "Order with obligation to pay",
    working: "Preparing …",
    loading: "Loading your order …",
    consentLabel: "I agree and confirm:",
    withdrawalInfo: "Right of withdrawal:",
    onlyGermany: "We currently deliver to Germany only.",
    emptyCart: "Your basket is empty.",
    gone: "At least one item is no longer available.",
  },
} as const;

/**
 * The order form — and specifically, the place the legally required
 * declarations are made.
 *
 * ### Why this page exists at all, rather than a link to the provider
 *
 * § 312j Abs. 3 BGB requires an order button labelled "Zahlungspflichtig
 * bestellen" with the mandatory details — what is being bought, the total, the
 * VAT, delivery — immediately above it. A provider's hosted button says
 * "Bezahlen" and its page is not ours to relabel. So the declaration happens
 * here, and the provider is only the payment step that follows.
 *
 * ### Why the button is absent rather than merely disabled while loading
 *
 * A basket lives in the visitor's browser, so the server cannot render its
 * details — they are fetched. Until they arrive there is nothing above the
 * button to satisfy § 312j Abs. 2, and a button with no price beside it is
 * precisely what that provision exists to prevent. So it is not rendered at
 * all.
 *
 * The express path (a `slug` from a product page) fetches too, even though the
 * page could have server-rendered that one product's figures. Server rendering
 * would buy nothing here: this is a React island, so without a script there is
 * no working button either way — and a second place computing a total is a
 * second place for it to disagree with what is charged. One source, always.
 *
 * ### Two rights of withdrawal, and only one of them is agreed to
 *
 * The server decides which regime applies from what is actually in the basket
 * and says so on the quote. For a basket of goods there is **no checkbox**: the
 * fourteen-day right is not the customer's to give up, so a tick for it would
 * be a consent with no object, and the block is shown as INFORMATION instead
 * (Art. 246a § 1 Abs. 2 EGBGB). For anything containing a service the checkbox
 * is a precondition — not pre-ticked, the button stays disabled without it, and
 * the server refuses the order too. The browser check is a courtesy; the server
 * check is the rule.
 *
 * Whatever wording is displayed travels with the request, so the order records
 * the sentence the customer actually read.
 */
export default function CheckoutForm({ lang, slug }: Props) {
  const t = TX[lang];
  const cartTx = tx(lang).cart;

  const [lines, setLines] = useState<CartLine[] | null>(slug ? [{ slug, quantity: 1 }] : null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [methods, setMethods] = useState<PaymentMethod[] | null>(null);
  const [provider, setProvider] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("DE");
  const [address, setAddress] = useState<DeliveryAddress>({
    shipName: "",
    shipLine1: "",
    shipLine2: "",
    shipPostcode: "",
    shipCity: "",
    shipCountry: "DE",
  });
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!slug) setLines(readCart());
  }, [slug]);

  useEffect(() => {
    if (lines === null || lines.length === 0) return;
    void quoteCart(lines, lang).then((result) => {
      if ("error" in result) {
        setQuote(null);
        setError(result.error === "empty" ? null : t.gone);
      } else {
        setQuote(result);
      }
    });
  }, [lines, lang, t.gone]);

  useEffect(() => {
    void paymentMethods().then((found) => {
      setMethods(found);
      setProvider((current) => current || found[0]?.id || "");
    });
  }, []);

  /**
   * Move focus to the error.
   *
   * `role="alert"` announces the text but does not move the caret, so a
   * keyboard user is left wherever they pressed the button — usually below the
   * message they now have to act on.
   */
  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!quote) return;
    setError(null);
    setBusy(true);

    const result = await startCheckout({
      items: lines ?? [],
      lang,
      email,
      name,
      country,
      regime: quote.withdrawalRegime,
      withdrawalConsent: consent,
      provider: provider || undefined,
      address: quote.addressRequired ? address : null,
    });

    if (result.url) {
      // Emptied at handoff, not on return: the order row already holds its own
      // frozen copy of every line, and a basket still full when the customer
      // comes back offers them a second identical order.
      if (!slug) clearCart();
      window.location.href = result.url;
      return;
    }
    setBusy(false);
    setError(result.error ?? "Unbekannter Fehler.");
  };

  if (lines !== null && lines.length === 0) {
    return <p className="shop-lede">{t.emptyCart}</p>;
  }

  if (!quote) {
    return (
      <p className="shop-lede" role="status">
        {error ?? t.loading}
      </p>
    );
  }

  const currency = quote.currency;
  const consentRequired = quote.withdrawalConsentRequired;
  const withdrawalText = WITHDRAWAL_TEXT[lang][quote.withdrawalRegime];
  const deliveryNote =
    quote.withdrawalRegime === "goods"
      ? t.deliveryGoods
      : quote.withdrawalRegime === "mixed"
        ? t.deliveryMixed
        : t.deliveryDigital;

  return (
    <form className="checkout" onSubmit={submit}>
      <h2>{t.heading}</h2>

      {/* The mandatory details, immediately above the button — that adjacency
          is the requirement, not a layout preference. */}
      <section className="checkout__summary" aria-label={t.summary}>
        <ul className="checkout__items">
          {quote.lines.map((line) => (
            <li className="checkout__item" key={line.slug}>
              {line.quantity > 1 ? `${line.quantity} × ` : ""}
              {line.title}
              <span className="checkout__item-price">
                {formatPrice(line.grossCents, currency, lang)}
              </span>
            </li>
          ))}
        </ul>
        <dl>
          <div>
            <dt>{t.net}</dt>
            <dd>{formatPrice(quote.netCents, currency, lang)}</dd>
          </div>
          <div>
            <dt>{t.vat}</dt>
            <dd>{formatPrice(quote.taxCents, currency, lang)}</dd>
          </div>
          {quote.shipping.required ? (
            <div>
              <dt>{t.shipping}</dt>
              <dd>
                {quote.shipping.grossCents === 0
                  ? t.shippingFree
                  : formatPrice(quote.shipping.grossCents, currency, lang)}
              </dd>
            </div>
          ) : null}
          <div className="checkout__total">
            <dt>{t.total}</dt>
            <dd>{formatPrice(quote.grossCents, currency, lang)}</dd>
          </div>
        </dl>
        <p className="checkout__delivery">{deliveryNote}</p>
      </section>

      <label>
        {t.email}
        <input
          className="field-boxed"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small>{t.emailHint}</small>
      </label>

      <label>
        {t.name}
        <input
          className="field-boxed"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        {t.country}
        <select className="field-boxed" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="DE">Deutschland</option>
        </select>
        <small>{t.onlyGermany}</small>
      </label>

      {/* Only asked when there is something to deliver. A basket of services
          has no address to collect, and collecting one anyway is personal data
          gathered for no purpose (Art. 5 Abs. 1 lit. c DSGVO). */}
      {quote.addressRequired ? (
        <fieldset className="checkout__address">
          <legend>{t.address}</legend>
          <label>
            {t.shipName}
            <input
              className="field-boxed"
              required
              autoComplete="shipping name"
              value={address.shipName}
              onChange={(e) => setAddress({ ...address, shipName: e.target.value })}
            />
          </label>
          <label>
            {t.shipLine1}
            <input
              className="field-boxed"
              required
              autoComplete="shipping address-line1"
              value={address.shipLine1}
              onChange={(e) => setAddress({ ...address, shipLine1: e.target.value })}
            />
          </label>
          <label>
            {t.shipLine2}
            <input
              className="field-boxed"
              autoComplete="shipping address-line2"
              value={address.shipLine2 ?? ""}
              onChange={(e) => setAddress({ ...address, shipLine2: e.target.value })}
            />
          </label>
          <label>
            {t.shipPostcode}
            <input
              className="field-boxed"
              required
              inputMode="numeric"
              autoComplete="shipping postal-code"
              value={address.shipPostcode}
              onChange={(e) => setAddress({ ...address, shipPostcode: e.target.value })}
            />
          </label>
          <label>
            {t.shipCity}
            <input
              className="field-boxed"
              required
              autoComplete="shipping address-level2"
              value={address.shipCity}
              onChange={(e) => setAddress({ ...address, shipCity: e.target.value })}
            />
          </label>
        </fieldset>
      ) : null}

      {/* Rendered from what the server says it can complete. Wero is registered
          but unconfigured, so it simply is not here — a method that cannot
          finish must never be selectable. */}
      <fieldset className="checkout__payment">
        <legend>{t.payment}</legend>
        {methods === null ? (
          <p role="status">{cartTx.loading}</p>
        ) : methods.length === 0 ? (
          <p className="checkout__error">{t.noPayment}</p>
        ) : (
          methods.map((method) => (
            <label className="checkout__method" key={method.id}>
              <input
                type="radio"
                name="provider"
                value={method.id}
                checked={provider === method.id}
                onChange={() => setProvider(method.id)}
              />
              <span>{method.label}</span>
            </label>
          ))
        )}
      </fieldset>

      {consentRequired ? (
        <label className="checkout__consent">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          <span>
            <strong>{t.consentLabel}</strong> {withdrawalText}
          </span>
        </label>
      ) : (
        /* No checkbox. The right is not the customer's to give up, so this is
           the information Art. 246a § 1 Abs. 2 EGBGB requires before the
           order — not something to agree to. */
        <p className="checkout__withdrawal-info">
          <strong>{t.withdrawalInfo}</strong> {withdrawalText}
        </p>
      )}

      {error ? (
        <p className="checkout__error" role="alert" tabIndex={-1} ref={errorRef}>
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={busy || (consentRequired && !consent) || !provider}
        aria-busy={busy}
      >
        {busy ? t.working : t.submit}
      </button>
    </form>
  );
}

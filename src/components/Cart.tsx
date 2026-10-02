import { useCallback, useEffect, useRef, useState } from "react";

import { MAX_QUANTITY, onCartChange, readCart, removeFromCart, setQuantity, type CartLine } from "../lib/cart";
import { formatPrice } from "../lib/checkout";
import { homePath, tx, type Lang } from "../lib/i18n";
import ShippingRow from "./ShippingRow";
import { useQuote } from "./useQuote";

interface Props {
  lang: Lang;
  /** Where "Zur Kasse" goes. Passed in so the page owns its own routing. */
  checkoutHref: string;
}

/**
 * The basket page.
 *
 * ### Every number on this page comes from the server
 *
 * The basket in `localStorage` holds slugs and quantities and nothing else, so
 * there is no price here to be stale and none to add up in the browser. Each
 * change re-quotes. That costs a round trip per keystroke on the quantity
 * stepper — which is why the quote is debounced — and buys the property that
 * matters: the total shown here is produced by the same code that will charge
 * it, so the two cannot disagree.
 *
 * ### Announcing changes
 *
 * A quantity stepper and a remove button change content elsewhere on the page
 * (the line total, the basket total, the delivery charge). Sighted users see
 * all three move; without a live region a screen-reader user presses "remove"
 * and hears nothing at all. The region is `polite` and carries a sentence, not
 * a number.
 */
export default function Cart({ lang, checkoutHref }: Props) {
  const t = tx(lang).cart;
  const [lines, setLines] = useState<CartLine[] | null>(null);
  // Debounced: each quantity keystroke re-quotes.
  const { quote, error, settled } = useQuote(lines, lang, 250);
  const [announcement, setAnnouncement] = useState("");
  /** The row currently animating out. Removed from storage once it has. */
  const [leaving, setLeaving] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    },
    [],
  );

  /**
   * Remove a line, after letting it leave.
   *
   * The storage write is DEFERRED, not the animation: removing the row first
   * and animating a copy of it would mean keeping a copy, and a basket with a
   * ghost row in it is a worse bug than an abrupt removal. 180ms matches
   * `--tds-dur-fast`; a reader with reduced motion simply sees it go, because
   * base.css has already clamped the transition to nothing.
   */
  const removeWithExit = useCallback((slug: string, title: string) => {
    setLeaving(slug);
    setAnnouncement(t.removed(title));
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      removeFromCart(slug);
      setLeaving(null);
    }, 180);
  }, [t]);

  useEffect(() => {
    setLines(readCart());
    return onCartChange(setLines);
  }, []);

  // Nothing until the basket has been read — see the note in AddToCart.
  if (lines === null) return null;

  if (lines.length === 0) {
    return (
      <div className="cart cart--empty">
        <p className="shop-lede">{t.empty}</p>
        <p>{t.emptyBody}</p>
        <a className="btn btn-primary" href={homePath(lang)}>
          {t.keepShopping}
        </a>
      </div>
    );
  }

  const currency = quote?.currency ?? "EUR";
  const titleFor = (slug: string) => quote?.lines.find((l) => l.slug === slug)?.title ?? slug;

  return (
    <div className="cart">
      <ul className="cart__lines">
        {lines.map((line) => {
          const priced = quote?.lines.find((l) => l.slug === line.slug);
          return (
            <li className="cart__line" key={line.slug} data-leaving={leaving === line.slug ? "true" : undefined}>
              <span className="cart__title">{priced?.title ?? line.slug}</span>

              <label className="cart__qty">
                <span className="sr-only">{`${t.quantity}: ${priced?.title ?? line.slug}`}</span>
                <QuantityInput
                  value={line.quantity}
                  onCommit={(n) => {
                    setQuantity(line.slug, n);
                    setAnnouncement(t.updated(titleFor(line.slug), n));
                  }}
                />
              </label>

              <span className="cart__price">
                {priced ? formatPrice(priced.grossCents, currency, lang) : "—"}
              </span>

              <button
                type="button"
                className="btn btn-ghost cart__remove"
                onClick={() => removeWithExit(line.slug, titleFor(line.slug))}
              >
                {t.remove}
              </button>
            </li>
          );
        })}
      </ul>

      {error ? (
        <p className="checkout__error" role="alert">
          {error}
        </p>
      ) : null}

      <dl className="cart__totals">
        <div>
          <dt>{t.subtotal}</dt>
          <dd>
            {quote
              ? formatPrice(quote.grossCents - quote.shipping.grossCents, currency, lang)
              : t.loading}
          </dd>
        </div>

        {quote ? <ShippingRow quote={quote} lang={lang} /> : null}

        <div className="cart__total">
          <dt>{t.total}</dt>
          {/* Keyed on the value so the highlight replays when it changes. The
              total updates after a debounced round trip, by which time the
              reader is looking at the row they just edited — without this they
              never see the number move. */}
          <dd key={settled} data-changed={settled > 1 ? "true" : undefined}>
            {quote ? formatPrice(quote.grossCents, currency, lang) : t.loading}
          </dd>
        </div>
      </dl>

      {/* The delivery note. For a basket with nothing to ship this says so,
          rather than leaving a reader to wonder what the postage will be. */}
      <p className="cart__note">
        {quote?.shipping.required
          ? quote.shipping.freeFromCents > 0 && quote.shipping.grossCents > 0
            ? t.shippingFrom(formatPrice(quote.shipping.freeFromCents, currency, lang))
            : ""
          : t.digitalOnly}
      </p>

      <div className="cart__actions">
        <a className="btn btn-ghost" href={homePath(lang)}>
          {t.keepShopping}
        </a>
        {/* Disabled until there is a quote: the next page's mandatory details
            are built from it, and sending someone to a checkout that cannot
            state a price is the failure § 312j Abs. 2 BGB is about. */}
        <a
          className="btn btn-primary"
          href={checkoutHref}
          aria-disabled={quote === null ? "true" : undefined}
          onClick={(e) => {
            if (quote === null) e.preventDefault();
          }}
        >
          {t.toCheckout}
        </a>
      </div>

      <p className="sr-only" role="status">
        {announcement}
      </p>
    </div>
  );
}

/**
 * The quantity field.
 *
 * It keeps its own draft, because the stored quantity cannot represent what a
 * reader is in the middle of typing. Bound directly to the basket, clearing the
 * field to type a new number read as `Number("") === 0` — and a quantity of 0
 * removes the line, so the product vanished on the first keystroke. Only a
 * whole number of at least 1 is committed (capped at `MAX_QUANTITY`); leaving
 * the field restores whatever is stored.
 */
function QuantityInput({ value, onCommit }: { value: number; onCommit: (n: number) => void }) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);

  return (
    <input
      className="field-boxed"
      type="number"
      min={1}
      max={MAX_QUANTITY}
      inputMode="numeric"
      value={draft}
      onChange={(e) => {
        const raw = e.target.value;
        setDraft(raw);
        const n = Number(raw);
        if (raw.trim() !== "" && Number.isInteger(n) && n >= 1) onCommit(Math.min(MAX_QUANTITY, n));
      }}
      onBlur={() => setDraft(String(value))}
    />
  );
}

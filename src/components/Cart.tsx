import { useCallback, useEffect, useRef, useState } from "react";

import { onCartChange, readCart, removeFromCart, setQuantity, type CartLine } from "../lib/cart";
import { formatPrice, quoteCart, type Quote } from "../lib/checkout";
import { homePath, tx, type Lang } from "../lib/i18n";

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
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLines(readCart());
    return onCartChange(setLines);
  }, []);

  /**
   * Re-price, debounced.
   *
   * Holding the OLD quote on screen while the new one is in flight is
   * deliberate: blanking the totals on every keypress makes the page flicker
   * and, worse, briefly removes the figures the checkout button sits next to.
   */
  const reprice = useCallback(
    (next: CartLine[]) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        void quoteCart(next, lang).then((result) => {
          if ("error" in result) {
            setQuote(null);
            setError(result.error === "empty" ? null : t.gone);
          } else {
            setQuote(result);
            setError(null);
          }
        });
      }, 250);
    },
    [lang, t.gone],
  );

  useEffect(() => {
    if (lines === null) return;
    if (lines.length === 0) {
      setQuote(null);
      setError(null);
      return;
    }
    reprice(lines);
  }, [lines, reprice]);

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
            <li className="cart__line" key={line.slug}>
              <span className="cart__title">{priced?.title ?? line.slug}</span>

              <label className="cart__qty">
                <span className="sr-only">{`${t.quantity}: ${priced?.title ?? line.slug}`}</span>
                <input
                  className="field-boxed"
                  type="number"
                  min={1}
                  max={99}
                  inputMode="numeric"
                  value={line.quantity}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (!Number.isFinite(n)) return;
                    setQuantity(line.slug, n);
                    setAnnouncement(t.updated(titleFor(line.slug), Math.max(1, Math.min(99, n))));
                  }}
                />
              </label>

              <span className="cart__price">
                {priced ? formatPrice(priced.grossCents, currency, lang) : "—"}
              </span>

              <button
                type="button"
                className="btn btn-ghost cart__remove"
                onClick={() => {
                  setAnnouncement(t.removed(titleFor(line.slug)));
                  removeFromCart(line.slug);
                }}
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

        {quote?.shipping.required ? (
          <div>
            <dt>{t.shipping}</dt>
            <dd>
              {quote.shipping.grossCents === 0
                ? t.shippingFree
                : formatPrice(quote.shipping.grossCents, currency, lang)}
            </dd>
          </div>
        ) : null}

        <div className="cart__total">
          <dt>{tx(lang).cart.title}</dt>
          <dd>{quote ? formatPrice(quote.grossCents, currency, lang) : t.loading}</dd>
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

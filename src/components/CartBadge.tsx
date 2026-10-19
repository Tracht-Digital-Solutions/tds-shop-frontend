import { useEffect, useMemo, useRef, useState } from "react";

import { CART_ADDED_EVENT, cartCount, cartPath, checkoutPath, onCartChange, readCart, type CartLine } from "../lib/cart";
import { formatPrice } from "../lib/checkout";
import { tx, type Lang } from "../lib/i18n";
import { useQuote } from "./useQuote";

interface Props {
  lang: Lang;
}

/** How long the peek stays open after something was added, unless hovered. */
const PEEK_AFTER_ADD_MS = 3200;
/** Grace period before a hover-opened peek closes, so the pointer can cross the gap. */
const CLOSE_DELAY_MS = 180;

/**
 * The basket in the header: a basket icon with the item count, on every page.
 *
 * The icon is always there — a reader should know where the basket is before
 * putting anything in it — and the count appears once there is something to
 * count. The count is written into the link's accessible name rather than left
 * as a bare number: "3" announced on its own says nothing about three of what.
 *
 * Hovering or focusing it opens a small peek of what is inside: titles,
 * quantities, the total and both ways on (basket page, checkout). The peek
 * also opens by itself for a moment after a product was added, which is the
 * "go straight to the checkout" offer at the moment it is wanted. Prices come
 * from the same `POST /shop/quote` the basket page uses, and only while the
 * peek is open — the basket stores slugs, never prices (see `lib/cart.ts`).
 * On a touch screen there is no hover: a tap follows the link to the basket.
 */
export default function CartBadge({ lang }: Props) {
  const t = tx(lang).cart;
  const [lines, setLines] = useState<CartLine[] | null>(null);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines(readCart());
    return onCartChange((next) => setLines([...next]));
  }, []);

  const clearClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const closeLater = (ms: number) => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), ms);
  };

  // A product was just added somewhere on the page: show it in the peek.
  useEffect(() => {
    const onAdded = () => {
      setOpen(true);
      closeLater(PEEK_AFTER_ADD_MS);
    };
    window.addEventListener(CART_ADDED_EVENT, onAdded);
    return () => {
      window.removeEventListener(CART_ADDED_EVENT, onAdded);
      clearClose();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Priced only while open. A stable reference while closed, so the quote
  // loop does not run for a peek nobody is looking at.
  const quoted = useMemo(() => (open ? lines : null), [open, lines]);
  const { quote, error } = useQuote(quoted, lang, 120);

  const count = lines === null ? null : cartCount(lines);
  const label = count ? t.badge(count) : t.title;

  return (
    <div
      ref={root}
      className="shop-cart"
      data-open={open ? "true" : undefined}
      onMouseEnter={() => {
        clearClose();
        setOpen(true);
      }}
      onMouseLeave={() => closeLater(CLOSE_DELAY_MS)}
      onFocus={() => {
        clearClose();
        setOpen(true);
      }}
      onBlur={(event) => {
        if (!root.current?.contains(event.relatedTarget as Node | null)) closeLater(0);
      }}
    >
      <a className="shop-header__cart" href={cartPath(lang)} aria-label={label} data-cart-target>
        <svg
          className="shop-header__cart-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 9h18l-1.6 9.2a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8L3 9Z" />
          <path d="m8 9 3-5M16 9l-3-5M9 13v3M15 13v3M12 13v3" />
        </svg>
        {/* `key` on the value, so React REMOUNTS this span whenever the count
            changes and the CSS animation plays again. */}
        {count ? (
          <span className="shop-header__cart-count" aria-hidden="true" key={count}>
            {count}
          </span>
        ) : null}
      </a>

      <div className="shop-cart__peek" hidden={!open} aria-label={t.title} role="region">
        {count === null || count === 0 ? (
          <p className="shop-cart__empty">{t.empty}</p>
        ) : (
          <>
            <p className="shop-cart__head">{t.badge(count)}</p>
            {quote ? (
              <ul className="shop-cart__lines">
                {quote.lines.map((line) => (
                  <li className="shop-cart__line" key={line.slug}>
                    <span className="shop-cart__title">{line.title}</span>
                    <span className="shop-cart__qty">× {line.quantity}</span>
                    <span className="shop-cart__price">{formatPrice(line.grossCents, quote.currency, lang)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="shop-cart__note">{error ?? t.loading}</p>
            )}
            {quote ? (
              <p className="shop-cart__total">
                <span>{t.total}</span>
                <span>{formatPrice(quote.grossCents, quote.currency, lang)}</span>
              </p>
            ) : null}
            <div className="shop-cart__actions">
              <a className="btn btn-ghost" href={cartPath(lang)}>
                {t.view}
              </a>
              <a className="btn btn-primary" href={checkoutPath(lang)}>
                {t.toCheckout}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

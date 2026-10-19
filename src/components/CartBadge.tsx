import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import {
  CART_ADDED_EVENT,
  MAX_QUANTITY,
  cartCount,
  cartPath,
  checkoutPath,
  onCartChange,
  readCart,
  removeFromCart,
  setQuantity,
  type CartLine,
} from "../lib/cart";
import { formatPrice } from "../lib/checkout";
import { homePath, tx, type Lang } from "../lib/i18n";
import { useQuote } from "./useQuote";

interface Props {
  lang: Lang;
}

/** How long the peek stays open after something was added, unless hovered. */
const PEEK_AFTER_ADD_MS = 3600;
/** Grace period before a hover-opened peek closes, so the pointer can cross the gap. */
const CLOSE_DELAY_MS = 220;
/** How long a just-added line keeps its highlight. */
const FRESH_MS = 2400;

/**
 * The basket in the header: a basket icon with the item count, on every page.
 *
 * The icon is always there — a reader should know where the basket is before
 * putting anything in it — and the count appears once there is something to
 * count. The count is written into the link's accessible name rather than left
 * as a bare number: "3" announced on its own says nothing about three of what.
 *
 * Hovering or focusing it opens the mini basket (2026-10-19, reworked): it
 * unfolds from the icon, lines arrive one after another, and each line can be
 * changed right there — a stepper and a remove button — so a reader does not
 * have to leave the page to correct a quantity. The line that was just added
 * is highlighted and says so; the total pops when it changes. It also opens by
 * itself for a moment after a product was added, which is the "go straight to
 * the checkout" offer at the moment it is wanted.
 *
 * Prices come from the same `POST /shop/quote` the basket page uses, and only
 * while the peek is open — the basket stores slugs, never prices (see
 * `lib/cart.ts`). On a touch screen there is no hover: a tap follows the link
 * to the basket.
 */
export default function CartBadge({ lang }: Props) {
  const t = tx(lang).cart;
  const [lines, setLines] = useState<CartLine[] | null>(null);
  const [open, setOpen] = useState(false);
  const [fresh, setFresh] = useState<string | null>(null);
  const [said, setSaid] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const freshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const peek = useRef<HTMLDivElement>(null);

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
    const onAdded = (event: Event) => {
      const slug = (event as CustomEvent<{ slug?: string }>).detail?.slug ?? null;
      setFresh(slug);
      if (freshTimer.current) clearTimeout(freshTimer.current);
      freshTimer.current = setTimeout(() => setFresh(null), FRESH_MS);
      setOpen(true);
      closeLater(PEEK_AFTER_ADD_MS);
    };
    window.addEventListener(CART_ADDED_EVENT, onAdded);
    return () => {
      window.removeEventListener(CART_ADDED_EVENT, onAdded);
      clearClose();
      if (freshTimer.current) clearTimeout(freshTimer.current);
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
  const { quote, error, settled } = useQuote(quoted, lang, 120);

  const count = lines === null ? null : cartCount(lines);
  const label = count ? t.badge(count) : t.title;

  /** Change a line in place. Focus stays inside the peek, so it does not close. */
  const change = (slug: string, title: string, quantity: number) => {
    clearClose();
    if (quantity <= 0) {
      removeFromCart(slug);
      setSaid(t.removed(title));
      peek.current?.focus({ preventScroll: true });
      return;
    }
    setQuantity(slug, quantity);
    setSaid(t.updated(title, Math.min(quantity, MAX_QUANTITY)));
  };

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

      <div
        ref={peek}
        className="shop-cart__peek"
        hidden={!open}
        aria-label={t.title}
        role="region"
        tabIndex={-1}
      >
        <p className="sr-only" role="status">
          {said}
        </p>
        {count === null || count === 0 ? (
          <div className="shop-cart__empty">
            <span className="shop-cart__empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9h18l-1.6 9.2a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8L3 9Z" />
                <path d="m8 9 3-5M16 9l-3-5" />
              </svg>
            </span>
            <p className="shop-cart__empty-title">{t.empty}</p>
            <p className="shop-cart__note">{t.emptyBody}</p>
            <a className="btn btn-ghost shop-cart__browse" href={homePath(lang)}>
              {t.keepShopping}
            </a>
          </div>
        ) : (
          <>
            <p className="shop-cart__head">
              <span>{t.title}</span>
              <span className="shop-cart__head-count">{t.badge(count)}</span>
            </p>
            {quote ? (
              <ul className="shop-cart__lines">
                {quote.lines.map((line, index) => (
                  <li
                    className="shop-cart__line"
                    key={line.slug}
                    data-fresh={fresh === line.slug ? "true" : undefined}
                    style={{ "--i": index } as CSSProperties}
                  >
                    <span className="shop-cart__title">
                      {line.title}
                      {fresh === line.slug ? <span className="shop-cart__fresh">{t.justAdded}</span> : null}
                    </span>
                    <span className="shop-cart__price">{formatPrice(line.grossCents, quote.currency, lang)}</span>
                    <span className="shop-cart__controls">
                      <span className="shop-cart__stepper" role="group" aria-label={`${t.quantity}: ${line.title}`}>
                        <button
                          type="button"
                          className="btn btn-ghost shop-cart__step"
                          aria-label={line.quantity === 1 ? `${t.remove}: ${line.title}` : `${t.quantity} −1`}
                          onClick={() => change(line.slug, line.title, line.quantity - 1)}
                        >
                          <span aria-hidden="true">−</span>
                        </button>
                        <span className="shop-cart__qty" aria-live="off" key={line.quantity}>
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="btn btn-ghost shop-cart__step"
                          aria-label={`${t.quantity} +1`}
                          disabled={line.quantity >= MAX_QUANTITY}
                          onClick={() => change(line.slug, line.title, line.quantity + 1)}
                        >
                          <span aria-hidden="true">+</span>
                        </button>
                      </span>
                      <button
                        type="button"
                        className="btn btn-ghost shop-cart__remove"
                        aria-label={`${t.remove}: ${line.title}`}
                        onClick={() => change(line.slug, line.title, 0)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
                        </svg>
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="shop-cart__note shop-cart__note--wait">{error ?? t.loading}</p>
            )}
            {quote ? (
              <p className="shop-cart__total">
                <span>{t.total}</span>
                {/* `key` on the settle counter: the figure pops on every new quote. */}
                <span className="shop-cart__sum" key={settled}>
                  {formatPrice(quote.grossCents, quote.currency, lang)}
                </span>
              </p>
            ) : null}
            <div className="shop-cart__actions">
              <a className="btn btn-ghost" href={cartPath(lang)}>
                {t.view}
              </a>
              <a className="btn btn-primary shop-cart__checkout" href={checkoutPath(lang)}>
                {t.toCheckout}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

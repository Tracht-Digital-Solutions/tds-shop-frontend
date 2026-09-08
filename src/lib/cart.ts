import type { Lang } from "./i18n";

/**
 * The basket, in the visitor's own browser.
 *
 * ### What it stores, and what it deliberately does not
 *
 * Slugs and quantities. **No prices, no titles, no totals.** Every one of those
 * comes back from `POST /shop/quote` on each render, which has three
 * consequences worth having:
 *
 *  - A basket cannot carry a stale price. Leave a tab open over a price change
 *    and the next quote is simply the new one — there is no old number stored
 *    anywhere to disagree with the checkout.
 *  - A product that goes out of print, gets unpublished, or loses its offer
 *    fails the quote rather than sitting in the basket looking buyable.
 *  - The number the customer sees and the number they are charged are computed
 *    by the same server code, because the browser never computes one.
 *
 * ### Why there is no cart cookie and no cart table
 *
 * A basket in `localStorage` is storage the visitor asked for by putting
 * something in it — technically necessary under § 25 Abs. 2 Nr. 2 TDDDG, so it
 * needs no consent and appears in no banner. A server-side basket would need a
 * session cookie, which would need a consent question for a feature nobody
 * asked to be asked about. A guest checkout has no account to hang it on
 * anyway.
 *
 * Everything here is SSR-safe: the module is imported by islands that render on
 * the server first, and `localStorage` does not exist there.
 */

export const CART_KEY = "tds-shop-cart";

/** Fired on every change, so a badge in the header and a page body agree. */
export const CART_EVENT = "tds:cart-change";

/** Per line. 99 is also enforced on the server — an unbounded quantity is an unbounded charge. */
export const MAX_QUANTITY = 99;

export interface CartLine {
  slug: string;
  quantity: number;
}

/**
 * Read the basket.
 *
 * Anything unparseable reads as empty rather than throwing. A corrupt key
 * should cost someone their basket, not the ability to load the shop — and
 * `localStorage` itself throws in a private window on some browsers.
 */
export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CART_KEY);
  } catch {
    return [];
  }
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry): CartLine[] => {
      if (typeof entry !== "object" || entry === null) return [];
      const { slug, quantity } = entry as Record<string, unknown>;
      if (typeof slug !== "string" || slug === "") return [];
      return [{ slug, quantity: clamp(typeof quantity === "number" ? quantity : 1) }];
    });
  } catch {
    return [];
  }
}

function clamp(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(MAX_QUANTITY, Math.floor(n)));
}

function write(lines: CartLine[]): CartLine[] {
  if (typeof window === "undefined") return lines;
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  } catch {
    /* private mode — the basket lives for this page view only */
  }
  try {
    window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: lines }));
  } catch {
    /* ignore */
  }
  return lines;
}

/**
 * Add to the basket, or raise the quantity of a line already in it.
 *
 * Merging rather than appending: two rows for one product invite the question
 * of whether it was charged twice, and the server merges them anyway.
 */
export function addToCart(slug: string, quantity = 1): CartLine[] {
  const lines = readCart();
  const existing = lines.find((l) => l.slug === slug);
  if (existing) {
    existing.quantity = clamp(existing.quantity + quantity);
  } else {
    lines.push({ slug, quantity: clamp(quantity) });
  }
  return write(lines);
}

/** Set an exact quantity. Zero or less removes the line — that is what a stepper at 0 means. */
export function setQuantity(slug: string, quantity: number): CartLine[] {
  if (quantity <= 0) return removeFromCart(slug);
  const lines = readCart().map((l) => (l.slug === slug ? { ...l, quantity: clamp(quantity) } : l));
  return write(lines);
}

export function removeFromCart(slug: string): CartLine[] {
  return write(readCart().filter((l) => l.slug !== slug));
}

/**
 * Empty the basket.
 *
 * Called after a successful handoff to the payment provider — not on return,
 * and not on the order page. By the time the customer is at the provider the
 * order row exists with its own frozen copy of every line, so the basket has
 * done its job; leaving it full would offer a second identical order to
 * somebody who just placed one.
 */
export function clearCart(): CartLine[] {
  return write([]);
}

/** Total item count, for a header badge. */
export function cartCount(lines: CartLine[] = readCart()): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}

/**
 * Subscribe to changes.
 *
 * Listens for both the in-page event and the browser's own `storage` event, so
 * a basket changed in a second tab is reflected here. Returns an unsubscribe.
 */
export function onCartChange(fn: (lines: CartLine[]) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const local = (e: Event) => fn((e as CustomEvent<CartLine[]>).detail ?? readCart());
  const cross = (e: StorageEvent) => {
    if (e.key === null || e.key === CART_KEY) fn(readCart());
  };
  window.addEventListener(CART_EVENT, local);
  window.addEventListener("storage", cross);
  return () => {
    window.removeEventListener(CART_EVENT, local);
    window.removeEventListener("storage", cross);
  };
}

/** `/warenkorb` / `/en/cart`. Reserved in robots.txt and the no-cache list already. */
export const cartPath = (lang: Lang): string => (lang === "en" ? "/en/cart" : "/warenkorb");

import { useEffect, useRef, useState } from "react";

import { addToCart, cartPath, onCartChange, readCart } from "../lib/cart";
import { tx, type Lang } from "../lib/i18n";

interface Props {
  slug: string;
  lang: Lang;
  /**
   * `secondary` beside a direct-buy button. On a product page the offer card
   * already carries "Kaufen" (straight to the one-product checkout) as the
   * filled button; a second filled button for the same product asks the reader
   * to choose between two equals.
   */
  variant?: "primary" | "secondary";
}

/**
 * The add-to-basket button on a product page.
 *
 * Renders nothing on the server and nothing until the mount effect has read the
 * basket. That is not a hydration workaround: whether this product is already
 * in the basket changes the button's label, and a button that says "Add" for a
 * frame and then "In your basket" is a flicker on the one control the page
 * exists for.
 *
 * After adding, it does NOT navigate. Someone browsing a catalogue usually
 * wants the next product, not the checkout — the header badge and the live
 * region say what happened, and the basket link is one press away.
 */
export default function AddToCart({ slug, lang, variant = "primary" }: Props) {
  const t = tx(lang).cart;
  const [inCart, setInCart] = useState<number | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleared on unmount: a timer that fires after the island is gone sets state
  // on nothing, and React says so in the console every time.
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    const count = () => {
      const line = readCart().find((l) => l.slug === slug);
      setInCart(line ? line.quantity : 0);
    };
    count();
    return onCartChange(count);
  }, [slug]);

  if (inCart === null) return null;

  return (
    <div className="add-to-cart">
      {/* The label changes for a beat rather than the button growing a
          spinner: nothing is loading — the basket is local and the write is
          instantaneous — so the only open question is "did that register?",
          and a word answers it better than a movement. */}
      <button
        type="button"
        className={variant === "secondary" ? "btn btn-ghost" : "btn btn-primary"}
        onClick={() => {
          addToCart(slug, 1);
          setJustAdded(true);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setJustAdded(false), 1200);
        }}
      >
        {justAdded ? t.justAdded : t.add}
      </button>
      {inCart > 0 ? (
        <a className="add-to-cart__link" href={cartPath(lang)}>
          {t.added} ({inCart})
        </a>
      ) : null}
      {/* Polite, not assertive: adding to a basket is a confirmation, not an
          interruption, and an assertive region would cut off whatever the
          reader was in the middle of. */}
      <p className="sr-only" role="status">
        {inCart > 0 ? t.badge(inCart) : ""}
      </p>
    </div>
  );
}

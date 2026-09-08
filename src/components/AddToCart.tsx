import { useEffect, useState } from "react";

import { addToCart, cartPath, onCartChange, readCart } from "../lib/cart";
import { tx, type Lang } from "../lib/i18n";

interface Props {
  slug: string;
  lang: Lang;
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
export default function AddToCart({ slug, lang }: Props) {
  const t = tx(lang).cart;
  const [inCart, setInCart] = useState<number | null>(null);

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
      <button type="button" className="btn btn-primary" onClick={() => addToCart(slug, 1)}>
        {t.add}
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

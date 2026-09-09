import { useEffect, useState } from "react";

import { cartCount, cartPath, onCartChange } from "../lib/cart";
import { tx, type Lang } from "../lib/i18n";

interface Props {
  lang: Lang;
}

/**
 * The basket link in the header, with a count.
 *
 * Renders nothing until the basket has been read, and nothing at all while it
 * is empty. A permanently visible "0" is a control that does nothing on almost
 * every page of a catalogue — and the link is not useful before there is
 * something in it.
 *
 * The count is written into the link's accessible name rather than left as a
 * bare number: "3" announced on its own says nothing about three of what.
 */
export default function CartBadge({ lang }: Props) {
  const t = tx(lang).cart;
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(cartCount());
    return onCartChange((lines) => setCount(cartCount(lines)));
  }, []);

  if (count === null || count === 0) return null;

  return (
    <a className="shop-header__cart" href={cartPath(lang)} aria-label={t.badge(count)}>
      {t.title}
      {/* `key` on the value, so React REMOUNTS this span whenever the count
          changes and the CSS animation plays again. Re-running an animation on
          an element that never left the DOM otherwise needs a reflow hack, and
          this is the same thing said honestly. */}
      <span className="shop-header__cart-count" aria-hidden="true" key={count}>
        {count}
      </span>
    </a>
  );
}

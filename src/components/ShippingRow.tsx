import { formatPrice, type Quote } from "../lib/checkout";
import { tx, type Lang } from "../lib/i18n";

/**
 * The delivery line of a totals `<dl>`, shared by the basket and the checkout.
 * Absent for a basket with nothing to ship.
 */
export default function ShippingRow({ quote, lang }: { quote: Quote; lang: Lang }) {
  if (!quote.shipping.required) return null;
  const t = tx(lang).cart;
  return (
    <div>
      <dt>{t.shipping}</dt>
      <dd>
        {quote.shipping.grossCents === 0
          ? t.shippingFree
          : formatPrice(quote.shipping.grossCents, quote.currency, lang)}
      </dd>
    </div>
  );
}

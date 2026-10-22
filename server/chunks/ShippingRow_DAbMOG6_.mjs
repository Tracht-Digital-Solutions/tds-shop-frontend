import { c as formatPrice } from "./Layout_WWoZnkdI.mjs";
import { j as tx } from "./siteKey_CwDlj_H7.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
// src/components/ShippingRow.tsx
/**
* The delivery line of a totals `<dl>`, shared by the basket and the checkout.
* Absent for a basket with nothing to ship.
*/
function ShippingRow({ quote, lang }) {
	if (!quote.shipping.required) return null;
	const t = tx(lang).cart;
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: t.shipping }), /* @__PURE__ */ jsx("dd", { children: quote.shipping.grossCents === 0 ? t.shippingFree : formatPrice(quote.shipping.grossCents, quote.currency, lang) })] });
}
export { ShippingRow as t };

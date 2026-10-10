import { k as tx } from "./siteKey_C6JEtaJE.mjs";
import { a as quoteCart, n as formatPrice, o as quoteFailureMessage } from "./checkout_BSN0lTw_.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/ShippingRow.tsx
/**
* The delivery line of a totals `<dl>`, shared by the basket and the checkout.
* Absent for a basket with nothing to ship.
*/
function ShippingRow({ quote, lang }) {
	if (!quote.shipping.required) return null;
	const t = tx(lang).cart;
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: t.shipping }), /* @__PURE__ */ jsx("dd", { children: quote.shipping.grossCents === 0 ? t.shippingFree : formatPrice(quote.shipping.grossCents, quote.currency, lang) })] });
}
//#endregion
//#region src/components/useQuote.ts
/**
* Price `lines` whenever they change — the one quote loop the basket and the
* checkout share.
*
* Each run is debounced by `delayMs` and **superseded** by the next: the
* cleanup marks the in-flight request stale, so an older answer arriving late
* can no longer overwrite a newer quote, or set one after the basket was
* emptied. Both components used to fire `quoteCart` without that guard.
*
* The OLD quote stays on screen while a new one is in flight: blanking the
* totals on every keypress makes the page flicker and briefly removes the
* figures the checkout button sits next to.
*/
function useQuote(lines, lang, delayMs = 0) {
	const [state, setState] = useState({
		quote: null,
		error: null,
		settled: 0
	});
	useEffect(() => {
		if (lines === null) return;
		if (lines.length === 0) {
			setState((s) => ({
				...s,
				quote: null,
				error: null
			}));
			return;
		}
		let current = true;
		const timer = setTimeout(() => {
			quoteCart(lines, lang).then((result) => {
				if (!current) return;
				if ("error" in result) setState((s) => ({
					...s,
					quote: null,
					error: quoteFailureMessage(result, lang)
				}));
				else setState((s) => ({
					quote: result,
					error: null,
					settled: s.settled + 1
				}));
			});
		}, delayMs);
		return () => {
			current = false;
			clearTimeout(timer);
		};
	}, [
		lines,
		lang,
		delayMs
	]);
	return state;
}
//#endregion
export { ShippingRow as n, useQuote as t };

import { c as onCartChange, d as setQuantity, l as readCart, u as removeFromCart } from "./Layout_C_UXvuB5.mjs";
import { D as tx, b as homePath } from "./siteKey_lIZ3umxo.mjs";
import { n as formatPrice } from "./checkout_DjMShlgb.mjs";
import { n as ShippingRow, t as useQuote } from "./useQuote_BXgWukzz.mjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/Cart.tsx
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
function Cart({ lang, checkoutHref }) {
	const t = tx(lang).cart;
	const [lines, setLines] = useState(null);
	const { quote, error, settled } = useQuote(lines, lang, 250);
	const [announcement, setAnnouncement] = useState("");
	/** The row currently animating out. Removed from storage once it has. */
	const [leaving, setLeaving] = useState(null);
	const leaveTimer = useRef(null);
	useEffect(() => () => {
		if (leaveTimer.current) clearTimeout(leaveTimer.current);
	}, []);
	/**
	* Remove a line, after letting it leave.
	*
	* The storage write is DEFERRED, not the animation: removing the row first
	* and animating a copy of it would mean keeping a copy, and a basket with a
	* ghost row in it is a worse bug than an abrupt removal. 180ms matches
	* `--tds-dur-fast`; a reader with reduced motion simply sees it go, because
	* base.css has already clamped the transition to nothing.
	*/
	const removeWithExit = useCallback((slug, title) => {
		setLeaving(slug);
		setAnnouncement(t.removed(title));
		if (leaveTimer.current) clearTimeout(leaveTimer.current);
		leaveTimer.current = setTimeout(() => {
			removeFromCart(slug);
			setLeaving(null);
		}, 180);
	}, [t]);
	useEffect(() => {
		setLines(readCart());
		return onCartChange(setLines);
	}, []);
	if (lines === null) return null;
	if (lines.length === 0) return /* @__PURE__ */ jsxs("div", {
		className: "cart cart--empty",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "shop-lede",
				children: t.empty
			}),
			/* @__PURE__ */ jsx("p", { children: t.emptyBody }),
			/* @__PURE__ */ jsx("a", {
				className: "btn btn-primary",
				href: homePath(lang),
				children: t.keepShopping
			})
		]
	});
	const currency = quote?.currency ?? "EUR";
	const titleFor = (slug) => quote?.lines.find((l) => l.slug === slug)?.title ?? slug;
	return /* @__PURE__ */ jsxs("div", {
		className: "cart",
		children: [
			/* @__PURE__ */ jsx("ul", {
				className: "cart__lines",
				children: lines.map((line) => {
					const priced = quote?.lines.find((l) => l.slug === line.slug);
					return /* @__PURE__ */ jsxs("li", {
						className: "cart__line",
						"data-leaving": leaving === line.slug ? "true" : void 0,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "cart__title",
								children: priced?.title ?? line.slug
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "cart__qty",
								children: [/* @__PURE__ */ jsx("span", {
									className: "sr-only",
									children: `${t.quantity}: ${priced?.title ?? line.slug}`
								}), /* @__PURE__ */ jsx(QuantityInput, {
									value: line.quantity,
									onCommit: (n) => {
										setQuantity(line.slug, n);
										setAnnouncement(t.updated(titleFor(line.slug), n));
									}
								})]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "cart__price",
								children: priced ? formatPrice(priced.grossCents, currency, lang) : "—"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn btn-ghost cart__remove",
								onClick: () => removeWithExit(line.slug, titleFor(line.slug)),
								children: t.remove
							})
						]
					}, line.slug);
				})
			}),
			error ? /* @__PURE__ */ jsx("p", {
				className: "checkout__error",
				role: "alert",
				children: error
			}) : null,
			/* @__PURE__ */ jsxs("dl", {
				className: "cart__totals",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: t.subtotal }), /* @__PURE__ */ jsx("dd", { children: quote ? formatPrice(quote.grossCents - quote.shipping.grossCents, currency, lang) : t.loading })] }),
					quote ? /* @__PURE__ */ jsx(ShippingRow, {
						quote,
						lang
					}) : null,
					/* @__PURE__ */ jsxs("div", {
						className: "cart__total",
						children: [/* @__PURE__ */ jsx("dt", { children: t.total }), /* @__PURE__ */ jsx("dd", {
							"data-changed": settled > 1 ? "true" : void 0,
							children: quote ? formatPrice(quote.grossCents, currency, lang) : t.loading
						}, settled)]
					})
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "cart__note",
				children: quote?.shipping.required ? quote.shipping.freeFromCents > 0 && quote.shipping.grossCents > 0 ? t.shippingFrom(formatPrice(quote.shipping.freeFromCents, currency, lang)) : "" : t.digitalOnly
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "cart__actions",
				children: [/* @__PURE__ */ jsx("a", {
					className: "btn btn-ghost",
					href: homePath(lang),
					children: t.keepShopping
				}), /* @__PURE__ */ jsx("a", {
					className: "btn btn-primary",
					href: checkoutHref,
					"aria-disabled": quote === null ? "true" : void 0,
					onClick: (e) => {
						if (quote === null) e.preventDefault();
					},
					children: t.toCheckout
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "sr-only",
				role: "status",
				children: announcement
			})
		]
	});
}
/**
* The quantity field.
*
* It keeps its own draft, because the stored quantity cannot represent what a
* reader is in the middle of typing. Bound directly to the basket, clearing the
* field to type a new number read as `Number("") === 0` — and a quantity of 0
* removes the line, so the product vanished on the first keystroke. Only a
* whole number of at least 1 is committed (capped at `MAX_QUANTITY`); leaving
* the field restores whatever is stored.
*/
function QuantityInput({ value, onCommit }) {
	const [draft, setDraft] = useState(String(value));
	useEffect(() => setDraft(String(value)), [value]);
	return /* @__PURE__ */ jsx("input", {
		className: "field-boxed",
		type: "number",
		min: 1,
		max: 99,
		inputMode: "numeric",
		value: draft,
		onChange: (e) => {
			const raw = e.target.value;
			setDraft(raw);
			const n = Number(raw);
			if (raw.trim() !== "" && Number.isInteger(n) && n >= 1) onCommit(Math.min(99, n));
		},
		onBlur: () => setDraft(String(value))
	});
}
//#endregion
export { Cart as t };

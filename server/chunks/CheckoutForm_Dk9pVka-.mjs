import { d as readCart, l as clearCart } from "./Layout_xvF1Gooe.mjs";
import { c as tx } from "./i18n_CAi8x9tF.mjs";
import { a as quoteCart, i as paymentMethods, n as formatPrice, o as startCheckout, t as WITHDRAWAL_TEXT } from "./checkout_B8L65yVc.mjs";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/CheckoutForm.tsx
var TX = {
	de: {
		heading: "Bestellung abschließen",
		summary: "Ihre Bestellung",
		net: "Netto",
		vat: "zzgl. USt",
		shipping: "Versand",
		shippingFree: "kostenlos",
		total: "Gesamt",
		email: "E-Mail-Adresse",
		emailHint: "An diese Adresse geht die Bestellbestätigung.",
		name: "Name (optional)",
		country: "Land",
		payment: "Zahlungsart",
		noPayment: "Zurzeit ist keine Zahlungsart verfügbar. Bitte später erneut versuchen.",
		address: "Lieferanschrift",
		shipName: "Name",
		shipLine1: "Straße und Hausnummer",
		shipLine2: "Adresszusatz (optional)",
		shipPostcode: "Postleitzahl",
		shipCity: "Ort",
		deliveryDigital: "Sofortige Erbringung nach Zahlung. Kein Versand.",
		deliveryGoods: "Lieferung innerhalb Deutschlands.",
		deliveryMixed: "Leistungen sofort nach Zahlung, Waren per Versand.",
		submit: "Zahlungspflichtig bestellen",
		working: "Wird vorbereitet …",
		loading: "Ihre Bestellung wird geladen …",
		consentLabel: "Ich stimme zu und bestätige:",
		withdrawalInfo: "Widerrufsrecht:",
		onlyGermany: "Wir liefern derzeit nur nach Deutschland.",
		emptyCart: "Ihr Warenkorb ist leer.",
		gone: "Mindestens ein Artikel ist nicht mehr verfügbar."
	},
	en: {
		heading: "Complete your order",
		summary: "Your order",
		net: "Net",
		vat: "plus VAT",
		shipping: "Delivery",
		shippingFree: "free",
		total: "Total",
		email: "Email address",
		emailHint: "The order confirmation goes to this address.",
		name: "Name (optional)",
		country: "Country",
		payment: "Payment method",
		noPayment: "No payment method is available right now. Please try again later.",
		address: "Delivery address",
		shipName: "Name",
		shipLine1: "Street and number",
		shipLine2: "Additional address line (optional)",
		shipPostcode: "Postcode",
		shipCity: "Town",
		deliveryDigital: "Performed immediately after payment. Nothing is shipped.",
		deliveryGoods: "Delivered within Germany.",
		deliveryMixed: "Services immediately after payment, goods by post.",
		submit: "Order with obligation to pay",
		working: "Preparing …",
		loading: "Loading your order …",
		consentLabel: "I agree and confirm:",
		withdrawalInfo: "Right of withdrawal:",
		onlyGermany: "We currently deliver to Germany only.",
		emptyCart: "Your basket is empty.",
		gone: "At least one item is no longer available."
	}
};
/**
* The order form — and specifically, the place the legally required
* declarations are made.
*
* ### Why this page exists at all, rather than a link to the provider
*
* § 312j Abs. 3 BGB requires an order button labelled "Zahlungspflichtig
* bestellen" with the mandatory details — what is being bought, the total, the
* VAT, delivery — immediately above it. A provider's hosted button says
* "Bezahlen" and its page is not ours to relabel. So the declaration happens
* here, and the provider is only the payment step that follows.
*
* ### Why the button is absent rather than merely disabled while loading
*
* A basket lives in the visitor's browser, so the server cannot render its
* details — they are fetched. Until they arrive there is nothing above the
* button to satisfy § 312j Abs. 2, and a button with no price beside it is
* precisely what that provision exists to prevent. So it is not rendered at
* all.
*
* The express path (a `slug` from a product page) fetches too, even though the
* page could have server-rendered that one product's figures. Server rendering
* would buy nothing here: this is a React island, so without a script there is
* no working button either way — and a second place computing a total is a
* second place for it to disagree with what is charged. One source, always.
*
* ### Two rights of withdrawal, and only one of them is agreed to
*
* The server decides which regime applies from what is actually in the basket
* and says so on the quote. For a basket of goods there is **no checkbox**: the
* fourteen-day right is not the customer's to give up, so a tick for it would
* be a consent with no object, and the block is shown as INFORMATION instead
* (Art. 246a § 1 Abs. 2 EGBGB). For anything containing a service the checkbox
* is a precondition — not pre-ticked, the button stays disabled without it, and
* the server refuses the order too. The browser check is a courtesy; the server
* check is the rule.
*
* Whatever wording is displayed travels with the request, so the order records
* the sentence the customer actually read.
*/
function CheckoutForm({ lang, slug }) {
	const t = TX[lang];
	const cartTx = tx(lang).cart;
	const [lines, setLines] = useState(slug ? [{
		slug,
		quantity: 1
	}] : null);
	const [quote, setQuote] = useState(null);
	const [methods, setMethods] = useState(null);
	const [provider, setProvider] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [country, setCountry] = useState("DE");
	const [address, setAddress] = useState({
		shipName: "",
		shipLine1: "",
		shipLine2: "",
		shipPostcode: "",
		shipCity: "",
		shipCountry: "DE"
	});
	const [consent, setConsent] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState(null);
	const errorRef = useRef(null);
	useEffect(() => {
		if (!slug) setLines(readCart());
	}, [slug]);
	useEffect(() => {
		if (lines === null || lines.length === 0) return;
		quoteCart(lines, lang).then((result) => {
			if ("error" in result) {
				setQuote(null);
				setError(result.error === "empty" ? null : t.gone);
			} else setQuote(result);
		});
	}, [
		lines,
		lang,
		t.gone
	]);
	useEffect(() => {
		paymentMethods().then((found) => {
			setMethods(found);
			setProvider((current) => current || found[0]?.id || "");
		});
	}, []);
	/**
	* Move focus to the error.
	*
	* `role="alert"` announces the text but does not move the caret, so a
	* keyboard user is left wherever they pressed the button — usually below the
	* message they now have to act on.
	*/
	useEffect(() => {
		if (error) errorRef.current?.focus();
	}, [error]);
	const submit = async (event) => {
		event.preventDefault();
		if (!quote) return;
		setError(null);
		setBusy(true);
		const result = await startCheckout({
			items: lines ?? [],
			lang,
			email,
			name,
			country,
			regime: quote.withdrawalRegime,
			withdrawalConsent: consent,
			provider: provider || void 0,
			address: quote.addressRequired ? address : null
		});
		if (result.url) {
			if (!slug) clearCart();
			window.location.href = result.url;
			return;
		}
		setBusy(false);
		setError(result.error ?? "Unbekannter Fehler.");
	};
	if (lines !== null && lines.length === 0) return /* @__PURE__ */ jsx("p", {
		className: "shop-lede",
		children: t.emptyCart
	});
	if (!quote) return /* @__PURE__ */ jsx("p", {
		className: "shop-lede",
		role: "status",
		children: error ?? t.loading
	});
	const currency = quote.currency;
	const consentRequired = quote.withdrawalConsentRequired;
	const withdrawalText = WITHDRAWAL_TEXT[lang][quote.withdrawalRegime];
	const deliveryNote = quote.withdrawalRegime === "goods" ? t.deliveryGoods : quote.withdrawalRegime === "mixed" ? t.deliveryMixed : t.deliveryDigital;
	return /* @__PURE__ */ jsxs("form", {
		className: "checkout",
		onSubmit: submit,
		children: [
			/* @__PURE__ */ jsx("h2", { children: t.heading }),
			/* @__PURE__ */ jsxs("section", {
				className: "checkout__summary",
				"aria-label": t.summary,
				children: [
					/* @__PURE__ */ jsx("ul", {
						className: "checkout__items",
						children: quote.lines.map((line) => /* @__PURE__ */ jsxs("li", {
							className: "checkout__item",
							children: [
								line.quantity > 1 ? `${line.quantity} × ` : "",
								line.title,
								/* @__PURE__ */ jsx("span", {
									className: "checkout__item-price",
									children: formatPrice(line.grossCents, currency, lang)
								})
							]
						}, line.slug))
					}),
					/* @__PURE__ */ jsxs("dl", { children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: t.net }), /* @__PURE__ */ jsx("dd", { children: formatPrice(quote.netCents, currency, lang) })] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: t.vat }), /* @__PURE__ */ jsx("dd", { children: formatPrice(quote.taxCents, currency, lang) })] }),
						quote.shipping.required ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: t.shipping }), /* @__PURE__ */ jsx("dd", { children: quote.shipping.grossCents === 0 ? t.shippingFree : formatPrice(quote.shipping.grossCents, currency, lang) })] }) : null,
						/* @__PURE__ */ jsxs("div", {
							className: "checkout__total",
							children: [/* @__PURE__ */ jsx("dt", { children: t.total }), /* @__PURE__ */ jsx("dd", { children: formatPrice(quote.grossCents, currency, lang) })]
						})
					] }),
					/* @__PURE__ */ jsx("p", {
						className: "checkout__delivery",
						children: deliveryNote
					})
				]
			}),
			/* @__PURE__ */ jsxs("label", { children: [
				t.email,
				/* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "email",
					required: true,
					autoComplete: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value)
				}),
				/* @__PURE__ */ jsx("small", { children: t.emailHint })
			] }),
			/* @__PURE__ */ jsxs("label", { children: [t.name, /* @__PURE__ */ jsx("input", {
				className: "field-boxed",
				autoComplete: "name",
				value: name,
				onChange: (e) => setName(e.target.value)
			})] }),
			/* @__PURE__ */ jsxs("label", { children: [
				t.country,
				/* @__PURE__ */ jsx("select", {
					className: "field-boxed",
					value: country,
					onChange: (e) => setCountry(e.target.value),
					children: /* @__PURE__ */ jsx("option", {
						value: "DE",
						children: "Deutschland"
					})
				}),
				/* @__PURE__ */ jsx("small", { children: t.onlyGermany })
			] }),
			quote.addressRequired ? /* @__PURE__ */ jsxs("fieldset", {
				className: "checkout__address",
				children: [
					/* @__PURE__ */ jsx("legend", { children: t.address }),
					/* @__PURE__ */ jsxs("label", { children: [t.shipName, /* @__PURE__ */ jsx("input", {
						className: "field-boxed",
						required: true,
						autoComplete: "shipping name",
						value: address.shipName,
						onChange: (e) => setAddress({
							...address,
							shipName: e.target.value
						})
					})] }),
					/* @__PURE__ */ jsxs("label", { children: [t.shipLine1, /* @__PURE__ */ jsx("input", {
						className: "field-boxed",
						required: true,
						autoComplete: "shipping address-line1",
						value: address.shipLine1,
						onChange: (e) => setAddress({
							...address,
							shipLine1: e.target.value
						})
					})] }),
					/* @__PURE__ */ jsxs("label", { children: [t.shipLine2, /* @__PURE__ */ jsx("input", {
						className: "field-boxed",
						autoComplete: "shipping address-line2",
						value: address.shipLine2 ?? "",
						onChange: (e) => setAddress({
							...address,
							shipLine2: e.target.value
						})
					})] }),
					/* @__PURE__ */ jsxs("label", { children: [t.shipPostcode, /* @__PURE__ */ jsx("input", {
						className: "field-boxed",
						required: true,
						inputMode: "numeric",
						autoComplete: "shipping postal-code",
						value: address.shipPostcode,
						onChange: (e) => setAddress({
							...address,
							shipPostcode: e.target.value
						})
					})] }),
					/* @__PURE__ */ jsxs("label", { children: [t.shipCity, /* @__PURE__ */ jsx("input", {
						className: "field-boxed",
						required: true,
						autoComplete: "shipping address-level2",
						value: address.shipCity,
						onChange: (e) => setAddress({
							...address,
							shipCity: e.target.value
						})
					})] })
				]
			}) : null,
			/* @__PURE__ */ jsxs("fieldset", {
				className: "checkout__payment",
				children: [/* @__PURE__ */ jsx("legend", { children: t.payment }), methods === null ? /* @__PURE__ */ jsx("p", {
					role: "status",
					children: cartTx.loading
				}) : methods.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "checkout__error",
					children: t.noPayment
				}) : methods.map((method) => /* @__PURE__ */ jsxs("label", {
					className: "checkout__method",
					children: [/* @__PURE__ */ jsx("input", {
						type: "radio",
						name: "provider",
						value: method.id,
						checked: provider === method.id,
						onChange: () => setProvider(method.id)
					}), /* @__PURE__ */ jsx("span", { children: method.label })]
				}, method.id))]
			}),
			consentRequired ? /* @__PURE__ */ jsxs("label", {
				className: "checkout__consent",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: consent,
					onChange: (e) => setConsent(e.target.checked),
					required: true
				}), /* @__PURE__ */ jsxs("span", { children: [
					/* @__PURE__ */ jsx("strong", { children: t.consentLabel }),
					" ",
					withdrawalText
				] })]
			}) : /* @__PURE__ */ jsxs("p", {
				className: "checkout__withdrawal-info",
				children: [
					/* @__PURE__ */ jsx("strong", { children: t.withdrawalInfo }),
					" ",
					withdrawalText
				]
			}),
			error ? /* @__PURE__ */ jsx("p", {
				className: "checkout__error",
				role: "alert",
				tabIndex: -1,
				ref: errorRef,
				children: error
			}) : null,
			/* @__PURE__ */ jsx("button", {
				type: "submit",
				className: "btn btn-primary",
				disabled: busy || consentRequired && !consent || !provider,
				"aria-busy": busy,
				children: busy ? t.working : t.submit
			})
		]
	});
}
//#endregion
export { CheckoutForm as t };

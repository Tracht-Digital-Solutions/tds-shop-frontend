import { A as renderTemplate, B as createAstro, N as addAttribute, T as Fragment, j as maybeRenderHead, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { t as $$Layout } from "./Layout_MUKHf_7k.mjs";
import { c as tx, i as homePath } from "./i18n_CAi8x9tF.mjs";
import { n as formatPrice, r as getOrder } from "./checkout_C0ruqFT-.mjs";
//#region src/components/OrderPage.astro
createAstro("https://shop.tracht-digital.de");
var $$OrderPage = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$OrderPage;
	const { lang, token } = Astro.props;
	const t = tx(lang);
	const order = await getOrder(token);
	const copy = lang === "de" ? {
		title: "Ihre Bestellung",
		paid: "Bezahlt. Vielen Dank!",
		pending: "Zahlung eingegangen — die Bestätigung folgt in wenigen Augenblicken.",
		refunded: "Diese Bestellung wurde erstattet.",
		failed: "Die Zahlung ist nicht zustande gekommen.",
		next: "Wir melden uns per E-Mail und beginnen mit der Leistung.",
		notFound: "Diese Bestellung konnten wir nicht finden.",
		notFoundBody: "Bitte prüfen Sie den Link aus Ihrer Bestätigungs-E-Mail.",
		number: "Bestellnummer",
		net: "Netto",
		vat: "USt",
		total: "Gesamt",
		confirmed: "Bestätigt"
	} : {
		title: "Your order",
		paid: "Paid. Thank you!",
		pending: "Payment received — confirmation follows in a moment.",
		refunded: "This order has been refunded.",
		failed: "The payment did not go through.",
		next: "We will be in touch by email and begin the work.",
		notFound: "We could not find this order.",
		notFoundBody: "Please check the link from your confirmation email.",
		number: "Order number",
		net: "Net",
		vat: "VAT",
		total: "Total",
		confirmed: "Confirmed"
	};
	const statusLine = order === null ? null : order.status === "paid" ? copy.paid : order.status === "refunded" ? copy.refunded : order.status === "failed" ? copy.failed : copy.pending;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": copy.title,
		"description": copy.title,
		"lang": lang,
		"noindex": true
	}, { "default": ($$result) => renderTemplate`${order === null ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="shop-title">${copy.notFound}</h1><p class="shop-lede">${copy.notFoundBody}</p><p class="shop-pager"><a class="btn btn-primary"${addAttribute(homePath(lang), "href")}>${t.backToCatalogue}</a></p>` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<h1 class="shop-title">${copy.title}</h1><p class="shop-lede">${statusLine}</p><dl class="order-summary"><div><dt>${copy.number}</dt><dd>${order.order_no}</dd></div>${order.items.map((item) => renderTemplate`<div><dt>${item.title}</dt><dd>${formatPrice(item.gross_cents, order.currency, lang)}</dd></div>`)}<div><dt>${copy.net}</dt><dd>${formatPrice(order.net_cents, order.currency, lang)}</dd></div><div><dt>${copy.vat}</dt><dd>${formatPrice(order.tax_cents, order.currency, lang)}</dd></div><div class="order-summary__total"><dt>${copy.total}</dt><dd>${formatPrice(order.gross_cents, order.currency, lang)}</dd></div></dl>${order.status === "paid" ? renderTemplate`<p>${copy.next}</p>` : null}${order.withdrawal_consent_text ? renderTemplate`<p class="order-summary__consent"><strong>${copy.confirmed}:</strong> ${order.withdrawal_consent_text}</p>` : null}<p class="shop-pager"><a class="btn btn-ghost"${addAttribute(homePath(lang), "href")}>${t.backToCatalogue}</a></p>` })}`}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/OrderPage.astro", void 0);
//#endregion
export { $$OrderPage as t };

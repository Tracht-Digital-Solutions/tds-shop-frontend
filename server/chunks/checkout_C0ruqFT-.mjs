import { n as apiBase } from "./Layout_MUKHf_7k.mjs";
//#region src/lib/checkout.ts
/**
* The exact wording the customer agrees to, per regime.
*
* There are two different rights here and only one of them involves agreeing to
* anything:
*
* - **goods** — fourteen days from receipt (§ 355, § 356 Abs. 2 Nr. 1 BGB).
*   Nothing is asked of the customer; the right is not theirs to give up. What
*   is stored is the INFORMATION given before the order (Art. 246a § 1 Abs. 2
*   EGBGB), which is why this wording contains no "I lose".
* - **digital** — the right lapses on full performance, but only against an
*   express request to begin early plus an acknowledgement of what that costs
*   (§ 356 Abs. 4 BGB).
* - **mixed** — both, said separately, or the customer has agreed to something
*   broader than what was meant.
*
* Whatever is displayed travels with the request, so the order records the
* sentence the customer actually saw rather than the server's default of the
* day.
*/
var WITHDRAWAL_TEXT = {
	de: {
		digital: "Ich verlange ausdrücklich, dass Sie vor Ende der Widerrufsfrist mit der Leistung beginnen. Mir ist bekannt, dass ich mein Widerrufsrecht mit vollständiger Erbringung der Leistung verliere.",
		goods: "Sie haben das Recht, binnen vierzehn Tagen ab Erhalt der Ware ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsbelehrung und das Muster-Widerrufsformular wurden mir vor der Bestellung zur Verfügung gestellt.",
		mixed: "Ich verlange ausdrücklich, dass Sie vor Ende der Widerrufsfrist mit der Leistung beginnen. Mir ist bekannt, dass ich mein Widerrufsrecht mit vollständiger Erbringung der Leistung verliere. Für die enthaltenen Waren bleibt mein Widerrufsrecht von vierzehn Tagen ab Erhalt davon unberührt."
	},
	en: {
		digital: "I expressly request that you begin performing the service before the withdrawal period ends. I understand that I lose my right of withdrawal once the service has been performed in full.",
		goods: "You have the right to withdraw from this contract within fourteen days of receiving the goods, without giving any reason. The withdrawal policy and the model withdrawal form were made available to me before ordering.",
		mixed: "I expressly request that you begin performing the service before the withdrawal period ends. I understand that I lose my right of withdrawal once the service has been performed in full. For any goods included, my fourteen-day right of withdrawal from receipt is unaffected."
	}
};
/**
* Price a basket without ordering anything.
*
* The basket page cannot add this up itself: the total includes delivery, which
* depends on the free-shipping threshold and on an apportionment of tax across
* the goods' VAT rates. A page that guessed would eventually show a different
* number than the checkout charges, and that is worse than showing none.
*/
async function quoteCart(lines, lang) {
	if (lines.length === 0) return { error: "empty" };
	try {
		const res = await fetch(`${apiBase()}/shop/quote`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				items: lines,
				lang
			})
		});
		const body = await res.json().catch(() => ({}));
		if (!res.ok) return { error: body.error ?? `Fehler ${res.status}` };
		return body;
	} catch {
		return { error: "Keine Verbindung. Bitte später erneut versuchen." };
	}
}
/**
* What the shop can actually complete right now.
*
* Rendered rather than hard-coded, so a method whose credentials are missing —
* Wero until a provider is contracted — is simply not offered. An empty list is
* a valid answer and means the checkout cannot proceed.
*/
async function paymentMethods() {
	try {
		const res = await fetch(`${apiBase()}/shop/payment-methods`);
		if (!res.ok) return [];
		const body = await res.json();
		return Array.isArray(body.methods) ? body.methods : [];
	} catch {
		return [];
	}
}
/**
* Start a payment.
*
* The exact wording shown on the page travels with the request, so the order
* records the sentence the customer actually saw rather than whatever the
* server's default happens to be today.
*/
async function startCheckout(input) {
	try {
		const res = await fetch(`${apiBase()}/shop/checkout`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...input,
				...input.address ?? {},
				withdrawalText: WITHDRAWAL_TEXT[input.lang][input.regime]
			})
		});
		const body = await res.json().catch(() => ({}));
		if (!res.ok) return { error: body.error ?? `Fehler ${res.status}` };
		return body;
	} catch {
		return { error: "Keine Verbindung. Bitte später erneut versuchen." };
	}
}
/** Read an order back. The token IS the authorisation — a guest has no account. */
async function getOrder(token) {
	try {
		const res = await fetch(`${apiBase()}/shop/order/${encodeURIComponent(token)}`);
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
}
function formatPrice(cents, currency, lang) {
	try {
		return new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-GB", {
			style: "currency",
			currency
		}).format(cents / 100);
	} catch {
		return `${(cents / 100).toFixed(2)} ${currency}`;
	}
}
//#endregion
export { quoteCart as a, paymentMethods as i, formatPrice as n, startCheckout as o, getOrder as r, WITHDRAWAL_TEXT as t };

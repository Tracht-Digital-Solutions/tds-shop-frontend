// node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-5OYAWIY6.js
function localeOf(lang = "de") {
	return lang === "en" ? "en-GB" : "de-DE";
}
function formatCents(cents, opts = {}) {
	if (cents === null || cents === void 0 || !Number.isFinite(cents)) return opts.fallback ?? "—";
	const currency = opts.currency ?? "EUR";
	try {
		return new Intl.NumberFormat(localeOf(opts.lang), {
			style: "currency",
			currency
		}).format(cents / 100);
	} catch {
		return `${(cents / 100).toFixed(2)} ${currency}`;
	}
}
function formatPrice(cents, currency, lang = "de") {
	return formatCents(cents, {
		currency,
		lang
	});
}
function clampToWord(text, max = 160) {
	const clean = text.replace(/\s+/g, " ").trim();
	if (clean.length <= max) return clean;
	const cut = clean.slice(0, max - 1);
	const lastSpace = cut.lastIndexOf(" ");
	return `${(lastSpace > max * .5 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—]+$/, "")}\u2026`;
}
export { formatPrice as n, clampToWord as t };

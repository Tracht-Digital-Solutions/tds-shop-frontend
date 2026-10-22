import { A as productPath, C as categoryPath, h as canonical, w as homePath } from "./siteKey_D6bmHM0Q.mjs";
import { i as listCategories, n as getProduct } from "./content-api_Bw9LJZoH.mjs";
// src/lib/alternates.ts
/**
* The locale counterpart of a page, looked up rather than derived.
*
* ### Why this file exists
*
* `i18n.ts` has referred to "`alternates.ts` looks the counterpart up instead"
* since the shop was built. The file never existed, and the consequence was
* not a missing nicety: `Layout.astro` emits hreflang ONLY when it is handed
* an `altUrl`, and the only pages that handed it one were the four `noindex`
* cart and checkout pages. Every indexable page — home, every category, every
* product — shipped no hreflang at all, and `Header.astro` fell back to
* `homePath()`, so the language switch on a product page sent the reader to
* the front page instead of to the same product.
*
* ### Why a twin is confirmed and never derived
*
* The two trees are not a prefix mirror: the taxonomy segments differ per
* language (`produkt` ↔ `product`), and a product's slug MAY differ too,
* because the API pairs translations on the product id. Pasting `/en/` in
* front of a German path therefore produces a 404 on every listing page, and
* `Layout.astro`'s own doc comment says why that is worse than nothing: one
* dangling alternate invalidates the whole set, the German side included.
*
* So every function here returns `null` unless the counterpart is known to
* answer. For a category that is a count in the other language; for a product
* it costs one extra read, which the page cache absorbs.
*
* ### Products with different slugs per language
*
* Since tds-ext-shop 0.6.9 every public product read carries `alternateSlug`:
* the same product's slug in the other language, paired on the product id.
* That is the answer, so no probe is needed. An older API omits the field;
* then the probe looks for the SAME slug, and a translation under a different
* slug stays unpaired — the honest outcome rather than a guess.
*/
/**
* Language-neutral key of a product, so the two trees pair in the sitemap and
* llms.txt exactly as the page pairs its hreflang. The German slug when it is
* known; a product without a twin gets a key of its own. Without the field (an
* older API) the slug itself is the key, the old same-slug rule.
*/
function productPairKey(product, lang) {
	if (product.alternateSlug === void 0) return `prod:${product.slug}`;
	if (!product.alternateSlug) return `prod:${lang}:${product.slug}`;
	return `prod:${lang === "de" ? product.slug : product.alternateSlug}`;
}
/** The other language. */
var otherLang = (lang) => lang === "de" ? "en" : "de";
/** Absolute URL of the home page in the other language. Always exists. */
function homeAlternate(lang) {
	return canonical(homePath(otherLang(lang)));
}
/**
* Absolute URL of this category in the other language, or `null`.
*
* Category slugs are shared across the trees — only the segment differs — so
* the question is whether the other language has anything in it. An empty
* category is not a page: `sitemap.ts` leaves it out, so linking an alternate
* at it would point at a route the sitemap does not list.
*/
async function categoryAlternate(category, lang) {
	const other = otherLang(lang);
	const match = (await listCategories(other)).find((entry) => entry.category === category);
	if (!match || match.total < 1) return null;
	return canonical(categoryPath(category, other));
}
/**
* Absolute URL of this product in the other language, or `null`.
*
* Confirmed with a second read, because a guess here is a 404. A real 404 from
* the API gives `null` and the page then ships without hreflang.
*
* It uses the same client the page itself uses, which means it inherits the
* same fail-soft behaviour: on a network error `getProduct` answers from the
* demo fixtures. That is deliberate and consistent — in that state the PAGE is
* demo content too, so its alternate describes the same thing the page does.
* What must never happen is a confident alternate for a product the API says
* does not exist in that language, and a 404 is passed through.
*/
async function productAlternate(product, lang) {
	const other = otherLang(lang);
	if (product.alternateSlug !== void 0) return product.alternateSlug ? canonical(productPath(product.alternateSlug, other)) : null;
	const twin = await getProduct(product.slug, other);
	if (!twin) return null;
	return canonical(productPath(twin.slug, other));
}
export { productPairKey as i, homeAlternate as n, productAlternate as r, categoryAlternate as t };

import { I as addAttribute, L as unescapeHTML, M as maybeRenderHead, T as renderComponent, j as renderTemplate } from "./sequence_cwM7fFZp.mjs";
import { t as createAstro } from "./compiler_NuJ7F5L4.mjs";
import { t as renderMarkdown } from "./markdown_8qKxepaf.mjs";
import { d as createComponent, t as $$Layout } from "./Layout_BamyOG81.mjs";
import { M as tx, O as legalPath, T as homePath, v as site } from "./siteKey_D-mNvWq_.mjs";
import { a as publishedLegalSlugs, n as LEGAL_TITLES } from "./legal_Bhi8W2Hu.mjs";
import { t as describe } from "./metaDescription_Kggj1bY_.mjs";
// src/components/LegalPage.astro
createAstro("https://shop.tracht-digital.de");
var $$LegalPage = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LegalPage;
	const { lang, slug, markdown } = Astro.props;
	const t = tx(lang);
	const title = LEGAL_TITLES[lang][slug];
	const html = markdown === null ? null : renderMarkdown(markdown);
	const other = lang === "de" ? "en" : "de";
	const altUrl = markdown !== null && (await publishedLegalSlugs(other)).includes(slug) ? legalPath(slug, other) : null;
	const description = describe(lang === "de" ? `${title} des Shops von Tracht Digital Solutions.` : `${title} for the Shop by Tracht Digital Solutions.`, site.description[lang]);
	const missing = lang === "de" ? "Dieser Text ist noch nicht veröffentlicht. Bitte wenden Sie sich an kontakt@tracht-digital.de." : "This text has not been published yet. Please write to kontakt@tracht-digital.de.";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": title,
		"description": description,
		"lang": lang,
		"altUrl": altUrl,
		"noindex": markdown === null
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="shop-title">${title}</h1>${html === null ? renderTemplate`<p class="shop-lede">${missing}</p>` : renderTemplate`<div class="shop-doc">${unescapeHTML(html)}</div>`}<p class="shop-pager"><a class="btn btn-ghost"${addAttribute(homePath(lang), "href")}>${t.backToCatalogue}</a></p>` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/LegalPage.astro", void 0);
export { $$LegalPage as t };

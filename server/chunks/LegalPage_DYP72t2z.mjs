import { E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead, V as unescapeHTML } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent, t as createAstro } from "./compiler_0Y1Kw-SJ.mjs";
import { t as $$Layout } from "./Layout_WWoZnkdI.mjs";
import { D as legalPath, _ as site, j as tx, w as homePath } from "./siteKey_CwDlj_H7.mjs";
import { a as publishedLegalSlugs, n as LEGAL_TITLES } from "./legal_BooF4ENp.mjs";
import { t as describe } from "./metaDescription_VgQGynX0.mjs";
import { t as renderMarkdown } from "./markdown_8qKxepaf.mjs";
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
	const description = describe(lang === "de" ? `${title} des Digitalmarkts von Tracht Digital Solutions.` : `${title} for the Digitalmarkt by Tracht Digital Solutions.`, site.description[lang]);
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

import { A as renderTemplate, B as createAstro, N as addAttribute, R as unescapeHTML, j as maybeRenderHead, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { i as LEGAL_TITLES, t as $$Layout } from "./Layout_xvF1Gooe.mjs";
import { c as tx, i as homePath } from "./i18n_CAi8x9tF.mjs";
import { t as renderMarkdown } from "./markdown_BXKCkzAJ.mjs";
//#region src/components/LegalPage.astro
createAstro("https://shop.tracht-digital.de");
var $$LegalPage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LegalPage;
	const { lang, slug, markdown } = Astro.props;
	const t = tx(lang);
	const title = LEGAL_TITLES[lang][slug];
	const html = markdown === null ? null : renderMarkdown(markdown);
	const missing = lang === "de" ? "Dieser Text ist noch nicht veröffentlicht. Bitte wenden Sie sich an kontakt@tracht-digital.de." : "This text has not been published yet. Please write to kontakt@tracht-digital.de.";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": title,
		"description": title,
		"lang": lang,
		"noindex": markdown === null
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="shop-title">${title}</h1>${html === null ? renderTemplate`<p class="shop-lede">${missing}</p>` : renderTemplate`<div class="shop-doc">${unescapeHTML(html)}</div>`}<p class="shop-pager"><a class="btn btn-ghost"${addAttribute(homePath(lang), "href")}>${t.backToCatalogue}</a></p>` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/LegalPage.astro", void 0);
//#endregion
export { $$LegalPage as t };

import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead } from "./sequence_DETo48yF.mjs";
import { n as createComponent, t as createAstro } from "./compiler_CyuNpeFc.mjs";
import { t as $$Layout } from "./Layout_DvqBPI7A.mjs";
import { S as homePath, g as siteLinks, k as tx, w as langOfPath } from "./siteKey_Csgii0xf.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://shop.tracht-digital.de");
var $$404 = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$404;
	const lang = langOfPath(Astro.url.pathname);
	const t = tx(lang);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": t.notFound,
		"description": t.notFoundBody,
		"lang": lang,
		"noindex": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="shop-title">${t.notFound}</h1><p class="shop-lede">${t.notFoundBody}</p><p class="shop-pager"><a class="btn btn-primary"${addAttribute(homePath(lang), "href")}>${t.toCatalogue}</a><a class="btn btn-ghost"${addAttribute(siteLinks(lang).blog, "href")}>${t.toJournal}</a></p>` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/404.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };

import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { t as $$Layout } from "./Layout_xvF1Gooe.mjs";
import { c as tx, i as homePath } from "./i18n_CAi8x9tF.mjs";
import { c as siteLinks } from "./demoContent_DmC0ycm4.mjs";
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
	const lang = Astro.url.pathname.startsWith("/en/") ? "en" : "de";
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

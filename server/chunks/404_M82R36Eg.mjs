import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { I as addAttribute, M as maybeRenderHead, T as renderComponent, j as renderTemplate } from "./sequence_cwM7fFZp.mjs";
import { t as createAstro } from "./compiler_NuJ7F5L4.mjs";
import { d as createComponent, t as $$Layout } from "./Layout_BamyOG81.mjs";
import { D as langOfPath, M as tx, T as homePath, y as siteLinks } from "./siteKey_D-mNvWq_.mjs";
// src/pages/404.astro
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
// \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
export { page };

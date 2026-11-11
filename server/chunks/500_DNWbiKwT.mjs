import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { I as addAttribute, M as maybeRenderHead, T as renderComponent, j as renderTemplate } from "./sequence_cwM7fFZp.mjs";
import { t as createAstro } from "./compiler_NuJ7F5L4.mjs";
import { d as createComponent, t as $$Layout } from "./Layout_CXBhHudn.mjs";
import { D as langOfPath, M as tx, T as homePath } from "./siteKey_BtBkErhM.mjs";
// src/pages/500.astro
var _500_exports = /* @__PURE__ */ __exportAll({
	default: () => $$500,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://shop.tracht-digital.de");
var $$500 = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$500;
	const lang = langOfPath(Astro.url.pathname);
	const t = tx(lang);
	const title = lang === "de" ? "Etwas ist schiefgelaufen" : "Something went wrong";
	const body = lang === "de" ? "Der Fehler ist protokolliert. Versuchen Sie es in einem Moment noch einmal." : "The error has been logged. Please try again in a moment.";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": title,
		"description": body,
		"lang": lang,
		"noindex": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="shop-title">${title}</h1><p class="shop-lede">${body}</p><p class="shop-pager"><a class="btn btn-primary"${addAttribute(homePath(lang), "href")}>${t.toCatalogue}</a></p>` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/500.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/500.astro";
var $$url = "/500";
// \0virtual:astro:page:src/pages/500@_@astro
var page = () => _500_exports;
export { page };

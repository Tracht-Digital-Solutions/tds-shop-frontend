import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { t as $$Layout } from "./Layout_MUKHf_7k.mjs";
import { c as tx, i as homePath } from "./i18n_CAi8x9tF.mjs";
//#region src/pages/500.astro
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
	const lang = Astro.url.pathname.startsWith("/en/") ? "en" : "de";
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
//#endregion
//#region \0virtual:astro:page:src/pages/500@_@astro
var page = () => _500_exports;
//#endregion
export { page };

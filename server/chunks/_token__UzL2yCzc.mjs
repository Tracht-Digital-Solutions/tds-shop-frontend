import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { T as renderComponent, j as renderTemplate } from "./sequence_cwM7fFZp.mjs";
import { d as createComponent } from "./Layout_BamyOG81.mjs";
import { t as createAstro } from "./compiler_NuJ7F5L4.mjs";
import { t as $$OrderPage } from "./OrderPage_DzpJp6-U.mjs";
// src/pages/bestellung/[token].astro
var _token__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Token,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://shop.tracht-digital.de");
var $$Token = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Token;
	const token = String(Astro.params.token ?? "").trim();
	if (!/^[a-f0-9]{32}$/.test(token)) return Astro.rewrite("/404");
	return renderTemplate`${renderComponent($$result, "OrderPage", $$OrderPage, {
		"lang": "de",
		"token": token
	})}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/bestellung/[token].astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/bestellung/[token].astro";
var $$url = "/bestellung/[token]";
// \0virtual:astro:page:src/pages/bestellung/[token]@_@astro
var page = () => _token__exports;
export { page };

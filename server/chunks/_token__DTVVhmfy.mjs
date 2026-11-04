import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { A as renderTemplate, w as renderComponent } from "./sequence_CX4U2Rdn.mjs";
import { d as createComponent } from "./Layout_CzHh5pf5.mjs";
import { t as createAstro } from "./compiler_oWbJ6wCc.mjs";
import { t as $$OrderPage } from "./OrderPage_BQ228AoH.mjs";
// src/pages/en/order/[token].astro
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
		"lang": "en",
		"token": token
	})}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/order/[token].astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/order/[token].astro";
var $$url = "/en/order/[token]";
// \0virtual:astro:page:src/pages/en/order/[token]@_@astro
var page = () => _token__exports;
export { page };

import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, B as createAstro, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { t as $$OrderPage } from "./OrderPage_Ca8mRSmv.mjs";
//#region src/pages/en/order/[token].astro
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
//#endregion
//#region \0virtual:astro:page:src/pages/en/order/[token]@_@astro
var page = () => _token__exports;
//#endregion
export { page };

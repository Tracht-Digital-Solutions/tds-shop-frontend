import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { E as renderComponent, M as renderTemplate, N as maybeRenderHead } from "./sequence_DETo48yF.mjs";
import { n as createComponent } from "./compiler_CyuNpeFc.mjs";
import { t as $$Layout, u as translations } from "./Layout_DvqBPI7A.mjs";
import { _ as propertyContact, k as tx } from "./siteKey_Csgii0xf.mjs";
import { t as Cart } from "./Cart_BbLe-E42.mjs";
//#region src/pages/en/cart.astro
var cart_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Cart,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Cart = createComponent(($$result, $$props, $$slots) => {
	const t = tx("en").cart;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": t.title,
		"description": t.emptyBody,
		"lang": "en",
		"noindex": true,
		"altUrl": "/warenkorb"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="shop-title">${t.title}</h1>${renderComponent($$result, "Cart", Cart, {
		"client:load": true,
		"lang": "en",
		"checkoutHref": "/en/checkout",
		"contactHref": propertyContact("en"),
		"contactLabel": translations.en.nav.cta,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Cart.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/cart.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/cart.astro";
var $$url = "/en/cart";
//#endregion
//#region \0virtual:astro:page:src/pages/en/cart@_@astro
var page = () => cart_exports;
//#endregion
export { page };

import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, j as maybeRenderHead, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { t as $$Layout } from "./Layout_xvF1Gooe.mjs";
import { c as tx } from "./i18n_CAi8x9tF.mjs";
import { t as Cart } from "./Cart_DvRA7nnF.mjs";
//#region src/pages/warenkorb.astro
var warenkorb_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Warenkorb,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Warenkorb = createComponent(($$result, $$props, $$slots) => {
	const t = tx("de").cart;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": t.title,
		"description": t.emptyBody,
		"lang": "de",
		"noindex": true,
		"altUrl": "/en/cart"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="shop-title">${t.title}</h1>${renderComponent($$result, "Cart", Cart, {
		"client:load": true,
		"lang": "de",
		"checkoutHref": "/kasse",
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Cart.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/warenkorb.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/warenkorb.astro";
var $$url = "/warenkorb";
//#endregion
//#region \0virtual:astro:page:src/pages/warenkorb@_@astro
var page = () => warenkorb_exports;
//#endregion
export { page };

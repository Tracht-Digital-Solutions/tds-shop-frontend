import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate, N as maybeRenderHead } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent } from "./compiler_0Y1Kw-SJ.mjs";
import { h as translations, t as $$Layout } from "./Layout_WWoZnkdI.mjs";
import { j as tx, y as propertyContact } from "./siteKey_CwDlj_H7.mjs";
import { t as Cart } from "./Cart_Cq8fRhFk.mjs";
// src/pages/warenkorb.astro
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
		"contactHref": propertyContact("de"),
		"contactLabel": translations.de.nav.cta,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Cart.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/warenkorb.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/warenkorb.astro";
var $$url = "/warenkorb";
// \0virtual:astro:page:src/pages/warenkorb@_@astro
var page = () => warenkorb_exports;
export { page };

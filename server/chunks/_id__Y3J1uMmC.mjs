import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as isLang } from "./i18n_CAi8x9tF.mjs";
import { i as resolveOfferTarget } from "./content-api_NeVbVIBp.mjs";
//#region src/pages/go/[id].ts
var _id__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* The affiliate click redirect.
*
* Every partner link on every surface — this site, the journal's embedded
* product blocks, the customer portal's placement widget — points here rather
* than straight at the merchant. Three reasons, in order of how much they cost
* when ignored:
*
* 1. **The partner tag lives in one row.** Linking out directly bakes it into
*    every article, card and listing that ever mentioned the offer; changing a
*    tag then becomes a search-and-replace across three repositories and an
*    unknown number of published articles.
* 2. **The click is counted** — as a daily total, with no IP, no cookie and no
*    user id (see `ClickRepository`). Nothing here needs consent because
*    nothing here identifies anybody.
* 3. **The target is validated.** `resolveOfferTarget` returns only absolute
*    http(s) URLs, so a malformed row cannot turn this route into an open
*    redirect on our own domain.
*
* Never cached, never indexed: `middleware.ts` sets `no-store` for `/go/`,
* `robots.txt` disallows it, and the response carries `X-Robots-Tag` as well —
* a redirect has no body to put a meta tag in.
*/
var GET = async ({ params, url }) => {
	const id = Number(params.id);
	const notFound = new Response("Not found", {
		status: 404,
		headers: {
			"cache-control": "no-store",
			"x-robots-tag": "noindex, nofollow"
		}
	});
	if (!Number.isInteger(id) || id <= 0) return notFound;
	const langParam = url.searchParams.get("lang");
	const target = await resolveOfferTarget(id, {
		source: url.searchParams.get("source") ?? "shop",
		placement: url.searchParams.get("placement"),
		lang: isLang(langParam) ? langParam : "de"
	});
	if (!target) return notFound;
	return new Response(null, {
		status: 302,
		headers: {
			location: target,
			"cache-control": "no-store",
			"x-robots-tag": "noindex, nofollow",
			"referrer-policy": "no-referrer"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/go/[id]@_@ts
var page = () => _id__exports;
//#endregion
export { page };

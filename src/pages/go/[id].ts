import type { APIRoute } from "astro";

import { resolveOfferTarget } from "../../lib/content-api";
import { isLang } from "../../lib/i18n";

export const prerender = false;

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
export const GET: APIRoute = async ({ params, url }) => {
  const id = Number(params.id);
  const notFound = new Response("Not found", {
    status: 404,
    headers: { "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" },
  });

  if (!Number.isInteger(id) || id <= 0) return notFound;

  const langParam = url.searchParams.get("lang");
  const target = await resolveOfferTarget(id, {
    source: url.searchParams.get("source") ?? "shop",
    placement: url.searchParams.get("placement"),
    lang: isLang(langParam) ? langParam : "de",
  });

  if (!target) return notFound;

  return new Response(null, {
    // 302, not 301: the target is a partner URL that may legitimately change
    // when a tag or a network does, and a permanent redirect would be cached
    // by browsers long past that.
    status: 302,
    headers: {
      location: target,
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
      // Do not leak the referring product page to the merchant.
      "referrer-policy": "no-referrer",
    },
  });
};

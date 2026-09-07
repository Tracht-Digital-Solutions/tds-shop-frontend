# AGENTS.md — tds-shop-frontend

TDShop, `shop.tracht-digital.de`. Astro 7, `output: "server"` under Passenger,
behind the shared file-backed page cache. Read `README.md` first for the four
standing rules; this file is what breaks if you do not know it.

## The five things that fail silently

**1. `Astro.rewrite()` from a component does nothing useful.** It only produces
a response when returned from a **page**. From a component's frontmatter it just
stops that component rendering, and the page answers **200 with an empty
document** — fifteen bytes, no error — which the page cache then stores. That
shipped once here already: a missing product served a blank success page. The
fetch and the 404 therefore live in `src/pages/produkt/[slug].astro`, not in
`ProductPage.astro`.

**2. The default API base is production.** `PUBLIC_API_URL` falls back to
`https://api.tracht-digital.de`, which is reachable. A local `npm start`
without a `.env` sends real requests there. Put `PUBLIC_API_URL=http://127.0.0.1:9`
in `.env` before any local run.

**3. A broken render gets cached like a good one.** If a page looks wrong after
a failed run, `rm -rf var/page-cache` before concluding anything about the code.

**4. `TDS_SITE_KEY` must be read from `process.env`.** Astro inlines only
`PUBLIC_*` names, so `import.meta.env.TDS_SITE_KEY` is silently `undefined` and
the site runs keyless without saying so.

**5. Every content read is fail-soft — except a rejected site key.** A rejected
key produces a perfectly valid page full of fallbacks; cached, it outlives the
misconfiguration. `assertKeyAccepted` throws, and `middleware.ts` compares the
rejection counter around the render and refuses to store anything that grew it.

## Where the decisions live

| Rule | File | Also enforced in |
|---|---|---|
| 24-hour price | `tds-shared`'s `displayPrice` | the API strips it server-side |
| advertising label | `tds-shared`'s `ProductCard` | the placement endpoint serves the text |
| indexing gate | `src/lib/indexing.ts` | `sitemap.ts` and the page's robots meta both call it |
| cache boundary | `src/lib/noCache.ts` | `middleware.ts`, `.htaccess`, and `cache.ts`'s event map |
| `Product` without `offers` | `src/lib/jsonld.ts` | — |

The indexing gate is deliberately ONE function: a URL submitted for indexing
whose page says `noindex` is a self-inflicted crawl-budget hole that reports
nothing anywhere.

## i18n

German at the root, English under `/en/`. The trees are **not** a prefix
mirror — `kategorie` ↔ `category`, `produkt` ↔ `product`, `thema` ↔ `topic`.
Deriving an alternate by pasting `/en/` in front of a German path yields a 404
on every listing page, so `Layout.astro` renders hreflang only from a resolved
`altUrl` and never guesses.

Unlike the journal, DE and EN product slugs may differ: the API pairs
translations on the product id. Do not "fix" that back to a 1:1 rule.

## Toolchain

Astro 7.2.5, TypeScript 6 (TS7 is capped by `@astrojs/check`'s peer range),
vitest 4, `tds-shared ^0.35.1`. The 0.x caret is **minor-locked** — a shared
minor needs an explicit repin here and a re-verification, not just an install.

Node 22 in CI with npm force-upgraded to 11: npm 10's arborist crashes
resolving Astro 7.3.0. `npm install --no-package-lock` — the committed Windows
lockfile does not resolve on a Linux runner.

## Don't

- Don't author a radius or an elevation locally. Set a token in the surface
  layer; this site renders `data-surface="blog"` and must keep matching the
  journal because they link to each other.
- Don't reintroduce `@astrojs/sitemap`. It derives entries from routes a build
  emits, and under `output: "server"` a build emits none — it would ship a
  sitemap holding only the pages its own filter excluded, with nothing red.
- Don't `set:html` a product body directly. It is panel-authored and untrusted
  here; `renderMarkdown` from `tds-shared` escapes before it transforms.
- Don't link an affiliate URL directly. Everything goes through `/go/{id}` so
  the partner tag lives in one database row rather than in every card and
  article that ever mentioned the offer.
- Don't add a path under `/kasse`, `/warenkorb`, `/bestellung` or `/konto`
  without checking all three cache mechanisms listed above.

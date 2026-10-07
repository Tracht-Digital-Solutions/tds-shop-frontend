# Architecture

## Where the decisions live

| Rule | File | Also enforced in |
|---|---|---|
| 24-hour price | tds-shared's `displayPrice` | the API strips stale prices server-side |
| Advertising label | tds-shared's `ProductCard` | the placement endpoint serves the text |
| Indexing gate | `src/lib/indexing.ts` | `sitemap.ts` and the page's robots meta both call it |
| Cache boundary | `src/lib/noCache.ts` | `middleware.ts`, `.htaccess`, and `cache.ts`'s event map |
| `Product` without `offers` | `src/lib/jsonld.ts` | — |

The indexing gate is deliberately **one** function. A URL submitted for indexing whose page says
`noindex` is a crawl-budget hole that reports nothing.

## i18n and hreflang

German at the root, English under `/en/`. The trees are **not** a prefix mirror: `kategorie` ↔
`category`, `produkt` ↔ `product`, `thema` ↔ `topic`. Prefixing `/en/` to a German path 404s on
every listing page, so `Layout.astro` renders hreflang only from a resolved `altUrl`.

- DE and EN product slugs may differ (the API pairs translations by product id). Don't "fix" this.
- **`src/lib/alternates.ts` resolves counterparts.** Every function returns `null` unless the
  counterpart is known to answer: a category needs a non-zero count in the other language, a
  product is confirmed with a second read.
- A product whose translation lives under a **different slug can't be paired yet**: the payload
  carries neither the product id nor the counterpart slug, so it ships without hreflang rather than
  with a guess. Fixing that needs a field from `tds-ext-shop-pkg`.
- `Header.astro`'s language switch uses the resolved alternate and falls back to the home page.
- `Layout.astro` makes any site-relative `altUrl` absolute (hreflang must be fully qualified).
  Markup uses `de` / `en`; the sitemap's `xhtml:link` uses `de-DE` / `en-GB`. All four public
  properties agree, so one shared audit checks them.

## Sitemap

Sectioned: `sitemap-{pages,categories,products,legal}.xml` (`src/lib/sitemapSections.ts`), products
with their photo as `image:image`. Don't reintroduce `@astrojs/sitemap`: under `output: "server"` a
build emits no routes, and it would ship a sitemap with only the pages its own filter excluded.

## The phone is an app (tds-shared ≥ 0.47)

- `AppChrome.astro` (in `Layout.astro`) renders the shared bottom tab bar: Start · Kategorien ·
  Suche (instant catalogue filter) · Warenkorb (page, with the basket count) · Mehr (theme,
  language, sibling properties, CTA). No hamburger, no top bar on the phone; the header tucks away
  while scrolling.
- The product page shows a buy bar above the tab bar once the reader has scrolled past the offers.
  It only scrolls back to them, never into a checkout of its own, so the advertising label and the
  24-hour rule stay in front of the decision.
- PWA: prerendered `/manifest.webmanifest` and `/sw.js`. The basket, checkout, order pages and
  `/go/` are never cached and never speculatively prerendered (pinned in `header.test.ts`).
- Theme and language are saved through `tds-shared/prefs` (cookie on `.tracht-digital.de` plus
  account sync).

## Shared chrome

- `siteLinks()` (reads tds-shared's `PROPERTY_ORIGINS`) is the only source of sibling URLs. The main
  site's link reads "Startseite" / "Home".
- `header.test.ts` fails on a local bar, on an `is:inline` app-shell script (its import would reach
  the browser as a bare specifier), and on a missing link to the journal, tools site or main site.

## Toolchain

- Astro 7, TypeScript 6 (TS 7 is capped by `@astrojs/check`'s peer range), vitest 4, tds-shared as
  a 0.x caret (minor-locked; see `package.json` for the current pin).
- Node 22 in CI with npm forced to 11; npm 10's arborist crashes resolving Astro 7.
- `npm install --no-package-lock`: a Windows-generated lockfile doesn't resolve on Linux.
- `.htaccess` compresses responses; fonts are preloaded.

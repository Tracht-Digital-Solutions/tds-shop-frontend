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
  product uses the API's `alternateSlug` (tds-ext-shop >= 0.6.9; slugs may differ per language).
- Page hreflang, sitemap alternates and llms.txt all pair products with `productPairKey()`; keep
  them on that one rule. Without the field (older API) a product is probed under the same slug.
- `Header.astro`'s language switch uses the resolved alternate and falls back to the home page.
- `Layout.astro` makes any site-relative `altUrl` absolute (hreflang must be fully qualified).
  Markup uses `de` / `en`; the sitemap's `xhtml:link` uses `de-DE` / `en-GB`. All four public
  properties agree, so one shared audit checks them.

## Sitemap

The shop extension sends `product` cache events with the actual slug and language, plus
`category` events with a category slug. `cache.ts` resolves these into the public routes.
Product changes also refresh `/llms.txt`; category events cover both languages, including
the last product being removed. Deploy this event mapping before enabling publication
notifications in the API extension. The API's `shop/cache_token` must match the Node host's
`TDS_CACHE_TOKEN`.

Sectioned: `sitemap-{pages,categories,products,legal}.xml` (`src/lib/sitemapSections.ts`), products
with their photo as `image:image`. Don't reintroduce `@astrojs/sitemap`: under `output: "server"` a
build emits no routes, and it would ship a sitemap with only the pages its own filter excluded.

## Catalogue filter bar (tds-shared ≥ 0.53.1)

- `ShopFilterToggle.astro` (a brand button) closes the intro's heading row (`.shop-intro__head`) on the right;
  `ShopFilterBar.astro` renders the panel under the intro: tds-shared's `.tds-filterbar__*` + `mountFilterBar()`,
  closed by default. Search, Art (own / affiliate from `offers[].kind`; a product with both
  matches both), Kategorie (front page only), Themen (the ten most common tags on the page) and order (Empfohlen =
  API order, Neueste by `publishedAt`, A–Z, Preis ↑/↓).
- **The price sort reads `data-price`, written through `displayPrice`** — exactly the figure the card shows in the
  same render, so a partner price past the 24-hour rule is neither shown nor sorted by; products without a showable
  price go last both ways.
- Client-side only: the page cache keys on the path, so a query string never reaches the server's answer. On the
  front page the hero's category chips (`a[data-filter-category]`) drive the Kategorie group without a page load
  (2026-10-19); they stay links for crawlers, modifier clicks and no-JS. On a category page they navigate.
- `ProductGrid filterable` wraps each card in a `display: contents` `.shop-filter-item` with the data. On the grouped
  front page (more than 12 products, four per shelf) the full grid ships in a `<template data-filter-all>` and
  replaces the shelves while a filter is set; the default view is the shelves.
- Copy reaches the script as data attributes; the i18n module stays on the server.

## The phone is an app (tds-shared ≥ 0.47)

- `AppChrome.astro` (in `Layout.astro`) renders the shared bottom tab bar: Start · Kategorien ·
  Suche (instant catalogue filter) · Warenkorb (page, with the basket count) · Mehr (theme,
  language, sibling properties, CTA). No hamburger, no top bar on the phone; from 64rem the header is
  two corner islands (`.tds-sitebar__island`, tds-shared ≥ 0.51), not a bar.
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

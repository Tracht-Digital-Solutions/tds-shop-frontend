# Things that fail silently

## 1. `Astro.rewrite()` and `Astro.redirect()` only work from a page

Returned from a component's frontmatter, they just stop that component rendering, and the page
answers **200 with an empty document** (15 bytes, no error), which the page cache then stores.

- The product fetch and its 404 live in `src/pages/produkt/[slug].astro`, not `ProductPage.astro`.
- `/kasse/[slug]` looks the product up in `src/lib/sellable.ts`; both exits live in the page, and
  `CheckoutPage.astro` only receives something it can render.
- **Measure response size as well as status.** `200 15B` is the fingerprint of this bug and looks
  like a loading glitch in a browser.

## 2. The default API base is production

`PUBLIC_API_URL` falls back to `https://api.tracht-digital.de`. A local `npm start` without `.env`
sends real requests there. Put `PUBLIC_API_URL=http://127.0.0.1:9` in `.env` first.

## 3. A broken render is cached like a good one

`rm -rf var/page-cache` before concluding anything. The dev server writes the cache too; a stale
entry shows **old markup with new CSS**, which reads like a half-applied change.

## 4. `TDS_SITE_KEY` comes from `process.env`

Astro inlines only `PUBLIC_*`, so `import.meta.env.TDS_SITE_KEY` is silently `undefined` and the
site runs keyless.

## 5. Content reads fail soft, except a rejected site key

A rejected key produces a valid page full of fallbacks that would outlive the misconfiguration in
the cache. `assertKeyAccepted` throws, and `middleware.ts` compares the rejection counter around
the render and refuses to store anything that grew it.

## Don't

- Author a radius or elevation locally. Set a token in the surface layer; this site renders
  `data-surface="blog"` and must keep matching the journal.
- Hand-roll a header or footer, or write a sibling URL inline (use `siteLinks()`).
- Reintroduce `@astrojs/sitemap`.
- `set:html` a product body. It is panel-authored and untrusted; tds-shared's `renderMarkdown`
  escapes before transforming.
- Link an affiliate URL directly. Everything goes through `/go/{id}`, so the partner tag lives in
  one database row.
- Add a path under `/kasse`, `/warenkorb`, `/bestellung` or `/konto` without checking all three cache
  mechanisms (`noCache.ts`, `middleware.ts`, `.htaccess`).
- Add `public/llms.txt`; it would shadow the generated route (see [audits.md](audits.md)).

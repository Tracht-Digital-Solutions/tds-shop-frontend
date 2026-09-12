# tds-shop-frontend

**TDShop** — `shop.tracht-digital.de`. A curated catalogue of technology for
digitalising a business: affiliate offers (Amazon and other partner
programmes) alongside TDS's own digital service packages.

Astro 7 under Node, server-rendered behind a file-backed page cache, the same
shape as `blog.tracht-digital.de` and `tools.tracht-digital.de`. The catalogue
itself lives in the panel (`tds-ext-shop-pkg`) and is read at request time from
the composed API.

## The design is the journal's, not a copy of it

`<html data-surface="blog" data-flat>` — the same geometry layer the journal and
the tools site render, imported from `tds-shared`. There is deliberately **no**
fourth `surfaces/shop.css`: it would by definition be a second copy of the
journal's kit, and that drift is exactly what moving the geometry into the
shared layer was meant to end. Set a token in the surface layer; never
re-declare a shared class here.

The chrome is the journal's as well. `Header.astro` and `Footer.astro` are built
from the classes the journal and the tools site use — `.brand-header`, the DE|EN
`.tds-lang-toggle`, the `.tds-mobile-menu` sheet driven by `mountMobileNav`, a
`.tds-tone-navy` footer — and link to the sibling properties through
`siteLinks()` in `src/lib/seo.ts`. The journal links to the shop from its nav;
the shop links back from header, footer and the empty catalogue.
`src/lib/header.test.ts` pins that.

## Four rules that are not preferences

**1. A price older than 24 hours is not shown.** The Amazon Product Advertising
licence allows a fetched price to be displayed for one day, with the time it
was retrieved. The API strips an expired quote before it answers, and
`ProductCard` in `tds-shared` drops it again in the renderer. Neither layer
trusts the other, because the failure is invisible — last week's price renders
perfectly — and it costs the partner programme rather than the layout.

**2. Affiliate offers are labelled as advertising.** § 5a Abs. 4 UWG. The label
comes from the placement endpoint and is rendered by the shared card, so no page
here can forget it. Every outbound partner link carries
`rel="sponsored nofollow noopener"`.

**3. A product without its own written assessment is not indexed.** `noindex,
follow`, and absent from the sitemap — `isIndexable()` in `src/lib/indexing.ts`
is the single function both the page's robots meta and `sitemap.ts` consult, so
the two cannot disagree. This is what stops a bulk import of three hundred ASINs
from turning the domain into the thin-affiliate pattern search engines demote.

**4. `Product` structured data carries `offers` only for our own products.** An
affiliate entry gets `Product` *without* a price. Two reasons, either sufficient:
merchant-listing markup is meant for pages where the reader can buy, and rule 1
makes a permanently correct affiliate price structurally impossible.

## The cache boundary

Catalogue, product, category and legal pages are cached. `/warenkorb`,
`/kasse`, `/bestellung`, `/konto`, `/suche` and `/go/` never are.

**A cached checkout page shows the next visitor the previous one's order**, and
it looks like a working page. So three independent mechanisms enforce it:

| Where | What |
|---|---|
| `src/lib/noCache.ts` | the list, in a plain module so it can be tested |
| `src/middleware.ts` | sets `cache-control: no-store, private` on those paths |
| `public/.htaccess` | `TDS_NOCACHE` flag excludes them from the disk-hit rewrite |

`src/lib/cache.ts` also simply never maps an event onto them. Editing one of
these without knowing about the others is the realistic way this breaks.

## Develop

```bash
npm install --no-package-lock   # a Windows lockfile breaks Linux CI
npm run type-check              # astro check
npm run test:run
npm run build                   # postbuild assembles release/
npm start                       # runs the built server
```

**Never point a local run at the production API.** Put a dead base in `.env`:

```
PUBLIC_API_URL=http://127.0.0.1:9
```

Without it the default is `https://api.tracht-digital.de`, which is reachable —
a local smoke test then sends real requests to production. With it every read
fails and falls back to `src/lib/demoContent.ts`, which is also the state worth
exercising: the demo entries carry no prices and no offers, and are never
indexable, so an outage cannot bake placeholder pages into an index.

If a page renders oddly after a failed run, clear `var/page-cache` — a broken
render gets stored like any other.

## Branches and the pipeline

Four workflows, the same shape the journal and the landing page use.

| Workflow | Trigger | Builds | Publishes | Deploys |
|---|---|---|---|---|
| `ci.yml` | pull request | production config | nothing | no |
| `dev.yml` | push to `main` | `PUBLIC_DEMO_MODE=true` | orphan `dev` branch | **no** |
| `release.yml` | manual button | production config | orphan `release` branch | yes, webhook |

The body is `_build.yml`; the three above only choose inputs.

**`dev` is the push-to-main gate.** `ci.yml` gates pull requests, and nothing
gated a direct push — which is how most work lands here. It publishes rather
than merely building because a tree that *assembles* is not the same as a tree
that *starts*: `pack-release.mjs` refuses to produce one that could not boot on
the host, so publishing exercises the part that actually breaks.

**The dev artifact reaches nothing.** `PUBLIC_DEMO_MODE=true` makes the content
client return its fixtures *without a request* — see `src/lib/demoContent.ts`.
So the branch can be checked out and started with no site key, no API, and no
way for a developer build to touch production. The outage fallback is a
different path: that one fires when a real build cannot get an answer.

**Deploying is a decision, not a side effect.** This is a Node application
behind Passenger; the tree only works on a host configured for it (Node app on,
document root `client/`, startup `app.cjs`, restart after the pull). A push to
`main` that deploys would take the site down from a commit that never mentioned
deployment. Content changes need no deploy at all — they go live through a
cache rebuild.

## Deploy

`npm run build` produces `release/`: `app.cjs`, a minimal package.json with
**public-registry dependencies only** (the host has no GitHub Packages token),
the bundled `server/`, `client/` as the document root, a prebuilt linux-x64
`node_modules/`, and `tmp/` for the Passenger restart trigger. Everything
first-party is bundled into `server/` by `vite.ssr.noExternal`.

Host setup, site key and cache token: `tds-core-frontend-api/SITES.md` §1.
`SHOP_PUBLIC_URL` on the **API** host controls the origin product and
click-redirect links are built from.

## Not built yet

Pagination, tag pages, guides (`/ratgeber/*`), search, a cart, and per-product
OG images. The routes reserved for them are already excluded
from the cache and the index, so adding them does not require revisiting those
decisions.

The pairing wizard **is** here, at `/install` — prerendered, noindex,
disallowed in robots.txt. It is how the site gets its site key without a
rebuild; setting `TDS_SITE_KEY` on the host by hand is the one-release
fallback, not the intended route.

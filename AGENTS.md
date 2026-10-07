# AGENTS.md — tds-shop-frontend

**TDShop**, `shop.tracht-digital.de`. Astro 7, `output: "server"` under Passenger, behind the
shared file-backed page cache. It renders the catalogue and checkout from
`tds-ext-shop-pkg` (via `tds-core-frontend-api`) and shares the journal's design (`blog`
surface). Read [README.md](README.md) first for the four standing rules and the cache
boundary; the files below cover what breaks silently.

## Commands

```bash
npm install --no-package-lock   # Node 22, npm 11; lockfile is gitignored
npm run dev                     # astro dev (a daemon; see docs/agents/audits.md)
npm run type-check              # astro check
npm run test:run                # vitest
npm run lint:primitives
npm run build                   # postbuild assembles release/
npm run audit:geo -- <url>      # also audit:a11y, audit:mobile
```

## Hard rules

- Put `PUBLIC_API_URL=http://127.0.0.1:9` in `.env` before any local run; the default is production.
- `Astro.rewrite()` / `Astro.redirect()` only from a **page**, never a component.
- Read `TDS_SITE_KEY` from `process.env`, never `import.meta.env`.
- Clear `var/page-cache` before judging any local render.
- Never cache or speculatively prerender `/kasse`, `/warenkorb`, `/bestellung`, `/konto` or `/go/`.
- Affiliate links always go through `/go/{id}`. Product bodies go through `renderMarkdown`, never raw `set:html`.
- Never derive an hreflang alternate by prefixing `/en/`; only resolved `altUrl`s.
- No local radius, elevation, header, footer or sibling URL; use tds-shared and `siteLinks()`.
- No `@astrojs/sitemap`, no `public/llms.txt`.
- tds-shared is a minor-locked 0.x caret: a shared minor needs a repin and re-verification.

## Topic files

| File | Read before |
|---|---|
| [docs/agents/architecture.md](docs/agents/architecture.md) | Changing where a rule lives, i18n/hreflang, the app shell or the toolchain |
| [docs/agents/pitfalls.md](docs/agents/pitfalls.md) | Any change to pages, rendering, caching or site keys |
| [docs/agents/checkout.md](docs/agents/checkout.md) | Touching `/kasse`, `/bestellung`, the basket or VAT display |
| [docs/agents/design-motion.md](docs/agents/design-motion.md) | Changing styles, motion, shadows or mobile chrome |
| [docs/agents/audits.md](docs/agents/audits.md) | Running or changing the geo, accessibility or mobile audits |

Workspace rules: `../CLAUDE.md`. Cross-repo state: `../MIGRATION-STATUS.md`.

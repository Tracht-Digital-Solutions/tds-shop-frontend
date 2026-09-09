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
vitest 4, `tds-shared ^0.36.0`. The 0.x caret is **minor-locked** — a shared
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

## The checkout

`/kasse/[slug]` and `/bestellung/[token]`, plus their `/en/` mirrors. None of
them is ever cached — see the cache boundary above.

**The order button lives here, not at Stripe.** § 312j Abs. 3 BGB requires a
button reading "Zahlungspflichtig bestellen" with the mandatory details
immediately above it. Stripe's hosted page says "Bezahlen" and is not ours to
relabel, so the declaration is made on our page and Stripe is only the payment
step that follows. That is also why `CheckoutPage.astro` is server-rendered:
the details have to be in the document the reader receives, not assembled
afterwards by a script that may not run.

**The withdrawal checkbox is a precondition.** For a digital service the right
of withdrawal lapses on full performance only if the customer expressly agreed
beforehand (§ 356 Abs. 4 BGB). It is never pre-ticked, the button stays
disabled without it, and the **server refuses too** — the browser check is a
courtesy, the server check is the rule. The exact wording travels with the
request so the order records the sentence the customer actually read.

**The VAT split is computed twice and must agree.** `src/lib/sellable.ts`
mirrors `OrderRepository::price()`: round the tax, then add. A page showing a
total the customer is not charged is worse than either rounding on its own, and
nothing flags it — both numbers look plausible. `checkout.test.ts` pins the
arithmetic on both sides of that boundary.

**`/bestellung/{token}` is also Stripe's `success_url`.** So it is the first
page after paying, and the webhook may not have arrived yet. A `pending` order
therefore renders as "payment received, confirmation follows" — never as a
failure. Telling a paying customer their order does not exist because of a race
is the worst thing that page could do.

### The redirect trap, again

`Astro.redirect()` has the same limitation as `Astro.rewrite()`: it only
produces a response when returned from a **page**. `/kasse/[slug]` originally
looked the product up inside `CheckoutPage.astro` and redirected from there —
which answered **200 with an empty document**, fifteen bytes, for every product
that is not for sale. The lookup now lives in `src/lib/sellable.ts`, both exits
live in the page, and the component only ever receives something it can render.

Measure response **size** as well as status when checking this site. `200 15B`
is the fingerprint of that bug and looks like a loading glitch in a browser.


## Motion: five movements, each answering a question

The journal's voice is that motion is **functional** — a thing moves to say
something changed, not to be noticed. Everything in the `--- motion ---` block
of `global.css` answers a question the page would otherwise leave open, and
uses the shared duration and easing tokens rather than a hand-picked curve.

| Movement | The question it answers |
|---|---|
| Basket count pops | "Did that add?" |
| Basket row collapses on remove | "Which row went?" — with six on screen, an instant disappearance leaves the reader checking the whole list |
| Total washes once when it changes | "Did the total move?" — it updates after a debounced round trip, by which time the reader is looking at the row they just edited |
| Product card grows a 2px accent bar | "Is this clickable?" — the journal's own affordance, colour only, no lift |
| Submit button pulses while busy | `aria-busy` says it to a screen reader; this says it to everyone else |

Two of them replay by **remounting** the element with a React `key` on the
value (`CartBadge`'s count, the basket total). Re-running a CSS animation on an
element that never left the DOM otherwise needs a reflow hack; this is the same
thing said honestly.

The row exit **defers the storage write**, not the animation. Removing the row
first and animating a copy would mean keeping a copy, and a basket with a ghost
row in it is a worse bug than an abrupt removal.

### Reduced motion is not a duration clamp

`base.css` already clamps every duration to 0.01ms under
`prefers-reduced-motion: reduce`. For an **entrance** that is enough — it ends
at the natural state, so clamping simply arrives there. It is not enough for
anything that still travels after arriving: a clamped transform still moves. So
the badge pop and the busy pulse are switched off outright, and the row exit
loses its `transform`.

The accent bar deliberately **stays**, at its end state. It is an affordance,
not decoration; removing it would take away the signal that a card is
interactive rather than merely make the page calmer.

`src/lib/surface.test.ts` collects the `@keyframes` names from the file itself
rather than from a hand-kept list, so a new animation cannot be added without
the reduced-motion assertion failing.

### The mobile audit knows about inline links

`scripts/mobile-audit.mjs` exempts a link that sits **inside a sentence**, which
WCAG 2.5.8 does too: its size is constrained by the line-height of the text
around it, and the only way to give it a 24px box is to break the line box. A
link alone in its own paragraph is a button wearing a link's clothes and stays
in scope. Without the exception the legal pages reported every cross-reference
in their prose — noise that teaches a reader to skim past the real findings.
## Accessibility: the third that a machine can check, and the two thirds it cannot

```
MSYS_NO_PATHCONV=1 npm run audit:a11y -- http://localhost:4361 / /en/ /rechtliches/impressum
```

axe-core in a real Chrome, at **WCAG 2.2 AA** — the level
`/rechtliches/barrierefreiheit` claims, so the claim is checked rather than
asserted. It runs in CI after the tests, against the **dev** server with a dead
API and demo content: CI must never read production content to decide whether a
PR is mergeable.

Two notes on running it by hand. The dev server is a **daemon** (`astro dev
stop`, `astro dev status`) — a plain `npm run dev` will happily attach to an
instance started hours ago and serve you the old markup, which reads exactly
like "my change did not apply". And it can end up bound to `[::1]` only when
something already holds the IPv4 address, so prefer `localhost` over
`127.0.0.1` in these URLs.

**A green run is not compliance.** Automated checking reaches roughly a third
of WCAG. The rest is read:

- Does the focus order follow the reading order, and does every stop show a
  ring? (`:focus-visible` is centralised in tds-shared's `base.css` — never
  `outline: none`.)
- Does the skip link actually move focus? It only does because `<main>` carries
  `tabindex="-1"`; without it the browser scrolls and the next Tab continues
  from the link, with the whole header still in the way.
- Does an error message say how to fix the error, and is it associated with the
  field rather than merely near it?
- Is refusing a consent exactly as easy as granting it? The two decisions in the
  banner carry the same class on purpose, and `tds-shared`'s `consent.test.tsx`
  fails if that changes — but nothing can check that a later CSS override did
  not make one of them quieter.
- Does a link make sense read on its own, out of the sentence around it?
- Do the decorative graphics (`.tds-wash`, `.tds-shape`, `.tds-brandbar`) carry
  `aria-hidden="true"` at the call site? A decorative graphic announced to a
  screen reader is worse than no graphic.


## Mobile: measure, do not look

`MSYS_NO_PATHCONV=1 npm run audit:mobile -- http://127.0.0.1:4361 390 / /produkt/<slug>`

(The `MSYS_NO_PATHCONV=1` is not optional in Git Bash: without it the shell
rewrites every `/path` argument into a Windows path before node sees it, and
the failure names a directory nobody typed.)

`scripts/mobile-audit.mjs` drives a real Chrome at a phone viewport and reports
horizontal overflow plus tap targets under 24 CSS px.

**Why a script and not a screenshot.** `body { overflow-x: hidden }` in
tds-shared's `base.css` **clamps `document.scrollWidth` to the viewport**, so a
page always reports that it fits, and an element hanging off the right edge is
clipped rather than shown. A screenshot of a broken mobile layout looks
correct. The audit lifts that clamp for the measurement, which is the only
reason the numbers mean anything — and it checks each element's own rect as
well, because the clamp is not the only way to hide the problem.

Confirm the tool still bites before trusting a clean run: append a 900px-wide
div and check the reported width moves. A silent "ok" from a broken script and
a silent "ok" from a good layout read identically.

### Measure against realistic content, not the demo fallback

`src/lib/demoContent.ts` carries no prices and no offers — deliberately, so an
outage cannot invent either. That also means measuring against it proves only
that an *empty* card fits. The rows that overflow are the ones with four things
in them: merchant, price, retrieval timestamp, button. Point `PUBLIC_API_URL`
at a stub that serves long German compound titles and several offers per
product.

### What the first pass found (2026-09-08)

No horizontal overflow at 320px or 390px — the wrapping in
`.tds-product-offer`, `.shop-pager` and `.tds-field-row` holds. What it did
find was tap targets, which nothing about the page makes look wrong: header
links 23px high, category links 16px, the six footer legal links 18px in a
middot-separated run. All are plain navigation links, so the library's
`pointer: coarse` block (which already lifts `.btn` and `.field-boxed` to 44px
and inputs to 16px against iOS auto-zoom) knew nothing about them. Lifted here;
`.tds-product-card__title` was lifted in tds-shared, because three surfaces
render it.

Middot-separated link runs became wrapping rows in the same pass. Six links
joined by punctuation read as one sentence, and the separator sits between two
targets that are already too small.

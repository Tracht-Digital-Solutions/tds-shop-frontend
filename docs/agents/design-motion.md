# Design and motion

## Motion answers a question

Motion is functional: a thing moves to say something changed. Everything in the `--- motion ---`
block of `global.css` uses the shared duration and easing tokens.

| Movement | Question it answers |
|---|---|
| Basket count pops | "Did that add?" |
| Product picture flies into the header basket, which wobbles (`CartWiring.astro`) | "Where did it go?" |
| Mini basket unfolds from the icon (bounce-in) on hover/focus and for ~3.6 s after an add; lines arrive 45 ms apart, the just-added one tinted with "Hinzugefügt"; stepper and remove in place; the total pops on every new quote | "What is in there, and can I pay now?" |
| Basket row collapses on remove | "Which row went?" |
| Total washes once when it changes | "Did the total move?" (it updates after a debounced round trip) |
| Submit button pulses while busy | `aria-busy` for screen readers; this for everyone else |
| Pages cross-fade (tds-shared `page-transitions.css`) | "Did I leave the shop?" Opacity only, off under reduced motion |
| tds-shared 0.65 quality-of-life layer: controls dip while pressed, `<details>` glide open, links ease colour, a `:target` heading flashes once | "Did my press land?" / "Where did the jump take me?" Zero specificity, off under reduced motion |

- The product card's hover bar lives in tds-shared's `primitives.css`, not here. A local `::before`
  on a shared class vanishes when that component is next touched.
- The count pop and the total wash replay by **remounting** with a React `key` on the value.
- The row exit **defers the storage write**, not the animation. Animating a copy would leave a ghost
  row in the basket.

## Reduced motion is not a duration clamp

`base.css` clamps durations to 0.01 ms under `prefers-reduced-motion: reduce`. That suffices for an
entrance, but a clamped transform still moves. So the badge pop and the busy pulse are switched off
outright, and the row exit loses its `transform`. `src/lib/surface.test.ts` collects `@keyframes`
names from the file itself, so a new animation can't skip the reduced-motion assertion.

## Hard 2D shadows (tds-shared ≥ 0.42)

Every box and control carries a fixed, unblurred offset from the blog surface's
`--tds-shadow-hard*` tokens. Product cards, buttons, the account dropdown and the cookie notice get
them in tds-shared. The end of `global.css` only assigns them to the shop's own boxes
(`.checkout__summary`, `.checkout__payment`, `.shop-empty`, filter chips).

- Hover and keyboard focus lift an interactive element 2 px up-left while its offset grows
  (`--tds-shadow-hard(-sm)-hover`).
- **Never transition a `box-shadow`.**
- `surface.test.ts` still keeps the shop off the resting `--tds-elevation-*` shadows.

## Tap targets

The library's `pointer: coarse` block lifts `.btn` and `.field-boxed` to 44 px and inputs to 16 px
(against iOS auto-zoom). Plain navigation links (header, category, footer legal links) are lifted
here; `.tds-product-card__title` is lifted in tds-shared. Middot-separated link runs are wrapping
rows, because a separator between two small targets makes both worse.

## No gaps, with or without products

- `--tds-product-grid-min` is `max(18rem, (100% - 3 × --shop-grid-gap) / 4)`: the shared grid is
  `auto-fill`, so an 18rem floor alone left empty tracks on the 120rem shell. Four columns at most;
  `surface.test.ts` pins it. Inside `.shop-main` the grid gap is 1.5rem across and 2rem down
  (2026-11-10): the 6px hard offset left only 10px of paper with the shared 1rem.
- Shelf to shelf is `clamp(3.5rem, 7vw, 6rem)`, clearly more than banner → heading → cards inside a
  shelf; with equal spacing the next banner read as the footer of the shelf above.
- Product page buy box: for a single offer the price is the column's largest figure and the action
  spans the box (`.tds-product-offer:only-of-type`); several affiliate offers keep the shared size.
  The column is deliberately not sticky: an affiliate aside can be taller than the window.
- Checkout: address and referral are heading-led groups without a frame; payment keeps its box and
  offset. Legends are floated so they sit inside the padding as headings. `.checkout label` (0,1,1)
  stacks every label as a column, so row labels need the qualified selector
  (`.checkout .checkout__consent`, `.checkout .checkout__method`); the bare classes lost and stacked
  the box above its text.
- `.shop-hero__search .shop-hero__input` is qualified for the same reason: tds-shared's
  `[data-flat] .field-boxed` painted a grey well inside the white search box.
- An empty front page renders `.shop-soon` (eight service areas in 1/2/4 columns, the one CTA wash
  band, journal/tools cards), not a lone box. Keep the area count divisible by four.
- An unlisted category is a 404 (`categoryExists`, fails open on an outage), never an empty grid.
- The intro is a full-bleed band (`margin-inline: calc(50% - 50vw)`, padding back to the shell edge)
  on the journal's tint; its lede is ink-72%, because `--color-muted` on the tint fails AA.
- The front page's hero is a store hero (2026-11-04, after Envato, Creative Market, Gumroad):
  claim, a search form, three check-marked promises (`glance.points`) and up to four category
  tiles with counts in the right column (two or four, never three: 2×2 grid). The search fills
  the filter panel's own `[data-filter-search]` and fires `input`, so there is one search; the
  tiles are `a[data-filter-category]` and ShopFilterBar wires them like the old chips. Category
  pages keep the chip nav and their artwork.
- Own categories have one colour each (2026-11-04, `global.css` "Category colours", the table in
  `stuff/03-Bilder/Bildserie-2026-11/doku/README.md`, `categoryColours.test.ts`). `data-category`
  (hero tiles, shelves, card slots, product page, glance, chips) or the filter value sets `--shop-cat`:
  12 % fill (22 % dark), 4px top band, square swatch before names. Muted ink is remixed into the fill
  for AA. Affiliate categories stay neutral. The image series is themed in the same colour.
- Shelf banners on the front page are their own 4:1 files (`bandSrc`, `<id>-band-2026-*`, 2026-11-10).
  Never put a 16:9 scene back into that strip: it showed only cut-off screens. Prompts and crop
  plan: `stuff/03-Bilder/Shop-Regalbanner-2026-11/`.
- In a grid the shared card clamps its teaser to two lines and shows a 16:9 picture
  (tds-shared ≥ 0.64.6); the full teaser stays in the DOM and on the product page.
- The filter row sits directly under the hero (`.tds-filterbar.shop-filterrow`): product count left,
  toggle right. Pressing the toggle hides it and the panel takes the whole row (tds-shared ≥ 0.57,
  same on Ratgeber and Online-Tools); the close button or Escape brings the toggle back.
- Product cards come from tds-shared with `addToCart`: own offers show "ab" prices, "In den Warenkorb"
  as the filled button and "Direkt zur Kasse" beside it; buttons line up per grid row. One delegated
  listener (`CartWiring.astro`, in the layout) handles every `button[data-add-to-cart]`.
- The header basket (`CartBadge.tsx`) is always visible as an icon; the count badge appears from one
  item. Its peek prices lines via `POST /shop/quote` only while open.

# Design and motion

## Motion answers a question

Motion is functional: a thing moves to say something changed. Everything in the `--- motion ---`
block of `global.css` uses the shared duration and easing tokens.

| Movement | Question it answers |
|---|---|
| Basket count pops | "Did that add?" |
| Basket row collapses on remove | "Which row went?" |
| Total washes once when it changes | "Did the total move?" (it updates after a debounced round trip) |
| Submit button pulses while busy | `aria-busy` for screen readers; this for everyone else |
| Pages cross-fade (tds-shared `page-transitions.css`) | "Did I leave the shop?" Opacity only, off under reduced motion |

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

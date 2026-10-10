# Checkout

Pages: `/kasse/[slug]` and `/bestellung/[token]` plus their `/en/` mirrors, and the basket
(`/warenkorb`). None of them is ever cached.

## The order button lives here, not at the payment provider

§ 312j Abs. 3 BGB requires a button reading **"Zahlungspflichtig bestellen"** with the mandatory
details immediately above it. Stripe's hosted page says "Bezahlen" and can't be relabelled, so the
declaration is made on our page; the provider is only the payment step that follows.
`CheckoutPage.astro` is server-rendered because the details must be in the document the reader
receives, not assembled by a script that may not run.

## The withdrawal checkbox is a precondition

For a digital service the right of withdrawal lapses on full performance only with the customer's
express prior agreement (§ 356 Abs. 4 BGB).

- Never pre-ticked; the button stays disabled without it.
- **The server refuses too.** The browser check is a courtesy; the server check is the rule.
- The exact wording travels with the request, so the order records the sentence the customer read.

## The VAT split is computed twice and must agree

`src/lib/sellable.ts` mirrors `OrderRepository::price()` in `tds-ext-shop-pkg`: **round the tax,
then add.** A page showing a total the customer isn't charged is worse than either rounding alone,
and both numbers look plausible. `checkout.test.ts` pins the arithmetic on both sides.

## `/bestellung/{token}` is also the payment `success_url`

It is the first page after paying, and the webhook may not have arrived yet. A `pending` order
renders as "payment received, confirmation follows", never as a failure.

## Empfehlungen (`?ref=`)

- `src/lib/referral.ts`: a `?ref=CODE` is carried into every same-site link **at click time**.
  Nothing is stored in the browser. A stored code would need consent, and the banner's
  "Werbung" category describes ad scripts, not referral attribution. `/go/` links never
  carry it.
- The page cache drops the query from its key, so the parameter costs no render and the
  canonical stays the bare path.
- `/kasse` pre-fills the visible, editable code field from the address and shows "Empfohlen
  von …" via `GET /shop/referral/{code}`. "Wer hat uns empfohlen?" is free text. Both are
  optional and travel in `startCheckout()`. The server drops unknown codes.

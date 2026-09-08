import { getProduct } from "./content-api";
import type { Lang } from "./i18n";
import type { ProductPage, SellableOffer } from "./types";

/**
 * Resolve what a checkout page needs, or nothing.
 *
 * Lives here rather than inside `CheckoutPage.astro` for the reason already
 * learned once in this repository: **`Astro.redirect()` and `Astro.rewrite()`
 * only produce a response when returned from a PAGE.** From a component's
 * frontmatter they merely stop that component rendering, and the page answers
 * 200 with an empty document — fifteen bytes, no error. A checkout page that
 * did that would greet a would-be buyer with a blank success page.
 *
 * So the lookup happens here, the page decides what to do with `null`, and the
 * component only ever receives something it can render.
 */
export interface Sellable {
  product: ProductPage;
  offer: SellableOffer;
  netCents: number;
  vatRateBp: number;
  taxCents: number;
  grossCents: number;
}

export async function resolveSellable(slug: string, lang: Lang): Promise<Sellable | null> {
  const product = await getProduct(slug, lang);
  if (!product) return null;

  const offer = product.offers.find(
    (o): o is SellableOffer => o.kind === "own" && o.netCents != null,
  );
  if (!offer) return null;

  const netCents = offer.netCents as number;
  const vatRateBp = offer.vatRateBp ?? 1900;
  // Round the TAX, then add — the same order the server uses. Deriving the tax
  // back out of a gross loses a cent on roughly a third of amounts, and a
  // checkout page showing a different total from the one charged is worse than
  // either rounding.
  const taxCents = Math.round((netCents * vatRateBp) / 10000);

  return { product, offer, netCents, vatRateBp, taxCents, grossCents: netCents + taxCents };
}

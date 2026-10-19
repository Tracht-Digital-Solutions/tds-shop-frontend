/**
 * This site's profile for `tds-geo-audit` (the search and answer-engine
 * audit tds-shared ships since 0.59). The checks are shared; what a page here
 * must declare, refuse or close is decided below.
 *
 *   npm run audit:geo -- http://127.0.0.1:4321
 */
export default {
  /** The origin the markup names in canonicals, alternates and the sitemap. */
  site: "https://shop.tracht-digital.de",
  defaultBase: "http://localhost:4321",
  sitemapIndexPath: "/sitemap-index.xml",
  langs: ["de", "en"],
  titleMax: 65,
  /** Headlines come from the CMS: report an over-long one, do not fail on it. */
  titleMaxHard: false,
  descriptionRange: [80, 160],
  minWords: 120,

  /**
   * robots.txt must name every one of these and keep `requiredDisallow`
   * closed in each group. Blocking a search or fetch agent removes the site
   * from that engine's answers without producing any error, so the list is a
   * contract, not a preference. Tier A are answer engines, tier B retired
   * names kept so an old crawler reads the same rules, tier C newer answer
   * surfaces. Dataset-only crawlers (CCBot, Bytespider, Amazonbot, …) are
   * deliberately absent: they have no answer surface for this audience and
   * every added group has to repeat the whole Disallow set — which on this
   * site is thirteen lines.
   */
  agents: [
    "*",
    // A — OpenAI, Anthropic, Perplexity, Google, Apple
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    // B — retired names
    "Claude-Web",
    "anthropic-ai",
    // C — Meta AI, DuckDuckGo, Mistral
    "meta-externalagent",
    "meta-externalfetcher",
    "DuckAssistBot",
    "MistralAI-User",
  ],
  /**
   * The largest closed set of the four sites: the click redirect, the baskets
   * and the operator surfaces. `/go/` matters most — it counts a click and
   * forwards to a partner, so a crawler walking it inflates the counter with
   * traffic no person generated.
   */
  /**
   * A listed page may legitimately have no counterpart — a tag that exists in
   * one language only, a product published in one tree. No hreflang is then
   * the honest answer, so its absence warns and reciprocity still fails.
   */
  hreflangRequired: false,

  requiredDisallow: [
    "/go/",
    "/warenkorb",
    "/kasse",
    "/bestellung",
    "/konto",
    "/suche",
    "/en/cart",
    "/en/checkout",
    "/en/order",
    "/en/account",
    "/en/search",
    "/install/",
    "/tds/",
  ],

  /**
   * `@id` values a reference may point at although no node on the page
   * declares them.
   *
   * The organisation and the person are one business across four properties,
   * anchored on the marketing origin. The front pages of this site now DECLARE
   * the organisation rather than only pointing at it, so the anchor is what a
   * subpage's `publisher` resolves against.
   */
  entityAnchors: [
    "https://tracht-digital.de/#organization",
    "https://tracht-digital.de/#person",
    "https://shop.tracht-digital.de/#website",
  ],

  /**
   * Types and properties this site refuses.
   *
   * `Review` and `AggregateRating` are the load-bearing ones here: there are
   * no reviews of these products anywhere, and inventing rating markup on a
   * shop is both a lie and a manual-action risk. `HowTo` has no place on a
   * catalogue, and there is no search route to describe with a `SearchAction`.
   */
  forbiddenTypes: ["SearchAction", "HowTo", "Review", "AggregateRating"],
  forbiddenProps: ["openingHoursSpecification", "aggregateRating", "review"],

  /**
   * The claims this site must never make. No ratings or test wins, no
   * customer names, and no promise about delivery, returns or warranty — on an
   * affiliate entry those belong to the merchant, and saying otherwise is
   * wrong in a way a reader only discovers after buying.
   */
  bannedWords: /testsieger|testurteil|bestseller|unschlagbar|garantierte lieferung|kostenlose r[üu]cksendung/i,

  llmsBudgetBytes: 12 * 1024,

  /**
   * The audit must never follow the click redirect. It counts a click and
   * forwards to a partner: an audit that walked it would inflate the affiliate
   * counter, which is a data-integrity bug, not a crawl nuisance.
   */
  skipPaths: ["/go/"],

  /**
   * Which structured data a page of this kind has to carry, and whether it
   * must name a date.
   */
  pageKind(path) {
    if (path === "/" || path === "/en/") {
      // The front pages are where the organisation is DESCRIBED; every
      // subpage references it by `@id` from there.
      return {
        kind: "home",
        requiredTypes: ["WebSite", "Organization", "CollectionPage", "ItemList"],
      };
    }
    if (/^\/(kategorie|en\/category)\/[^/]+$/.test(path)) {
      return {
        kind: "category",
        requiredTypes: ["WebSite", "CollectionPage", "ItemList", "BreadcrumbList"],
      };
    }
    if (/^\/(produkt|en\/product)\/[^/]+$/.test(path)) {
      return {
        kind: "product",
        requiredTypes: ["WebSite", "WebPage", "Product", "BreadcrumbList"],
        // Every product page carries `updatedAt`, so every one shows a "Stand"
        // line and publishes a matching `dateModified`.
        requireDate: true,
      };
    }
    return { kind: "other", requiredTypes: [] };
  },

  /** No checks beyond the universal set. */
  extraCheckIds: [],
};

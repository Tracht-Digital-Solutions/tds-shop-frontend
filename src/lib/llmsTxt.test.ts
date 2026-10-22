import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { describedCategories } from "./categoryCopy";
import { categoryPath, homePath, productPath } from "./i18n";
import { PRODUCT_LINE_MAX, productLine, renderLlmsTxt, type LlmsInput } from "./llmsTxt";
import { canonical } from "./seo";

/**
 * `/llms.txt` is this shop's index for answer engines, and it is generated.
 *
 * The assertion that matters most is the NEGATIVE one: no price may appear in
 * it. A partner price is only publishable while it is demonstrably current
 * (the 24-hour rule), and this file is rendered from a cached read and cached
 * again by whoever fetches it — so a figure here is a stale price stated with
 * authority to a reader who cannot see how old it is.
 */
const input: LlmsInput = {
  categories: [
    { slug: "netzwerk", label: "Netzwerk", total: 4 },
    { slug: "peripherie", label: "Peripherie", total: 2 },
    // A category with nothing in it is not a page the sitemap lists, so it
    // must not be advertised here either.
    { slug: "leer", label: "Leer", total: 0 },
  ],
  products: [
    {
      slug: "switch-8-port",
      title: "8-Port-Switch für kleine Büros",
      teaser: "Lüfterlos, PoE auf vier Ports, in zehn Minuten eingerichtet.",
      category: "netzwerk",
    },
    {
      slug: "dokumentenscanner",
      title: "Dokumentenscanner mit Einzug",
      teaser: "Für den Papierstapel, der jeden Monat wiederkommt.",
      category: "peripherie",
    },
  ],
};

const llms = renderLlmsTxt(input);

describe("llms.txt", () => {
  it("names both catalogue pages", () => {
    expect(llms).toContain(canonical(homePath("de")));
    expect(llms).toContain(canonical(homePath("en")));
  });

  it("names every non-empty category in both languages", () => {
    for (const { slug, total } of input.categories) {
      if (total === 0) continue;
      expect(llms, slug).toContain(canonical(categoryPath(slug, "de")));
      expect(llms, slug).toContain(canonical(categoryPath(slug, "en")));
    }
  });

  it("leaves an empty category out", () => {
    expect(llms).not.toContain(canonical(categoryPath("leer", "de")));
  });

  it("names every product with its German URL and never derives an English one", () => {
    // DE and EN slugs may differ; `/en/product/<german-slug>` was a 404.
    for (const product of input.products) {
      expect(llms, product.slug).toContain(`**${product.title}**`);
      expect(llms, product.slug).toContain(canonical(productPath(product.slug, "de")));
      expect(llms, product.slug).not.toContain(canonical(productPath(product.slug, "en")));
    }
  });

  it("names an English page only where the English tree holds it", () => {
    // Paired like the sitemap; an English page without a German twin is listed on its own.
    const [first] = input.products;
    const text = renderLlmsTxt({
      ...input,
      products: [{ ...first!, englishSlug: "own-english-slug" }],
      englishOnly: [{ slug: "wifi-router", title: "Wi-Fi router" }],
    });
    expect(text).toContain(`(English: ${canonical(productPath("own-english-slug", "en"))})`);
    expect(text).toContain(`- Wi-Fi router: ${canonical(productPath("wifi-router", "en"))}`);
  });

  it("prefers the Kurz-gesagt summary over the teaser", () => {
    const text = renderLlmsTxt({
      ...input,
      products: [{ ...input.products[0]!, summary: "Zwei Sätze, die antworten." }],
    });
    expect(text).toContain("— Zwei Sätze, die antworten.");
  });

  it("states no price at all", () => {
    expect(llms).not.toMatch(/\d[\d.,]*\s*(€|EUR)/);
  });

  it("states the two rules a quoting engine has to know", () => {
    // The staleness rule and the affiliate labelling. Both are legal or
    // editorial obligations, not decoration.
    expect(llms).toMatch(/24 Stunden/);
    expect(llms).toMatch(/§ 5a Abs\. 4 UWG/);
    expect(llms).toMatch(/keine Bewertungen/i);
  });

  it("makes no claim the shop cannot keep", () => {
    expect(llms).not.toMatch(/testsieger|bestseller|unschlagbar/i);
    expect(llms).not.toMatch(/kostenlose r[üu]cksendung|garantierte lieferung/i);
  });

  it("stays one small file", () => {
    expect(Buffer.byteLength(llms, "utf8")).toBeLessThanOrEqual(12 * 1024);
    expect(llms).not.toMatch(/llms-full/);
  });

  it("has no static copy to shadow the route", () => {
    // A file in `public/` wins over a route of the same path, so the endpoint
    // would silently never answer.
    expect(existsSync(resolve(process.cwd(), "public/llms.txt"))).toBe(false);
  });

  it("uses the written entry answer where a category has one", () => {
    for (const slug of describedCategories) {
      if (!input.categories.some((c) => c.slug === slug && c.total > 0)) continue;
      // The first sentence of the category's own answer, not a generated one.
      expect(llms, slug).toMatch(new RegExp(`\\*\\*[^*]+\\*\\* — `));
    }
  });
});

describe("productLine", () => {
  it("keeps the first sentence", () => {
    expect(productLine("Einrichtung des Routers samt Gastnetz und Sicherung. Danach eine kurze Einweisung.")).toBe(
      "Einrichtung des Routers samt Gastnetz und Sicherung.",
    );
  });

  it("does not stop at an abbreviation early in the text", () => {
    expect(productLine("Z. B. für Praxen und Kanzleien: ein eigenes Netz für Gäste.")).toBe(
      "Z. B. für Praxen und Kanzleien: ein eigenes Netz für Gäste.",
    );
  });

  it("clamps a long sentence at a word boundary", () => {
    const line = productLine(`${"Wort ".repeat(40)}Ende.`);
    expect(line.length).toBeLessThanOrEqual(PRODUCT_LINE_MAX);
    expect(line.endsWith("Wort…")).toBe(true);
  });
});

describe("llms.txt size", () => {
  // The live file was 19.7 KB with 43 products (2026-10-21) against a 12 KB
  // budget. The audit budget is now 24 KB; this pins that a catalogue 40 % over
  // today's size, with long summaries and every product in both trees, fits.
  it("stays under 24 KB for 60 products in each tree", () => {
    const long = "Eine ausführliche Einschätzung, die deutlich länger ist als eine Zeile im Index sein sollte. ".repeat(3);
    const big: LlmsInput = {
      categories: input.categories,
      products: Array.from({ length: 60 }, (_, i) => ({
        slug: `produkt-mit-einem-laengeren-slug-${i}`,
        title: `Ein Produkt mit einem typischen Titel Nummer ${i}`,
        teaser: long,
        summary: long,
        category: "netzwerk",
      })),
      englishOnly: Array.from({ length: 60 }, (_, i) => ({
        slug: `product-with-a-longer-slug-${i}`,
        title: `A product with a typical title number ${i}`,
      })),
    };
    expect(Buffer.byteLength(renderLlmsTxt(big), "utf8")).toBeLessThan(24 * 1024);
  });
});

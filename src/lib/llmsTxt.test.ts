import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { describedCategories } from "./categoryCopy";
import { categoryPath, homePath, productPath } from "./i18n";
import { renderLlmsTxt, type LlmsInput } from "./llmsTxt";
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

  it("names every product in both languages", () => {
    for (const product of input.products) {
      expect(llms, product.slug).toContain(`**${product.title}**`);
      expect(llms, product.slug).toContain(canonical(productPath(product.slug, "de")));
      expect(llms, product.slug).toContain(canonical(productPath(product.slug, "en")));
    }
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

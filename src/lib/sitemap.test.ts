import { describe, expect, it } from "vitest";

import { renderUrlset, type SitemapEntry } from "./sitemap";

/**
 * The sitemap's locale pairing.
 *
 * `SitemapEntry.alternates` was declared when the file was written and never
 * filled or rendered, so the sitemap offered no pairing at all — the same gap
 * as the missing hreflang in the markup, in the other document a crawler
 * reads.
 *
 * It is tested here rather than through `buildEntries()` because that function
 * needs the catalogue API, and the demo fixtures deliberately mark every
 * product `editorialStatus: "none"` so an outage cannot push placeholders into
 * an index. The pairing and the rendering are the parts that can be wrong; the
 * fetching is covered by the audit against a real site.
 */
const de = "https://shop.tracht-digital.de/produkt/switch";
const en = "https://shop.tracht-digital.de/en/product/switch";

const paired: SitemapEntry[] = [
  { loc: de, lastmod: "2026-09-01", alternates: [{ lang: "de", href: de }, { lang: "en", href: en }] },
  { loc: en, lastmod: "2026-09-01", alternates: [{ lang: "de", href: de }, { lang: "en", href: en }] },
];

describe("renderUrlset", () => {
  const xml = renderUrlset(paired);

  it("declares the xhtml namespace it uses", () => {
    // Without it the alternate elements are not in any namespace a parser
    // recognises, and the whole set is ignored rather than reported.
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  });

  it("lists every alternate of a group on EVERY member, including itself", () => {
    // Reciprocity is the rule Google states: a page must name itself among its
    // alternates, or the set is one-directional and discarded.
    for (const half of [de, en]) {
      const block = xml.split("<url>").find((part) => part.includes(`<loc>${half}</loc>`))!;
      expect(block, half).toContain(`hreflang="de-DE" href="${de}"`);
      expect(block, half).toContain(`hreflang="en-GB" href="${en}"`);
    }
  });

  it("points x-default at the German tree, once per url", () => {
    const block = xml.split("<url>").find((part) => part.includes(`<loc>${en}</loc>`))!;
    expect(block).toContain(`hreflang="x-default" href="${de}"`);
    expect(block.match(/x-default/g)).toHaveLength(1);
  });

  it("emits no alternate at all for an unpaired url", () => {
    // A product whose translation lives under a different slug cannot be
    // paired from the frontend — the payload carries no product id. No
    // alternate is the honest outcome; one dangling alternate would invalidate
    // the whole set.
    const lone = renderUrlset([{ loc: de, lastmod: "2026-09-01" }]);
    expect(lone).not.toContain("xhtml:link");
    expect(lone).toContain(`<loc>${de}</loc>`);
  });

  it("keeps lastmod", () => {
    expect(xml).toContain("<lastmod>2026-09-01</lastmod>");
  });
});

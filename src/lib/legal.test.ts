import { describe, expect, it } from "vitest";

import {
  bundledLegal,
  isLegalSlug,
  isLegalTemplate,
  LEGAL_KEYS,
  LEGAL_TITLES,
  type LegalSlug,
} from "./legal";

const SLUGS = Object.keys(LEGAL_KEYS) as LegalSlug[];

/**
 * The legal registry.
 *
 * None of this checks whether a text is CORRECT — no test can, and the
 * committed texts are templates awaiting a lawyer's review either way. What it
 * checks is the machinery around them, where the failures are silent: a
 * document that is routed but not linked, a title that exists in one language
 * only, or a front-matter marker leaking onto a customer's screen.
 */
describe("the legal registry", () => {
  it("has a title for every document in both languages", () => {
    // A missing title renders an empty <h1> and an empty <title>. The page
    // still returns 200, so nothing anywhere would report it.
    for (const slug of SLUGS) {
      expect(LEGAL_TITLES.de[slug]?.trim(), `de: ${slug}`).toBeTruthy();
      expect(LEGAL_TITLES.en[slug]?.trim(), `en: ${slug}`).toBeTruthy();
    }
  });

  it("recognises exactly its own slugs", () => {
    for (const slug of SLUGS) expect(isLegalSlug(slug)).toBe(true);
    expect(isLegalSlug("versandkosten")).toBe(false);
    expect(isLegalSlug("constructor")).toBe(false);
  });

  it("separates payment from delivery", () => {
    // They were one page called "Zahlung und Lieferung", which was honest while
    // nothing was ever shipped. Art. 246a EGBGB wants both stated before the
    // order, and folding delivery into a page titled after payment stops being
    // truthful the moment there is something to deliver.
    expect(SLUGS).toContain("zahlung");
    expect(SLUGS).toContain("versand");
    expect(LEGAL_TITLES.de.zahlung).not.toMatch(/Lieferung/);
  });

  it("carries an accessibility statement", () => {
    // BFSG/BFSGV. The one legal page that has to describe THIS site rather
    // than restate a statute.
    expect(SLUGS).toContain("barrierefreiheit");
  });

  it("never lets the template marker reach a rendered page", () => {
    // The marker is a note to whoever runs the shop. A customer reading the
    // withdrawal policy has no use for it, and a banner saying "this may be
    // wrong" on a page whose purpose is to be relied on would be worse than
    // useless.
    for (const slug of SLUGS) {
      for (const lang of ["de", "en"] as const) {
        const body = bundledLegal(slug, lang);
        if (body === null) continue;
        expect(body.startsWith("---"), `${slug}.${lang}`).toBe(false);
        expect(body, `${slug}.${lang}`).not.toMatch(/template:\s*true/);
        expect(body, `${slug}.${lang}`).not.toMatch(/anwaltlich pruefen/);
      }
    }
  });

  it("marks every committed text as a template", () => {
    // These are drafts, and the state has to be inspectable — a template
    // nobody remembers is a template that goes live. A text that has been
    // reviewed is published through the CMS, which overrides the file; if one
    // is ever committed as final instead, this is the test to change, on
    // purpose.
    for (const slug of SLUGS) {
      for (const lang of ["de", "en"] as const) {
        if (bundledLegal(slug, lang) === null) continue;
        expect(isLegalTemplate(slug, lang), `${slug}.${lang} is not marked`).toBe(true);
      }
    }
  });

  it("returns null rather than an empty string for a document with no text", () => {
    // The renderer branches on null to show its "not published yet" notice and
    // to set noindex. An empty string would render a blank legal page, which
    // reads as a legal page with nothing IN it — a worse claim than admitting
    // the text is missing.
    for (const slug of SLUGS) {
      for (const lang of ["de", "en"] as const) {
        const body = bundledLegal(slug, lang);
        expect(body === null || body.trim().length > 0, `${slug}.${lang}`).toBe(true);
      }
    }
  });
});

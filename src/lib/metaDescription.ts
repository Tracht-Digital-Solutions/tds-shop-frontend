import { clampToWord } from "@tracht-digital-solutions/tds-shared/format";

/**
 * Meta descriptions, kept inside the range a search result renders whole.
 *
 * Below ~80 characters a description looks unfinished and search engines tend
 * to replace it with page text; beyond ~160 it is cut mid-sentence. So the
 * budget is enforced rather than hoped for, and `metaDescription.test.ts`
 * checks the composed descriptions of every page type against it.
 */

export const MIN_LENGTH = 80;
export const MAX_LENGTH = 160;

/**
 * Trim to a whole word, never mid-word, and never leaving dangling
 * punctuation (tds-shared, shared with the journal). Default budget: 160.
 */
export { clampToWord };

/**
 * Build a description from a lead and, if it falls short of the floor, top it
 * up with context.
 *
 * The top-up is why this is a function rather than a `slice`: a two-sentence
 * teaser is common and a 40-character description is worse than none, because
 * it looks deliberate.
 */
export function describe(lead: string, ...topUps: (string | null | undefined)[]): string {
  let text = lead.replace(/\s+/g, " ").trim();
  for (const extra of topUps) {
    if (text.length >= MIN_LENGTH) break;
    const addition = (extra ?? "").replace(/\s+/g, " ").trim();
    if (addition === "") continue;
    text = text === "" ? addition : `${text} ${addition}`;
  }
  return clampToWord(text);
}

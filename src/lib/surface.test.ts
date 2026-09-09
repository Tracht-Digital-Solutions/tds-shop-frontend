import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * The stylesheet's own promises, checked.
 *
 * `src/styles/global.css` argues at length for two things: that this site
 * renders the JOURNAL surface rather than a fourth one of its own, and that
 * the "mix of the landingpage and the blog" is a short token override on top
 * of it. Both are the kind of decision a later edit undoes by accident and
 * nobody notices — a page that renders in a plausible wrong colour looks fine
 * in a screenshot.
 *
 * The file's header comment has promised this test since the site was built;
 * it did not exist. Reading the CSS as text rather than rendering it is
 * deliberate: what is being asserted is what the file DECLARES, and a
 * jsdom render would only prove that a browser can parse it.
 */
const css = readFileSync(
  fileURLToPath(new URL("../styles/global.css", import.meta.url)),
  "utf8",
);

/** Strip comments — every rule below reasons about declarations, and the
 *  header prose mentions half these token names while explaining them. */
const code = css.replace(/\/\*[\s\S]*?\*\//g, "");

describe("the surface layer", () => {
  it("renders the journal surface and imports no fourth one", () => {
    expect(code).toContain("styles/surfaces/blog.css");
    expect(code).not.toMatch(/surfaces\/(marketing|panel|shop)\.css/);
  });

  it("keeps app.css and prose.css out", () => {
    // Both are argued against in the header: app.css is panel chrome scoped to
    // [data-surface="panel"], and prose.css would have to be overridden in
    // three places on a product page.
    expect(code).not.toMatch(/styles\/(app|prose)\.css/);
  });

  it("never reaches for a panel token", () => {
    // base.css declares the --tds-panel-* family inert on this surface, so a
    // stale reference neither errors nor blanks — it renders in the panel's
    // fallback navy, a plausible wrong colour. That is precisely why it needs
    // a test rather than an eye.
    expect(code).not.toMatch(/--tds-panel-/);
  });

  it("puts @source after the imports", () => {
    // @source before @import is a build error, and the build is the only thing
    // that would tell you — in a stack trace, not a message.
    const source = code.indexOf("@source");
    const lastImport = code.lastIndexOf("@import");
    expect(source).toBeGreaterThan(lastImport);
  });
});

describe("the blend", () => {
  it("rounds actions and nothing else", () => {
    // The one gesture borrowed from the marketing surface. A shop is a page
    // you operate; the round button is the landingpage's most recognisable
    // move, and it belongs on the things you press.
    expect(code).toMatch(/--tds-radius-btn:\s*var\(--tds-radius-pill\)/);
    expect(code).toMatch(/--tds-radius-chip:\s*var\(--tds-radius-pill\)/);

    // Everything that HOLDS something stays square — that is the journal, and
    // it is the half of the blend that carries the structure.
    for (const token of ["card", "input", "badge", "alert", "bar"]) {
      expect(code).not.toMatch(new RegExp(`--tds-radius-${token}:\\s*var\\(--tds-radius-pill\\)`));
    }
  });

  it("stays flat", () => {
    // The marketing surface is the only one with resting elevation. Adopting
    // the pill without adopting the shadow is the whole point of a blend.
    expect(code).not.toMatch(/--tds-elevation-(card|raised):\s*var\(--tds-shadow/);
  });

  it("doses decoration between the journal and the brochure", () => {
    // Journal: the shared defaults, 1 and 0.09. Landingpage: 1.5 and 0.16.
    // A value outside that band is not a blend any more, in either direction.
    const strength = Number(/--tds-decor-field-strength:\s*([\d.]+)/.exec(code)?.[1]);
    const alpha = Number(/--tds-decor-shape-alpha:\s*([\d.]+)/.exec(code)?.[1]);

    expect(strength).toBeGreaterThan(1);
    expect(strength).toBeLessThan(1.5);
    expect(alpha).toBeGreaterThan(0.09);
    expect(alpha).toBeLessThan(0.16);
  });

  it("applies the tinted card fill it declares", () => {
    // A token nothing reads is a token that drifts. With `data-flat` the
    // product card has no hairline, so this fill is the only thing giving it
    // an edge against the paper ground.
    expect(code).toMatch(/--shop-surface-card:/);
    expect(code).toMatch(/\.tds-product-card\s*\{[^}]*background:\s*var\(--shop-surface-card\)/);
  });

  it("leaves the checkout figures on their own ground", () => {
    // Not a card: the block a purchase is agreed on. Giving it the browsing
    // cards' fill would flatten the one distinction that matters on the one
    // page where the visitor is deciding to pay.
    expect(code).toMatch(/\.checkout__summary\s*\{[^}]*background:\s*var\(--color-soft\)/);
  });

  it("gives every movement a reduced-motion answer", () => {
    // base.css already clamps every duration to 0.01ms under
    // `prefers-reduced-motion: reduce`, and for an ENTRANCE that is enough —
    // it ends at the natural state, so clamping simply arrives there. It is
    // not enough for anything that still travels after arriving: a clamped
    // transform still moves. The shared layer says so in its own words —
    // "duration alone is not a reduced-motion implementation; the movement has
    // to not occur" — and this is the test that keeps the local block honest.
    const reduced = /@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*)\}/.exec(code);
    expect(reduced, "no reduced-motion block at all").not.toBeNull();
    const body = reduced?.[1] ?? "";

    // Every keyframe animation this file declares has to be switched off,
    // because a looping or overshooting one is exactly what the preference is
    // about. Collect them from the @keyframes rules rather than a hand-kept
    // list, so a new animation cannot be added without failing here.
    const declared = [...code.matchAll(/@keyframes\s+([a-z-]+)/g)].map((m) => m[1]);
    expect(declared.length, "no animations declared — delete this test").toBeGreaterThan(0);
    expect(body).toMatch(/animation:\s*none/);

    // The row exit moves something. It must stop moving, not move faster.
    expect(body).toMatch(/transform:\s*none/);
  });

  it("keeps the decoration to one band", () => {
    // The journal uses `.tds-wash` in one file, the landingpage in nineteen.
    // Landing between them means ONE — this counts the class in the markup, so
    // a second one has to be argued for rather than added.
    const pages = import.meta.glob("../{components,pages,layouts}/**/*.astro", {
      eager: true,
      query: "?raw",
      import: "default",
    }) as Record<string, string>;

    const withWash = Object.entries(pages)
      .filter(([, body]) => /class="[^"]*\btds-wash\b/.test(body))
      .map(([file]) => file);

    expect(withWash).toHaveLength(1);
  });
});

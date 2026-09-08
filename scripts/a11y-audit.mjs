/**
 * Run axe-core against the real pages and fail on anything it is certain of.
 *
 * Why a browser and not a unit test: almost every rule that matters here needs
 * COMPUTED values. Contrast needs the resolved colour after four layers of
 * custom properties; "is this control focusable" needs layout; a decorative
 * SVG's accessible name needs the accessibility tree. None of that exists in a
 * string comparison, and all of it is exactly what breaks when a token moves.
 *
 * Why axe and not a hand-rolled checklist: axe reports only violations it can
 * prove, and it says which element and which success criterion. That keeps this
 * script from becoming a second, worse opinion about the rules.
 *
 * WHAT THIS CANNOT DO, stated so nobody mistakes a green run for compliance:
 * automated checking reaches maybe a third of WCAG. It will never tell you that
 * a link text is meaningless, that a focus order is illogical, that an error
 * message does not say how to fix the error, or that the reject button is
 * harder to find than the accept one. Those are read, not measured — see the
 * checklist in AGENTS.md.
 *
 * Usage (Git Bash on Windows needs MSYS_NO_PATHCONV=1, or the shell rewrites
 * the `/` arguments into a Git install path before node sees them):
 *
 *   MSYS_NO_PATHCONV=1 npm run audit:a11y -- http://localhost:4361 / /en/
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const BASE = process.argv[2] ?? "http://127.0.0.1:4361";
const PATHS = process.argv.length > 3 ? process.argv.slice(3) : ["/"];

/** The library, read off disk and injected — axe runs IN the page. */
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

/**
 * The rule set. WCAG 2.2 AA is the target the accessibility statement claims,
 * so it is the set that gates the build; `best-practice` is deliberately left
 * out because it flags things that are opinions rather than criteria.
 */
const RUN_ONLY = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

/** Same installed-Chrome approach as the mobile audit: playwright-core ships
 *  no binaries, and these are platform rules any current Chromium agrees on. */
const browser = await chromium.launch({
  channel: "chrome",
  executablePath: process.env.CHROME_PATH || undefined,
});

let violations = 0;

try {
  for (const path of PATHS) {
    const page = await browser.newPage();
    await page.goto(BASE + path, { waitUntil: "networkidle" });

    // The consent banner and the footer link are `client:idle` islands, and a
    // banner that has not hydrated is a banner this audit never looks at —
    // which would be the wrong half to skip. Wait for the one element that
    // only exists after hydration, but do not fail the run if a page
    // legitimately has no banner (a returning visitor's storage state).
    await page.waitForSelector(".consent-link", { timeout: 5000 }).catch(() => {});

    await page.evaluate(axeSource);
    const result = await page.evaluate(
      async (runOnly) =>
        // eslint-disable-next-line no-undef
        await window.axe.run(document, { runOnly: { type: "tag", values: runOnly } }),
      RUN_ONLY,
    );

    if (result.violations.length === 0) {
      console.log(`\n${path}  ok  (${result.passes.length} checks passed)`);
    } else {
      console.log(`\n${path}  ${result.violations.length} violation(s)`);
      for (const v of result.violations) {
        violations += 1;
        console.log(`  [${v.impact}] ${v.id} — ${v.help}`);
        console.log(`      ${v.helpUrl}`);
        for (const node of v.nodes.slice(0, 5)) {
          console.log(`      ${node.target.join(" ")}`);
          // The failureSummary is the part that says what to DO; without it a
          // report is a list of rule names nobody can act on.
          if (node.failureSummary) {
            console.log(
              node.failureSummary
                .split("\n")
                .map((l) => `        ${l.trim()}`)
                .join("\n"),
            );
          }
        }
        if (v.nodes.length > 5) console.log(`      …and ${v.nodes.length - 5} more`);
      }
    }

    await page.close();
  }
} finally {
  await browser.close();
}

console.log("");
if (violations > 0) {
  console.error(`a11y-audit: ${violations} violation(s)`);
  process.exit(1);
}
console.log("a11y-audit: clean");

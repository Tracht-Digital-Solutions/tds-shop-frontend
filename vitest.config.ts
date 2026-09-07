import { defineConfig } from "vitest/config";

/**
 * The testable surface is `src/lib` — the rules whose failure is invisible in
 * a rendered page: the indexing gate, the cache boundary, the structured-data
 * decision, and the two text budgets. The `.astro` pages stay on `astro check`
 * plus the real build.
 *
 * Note what is NOT here: a jsdom environment. Nothing under test touches a DOM,
 * and jsdom's setup dominated the runtime of a sibling repo's suite — 127 of
 * 130 seconds — before it was made opt-in per file with a
 * `@vitest-environment` docblock. Do the same if a component test ever needs one.
 */
export default defineConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "node",
    restoreMocks: true,
    unstubGlobals: true,
  },
});

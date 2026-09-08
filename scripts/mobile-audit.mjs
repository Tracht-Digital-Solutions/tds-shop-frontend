/**
 * Measure horizontal overflow at phone width.
 *
 * `body { overflow-x: hidden }` CLIPS an overflowing element rather than
 * scrolling to it, so a broken mobile layout looks fine in a screenshot and in
 * the browser. The only reliable signal is the numbers: document scrollWidth
 * against the viewport, and then the individual elements wider than it.
 */
import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://127.0.0.1:4360";
const WIDTH = Number(process.argv[3] ?? 390);
const PATHS = process.argv.slice(4);

/**
 * Use the installed Chrome rather than a downloaded browser: `playwright-core`
 * ships no binaries, and this measures layout, which any current Chromium
 * agrees on. `CHROME_PATH` overrides for a non-standard install.
 *
 * NOTE for Git Bash on Windows: run this with `MSYS_NO_PATHCONV=1`, or the
 * shell rewrites the `/` path arguments into `C:/Program Files/Git/` before
 * node ever sees them — which surfaces as "Cannot navigate to invalid URL"
 * naming a path nobody typed.
 */
const browser = await chromium.launch({
  channel: "chrome",
  executablePath: process.env.CHROME_PATH || undefined,
});
const page = await browser.newPage({
  viewport: { width: WIDTH, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});

let failures = 0;

for (const path of PATHS) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });

  const report = await page.evaluate((viewport) => {
    // `body { overflow-x: hidden }` in tds-shared's base.css CLAMPS
    // `scrollWidth` to the viewport, so the headline number is a guaranteed
    // "ok" whatever the page does. Lift it for the measurement — this is the
    // single reason mobile breakage on these sites is invisible.
    const prevHtml = document.documentElement.style.overflowX;
    const prevBody = document.body.style.overflowX;
    document.documentElement.style.overflowX = "visible";
    document.body.style.overflowX = "visible";
    // Force a reflow so the numbers below are taken after the change.
    void document.body.offsetWidth;

    const doc = document.documentElement;
    const offenders = [];

    for (const el of document.querySelectorAll("body *")) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      // Right edge past the viewport, or intrinsically wider than it.
      const overshoot = Math.round(rect.right - viewport);
      if (overshoot > 1 || Math.round(rect.width) > viewport + 1) {
        // Only report the element itself, not every ancestor that contains it.
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 60),
          w: Math.round(rect.width),
          right: Math.round(rect.right),
          overshoot,
          text: (el.textContent || "").trim().slice(0, 40),
        });
      }
    }

    // Keep the deepest offenders: a parent is wide because its child is.
    const deepest = offenders.filter(
      (o, i) =>
        !offenders.some((other, j) => j !== i && other.w >= o.w && other.right >= o.right && j > i),
    );

    const measured = {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      offenders: deepest.slice(0, 8),
      // Tap targets below the 24×24 CSS-px floor WCAG 2.2 asks for.
      smallTargets: [...document.querySelectorAll("a, button, input, select, textarea")]
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.width > 0 && (r.height < 24 || r.width < 24))
        .slice(0, 6)
        .map(({ el, r }) => ({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 40),
          w: Math.round(r.width),
          h: Math.round(r.height),
          text: (el.textContent || "").trim().slice(0, 30),
        })),
    };

    document.documentElement.style.overflowX = prevHtml;
    document.body.style.overflowX = prevBody;
    return measured;
  }, WIDTH);

  const overflow = report.scrollWidth > report.clientWidth;
  if (overflow || report.smallTargets.length) failures++;

  console.log(
    `\n${path}  doc=${report.scrollWidth}px  viewport=${report.clientWidth}px  ${
      overflow ? "OVERFLOW +" + (report.scrollWidth - report.clientWidth) + "px" : "ok"
    }`,
  );
  for (const o of report.offenders) {
    console.log(`   wide: <${o.tag} class="${o.cls}"> w=${o.w} right=${o.right} (+${o.overshoot})  "${o.text}"`);
  }
  for (const t of report.smallTargets) {
    console.log(`   tiny target: <${t.tag} class="${t.cls}"> ${t.w}x${t.h}  "${t.text}"`);
  }
}

await browser.close();
process.exit(failures ? 1 : 0);

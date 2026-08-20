/**
 * Autonomous visual audit.
 *
 * Screenshots every section of the site at desktop and mobile widths so the
 * layout can be reviewed as images rather than as code. Run the dev server
 * first, then:
 *
 *   npm run dev
 *   npx playwright-core --version   # installs nothing; see note below
 *   npm run audit
 *
 * playwright-core is intentionally NOT a dependency of this project - it drives
 * the Chrome already installed on the machine (`channel: "chrome"`) and is only
 * needed when auditing. Install it on demand with:
 *
 *   npm install --no-save playwright-core
 *
 * Output lands in ./audit (gitignored).
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3210";
const OUT = process.env.AUDIT_DIR ?? "audit";

/** [name, path, selector to scroll to (or null), fallback scrollY] */
const SHOTS = [
  ["home-hero", "/", null, 0],
  ["home-portfolio", "/", "#portfolio", 0],
  ["home-flagship", "/", null, 2600],
  ["home-locations", "/", "#locations", 0],
  ["home-investment", "/", "#investment", 0],
  ["home-team", "/", "#team", 0],
  ["home-contact", "/", "#contact", 0],
  ["home-sell", "/", "#sell", 0],
  ["properties", "/properties", null, 0],
  ["properties-grid", "/properties", null, 700],
  ["properties-plots", "/properties?category=Plot", null, 500],
  ["detail-villa", "/properties/guadalmina-baja-villa", null, 0],
  ["detail-story", "/properties/guadalmina-baja-villa", null, 900],
  ["detail-gallery", "/properties/guadalmina-baja-villa", null, 2400],
  ["detail-apartment", "/properties/puerto-banus-apartment", null, 0],
  ["detail-plot", "/properties/cerros-del-aguila-land", null, 700],
  ["detail-hotel", "/properties/estepona-hotel", null, 700],
  ["rentals", "/rentals", null, 0],
  ["rentals-table", "/rentals", null, 700],
  ["services", "/services", null, 0],
  ["service-valuation", "/services/valuation", null, 0],
  ["service-steps", "/services/renovations", null, 1400],
  ["about", "/about", null, 0],
  ["about-body", "/about", null, 800],
  ["careers", "/careers", null, 500],
  ["team", "/team", null, 0],
  ["sell", "/sell", null, 0],
  ["investment", "/investment", null, 0],
  ["contact", "/contact", null, 0],
  ["footer", "/about", "footer", 0],
  ["proposal", "/?proposal=true", null, 0],
  ["not-found", "/does-not-exist", null, 0],
];

const VIEWPORTS = [
  ["desktop", 1512, 945],
  ["mobile", 390, 844],
];

const { chromium } = await import("playwright-core").catch(() => {
  console.error("playwright-core is not installed. Run: npm install --no-save playwright-core");
  process.exit(1);
});

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

for (const [label, width, height] of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width, height } });

  for (const [name, route, selector, fallbackY] of SHOTS) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });

    // Skip the intro so section screenshots are not obscured by it.
    await page.evaluate(() => {
      try {
        sessionStorage.setItem("mlx-intro-seen", "1");
      } catch {}
    });
    if (route === "/" || route.startsWith("/?")) {
      await page.reload({ waitUntil: "networkidle" });
    }

    await page.evaluate(
      ([sel, y]) => {
        const el = sel ? document.querySelector(sel) : null;
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 90);
        else if (y) window.scrollTo(0, y);
      },
      [selector, fallbackY],
    );

    // Long enough for the 1.4s cross-fades and the drift to settle.
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(OUT, `${label}-${name}.png`) });
    process.stdout.write(".");
  }

  await page.close();
}

await browser.close();
console.log(`\nwrote ${SHOTS.length * VIEWPORTS.length} screenshots to ./${OUT}`);

/**
 * Builds a contact sheet for one property so its imagery can be reviewed as a
 * grid before deciding which frames become the hero, the gallery order, or the
 * illustration for a feature facet.
 *
 *   npm run contact-sheet -- R5374861
 *
 * Output lands in ./audit (gitignored).
 */
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const ref = process.argv[2];
if (!ref) {
  console.error("Usage: npm run contact-sheet -- <REF>   e.g. R5374861");
  process.exit(1);
}

const OUT = process.env.AUDIT_DIR ?? "audit";
const COLS = 6;
const CELL_W = 300;
const CELL_H = 200;

const dir = path.join("public/properties", ref);
const files = (await readdir(dir)).filter((f) => f.endsWith(".webp")).sort();

if (!files.length) {
  console.error(`No images found in ${dir}. Run \`npm run assets\` first.`);
  process.exit(1);
}

const tiles = await Promise.all(
  files.map((f) => sharp(path.join(dir, f)).resize(CELL_W, CELL_H, { fit: "cover" }).toBuffer()),
);

const rows = Math.ceil(tiles.length / COLS);
await mkdir(OUT, { recursive: true });

await sharp({
  create: {
    width: COLS * CELL_W,
    height: rows * CELL_H,
    channels: 3,
    background: "#0a0a0b",
  },
})
  .composite(
    tiles.map((input, i) => ({
      input,
      left: (i % COLS) * CELL_W,
      top: Math.floor(i / COLS) * CELL_H,
    })),
  )
  .jpeg({ quality: 72 })
  .toFile(path.join(OUT, `contact-sheet-${ref}.jpg`));

console.log(`${files.length} frames -> ${OUT}/contact-sheet-${ref}.jpg`);
console.log(files.map((f, i) => `${i + 1}: ${f}`).join("  "));

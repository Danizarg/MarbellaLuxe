/**
 * Downloads the property imagery referenced by scripts/asset-manifest.json into
 * /public/properties/<REF>/NN.webp so the site is fully self-contained and never
 * hotlinks the client's listing-feed CDN at runtime.
 *
 * Usage: npm run assets
 */
import { readFile, mkdir, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "scripts/asset-manifest.json"), "utf8"));

/** The CDN returns a ~2.5KB placeholder for any size key it does not have. */
const PLACEHOLDER_MAX_BYTES = 8_000;

const results = [];

for (const prop of manifest.properties) {
  const dir = path.join(root, "public/properties", prop.ref);
  await mkdir(dir, { recursive: true });

  for (let i = 0; i < prop.count; i++) {
    const file = manifest.filenames[i];
    if (!file) break;

    const out = path.join(dir, String(i + 1).padStart(2, "0") + ".webp");
    if (await access(out).then(() => true, () => false)) continue;

    const url = `${manifest.cdnBase}/${prop.key}/properties/${prop.uuid}/w${manifest.maxWidth}/${file}?v=${prop.v}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`skip ${prop.ref}/${i + 1}: HTTP ${res.status}`);
      continue;
    }

    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength < PLACEHOLDER_MAX_BYTES) {
      console.warn(`skip ${prop.ref}/${i + 1}: placeholder response`);
      continue;
    }

    const img = sharp(buf);
    const meta = await img.metadata();
    await writeFile(out, await img.webp({ quality: 82 }).toBuffer());
    results.push({ ref: prop.ref, n: i + 1, w: meta.width, h: meta.height });
    process.stdout.write(".");
  }
}

console.log(`\nwrote ${results.length} images`);
console.table(results.slice(0, 5));


import { readdir, stat, mkdir } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const input = process.argv[2] ?? "apps/web/public";
const output = process.argv[3] ?? "apps/web/public/optimized";
await mkdir(output, { recursive: true });

for (const name of await readdir(input)) {
  const source = join(input, name);
  if (!(await stat(source)).isFile()) continue;
  if (![".png", ".jpg", ".jpeg"].includes(extname(name).toLowerCase())) continue;

  const destination = join(output, `${basename(name, extname(name))}.webp`);
  await sharp(source).resize({ width: 2200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(destination);
  console.log(`Optimized ${name}`);
}

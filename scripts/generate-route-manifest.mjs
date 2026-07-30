import { readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = process.cwd();
const source = join(root, "apps/backend/src/api");
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.name.endsWith(".ts")) files.push(relative(root, path));
  }
  return files;
}
const routes = (await walk(source)).sort();
await writeFile(join(root, "apps/backend/routes.manifest.json"), JSON.stringify({ generatedAt: new Date().toISOString(), routes }, null, 2) + "\n");
console.log(`Generated route manifest with ${routes.length} modules.`);


import { mkdir, rename, access } from "node:fs/promises";

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

await mkdir("apps/web/public/images/legacy", { recursive: true });

for (const file of ["hero.png", "globe.png", "partners.png"]) {
  const source = `apps/web/public/${file}`;
  const target = `apps/web/public/images/legacy/${file}`;
  if (await exists(source)) {
    await rename(source, target);
    console.log(`Moved ${source} -> ${target}`);
  }
}

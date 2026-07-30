
import { access } from "node:fs/promises";

const required = [
  "apps/web/public/site.webmanifest",
  "apps/web/public/icons/icon-192.png",
  "apps/web/public/icons/icon-512.png",
  "apps/web/public/screenshots/developer-portal-wide.webp"
];

for (const path of required) {
  await access(path);
  console.log(`✓ ${path}`);
}

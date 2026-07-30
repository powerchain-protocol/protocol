
import { access } from "node:fs/promises";
const routes = [
  "apps/web/app/marketplace/page.tsx",
  "apps/web/app/crowdfunding/page.tsx",
  "apps/web/app/iot/page.tsx",
  "apps/web/app/depin/page.tsx",
  "apps/web/app/hardwares/page.tsx",
  "apps/dashboard/app/(portal)/marketplace/page.tsx",
  "apps/dashboard/app/(portal)/renewables/page.tsx",
  "apps/dashboard/app/(portal)/blockchain/page.tsx"
];
for (const route of routes) {
  await access(route);
  console.log(`✓ ${route}`);
}

import { access } from "node:fs/promises";

const requiredRoutes = [
  "apps/web/app/generator/page.tsx",
  "apps/web/app/merchant/page.tsx",
  "apps/web/app/rewards/page.tsx",
  "apps/web/app/faucets/page.tsx",
];

for (const route of requiredRoutes) await access(route);
console.log(`Web route structure valid (${requiredRoutes.length} routes).`);

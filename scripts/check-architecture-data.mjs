import { existsSync, readFileSync } from "node:fs";

const required = [
  "apps/web/components/architectures/architectures.tsx",
  "apps/web/app/dashboard/architectures/page.tsx",
  "apps/web/public/architectures/system-overview.svg",
  "apps/web/public/architectures/solana-architecture.svg",
  "apps/web/public/architectures/sui-architecture.svg",
  "apps/web/public/architectures/energy-marketplace.svg",
  "apps/web/public/architectures/depin-iot.svg",
  "apps/web/public/architectures/data-analytics.svg",
  "apps/web/data/metrics.ts",
  "apps/web/data/renewables.ts",
  "apps/web/data/energy.ts",
  "apps/web/data/pools.ts",
  "apps/web/data/smart-meters.ts",
  "apps/web/data/depin.ts",
  "apps/web/data/iot.ts",
  "apps/web/data/devices.ts",
  "apps/web/data/products.ts",
  "contracts/solana/package.json",
  "docs/architecture/README.md"
];
const missing = required.filter((path) => !existsSync(path));
if (missing.length) { console.error(`Missing architecture files:\n${missing.join("\n")}`); process.exit(1); }
const routes = readFileSync("apps/web/lib/routes.ts", "utf8");
if (!routes.includes("/dashboard/architectures")) { console.error("Architecture route is not registered"); process.exit(1); }
console.log(`Architecture and data validation passed (${required.length} files).`);

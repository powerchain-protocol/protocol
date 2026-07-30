import { existsSync, readFileSync } from "node:fs";

const required = [
  "programs/foucets/package.json",
  "programs/foucets/src/index.ts",
  "packages/examples/foucets/nextjs/package.json",
  "packages/examples/foucets/nextjs/faucets.ts",
  "apps/web/app/faucets/page.tsx",
  "apps/web/app/foucets/page.tsx",
  "apps/web/components/foucets/faucet-card.tsx",
  "apps/web/components/foucets/histories.tsx",
  "apps/web/components/transactions/foucets.tsx",
  "apps/web/hooks/use-histories.ts",
  "apps/web/data/transactions.ts",
  "apps/web/data/histories.ts",
];

for (const file of required) {
  if (!existsSync(file)) throw new Error(`Missing required faucet file: ${file}`);
}

if (existsSync("programs/token/nextjs/faucets.ts")) {
  throw new Error("Legacy programs/token/nextjs/faucets.ts was not moved.");
}

for (const manifest of [
  "package.json",
  "apps/web/package.json",
  "programs/foucets/package.json",
  "packages/examples/foucets/nextjs/package.json",
]) {
  JSON.parse(readFileSync(manifest, "utf8"));
}

const route = readFileSync("apps/web/app/api/faucets/claim/route.ts", "utf8");
if (!route.includes("@powerchain/foucets-program")) {
  throw new Error("Faucet API must import canonical program logic.");
}

console.log("Foucets workspace, portal, history, example, and API structure passed.");

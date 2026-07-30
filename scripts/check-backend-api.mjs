import { existsSync, readFileSync } from "node:fs";
const required=["packages/schemas/src/index.ts","apps/backend/src/api/v1/energy/marketplace.ts","apps/backend/src/api/v1/funding.ts","apps/backend/src/services/energy-market-service.ts","apps/backend/prisma/migrations/202607300012_energy_marketplace_funding/migration.sql","docs/api/energy-marketplace.md"];
for(const file of required) if(!existsSync(file)) throw new Error(`Missing ${file}`);
const routes=readFileSync("apps/backend/src/api/v1/index.ts","utf8");
for(const name of ["energyMarketplaceRoutes","fundingRoutes"]) if(!routes.includes(name)) throw new Error(`Route not registered: ${name}`);
const schema=readFileSync("apps/backend/prisma/schema.prisma","utf8");
for(const model of ["EnergyOffer","FundingContribution"]) if(!schema.includes(`model ${model}`)) throw new Error(`Missing Prisma model ${model}`);
console.log("Backend API structure check passed");

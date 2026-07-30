import { existsSync, readFileSync } from "node:fs"; import { resolve } from "node:path";
const required=["packages/saas/src/index.ts","apps/web/app/saas/page.tsx","apps/web/app/docs/saas/page.tsx","apps/backend/src/api/v1/saas.ts","apps/web/components/docs/markdown.tsx","apps/web/components/docs/markers.tsx","docs/saas/README.md"];
for(const file of required){if(!existsSync(resolve(file)))throw new Error(`Missing ${file}`)}
const root=JSON.parse(readFileSync("package.json","utf8")); const web=JSON.parse(readFileSync("apps/web/package.json","utf8"));
if(root.devDependencies.typescript!=="6.0.2"||web.devDependencies.typescript!=="6.0.2")throw new Error("TypeScript must be 6.0.2");
console.log(`SaaS platform check passed (${required.length} required files).`);

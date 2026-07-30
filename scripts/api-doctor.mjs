import { access } from "node:fs/promises";
const required = ["apps/backend/openapi.yaml", "apps/backend/src/api/v1/index.ts", "apps/backend/src/plugins/rate-limit.ts", "apps/backend/src/api/v1/explorer/index.ts"];
let failed = false;
for (const file of required) {
  try { await access(file); console.log(`ok  ${file}`); }
  catch { console.error(`missing  ${file}`); failed = true; }
}
if (failed) process.exit(1);

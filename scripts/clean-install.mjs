import { rmSync } from "node:fs";
import { join } from "node:path";
import { runPnpm, workspaceRoot } from "./workspace-runtime.mjs";

for (const directory of [
  "node_modules",
  "apps/web/node_modules",
  "apps/dashboard/node_modules",
  "apps/web/.next",
  "apps/dashboard/.next",
  "apps/backend/dist",
  ".turbo"
]) {
  rmSync(join(workspaceRoot, directory), { recursive: true, force: true });
}

// A clean local install is also the recovery path for a stale lockfile.
// CI uses the dedicated `pnpm ci:install` command instead.
const result = runPnpm(["install", "--no-frozen-lockfile"]);
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);

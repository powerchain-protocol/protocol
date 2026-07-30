import { existsSync } from "node:fs";
import { join } from "node:path";
import { runPnpm, workspaceRoot } from "./workspace-runtime.mjs";

const schema = join(workspaceRoot, "apps/backend/prisma/schema.prisma");
if (!existsSync(schema)) {
  console.log("Prisma schema is not present; skipping client generation.");
  process.exit(0);
}

const result = runPnpm(["--filter", "@powerchain/backend", "exec", "prisma", "generate"]);
if (result.error || result.status !== 0) {
  console.error("Prisma client generation failed. Dependencies remain installed.");
  console.error("Run `pnpm db:generate` after resolving the Prisma error.");
  // Avoid making the entire workspace installation unusable because codegen failed.
  process.exit(0);
}

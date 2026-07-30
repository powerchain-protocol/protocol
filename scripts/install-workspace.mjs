import { existsSync } from "node:fs";
import { join } from "node:path";
import { runPnpm, workspaceRoot } from "./workspace-runtime.mjs";

const lockfileOnly = process.argv.includes("--lockfile-only");
const forceFrozen = process.argv.includes("--frozen-lockfile");
const lockfile = join(workspaceRoot, "pnpm-lock.yaml");
const hasLockfile = existsSync(lockfile);

// Local development must be able to repair an outdated lockfile. CI should
// remain reproducible and fail if the committed lockfile is stale.
const isCI = /^(1|true)$/i.test(process.env.CI ?? "");
const frozen = forceFrozen || (isCI && hasLockfile && !lockfileOnly);

const args = ["install"];
if (lockfileOnly) args.push("--lockfile-only", "--no-frozen-lockfile");
else args.push(frozen ? "--frozen-lockfile" : "--no-frozen-lockfile");

console.log(`Installing PowerChain workspace (${args.slice(1).join(" ")})…`);
const result = runPnpm(args);
if (result.error) console.error(result.error.message);
if ((result.status ?? 1) !== 0 && frozen) {
  console.error("CI lockfile validation failed. Run `pnpm deps:sync` locally and commit pnpm-lock.yaml.");
}
process.exit(result.status ?? 1);

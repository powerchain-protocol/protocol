import { spawnSync } from "node:child_process";
import process from "node:process";
import { loadPowerchainEnv } from "./load-env.mjs";

await loadPowerchainEnv();
const command = process.platform === "win32" ? "anchor.cmd" : "anchor";
const result = spawnSync(command, ["build"], { stdio: "inherit", env: process.env });
if (result.error?.code === "ENOENT") {
  console.error("Anchor CLI was not found. Install Anchor before running pnpm programs:build.");
  process.exit(127);
}
process.exit(result.status ?? 1);

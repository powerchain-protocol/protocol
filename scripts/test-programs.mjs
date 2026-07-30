import { spawnSync } from "node:child_process";
import process from "node:process";
import { loadPowerchainEnv } from "./load-env.mjs";
await loadPowerchainEnv();
const command = process.platform === "win32" ? "anchor.cmd" : "anchor";
const result = spawnSync(command, ["test"], { stdio: "inherit", env: process.env });
if (result.error?.code === "ENOENT") { console.error("Anchor CLI was not found."); process.exit(127); }
process.exit(result.status ?? 1);

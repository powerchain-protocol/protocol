
import { spawnSync } from "node:child_process";

const channel = process.argv.includes("--stable") ? "stable" : "beta";
const args = process.argv.slice(2).filter((arg) => !["--stable", "--beta"].includes(arg));
const tag = channel === "stable" ? "stable" : "beta";

const result = spawnSync(
  process.platform === "win32" ? "pnpm.cmd" : "pnpm",
  [...args, "publish", "--tag", tag, "--no-git-checks"],
  { stdio: "inherit", env: process.env }
);

process.exit(result.status ?? 1);

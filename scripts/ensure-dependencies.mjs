import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  hasInstalledWebDependencies,
  packageManagerCommand,
  readJson,
  runPnpm,
  workspaceRoot
} from "./workspace-runtime.mjs";

const repair = process.argv.includes("--repair");
const requiredFiles = ["package.json", "pnpm-workspace.yaml", "apps/web/package.json"];
const missingFiles = requiredFiles.filter((file) => !existsSync(join(workspaceRoot, file)));

if (missingFiles.length > 0) {
  console.error(`Powerchain workspace is incomplete. Missing: ${missingFiles.join(", ")}`);
  console.error(`Run this command from the complete repository: ${workspaceRoot}`);
  process.exit(1);
}

const rootPackage = readJson("package.json");
const requiredNodeMajor = Number(/>=\s*(\d+)/.exec(rootPackage.engines?.node ?? "")?.[1] ?? 0);
const currentNodeMajor = Number(process.versions.node.split(".")[0]);
if (requiredNodeMajor && currentNodeMajor < requiredNodeMajor) {
  console.error(`Node.js ${rootPackage.engines.node} is required; found ${process.version}.`);
  process.exit(1);
}

try {
  packageManagerCommand();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

if (!hasInstalledWebDependencies()) {
  if (!repair) {
    console.error(`\nPowerchain dependencies are missing.\n\nRun:\n  corepack enable\n  corepack pnpm install\n  corepack pnpm dev:web\n`);
    process.exit(1);
  }

  console.log("Powerchain web dependencies are missing; installing the workspace now…");
  // Repair mode intentionally refreshes a stale lockfile. Reproducible CI
  // installs are handled separately by `pnpm ci:install`.
  const install = runPnpm(["install", "--no-frozen-lockfile"]);
  if (install.error || install.status !== 0) {
    console.error("Dependency installation failed. Retry with `corepack pnpm clean:install`.");
    process.exit(install.status ?? 1);
  }
}

const resolution = runPnpm(["--filter", "@powerchain/web", "exec", "next", "--version"], {
  stdio: "pipe",
  encoding: "utf8"
});
if (resolution.error || resolution.status !== 0) {
  console.error("Next.js is declared but cannot be resolved by pnpm.");
  console.error((resolution.stderr ?? "").trim());
  console.error("Run `corepack pnpm clean:install` from the repository root.");
  process.exit(resolution.status ?? 1);
}

console.log(`Dependencies ready (${String(resolution.stdout).trim()}).`);

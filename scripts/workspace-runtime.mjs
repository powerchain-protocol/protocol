import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
export const workspaceRoot = resolve(scriptDirectory, "..");
export const isWindows = process.platform === "win32";

export function commandAvailable(command, args = ["--version"]) {
  const result = spawnSync(command, args, { stdio: "ignore", shell: isWindows });
  return !result.error && result.status === 0;
}

export function packageManagerCommand() {
  if (commandAvailable(isWindows ? "pnpm.cmd" : "pnpm")) {
    return { command: isWindows ? "pnpm.cmd" : "pnpm", prefix: [] };
  }
  if (commandAvailable(isWindows ? "corepack.cmd" : "corepack")) {
    return { command: isWindows ? "corepack.cmd" : "corepack", prefix: ["pnpm"] };
  }
  throw new Error("Neither pnpm nor Corepack is available. Install Node.js with Corepack support.");
}

export function runPnpm(args, options = {}) {
  const manager = packageManagerCommand();
  return spawnSync(manager.command, [...manager.prefix, ...args], {
    cwd: workspaceRoot,
    stdio: options.stdio ?? "inherit",
    encoding: options.encoding,
    env: { ...process.env, COREPACK_ENABLE_DOWNLOAD_PROMPT: "0", ...options.env },
    shell: isWindows
  });
}

export function readJson(relativePath) {
  return JSON.parse(readFileSync(join(workspaceRoot, relativePath), "utf8"));
}

export function hasInstalledWebDependencies() {
  const nextPackage = join(workspaceRoot, "apps", "web", "node_modules", "next", "package.json");
  const rootNextPackage = join(workspaceRoot, "node_modules", "next", "package.json");
  return existsSync(nextPackage) || existsSync(rootNextPackage);
}

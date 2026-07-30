import { existsSync } from "node:fs";
import { join } from "node:path";
import { hasInstalledWebDependencies, readJson, runPnpm, workspaceRoot } from "./workspace-runtime.mjs";

const checks = [];
function add(label, ok, detail) { checks.push({ label, ok, detail }); }

add("Repository root", existsSync(join(workspaceRoot, "pnpm-workspace.yaml")), workspaceRoot);
add("Node.js", Number(process.versions.node.split(".")[0]) >= 22, process.version);

const packageJson = readJson("package.json");
add("Package manager", packageJson.packageManager === "pnpm@11.0.0", packageJson.packageManager ?? "not declared");
add("Web package", existsSync(join(workspaceRoot, "apps/web/package.json")), "apps/web/package.json");
add("Installed dependencies", hasInstalledWebDependencies(), hasInstalledWebDependencies() ? "Next.js package found" : "not installed");

const pnpmVersion = runPnpm(["--version"], { stdio: "pipe", encoding: "utf8" });
add("pnpm executable", !pnpmVersion.error && pnpmVersion.status === 0, String(pnpmVersion.stdout ?? pnpmVersion.error?.message ?? "unavailable").trim());

if (hasInstalledWebDependencies()) {
  const nextVersion = runPnpm(["--filter", "@powerchain/web", "exec", "next", "--version"], { stdio: "pipe", encoding: "utf8" });
  add("Next.js resolution", !nextVersion.error && nextVersion.status === 0, String(nextVersion.stdout ?? nextVersion.stderr ?? "unavailable").trim());
}

for (const result of checks) console.log(`${result.ok ? "✓" : "✗"} ${result.label}: ${result.detail}`);
if (checks.some((result) => !result.ok)) {
  console.error("\nDependency diagnostics failed. Run `corepack pnpm clean:install` from the repository root.");
  process.exit(1);
}

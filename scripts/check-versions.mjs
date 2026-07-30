import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { workspaceRoot } from "./workspace-runtime.mjs";

const release = JSON.parse(readFileSync(join(workspaceRoot, "config/versions.json"), "utf8")).release;
const ignored = new Set(["node_modules", ".git", ".next", "dist", "target", ".turbo"]);
const mismatches = [];
function walk(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignored.has(entry)) continue;
    const full = join(directory, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (entry === "package.json") {
      const value = JSON.parse(readFileSync(full, "utf8"));
      if (typeof value.version === "string" && value.version !== release) {
        mismatches.push(`${relative(workspaceRoot, full)}: ${value.version}`);
      }
    }
  }
}
walk(workspaceRoot);
if (mismatches.length) {
  console.error(`Expected every package version to be ${release}:\n${mismatches.join("\n")}`);
  process.exit(1);
}
console.log(`All package versions match ${release}.`);

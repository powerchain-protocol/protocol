import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { workspaceRoot } from "./workspace-runtime.mjs";

const versions = JSON.parse(readFileSync(join(workspaceRoot, "config/versions.json"), "utf8"));
const release = versions.release;
const ignored = new Set(["node_modules", ".git", ".next", "dist", "target", ".turbo"]);

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignored.has(entry)) continue;
    const full = join(directory, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (entry === "package.json") updatePackage(full);
  }
}

function updatePackage(file) {
  const packageJson = JSON.parse(readFileSync(file, "utf8"));
  if (typeof packageJson.version !== "string") return;
  packageJson.version = release;
  writeFileSync(file, `${JSON.stringify(packageJson, null, 2)}\n`);
  console.log(`updated ${relative(workspaceRoot, file)}`);
}

walk(workspaceRoot);
writeFileSync(join(workspaceRoot, "VERSION"), `${release}\n`);
console.log(`PowerChain workspace synchronized to ${release}.`);

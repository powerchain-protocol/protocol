import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const readme = await readFile(resolve(root, "README.md"), "utf8");
const version = (await readFile(resolve(root, "VERSION"), "utf8")).trim();

const required = [
  "# PowerChain™",
  "## Overview",
  "## Quick start",
  "## Repository structure",
  "## Documentation",
  "## Security",
  "## License",
  version,
];

const missing = required.filter((entry) => !readme.includes(entry));
if (missing.length > 0) {
  console.error(`README validation failed. Missing: ${missing.join(", ")}`);
  process.exit(1);
}

const linkTargets = [
  "LICENSE",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "SECURITY.md",
  "SUPPORT.md",
  "docs/README.md",
  "docs/protocols/ENERGY.md",
  "docs/governance/GOVERNANCE.md",
];

const { access } = await import("node:fs/promises");
for (const target of linkTargets) await access(resolve(root, target));

console.log(`Root README validation passed for PowerChain ${version}.`);

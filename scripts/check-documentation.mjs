import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const required = [
  "CODE_OF_CONDUCT.md",
  "docs/README.md",
  "docs/INTRODUCTION.md",
  "docs/VISION.md",
  "docs/GLOSSARY.md",
  "docs/ROADMAP.md",
  "docs/TODO.md",
  "docs/protocols/ENERGY.md",
  "docs/governance/GOVERNANCE.md",
  "docs/governance/pips/README.md",
  "docs/governance/pips/TEMPLATE.md",
];
for (const file of required) await access(resolve(root, file));
const energy = await readFile(resolve(root, "docs/protocols/ENERGY.md"), "utf8");
if (!energy.includes("Status:") || !energy.includes("Security requirements")) {
  throw new Error("ENERGY.md must declare status and security requirements");
}
const pip = await readFile(resolve(root, "docs/governance/pips/TEMPLATE.md"), "utf8");
for (const heading of ["# Security considerations", "# Testing", "# Migration and activation"]) {
  if (!pip.includes(heading)) throw new Error(`Missing PIP heading: ${heading}`);
}
console.log(`Documentation validation passed (${required.length} required files).`);

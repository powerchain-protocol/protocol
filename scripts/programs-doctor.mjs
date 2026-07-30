import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadPowerchainEnv } from "./load-env.mjs";

await loadPowerchainEnv();
const root = process.cwd();
const programsRoot = path.join(root, "programs");
const programDirs = fs.existsSync(programsRoot)
  ? fs.readdirSync(programsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(programsRoot, entry.name))
      .filter((directory) => fs.existsSync(path.join(directory, "Cargo.toml")))
  : [];
const failures = [];
for (const directory of programDirs) {
  const name = path.basename(directory);
  if (!fs.existsSync(path.join(directory, "src", "lib.rs"))) failures.push(`${name}: missing src/lib.rs`);
  fs.mkdirSync(path.join(directory, "tests"), { recursive: true });
  fs.mkdirSync(path.join(directory, "target"), { recursive: true });
  for (const relative of ["tests/.gitkeep", "target/.gitkeep"]) {
    const file = path.join(directory, relative);
    if (!fs.existsSync(file)) fs.writeFileSync(file, "");
  }
}
console.log(`Checked ${programDirs.length} Anchor program${programDirs.length === 1 ? "" : "s"}.`);
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }

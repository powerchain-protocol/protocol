import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "Cargo.toml",
  "Anchor.toml",
  "programs/powerchain/Cargo.toml",
  "programs/svm/pinocchio-powerchain/Cargo.toml",
  "programs/svm/pinocchio-powerchain/src/lib.rs",
  "programs/svm/resources/networks.json",
  "skills/powerchain-solana/SKILL.md",
  "skills/powerchain-svm/SKILL.md",
];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing ${file}`);
}
const version = "1.0.0-beta.1";
for (const file of ["Cargo.toml", "programs/powerchain/Cargo.toml", "programs/svm/pinocchio-powerchain/Cargo.toml"]) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  if (!text.includes(version) && !text.includes("version.workspace = true")) {
    throw new Error(`${file} is not synchronized to ${version}`);
  }
}
const anchor = fs.readFileSync(path.join(root, "Anchor.toml"), "utf8");
for (const cluster of ["localnet", "devnet", "mainnet"]) {
  if (!anchor.includes(`[programs.${cluster}]`)) throw new Error(`Anchor cluster missing: ${cluster}`);
}
const pinocchio = fs.readFileSync(path.join(root, "programs/svm/pinocchio-powerchain/Cargo.toml"), "utf8");
if (!pinocchio.includes("pinocchio-token-2022")) throw new Error("Token-2022 Pinocchio integration missing");
console.log("Solana, Anchor, Tokio, Pinocchio, SVM, and skills structure validated.");

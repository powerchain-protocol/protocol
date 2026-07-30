import { existsSync, readFileSync } from "node:fs";
const required = [
  "contracts/sui/powerchain/Move.toml",
  "contracts/sui/powerchain/sources/pwrc.move",
  "contracts/sui/powerchain/sources/energy_market.move",
  "contracts/sui/config/devnet.json",
  "contracts/sui/config/mainnet.json",
  "packages/sui/package.json",
];
const missing = required.filter((path) => !existsSync(path));
if (missing.length) throw new Error(`Missing chain files:\n${missing.join("\n")}`);
for (const path of ["contracts/sui/config/devnet.json", "contracts/sui/config/mainnet.json", "packages/sui/package.json"]) JSON.parse(readFileSync(path,"utf8"));
console.log("Solana/Sui contract structure check passed.");

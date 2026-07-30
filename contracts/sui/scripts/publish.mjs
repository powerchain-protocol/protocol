import { spawnSync } from "node:child_process";
const network = process.argv[2] ?? "devnet";
if (!new Set(["devnet", "testnet", "mainnet", "localnet"]).has(network)) throw new Error(`Unsupported Sui network: ${network}`);
const result = spawnSync("sui", ["client", "publish", "--gas-budget", process.env.SUI_GAS_BUDGET ?? "100000000"], {
  cwd: new URL("../powerchain", import.meta.url), stdio: "inherit", shell: process.platform === "win32"
});
process.exit(result.status ?? 1);

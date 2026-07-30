import { access, readFile } from "node:fs/promises";
const required = [
  "packages/web3/src/client/powerchain-client.ts", "packages/web3/src/providers/solana.ts",
  "packages/web3/src/providers/sui.ts", "packages/web3/src/providers/cetus.ts",
  "packages/web3/src/providers/pyth.ts", "packages/sdk/src/index.ts",
  "packages/protocol/src/zk-snark/index.ts",
];
for (const file of required) await access(file);
const pkg = JSON.parse(await readFile("packages/web3/package.json", "utf8"));
if (pkg.name !== "@powerchain/web3.js") throw new Error("Unexpected Web3 package name");
console.log(`SDK surface validated (${required.length} files).`);

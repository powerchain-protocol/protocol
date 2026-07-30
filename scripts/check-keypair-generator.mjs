import { access, readFile } from "node:fs/promises";
const required = [
  "lib/solana/keypairs/generate-keypairs.json",
  "apps/web/lib/solana/keypairs/keypairs-generator.ts",
  "apps/web/lib/solana/keypairs/wallet-keypairs.ts",
  "apps/web/app/generator/page.tsx",
  "programs/generator/keypairs/src/lib.rs",
  "packages/sdk/src/generator/keypairs/index.ts",
  "sdk/generator/keypairs/index.ts",
];
for (const file of required) await access(file);
const source = await readFile("apps/web/lib/solana/keypairs/wallet-keypairs.ts", "utf8");
if (!source.includes("AES-GCM") || !source.includes("PBKDF2")) throw new Error("Secure vault primitives are missing.");
console.log(`Keypair generator structure valid (${required.length} files).`);


import { readFile, writeFile } from "node:fs/promises";

const programId = "PwrChn11111111111111111111111111111111111";
const targets = [
  new URL("../Anchor.toml", import.meta.url),
  new URL("../programs/powerchain/src/lib.rs", import.meta.url),
  new URL("../apps/web/lib/solana/program-id.ts", import.meta.url)
];

for (const target of targets) {
  let text = await readFile(target, "utf8");
  text = text.replace(/PwrChn[1-9A-HJ-NP-Za-km-z]{20,}/g, programId);
  await writeFile(target, text);
}

console.log("Program IDs synchronized.");

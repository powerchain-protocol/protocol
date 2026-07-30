
import { readFile, writeFile } from "node:fs/promises";
const programs = JSON.parse(await readFile("programs/public/programs.json", "utf8"));
const tokens = JSON.parse(await readFile("programs/public/tokens.json", "utf8"));
await writeFile("programs/contracts/generated-manifest.json", JSON.stringify({
  generatedAt: new Date().toISOString(),
  version: "1.0.0-beta.16",
  programs: programs.programs,
  tokens: tokens.tokens
}, null, 2) + "\n");
console.log("Generated programs/contracts/generated-manifest.json");

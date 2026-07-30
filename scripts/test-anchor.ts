
import { readFile } from "node:fs/promises";

const config = await readFile(new URL("../Anchor.toml", import.meta.url), "utf8");
if (!config.includes("PwrChn11111111111111111111111111111111111")) {
  throw new Error("Powerchain program ID is missing from Anchor.toml");
}
console.log("Anchor workspace configuration is valid.");

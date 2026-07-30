
import { readFile } from "node:fs/promises";

const anchor = await readFile("Anchor.toml", "utf8");
const manifest = JSON.parse(await readFile("programs/contracts/platform-services.json", "utf8"));
const publicPrograms = JSON.parse(await readFile("programs/public/programs.json", "utf8"));

const programId = manifest.programId;
if (!anchor.includes(programId)) throw new Error("Program ID missing from Anchor.toml.");
if (!publicPrograms.programs?.some((program: { programId: string }) => program.programId === programId)) {
  throw new Error("Program ID missing from public program manifest.");
}
if (manifest.version !== "1.0.0-beta.16") throw new Error("Program manifest version mismatch.");
console.log(`Verified Powerchain program ${programId}`);

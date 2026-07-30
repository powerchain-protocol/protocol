
import { Keypair } from "@solana/web3.js";
import { writeFile } from "node:fs/promises";

const output = process.argv[2] ?? "./.local/powerchain-keypair.json";
const keypair = Keypair.generate();
await writeFile(output, JSON.stringify(Array.from(keypair.secretKey)));
console.log(`Created ${output}`);
console.log(`Public key: ${keypair.publicKey.toBase58()}`);

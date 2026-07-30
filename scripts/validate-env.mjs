
import { existsSync, readFileSync } from "node:fs";

const files = [
  ["apps/web/.env.local", ["NEXT_PUBLIC_APP_URL", "NEXT_PUBLIC_API_URL"]],
  ["apps/backend/.env", ["DATABASE_URL", "SOLANA_RPC_URL"]],
  ["apps/dashboard/.env.local", ["NEXT_PUBLIC_API_URL"]]
];

let failed = false;

for (const [file, required] of files) {
  if (!existsSync(file)) {
    console.warn(`! ${file} is missing. Copy the matching example from env/.`);
    continue;
  }

  const values = Object.fromEntries(
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index), line.slice(index + 1)];
      })
  );

  for (const key of required) {
    if (!(key in values)) {
      failed = true;
      console.error(`✗ ${file}: missing ${key}`);
    }
  }
}

if (failed) process.exit(1);
console.log("Environment configuration check completed.");

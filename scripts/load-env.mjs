import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function parseFallback(source) {
  const values = {};
  for (const rawLine of source.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    values[key] = value.replace(/\\n/g, "\n");
  }
  return values;
}

export async function loadPowerchainEnv(root = process.cwd()) {
  const mode = process.env.NODE_ENV || "development";
  const files = [".env", `.env.${mode}`, ".env.local", `.env.${mode}.local`];
  let dotenv;
  try { dotenv = (await import("dotenv")).default; } catch { dotenv = undefined; }
  for (const name of files) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;
    if (dotenv) dotenv.config({ path: file, override: true, quiet: true });
    else Object.assign(process.env, parseFallback(fs.readFileSync(file, "utf8")));
  }
  return process.env;
}

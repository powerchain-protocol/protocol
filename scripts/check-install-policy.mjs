import { readFileSync } from "node:fs";
import { join } from "node:path";
import { workspaceRoot } from "./workspace-runtime.mjs";

const root = JSON.parse(readFileSync(join(workspaceRoot, "package.json"), "utf8"));
const web = JSON.parse(readFileSync(join(workspaceRoot, "apps/web/package.json"), "utf8"));
const sdk = JSON.parse(readFileSync(join(workspaceRoot, "packages/sdk/package.json"), "utf8"));

const required = ["axios", "bs58", "uuid", "zod"];
for (const name of required) {
  if (!web.dependencies?.[name]) throw new Error(`apps/web is missing ${name}`);
  if (!sdk.dependencies?.[name]) throw new Error(`@powerchain/sdk is missing ${name}`);
}
if (!web.dependencies?.["@powerchain/sdk"]) throw new Error("apps/web is missing @powerchain/sdk");
if (!root.scripts?.["deps:sync"] || !root.scripts?.["ci:install"]) {
  throw new Error("Root install policy scripts are incomplete");
}
console.log("Install policy and direct dependency declarations are valid.");

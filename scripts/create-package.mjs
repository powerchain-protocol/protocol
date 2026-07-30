
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((entry, index, values) => {
    if (!entry.startsWith("--")) return [entry, true];
    const key = entry.slice(2);
    const value = values[index + 1]?.startsWith("--") ? true : values[index + 1];
    return [key, value];
  })
);

const rawName = String(args.name ?? "").trim();
const description = String(args.description ?? `Powerchain ${rawName} package.`).trim();

if (!/^[a-z][a-z0-9-]*$/.test(rawName)) {
  throw new Error("Use --name with lowercase letters, digits, and hyphens.");
}

const directory = resolve("packages", rawName);
await mkdir(resolve(directory, "src"), { recursive: true });
await mkdir(resolve(directory, "test"), { recursive: true });

const packageJson = {
  name: `@powerchain/${rawName}`,
  version: "1.0.0-beta.13",
  description,
  private: true,
  type: "module",
  sideEffects: false,
  main: "./src/index.ts",
  types: "./src/index.ts",
  exports: { ".": "./src/index.ts" },
  files: ["src", "README.md"],
  scripts: {
    typecheck: "tsc --noEmit",
    test: "node --test test/*.test.ts"
  },
  publishConfig: { access: "restricted", tag: "beta" },
  devDependencies: {
    "@types/node": "latest",
    typescript: "7.0.2"
  }
};

await writeFile(resolve(directory, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);
await writeFile(resolve(directory, "tsconfig.json"), `${JSON.stringify({
  extends: "../../tsconfig.base.json",
  compilerOptions: { noEmit: true },
  include: ["src/**/*.ts", "test/**/*.ts"]
}, null, 2)}\n`);
await writeFile(resolve(directory, "src/index.ts"), `export const packageName = "@powerchain/${rawName}";\n`);
await writeFile(resolve(directory, "test/index.test.ts"), `import test from "node:test";\nimport assert from "node:assert/strict";\nimport { packageName } from "../src/index.js";\n\ntest("exports package name", () => {\n  assert.equal(packageName, "@powerchain/${rawName}");\n});\n`);
await writeFile(resolve(directory, "README.md"), `# @powerchain/${rawName}\n\n${description}\n`);

console.log(`Created packages/${rawName}`);

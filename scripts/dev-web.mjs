import { spawn } from "node:child_process";
import { packageManagerCommand, workspaceRoot } from "./workspace-runtime.mjs";

const manager = packageManagerCommand();
const port = process.env.PORT ?? "3000";
const args = [...manager.prefix, "--filter", "@powerchain/web", "exec", "next", "dev", "--port", port];

const child = spawn(manager.command, args, {
  cwd: workspaceRoot,
  stdio: "inherit",
  env: { ...process.env, COREPACK_ENABLE_DOWNLOAD_PROMPT: "0" },
  shell: process.platform === "win32"
});

child.once("error", (error) => {
  console.error(`Unable to start the Powerchain web app: ${error.message}`);
  console.error("Run `corepack pnpm clean:install` and retry.");
  process.exitCode = 1;
});

child.once("exit", (code, signal) => {
  if (signal) {
    console.error(`Web development server stopped by signal ${signal}.`);
    process.exitCode = 1;
    return;
  }
  process.exitCode = code ?? 0;
});

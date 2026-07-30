
import { spawn } from "node:child_process";

const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const child = spawn(
  command,
  ["--filter", "@powerchain/dashboard", "exec", "next", "dev", "--port", process.env.DASHBOARD_PORT ?? "3001"],
  { cwd: process.cwd(), stdio: "inherit", env: process.env }
);

child.on("error", (error) => {
  console.error("Unable to start the dashboard:", error.message);
  process.exit(1);
});
child.on("exit", (code) => process.exit(code ?? 0));

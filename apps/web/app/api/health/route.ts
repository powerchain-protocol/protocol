import { aggregateHealth, timedHealthCheck } from "@powerchain/core/health";

export const dynamic = "force-dynamic";
const startedAt = Date.now();

export async function GET() {
  const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? process.env.SOLANA_RPC_URL;
  const checks = await Promise.all([
    Promise.resolve({ name: "web", status: "ok" as const, checkedAt: new Date().toISOString() }),
    rpcUrl
      ? timedHealthCheck("solana-rpc", async () => {
          const response = await fetch(rpcUrl, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getHealth" }), cache: "no-store" });
          return response.ok;
        })
      : Promise.resolve({ name: "solana-rpc", status: "degraded" as const, message: "RPC URL is not configured", checkedAt: new Date().toISOString() })
  ]);
  const report = aggregateHealth(checks, process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0-beta.36", Math.floor((Date.now() - startedAt) / 1_000));
  return Response.json(report, { status: report.status === "down" ? 503 : 200, headers: { "cache-control": "no-store" } });
}

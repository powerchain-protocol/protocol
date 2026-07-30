import { env } from "../config/env.js";
import { withFallback } from "./fallback-service.js";

export type WalletBalance = { asset: string; amount: string; decimals: number; usdValue: number | null; verified: boolean };

async function rpcJson(url: string, method: string, params: unknown[]) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), env.REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }), signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json() as { result?: unknown; error?: { message?: string } };
    if (json.error) throw new Error(json.error.message ?? "RPC error");
    return json.result;
  } finally { clearTimeout(timer); }
}

export async function getWalletBalances(address: string, network: "solana" | "sui", environment: "mock" | "devnet" | "mainnet") {
  if (environment === "mock") {
    if (!env.ALLOW_MOCK_DATA) return { data: null, provider: null, available: false, attempts: ["mock"], errors: ["Mock data disabled"] };
    return { data: [{ asset: network === "solana" ? "SOL" : "SUI", amount: "0", decimals: 9, usdValue: null, verified: false } satisfies WalletBalance], provider: "mock", available: true, attempts: ["mock"], errors: [] };
  }
  const rpc = network === "solana" ? env.SOLANA_RPC_URL : env.SUI_RPC_URL;
  return withFallback<WalletBalance[]>([{ provider: `${network}-rpc`, execute: async () => {
    if (network === "solana") {
      const result = await rpcJson(rpc, "getBalance", [address, { commitment: "confirmed" }]) as { value?: number };
      if (typeof result?.value !== "number") throw new Error("Invalid RPC balance response");
      return [{ asset: "SOL", amount: String(result.value / 1_000_000_000), decimals: 9, usdValue: null, verified: true }];
    }
    const result = await rpcJson(rpc, "suix_getBalance", [address]) as { totalBalance?: string };
    if (!result?.totalBalance) throw new Error("Invalid RPC balance response");
    return [{ asset: "SUI", amount: String(Number(result.totalBalance) / 1_000_000_000), decimals: 9, usdValue: null, verified: true }];
  }}]);
}

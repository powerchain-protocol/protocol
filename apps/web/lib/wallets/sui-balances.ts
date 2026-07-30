
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { TOKENS } from "@/tokens";
import type { TokenBalance } from "@/types/balances";

function symbolForCoinType(coinType: string) {
  if (coinType === TOKENS.SUI.mint) return "SUI";
  if (TOKENS.WPWRC.mint && coinType === TOKENS.WPWRC.mint) return "wPWRC";
  return coinType.split("::").at(-1) ?? coinType.slice(0, 8);
}

export async function fetchSuiBalances(address: string): Promise<TokenBalance[]> {
  const client = new SuiClient({
    url: process.env.SUI_RPC ?? getFullnodeUrl((process.env.SUI_NETWORK as "mainnet" | "testnet" | "devnet" | "localnet") ?? "mainnet")
  });

  const response = await client.getAllBalances({ owner: address });

  return response
    .filter((balance) => BigInt(balance.totalBalance) > 0n)
    .map((balance) => ({
      id: `sui:${address}:${balance.coinType}`,
      symbol: symbolForCoinType(balance.coinType),
      mint: balance.coinType,
      chain: "sui" as const,
      amount: balance.totalBalance,
      decimals: 0,
      valueGbp: 0,
      updatedAt: new Date().toISOString()
    }));
}

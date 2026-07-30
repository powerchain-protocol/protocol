
import { z } from "zod";
import { fetchSuiBalances } from "@/lib/wallets/sui-balances";
import { checkRateLimit } from "@/security/rate-limit";

const addressSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);

export async function GET(request: Request) {
  const address = new URL(request.url).searchParams.get("address") ?? "";
  if (!addressSchema.safeParse(address).success) {
    return Response.json({ error: { code: "INVALID_ADDRESS", message: "Enter a valid Sui address." } }, { status: 400 });
  }

  const rate = checkRateLimit(`sui-balance:${address}`, 30);
  if (!rate.allowed) {
    return Response.json({ error: { code: "RATE_LIMITED", message: "Too many balance requests." } }, { status: 429 });
  }

  try {
    const balances = await fetchSuiBalances(address);
    return Response.json({
      data: {
        id: `wallet_sui_${address}`,
        address,
        chain: "sui",
        balances,
        hasSpendableBalance: balances.some((balance) => BigInt(balance.amount) > 0n),
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return Response.json(
      { error: { code: "RPC_ERROR", message: error instanceof Error ? error.message : "Sui RPC failed" } },
      { status: 502 }
    );
  }
}

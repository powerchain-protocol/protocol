
import { z } from "zod";
import { fetchSolanaBalances } from "@/lib/wallets/solana-balances";
import { validateSolanaAddress } from "@/lib/validation/validate";
import { checkRateLimit } from "@/security/rate-limit";

const querySchema = z.string().refine(validateSolanaAddress, "Invalid Solana address");

export async function GET(request: Request) {
  const address = new URL(request.url).searchParams.get("address") ?? "";
  const parsed = querySchema.safeParse(address);
  if (!parsed.success) {
    return Response.json({ error: { code: "INVALID_ADDRESS", message: "Enter a valid Solana address." } }, { status: 400 });
  }

  const rate = checkRateLimit(`solana-balance:${address}`, 30);
  if (!rate.allowed) {
    return Response.json({ error: { code: "RATE_LIMITED", message: "Too many balance requests." } }, { status: 429 });
  }

  try {
    const balances = await fetchSolanaBalances(address);
    return Response.json({
      data: {
        id: `wallet_solana_${address}`,
        address,
        chain: "solana",
        balances,
        hasSpendableBalance: balances.some((balance) => Number(balance.amount) > 0),
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return Response.json(
      { error: { code: "RPC_ERROR", message: error instanceof Error ? error.message : "Solana RPC failed" } },
      { status: 502 }
    );
  }
}

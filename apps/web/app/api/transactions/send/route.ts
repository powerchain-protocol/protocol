
import { z } from "zod";
import { validateSolanaAddress } from "@/lib/validation/validate";
import { calculatePlatformFee } from "@/lib/fees/fees";
import { checkRateLimit } from "@/security/rate-limit";

const schema = z.object({
  sender: z.string().refine(validateSolanaAddress),
  recipient: z.string().refine(validateSolanaAddress),
  symbol: z.enum(["SOL", "PWRC", "USDC", "USDT"]),
  amountBaseUnits: z.string().regex(/^\d+$/).refine((value) => BigInt(value) > 0n),
  signature: z.string().optional()
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: { code: "INVALID_PAYMENT", issues: parsed.error.issues } }, { status: 400 });
  }

  const rate = checkRateLimit(`send:${parsed.data.sender}`, 10);
  if (!rate.allowed) {
    return Response.json({ error: { code: "RATE_LIMITED" } }, { status: 429 });
  }

  const amount = BigInt(parsed.data.amountBaseUnits);
  const fee = calculatePlatformFee(amount);

  return Response.json({
    data: {
      id: crypto.randomUUID(),
      status: parsed.data.signature ? "submitted" : "awaiting_signature",
      sender: parsed.data.sender,
      recipient: parsed.data.recipient,
      symbol: parsed.data.symbol,
      amountBaseUnits: amount.toString(),
      feeBaseUnits: fee.toString(),
      treasuryWallet: process.env.TREASURY_WALLET ?? null,
      signature: parsed.data.signature ?? null,
      createdAt: new Date().toISOString()
    }
  });
}

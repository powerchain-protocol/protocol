
"use server";

import { z } from "zod";
import { calculateEnergyOrder } from "@/lib/trade/energy";

const schema = z.object({
  side: z.enum(["buy", "sell"]),
  amountKwh: z.number().positive(),
  pricePerKwhEur: z.number().positive(),
  walletAddress: z.string().min(16),
  region: z.string().min(2)
});

export async function createEnergyTrade(input: z.infer<typeof schema>) {
  const parsed = schema.parse(input);
  return {
    id: crypto.randomUUID(),
    ...parsed,
    ...calculateEnergyOrder(parsed),
    status: "awaiting-signature" as const,
    createdAt: new Date().toISOString()
  };
}

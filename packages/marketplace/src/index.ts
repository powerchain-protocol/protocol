
import { z } from "zod";

export const marketplaceAssetSchema = z.object({
  id: z.string().min(1),
  symbol: z.string().min(2).max(16),
  name: z.string().min(2),
  category: z.enum(["energy", "solar", "wind", "battery", "carbon", "infrastructure"]),
  network: z.enum(["solana", "sui", "base", "bnb"]),
  tokenAddress: z.string().min(16),
  priceUsd: z.number().nonnegative(),
  availableUnits: z.number().nonnegative(),
  minimumOrderUnits: z.number().positive(),
  verified: z.boolean(),
  metadata: z.record(z.string(), z.unknown()).optional()
});

export const marketplaceOrderSchema = z.object({
  assetId: z.string().min(1),
  side: z.enum(["buy", "sell"]),
  quantity: z.number().positive(),
  priceUsd: z.number().nonnegative(),
  walletAddress: z.string().min(16),
  settlementAsset: z.enum(["USDC", "SOL", "PWRC"]),
  clientReference: z.string().min(1).max(100)
});

export type MarketplaceAsset = z.infer<typeof marketplaceAssetSchema>;
export type MarketplaceOrderInput = z.infer<typeof marketplaceOrderSchema>;
export type MarketplaceOrder = MarketplaceOrderInput & {
  id: string;
  status: "created" | "quoted" | "submitted" | "settled" | "cancelled" | "failed";
  subtotalUsd: number;
  platformFeeUsd: number;
  totalUsd: number;
  createdAt: string;
};

export function calculateMarketplaceOrder(input: Pick<MarketplaceOrderInput, "quantity" | "priceUsd">, feeBps = 200) {
  const subtotalUsd = input.quantity * input.priceUsd;
  const platformFeeUsd = subtotalUsd * feeBps / 10_000;
  return { subtotalUsd, platformFeeUsd, totalUsd: subtotalUsd + platformFeeUsd };
}

export interface MarketplaceRepository {
  list(): Promise<MarketplaceAsset[]>;
  get(id: string): Promise<MarketplaceAsset | undefined>;
  createOrder(input: MarketplaceOrderInput): Promise<MarketplaceOrder>;
}

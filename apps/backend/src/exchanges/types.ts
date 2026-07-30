export const exchangeIds = ["jupiter", "raydium", "orca", "cetus", "aftermath"] as const;
export type ExchangeId = (typeof exchangeIds)[number];
export type ExchangeNetwork = "solana" | "sui";

export interface ExchangeDescriptor {
  id: ExchangeId;
  name: string;
  network: ExchangeNetwork;
  capabilities: Array<"quote" | "routes" | "simulate" | "swap" | "fees" | "status">;
  enabled: boolean;
}

export interface QuoteRequest {
  inputMint: string;
  outputMint: string;
  amount: string;
  slippageBps: number;
  exchange?: ExchangeId;
  network?: ExchangeNetwork;
  userPublicKey?: string;
}

export interface ExchangeQuote {
  exchange: ExchangeId;
  network: ExchangeNetwork;
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  minimumOutAmount?: string;
  priceImpactPct?: string;
  route: unknown;
  expiresAt: string;
  raw?: unknown;
}

export interface SwapRequest extends QuoteRequest {
  userPublicKey: string;
  idempotencyKey: string;
  quote?: ExchangeQuote;
}

export interface SwapTransaction {
  exchange: ExchangeId;
  transaction: string;
  encoding: "base64";
  expiresAt?: string;
}

export interface ExchangeProvider {
  descriptor: ExchangeDescriptor;
  status(signal?: AbortSignal): Promise<{ available: boolean; latencyMs: number; reason?: string }>;
  getQuote(input: QuoteRequest, signal?: AbortSignal): Promise<ExchangeQuote>;
  getSwapTransaction?(input: SwapRequest, signal?: AbortSignal): Promise<SwapTransaction>;
}

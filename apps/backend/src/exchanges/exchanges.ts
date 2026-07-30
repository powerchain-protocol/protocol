import { env } from "../config/env.js";
import { jupiterProvider } from "./providers/jupiter.js";
import { createConfigurableProvider } from "./providers/configurable.js";
import type { ExchangeId, ExchangeProvider, QuoteRequest, SwapRequest } from "./types.js";

const providers: ExchangeProvider[] = [
  jupiterProvider,
  createConfigurableProvider({ id: "raydium", name: "Raydium", network: "solana", capabilities: ["quote", "routes", "fees", "status"], enabled: true }, env.RAYDIUM_API_URL),
  createConfigurableProvider({ id: "orca", name: "Orca", network: "solana", capabilities: ["quote", "routes", "fees", "status"], enabled: true }, env.ORCA_API_URL),
  createConfigurableProvider({ id: "cetus", name: "Cetus", network: "sui", capabilities: ["quote", "routes", "fees", "status"], enabled: true }, env.CETUS_API_URL),
  createConfigurableProvider({ id: "aftermath", name: "Aftermath", network: "sui", capabilities: ["quote", "routes", "fees", "status"], enabled: true }, env.AFTERMATH_API_URL)
];

export function getSupportedExchanges() { return providers.map(provider => provider.descriptor); }
export function getExchange(id: ExchangeId) { return providers.find(provider => provider.descriptor.id === id); }

function candidates(input: QuoteRequest) {
  return providers.filter(provider => provider.descriptor.enabled && (!input.exchange || provider.descriptor.id === input.exchange) && (!input.network || provider.descriptor.network === input.network));
}

export async function getQuotes(input: QuoteRequest) {
  const attempts: Array<{ exchange: ExchangeId; error?: string }> = [];
  const quotes = [];
  for (const provider of candidates(input)) {
    try { quotes.push(await provider.getQuote(input)); attempts.push({ exchange: provider.descriptor.id }); }
    catch (error) { attempts.push({ exchange: provider.descriptor.id, error: error instanceof Error ? error.message : "quote failed" }); }
  }
  quotes.sort((a, b) => BigInt(b.outAmount) > BigInt(a.outAmount) ? 1 : BigInt(b.outAmount) < BigInt(a.outAmount) ? -1 : 0);
  return { quotes, best: quotes[0] ?? null, attempts };
}

export async function getProviderStatuses() {
  return Promise.all(providers.map(async provider => ({ ...provider.descriptor, ...(await provider.status()) })));
}

export function estimateFees(quote: { inAmount: string; outAmount: string; minimumOutAmount?: string }) {
  const expected = BigInt(quote.outAmount);
  const minimum = quote.minimumOutAmount ? BigInt(quote.minimumOutAmount) : expected;
  return { networkFee: null, providerFee: null, slippageReserve: (expected - minimum).toString(), currency: "output-token-units", estimated: true };
}

const idempotency = new Map<string, { expires: number; value: unknown }>();
export async function createSwapTransaction(input: SwapRequest) {
  const cached = idempotency.get(input.idempotencyKey);
  if (cached && cached.expires > Date.now()) return { ...cached.value as object, replayed: true };
  const provider = input.exchange ? getExchange(input.exchange) : undefined;
  if (!provider?.descriptor.enabled || !provider.getSwapTransaction) throw new Error("Selected exchange does not support server-side swap transaction creation");
  const value = await provider.getSwapTransaction(input);
  idempotency.set(input.idempotencyKey, { expires: Date.now() + 10 * 60_000, value });
  return { ...value, replayed: false };
}

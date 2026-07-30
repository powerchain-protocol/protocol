import { secureFetch, assertSecureExchangeUrl } from "../ssl.js";
import type { ExchangeDescriptor, ExchangeProvider, QuoteRequest } from "../types.js";

export function createConfigurableProvider(descriptor: ExchangeDescriptor, endpoint?: string): ExchangeProvider {
  return {
    descriptor: { ...descriptor, enabled: descriptor.enabled && Boolean(endpoint) },
    async status(signal) {
      const started = Date.now();
      if (!endpoint) return { available: false, latencyMs: 0, reason: "provider endpoint not configured" };
      try {
        const response = await secureFetch(assertSecureExchangeUrl(endpoint), { method: "HEAD", signal });
        return { available: response.ok, latencyMs: Date.now() - started, reason: response.ok ? undefined : `HTTP ${response.status}` };
      } catch (error) {
        return { available: false, latencyMs: Date.now() - started, reason: error instanceof Error ? error.message : "request failed" };
      }
    },
    async getQuote(input: QuoteRequest, signal) {
      if (!endpoint) throw new Error(`${descriptor.name} endpoint is not configured`);
      const url = assertSecureExchangeUrl(endpoint);
      const response = await secureFetch(url, {
        method: "POST", signal, headers: { "content-type": "application/json" },
        body: JSON.stringify({ inputMint: input.inputMint, outputMint: input.outputMint, amount: input.amount, slippageBps: input.slippageBps })
      });
      if (!response.ok) throw new Error(`${descriptor.name} quote failed with HTTP ${response.status}`);
      const data = await response.json() as Record<string, unknown>;
      if (typeof data.outAmount !== "string") throw new Error(`${descriptor.name} returned an invalid quote`);
      return {
        exchange: descriptor.id, network: descriptor.network, inputMint: input.inputMint, outputMint: input.outputMint,
        inAmount: typeof data.inAmount === "string" ? data.inAmount : input.amount, outAmount: data.outAmount,
        minimumOutAmount: typeof data.minimumOutAmount === "string" ? data.minimumOutAmount : undefined,
        priceImpactPct: typeof data.priceImpactPct === "string" ? data.priceImpactPct : undefined,
        route: data.route ?? [], expiresAt: new Date(Date.now() + 30_000).toISOString(), raw: data
      };
    }
  };
}

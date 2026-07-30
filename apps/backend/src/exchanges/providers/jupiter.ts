import { env } from "../../config/env.js";
import { secureFetch, assertSecureExchangeUrl } from "../ssl.js";
import type { ExchangeProvider, QuoteRequest, SwapRequest } from "../types.js";

const baseUrl = assertSecureExchangeUrl(env.JUPITER_API_URL);

export const jupiterProvider: ExchangeProvider = {
  descriptor: { id: "jupiter", name: "Jupiter", network: "solana", capabilities: ["quote", "routes", "simulate", "swap", "fees", "status"], enabled: env.ENABLE_JUPITER_EXCHANGE },
  async status(signal) {
    const started = Date.now();
    try {
      const url = new URL("quote", baseUrl);
      url.searchParams.set("inputMint", "So11111111111111111111111111111111111111112");
      url.searchParams.set("outputMint", "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
      url.searchParams.set("amount", "1000");
      url.searchParams.set("slippageBps", "50");
      const response = await secureFetch(url, { signal });
      return { available: response.ok, latencyMs: Date.now() - started, reason: response.ok ? undefined : `HTTP ${response.status}` };
    } catch (error) {
      return { available: false, latencyMs: Date.now() - started, reason: error instanceof Error ? error.message : "request failed" };
    }
  },
  async getQuote(input: QuoteRequest, signal) {
    const url = new URL("quote", baseUrl);
    url.searchParams.set("inputMint", input.inputMint);
    url.searchParams.set("outputMint", input.outputMint);
    url.searchParams.set("amount", input.amount);
    url.searchParams.set("slippageBps", String(input.slippageBps));
    const response = await secureFetch(url, { signal, headers: env.JUPITER_API_KEY ? { "x-api-key": env.JUPITER_API_KEY } : undefined });
    if (!response.ok) throw new Error(`Jupiter quote failed with HTTP ${response.status}`);
    const data = await response.json() as Record<string, unknown>;
    if (typeof data.outAmount !== "string") throw new Error("Jupiter returned an invalid quote");
    return {
      exchange: "jupiter", network: "solana", inputMint: input.inputMint, outputMint: input.outputMint,
      inAmount: typeof data.inAmount === "string" ? data.inAmount : input.amount,
      outAmount: data.outAmount,
      minimumOutAmount: typeof data.otherAmountThreshold === "string" ? data.otherAmountThreshold : undefined,
      priceImpactPct: typeof data.priceImpactPct === "string" ? data.priceImpactPct : undefined,
      route: data.routePlan ?? [], expiresAt: new Date(Date.now() + 30_000).toISOString(), raw: data
    };
  },
  async getSwapTransaction(input: SwapRequest, signal) {
    const quote = input.quote ?? await this.getQuote(input, signal);
    const url = new URL("swap", baseUrl);
    const response = await secureFetch(url, {
      method: "POST", signal,
      headers: { "content-type": "application/json", ...(env.JUPITER_API_KEY ? { "x-api-key": env.JUPITER_API_KEY } : {}) },
      body: JSON.stringify({ quoteResponse: quote.raw ?? quote, userPublicKey: input.userPublicKey, wrapAndUnwrapSol: true, dynamicComputeUnitLimit: true })
    });
    if (!response.ok) throw new Error(`Jupiter swap failed with HTTP ${response.status}`);
    const data = await response.json() as Record<string, unknown>;
    if (typeof data.swapTransaction !== "string") throw new Error("Jupiter returned an invalid swap transaction");
    return { exchange: "jupiter", transaction: data.swapTransaction, encoding: "base64", expiresAt: quote.expiresAt };
  }
};

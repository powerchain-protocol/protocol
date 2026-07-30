import { fetchJson, type RpcRequestOptions } from "./base";

export interface CetusQuoteRequest { from: string; target: string; amount: string; byAmountIn?: boolean; }
export interface CetusQuote { amountIn: string; amountOut: string; priceImpact?: string; routes?: unknown[]; }

export class CetusProvider {
  constructor(readonly baseUrl = "https://api-sui.cetus.zone") {}
  quote(input: CetusQuoteRequest, options?: RpcRequestOptions): Promise<CetusQuote> {
    const query = new URLSearchParams({
      from: input.from,
      target: input.target,
      amount: input.amount,
      by_amount_in: String(input.byAmountIn ?? true),
    });
    return fetchJson<CetusQuote>("cetus", `${this.baseUrl}/router_v2/find_routes?${query}`, {}, options);
  }
}

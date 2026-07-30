import { fetchJson, type RpcRequestOptions } from "./base";

export interface PythPrice { id: string; price: { price: string; conf: string; expo: number; publish_time: number }; }
export class PythProvider {
  constructor(readonly baseUrl = "https://hermes.pyth.network") {}
  getLatestPriceUpdates(priceIds: string[], options?: RpcRequestOptions) {
    if (!priceIds.length) throw new TypeError("At least one Pyth price ID is required");
    const query = new URLSearchParams();
    priceIds.forEach((id) => query.append("ids[]", id));
    return fetchJson<{ parsed?: PythPrice[]; binary?: unknown }>("pyth", `${this.baseUrl}/v2/updates/price/latest?${query}`, {}, options);
  }
}

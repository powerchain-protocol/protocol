
import { IntegrationClient } from "../base.js";

export class DexScreenerClient extends IntegrationClient {
  constructor() {
    super({ baseUrl: "https://api.dexscreener.com/latest" });
  }

  async tokenPairs(chainId: string, tokenAddress: string) {
    return this.request(`/dex/tokens/${tokenAddress}?chainId=${encodeURIComponent(chainId)}`);
  }
}

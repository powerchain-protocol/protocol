
import { IntegrationClient } from "../base.js";

export class CoinMarketCapClient extends IntegrationClient {
  constructor(apiKey: string) {
    super({
      baseUrl: "https://pro-api.coinmarketcap.com",
      headers: { "X-CMC_PRO_API_KEY": apiKey }
    });
  }

  async quotes(symbols: string[], convert = "GBP") {
    const query = new URLSearchParams({ symbol: symbols.join(","), convert });
    return this.request(`/v2/cryptocurrency/quotes/latest?${query}`);
  }
}

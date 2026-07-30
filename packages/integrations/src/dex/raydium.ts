
import { IntegrationClient } from "../base.js";

export class RaydiumClient extends IntegrationClient {
  constructor(baseUrl = "https://api-v3.raydium.io") {
    super({ baseUrl });
  }

  async pools(params: { mint1?: string; mint2?: string; pageSize?: number } = {}) {
    const query = new URLSearchParams();
    if (params.mint1) query.set("mint1", params.mint1);
    if (params.mint2) query.set("mint2", params.mint2);
    query.set("pageSize", String(params.pageSize ?? 20));
    return this.request(`/pools/info/mint?${query}`);
  }
}

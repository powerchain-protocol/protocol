
import { IntegrationClient } from "../base.js";

export class CetusClient extends IntegrationClient {
  constructor(baseUrl = "https://api-sui.cetus.zone") {
    super({ baseUrl });
  }

  async pools() {
    return this.request<{ data: unknown[] }>("/v2/sui/pools_info");
  }
}

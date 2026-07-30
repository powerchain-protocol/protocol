
import { IntegrationClient } from "../base.js";

export class MeteoraClient extends IntegrationClient {
  constructor(baseUrl = "https://dlmm-api.meteora.ag") {
    super({ baseUrl });
  }

  async pairs() {
    return this.request("/pair/all");
  }
}

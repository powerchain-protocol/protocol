
import { IntegrationClient } from "../base.js";

export class OrcaClient extends IntegrationClient {
  constructor(baseUrl = "https://api.orca.so") {
    super({ baseUrl });
  }

  async whirlpools() {
    return this.request("/v1/whirlpool/list");
  }
}


import { IntegrationClient } from "../base.js";

export class CircleClient extends IntegrationClient {
  constructor(apiKey: string, baseUrl = "https://api.circle.com") {
    super({ baseUrl, apiKey, headers: { "content-type": "application/json" } });
  }

  async createTransfer(input: {
    idempotencyKey: string;
    sourceWalletId: string;
    destinationAddress: string;
    amount: string;
    currency?: "USDC";
    chain: string;
  }) {
    return this.request("/v1/transfers", {
      method: "POST",
      body: JSON.stringify({
        idempotencyKey: input.idempotencyKey,
        source: { type: "wallet", id: input.sourceWalletId },
        destination: { type: "blockchain", address: input.destinationAddress, chain: input.chain },
        amount: { amount: input.amount, currency: input.currency ?? "USDC" }
      })
    });
  }
}

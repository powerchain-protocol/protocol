
import { IntegrationClient } from "../base.js";

export class StripeClient extends IntegrationClient {
  constructor(secretKey: string) {
    super({
      baseUrl: "https://api.stripe.com",
      headers: {
        authorization: `Bearer ${secretKey}`,
        "content-type": "application/x-www-form-urlencoded"
      }
    });
  }

  async createPaymentIntent(input: { amountMinor: number; currency: string; metadata?: Record<string, string> }) {
    const body = new URLSearchParams({
      amount: String(input.amountMinor),
      currency: input.currency,
      "automatic_payment_methods[enabled]": "true",
      ...Object.fromEntries(
        Object.entries(input.metadata ?? {}).map(([key, value]) => [`metadata[${key}]`, value])
      )
    });
    return this.request("/v1/payment_intents", { method: "POST", body });
  }
}

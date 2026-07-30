
import { createX402Requirement, x402Response } from "@/lib/x402/payment";

export async function GET(request: Request) {
  const payment = request.headers.get("x-payment");
  if (!payment) {
    return x402Response(createX402Requirement({
      network: process.env.X402_NETWORK ?? "solana",
      maxAmountRequired: process.env.X402_ENERGY_QUOTE_PRICE ?? "10000",
      resource: "/api/x402/energy-quote",
      description: "Powerchain regional energy market quote",
      mimeType: "application/json",
      payTo: process.env.TREASURY_WALLET ?? "",
      maxTimeoutSeconds: 60,
      asset: process.env.USDC_MINT ?? ""
    }));
  }

  return Response.json({
    data: {
      id: crypto.randomUUID(),
      region: "FI",
      pricePerKwhGbp: 0.1228,
      renewablePremiumGbp: 0.0064,
      validUntil: new Date(Date.now() + 60_000).toISOString()
    }
  });
}

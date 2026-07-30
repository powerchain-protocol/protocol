
import type { FastifyInstance } from "fastify";

export async function x402Routes(app: FastifyInstance) {
  app.get("/payments/x402/config", async () => ({
    data: {
      enabled: process.env.X402_ENABLED === "true",
      network: process.env.X402_NETWORK ?? "solana",
      treasuryWallet: process.env.TREASURY_WALLET ?? null
    }
  }));
}

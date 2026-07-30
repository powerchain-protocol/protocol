
import type { FastifyInstance } from "fastify";
import { ok } from "../../lib/http.js";
export async function marketRoutes(app: FastifyInstance) {
  app.get("/markets", async (_request, reply) => ok(reply, {
    quotes: [
      { symbol: "PWRC/GBP", price: 0.083, change24h: 12.4, source: "jupiter" },
      { symbol: "SOL/GBP", price: 118.42, change24h: 4.8, source: "pyth" },
      { symbol: "CCT/GBP", price: 15.22, change24h: 1.9, source: "birdeye" }
    ]
  }));
}

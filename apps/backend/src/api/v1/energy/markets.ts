
import type { FastifyInstance } from "fastify";

export async function energyRoutes(app: FastifyInstance) {
  app.get("/energy/markets", async () => ({
    data: [
      { id: "market_fi", region: "FI", currency: "EUR", pricePerKwh: 0.1174, source: "Powerchain Index" },
      { id: "market_se", region: "SE", currency: "EUR", pricePerKwh: 0.1031, source: "Powerchain Index" }
    ]
  }));
}

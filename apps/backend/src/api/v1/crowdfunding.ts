
import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";

export async function crowdfundingRoutes(app: FastifyInstance) {
  app.get("/crowdfunding/campaigns", async () => ({
    data: [
      { id: "campaign_solar_001", title: "Oulu Community Solar Expansion", goalEur: 1200000, raisedEur: 864000, status: "open" },
      { id: "campaign_battery_001", title: "Espoo Battery Reserve", goalEur: 2400000, raisedEur: 1395000, status: "open" }
    ]
  }));

  app.post<{ Body: { campaignId: string; amountEur: number; paymentMethod: string } }>("/crowdfunding/investments", async (request, reply) => {
    if (request.body.amountEur <= 0) {
      return reply.code(400).send({ error: { code: "INVALID_INVESTMENT_AMOUNT" } });
    }
    return reply.code(201).send({
      data: {
        id: randomUUID(),
        ...request.body,
        status: "awaiting-payment",
        createdAt: new Date().toISOString()
      }
    });
  });
}

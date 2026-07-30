
import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";

export async function tradeRoutes(app: FastifyInstance) {
  app.get("/trade/orders", async () => ({ data: [] }));
  app.post<{ Body: { side: "buy" | "sell"; amountKwh: number; pricePerKwhGbp: number; region: string } }>("/trade/orders", async (request, reply) => {
    if (request.body.amountKwh <= 0 || request.body.pricePerKwhGbp <= 0) {
      return reply.code(400).send({ error: { code: "INVALID_ORDER" } });
    }
    return reply.code(201).send({
      data: {
        id: randomUUID(),
        ...request.body,
        status: "open",
        createdAt: new Date().toISOString()
      }
    });
  });
}

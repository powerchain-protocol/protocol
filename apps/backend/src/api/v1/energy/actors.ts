
import type { FastifyInstance } from "fastify";

export async function energyActorRoutes(app: FastifyInstance) {
  app.get("/energy/actors", async () => ({
    data: [
      { id: "actor_prosumer_001", role: "prosumer", municipality: "Oulu", status: "active" },
      { id: "actor_consumer_001", role: "consumer", municipality: "Helsinki", status: "active" }
    ]
  }));
}

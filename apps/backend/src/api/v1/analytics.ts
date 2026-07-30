
import type { FastifyInstance } from "fastify";

export async function analyticsRoutes(app: FastifyInstance) {
  app.get("/analytics/overview", async () => ({
    data: {
      energyTradedMwh: 8720,
      settlementVolumeEur: 3240000,
      carbonRetiredTonnes: 1240000,
      onlineDevices: 1284
    }
  }));
}

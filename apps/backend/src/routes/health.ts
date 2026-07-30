
import type { FastifyPluginAsync } from "fastify";

export const healthRouter: FastifyPluginAsync = async (app) => {
  app.get("/healthz", async () => ({
    status: "ok",
    service: "powerchain-api",
    version: "1.0.0-beta.7",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  }));

  app.get("/readyz", async () => ({
    status: "ready",
    checks: {
      api: "ok",
      database: process.env.DATABASE_URL ? "configured" : "not-configured",
      redis: process.env.REDIS_URL ? "configured" : "not-configured"
    }
  }));
};

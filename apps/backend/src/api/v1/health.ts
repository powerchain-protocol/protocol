
import type { FastifyInstance } from "fastify";
import { ok } from "../../lib/http.js";
export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async (_request, reply) => ok(reply, { status: "ok", version: "v1", timestamp: new Date().toISOString() }));
}

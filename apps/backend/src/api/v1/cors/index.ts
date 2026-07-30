
import type { FastifyInstance } from "fastify";

export async function corsRoutes(app: FastifyInstance) {
  app.get("/cors", async (request) => ({
    data: {
      origin: request.headers.origin ?? null,
      allowedOrigins: process.env.CORS_ORIGIN?.split(",").map((value) => value.trim()) ?? [],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["authorization", "content-type", "x-request-id", "x-wallet-signature"]
    }
  }));
}

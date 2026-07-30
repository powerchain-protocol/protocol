
import type { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
  app.get<{ Params: { id: string } }>("/users/:id", async (request, reply) => {
    if (!/^usr_[a-zA-Z0-9_-]+$/.test(request.params.id)) {
      return reply.code(400).send({ error: { code: "INVALID_USER_ID" } });
    }
    if (request.params.id !== "usr_001") {
      return reply.code(404).send({ error: { code: "USER_NOT_FOUND" } });
    }
    return {
      data: {
        id: "usr_001",
        name: "John Doe",
        role: "owner",
        status: "active",
        permissions: ["portfolio:read", "payments:create", "trade:create", "users:manage"]
      }
    };
  });
}

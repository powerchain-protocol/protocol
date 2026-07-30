import type { FastifyInstance } from "fastify";
import { requirePermission } from "../../security/rbac.js";
import { storeUpload } from "../../services/upload-service.js";

export async function uploadRoutes(app: FastifyInstance) {
  app.post("/uploads", {
    preHandler: requirePermission("assets:write"),
    config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
  }, async (request, reply) => {
    const file = await request.file();
    if (!file) return reply.code(400).send({ error: { code: "FILE_REQUIRED", message: "A file is required." } });
    const bytes = new Uint8Array(await file.toBuffer());
    const data = await storeUpload({ filename: file.filename, mimetype: file.mimetype, bytes });
    return reply.code(201).send({ data });
  });
}

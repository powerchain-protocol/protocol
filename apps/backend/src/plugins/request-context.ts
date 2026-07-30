
import type { FastifyPluginAsync } from "fastify";
import { randomUUID } from "node:crypto";

declare module "fastify" {
  interface FastifyRequest {
    requestId: string;
  }
}

export const requestContextPlugin: FastifyPluginAsync = async (app) => {
  app.decorateRequest("requestId", "");

  app.addHook("onRequest", async (request, reply) => {
    request.requestId = request.headers["x-request-id"]?.toString() ?? `req_${randomUUID()}`;
    reply.header("x-request-id", request.requestId);
  });
};

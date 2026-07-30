
import type { FastifyPluginAsync } from "fastify";
import { ApplicationError } from "@powerchain/shared";

export const errorHandlerPlugin: FastifyPluginAsync = async (app) => {
  app.setErrorHandler((error, request, reply) => {
    request.log.error({ error, requestId: request.requestId }, "request failed");

    if (error instanceof ApplicationError) {
      return reply.code(error.statusCode).send({
        error: { code: error.code, message: error.message, details: error.details },
        meta: { requestId: request.requestId, timestamp: new Date().toISOString(), version: "v1" }
      });
    }

    const typed = error as Error & { statusCode?: number; code?: string; details?: unknown };
    if (typed.statusCode && typed.statusCode >= 400 && typed.statusCode < 500) {
      return reply.code(typed.statusCode).send({
        error: { code: typed.code ?? "BAD_REQUEST", message: typed.message, details: typed.details },
        meta: { requestId: request.requestId, timestamp: new Date().toISOString(), version: "v1" }
      });
    }

    return reply.code(500).send({
      error: { code: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred." },
      meta: { requestId: request.requestId, timestamp: new Date().toISOString(), version: "v1" }
    });
  });
};

import rateLimit from "@fastify/rate-limit";
import type { FastifyPluginAsync } from "fastify";
import { env } from "../config/env.js";

export const rateLimitPlugin: FastifyPluginAsync = async (app) => {
  await app.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW,
    keyGenerator: (request) => request.headers["x-api-key"]?.toString() ?? request.ip,
    allowList: (request) => request.url === "/health" || request.url === "/api/v1/health",
    errorResponseBuilder: (_request, context) => ({
      error: {
        code: "RATE_LIMITED",
        message: `Too many requests. Retry in ${Math.ceil(context.ttl / 1000)} seconds.`,
      },
    }),
  });
};

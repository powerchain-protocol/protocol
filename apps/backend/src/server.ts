
import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { env } from "./config/env.js";
import { serverConfig } from "./config/server.js";
import { rootRouter } from "./routers/root-router.js";
import { requestContextPlugin } from "./plugins/request-context.js";
import { errorHandlerPlugin } from "./plugins/error-handler.js";
import { securityPlugin } from "./plugins/security.js";
import { trustedHostPlugin } from "./plugins/trusted-host.js";
import { swaggerPlugin } from "./plugins/swagger.js";
import { rateLimitPlugin } from "./plugins/rate-limit.js";

export async function buildServer() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? "info",
      redact: ["req.headers.authorization", "req.headers.cookie", "request.headers.authorization"]
    },
    trustProxy: serverConfig.trustProxy,
    bodyLimit: serverConfig.bodyLimit,
    requestTimeout: serverConfig.requestTimeout,
    keepAliveTimeout: serverConfig.keepAliveTimeout,
    disableRequestLogging: process.env.NODE_ENV === "test"
  });

  await app.register(cors, {
    origin: serverConfig.corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  });

  await app.register(rateLimitPlugin);

  await app.register(multipart, {
    limits: {
      fileSize: serverConfig.uploadLimit,
      files: 5,
      fields: 20
    }
  });

  await app.register(requestContextPlugin);
  await app.register(errorHandlerPlugin);
  await app.register(securityPlugin);
  await app.register(trustedHostPlugin);
  await app.register(swaggerPlugin);
  await app.register(rootRouter);

  app.addHook("onSend", async (_request, reply, payload) => {
    reply.header("x-content-type-options", "nosniff");
    reply.header("referrer-policy", "strict-origin-when-cross-origin");
    return payload;
  });

  return app;
}

const app = await buildServer();

try {
  await app.listen({ port: serverConfig.port, host: serverConfig.host });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}

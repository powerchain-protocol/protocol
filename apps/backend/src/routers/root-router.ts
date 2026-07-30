
import type { FastifyPluginAsync } from "fastify";
import { apiRouter } from "./api-router.js";
import { docsRouter } from "../routes/docs.js";
import { healthRouter } from "../routes/health.js";
import { serviceRootRouter } from "../routes/root.js";

export const rootRouter: FastifyPluginAsync = async (app) => {
  await app.register(serviceRootRouter);
  await app.register(healthRouter);
  await app.register(docsRouter);
  await app.register(apiRouter);
};

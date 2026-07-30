
import type { FastifyPluginAsync } from "fastify";
import { apiV1 } from "../api/v1/index.js";
import { apiV2 } from "../api/v2/index.js";

export const apiRouter: FastifyPluginAsync = async (app) => {
  await app.register(apiV1, { prefix: "/api/v1" });
  await app.register(apiV2, { prefix: "/api/v2" });
};

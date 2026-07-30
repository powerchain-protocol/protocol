
import type { FastifyPluginAsync } from "fastify";
import { domainConfig } from "../config/domains.js";

export const serviceRootRouter: FastifyPluginAsync = async (app) => {
  app.get("/", async () => ({
    name: "Powerchain API",
    version: "1.0.0-beta.12",
    status: "operational",
    api: `${domainConfig.apiUrl}/api/v1`,
    documentation: domainConfig.docsUrl,
    openapi: `${domainConfig.apiUrl}/openapi.json`,
    swagger: `${domainConfig.apiUrl}/swagger.yaml`,
    health: `${domainConfig.apiUrl}/healthz`
  }));
};

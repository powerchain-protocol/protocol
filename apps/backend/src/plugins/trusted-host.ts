
import type { FastifyPluginAsync } from "fastify";
import { domainConfig } from "../config/domains.js";

export const trustedHostPlugin: FastifyPluginAsync = async (app) => {
  app.addHook("onRequest", async (request, reply) => {
    const host = request.hostname;
    const trusted = domainConfig.trustedHosts.some(
      (allowed) => host === allowed || host.endsWith(`.${allowed}`)
    );

    if (!trusted && process.env.NODE_ENV === "production") {
      return reply.code(421).send({
        error: {
          code: "UNTRUSTED_HOST",
          message: "The request host is not permitted."
        }
      });
    }
  });
};

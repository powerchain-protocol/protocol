
import type { FastifyPluginAsync } from "fastify";

export const securityPlugin: FastifyPluginAsync = async (app) => {
  app.addHook("onRequest", async (request, reply) => {
    reply.header("x-content-type-options", "nosniff");
    reply.header("x-frame-options", "DENY");
    reply.header("referrer-policy", "strict-origin-when-cross-origin");
    reply.header("permissions-policy", "camera=(), microphone=(), geolocation=()");
    reply.header("cross-origin-resource-policy", "same-site");
    reply.header("cross-origin-opener-policy", "same-origin");
    reply.header("x-permitted-cross-domain-policies", "none");
    reply.header("content-security-policy", "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'");
    if (process.env.NODE_ENV === "production") reply.header("strict-transport-security", "max-age=63072000; includeSubDomains; preload");

    const length = Number(request.headers["content-length"] ?? 0);
    if (length > 2_000_000) {
      return reply.code(413).send({ error: { code: "PAYLOAD_TOO_LARGE" } });
    }
  });
};

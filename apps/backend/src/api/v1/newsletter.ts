
import type { FastifyInstance } from "fastify";
import { renderEmailTemplate } from "@powerchain/email";
import { ok } from "../../lib/http.js";

export async function newsletterRoutes(app: FastifyInstance) {
  app.post<{ Body: { email?: string } }>("/newsletter", async (request, reply) => {
    const email = request.body?.email?.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return reply.code(400).send({ error: { code: "INVALID_EMAIL", message: "Enter a valid email address." } });
    }
    const previewHtml = renderEmailTemplate({
      heading: "Welcome to Powerchain",
      preview: "Your renewable infrastructure briefing is ready.",
      body: "You are now subscribed to Powerchain product, market, and ecosystem updates.",
      actionLabel: "Open Powerchain",
      actionUrl: "https://powerchain.example"
    });
    request.log.info({ email, previewLength: previewHtml.length }, "newsletter subscription");
    return ok(reply, { subscribed: true });
  });
}

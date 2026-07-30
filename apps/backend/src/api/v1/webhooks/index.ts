import type { FastifyInstance } from "fastify";
import { randomBytes, randomUUID } from "node:crypto";
import { env } from "../../../config/env.js";
import { parseOrThrow } from "../../../schemas/common.js";
import { webhookEventSchema, webhookProviderSchema, webhookSubscriptionSchema } from "../../../schemas/webhook.js";
import { verifyWebhookSignature } from "../../../security/webhook-signatures.js";

const subscriptions = new Map<string, object>();
const processedEvents = new Set<string>();

export async function webhookRoutes(app: FastifyInstance) {
  app.post("/webhooks/subscriptions", { schema: { tags: ["Webhooks"], summary: "Create webhook subscription" } }, async (request, reply) => {
    const body = parseOrThrow(webhookSubscriptionSchema, request.body);
    const id = `whsub_${randomUUID()}`;
    const secret = `whsec_${randomBytes(24).toString("hex")}`;
    subscriptions.set(id, { id, ...body, status: "active", createdAt: new Date().toISOString() });
    return reply.code(201).send({ data: { id, secret, status: "active" }, meta: { requestId: request.requestId } });
  });

  app.post<{ Params: { provider: string } }>("/webhooks/incoming/:provider", { config: { rawBody: true }, schema: { tags: ["Webhooks"], summary: "Receive signed provider webhook" } }, async (request, reply) => {
    const provider = parseOrThrow(webhookProviderSchema, request.params.provider);
    const event = parseOrThrow(webhookEventSchema, request.body);
    if (processedEvents.has(`${provider}:${event.id}`)) return reply.code(200).send({ data: { accepted: true, duplicate: true } });
    const secret = env.WEBHOOK_SIGNING_SECRET;
    if (secret) {
      const payload = JSON.stringify(request.body);
      const valid = verifyWebhookSignature({ payload, secret, signature: request.headers["x-powerchain-signature"] as string | undefined, timestamp: request.headers["x-powerchain-timestamp"] as string | undefined });
      if (!valid) return reply.code(401).send({ error: { code: "INVALID_WEBHOOK_SIGNATURE", message: "Webhook signature verification failed." } });
    } else if (env.NODE_ENV === "production") {
      return reply.code(503).send({ error: { code: "WEBHOOK_SECRET_NOT_CONFIGURED" } });
    }
    processedEvents.add(`${provider}:${event.id}`);
    return reply.code(202).send({ data: { accepted: true, duplicate: false, provider, eventId: event.id } });
  });
}

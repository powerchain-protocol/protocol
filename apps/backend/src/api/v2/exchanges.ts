import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import {
  createSwapTransaction,
  estimateFees,
  exchangeIdSchema,
  getExchange,
  getProviderStatuses,
  getQuotes,
  getSupportedExchanges,
  quoteRequestSchema,
  swapRequestSchema
} from "../../exchanges/index.js";

function validationError(error: ZodError) {
  return { data: null, error: { code: "VALIDATION_ERROR", message: "Invalid exchange request", details: error.flatten() } };
}

export async function exchangeRoutes(app: FastifyInstance) {
  app.get("/exchanges", { schema: { tags: ["Exchanges"], summary: "List configured exchange providers" } }, async request => ({
    data: getSupportedExchanges(), meta: { requestId: request.requestId }
  }));

  app.get("/exchanges/status", { schema: { tags: ["Exchanges"], summary: "Check exchange provider availability" } }, async request => ({
    data: await getProviderStatuses(), meta: { requestId: request.requestId, checkedAt: new Date().toISOString() }
  }));

  app.get("/exchanges/:id", { schema: { tags: ["Exchanges"], summary: "Get an exchange provider" } }, async (request, reply) => {
    const parsed = exchangeIdSchema.safeParse((request.params as { id: string }).id);
    if (!parsed.success) return reply.code(400).send(validationError(parsed.error));
    const provider = getExchange(parsed.data);
    if (!provider) return reply.code(404).send({ data: null, error: { code: "EXCHANGE_NOT_FOUND", message: "Exchange not found" } });
    return { data: provider.descriptor, meta: { requestId: request.requestId } };
  });

  app.post("/exchanges/quote", { schema: { tags: ["Exchanges"], summary: "Get ranked exchange quotes" } }, async (request, reply) => {
    const parsed = quoteRequestSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send(validationError(parsed.error));
    const result = await getQuotes(parsed.data);
    if (!result.best) return reply.code(503).send({ data: null, error: { code: "QUOTE_UNAVAILABLE", message: "No configured exchange returned a verified quote" }, meta: { attempts: result.attempts, requestId: request.requestId } });
    return { data: result.best, meta: { alternatives: result.quotes.slice(1), attempts: result.attempts, requestId: request.requestId } };
  });

  app.post("/exchanges/routes", { schema: { tags: ["Exchanges"], summary: "Get all valid routes ranked by output" } }, async (request, reply) => {
    const parsed = quoteRequestSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send(validationError(parsed.error));
    const result = await getQuotes(parsed.data);
    if (!result.quotes.length) return reply.code(503).send({ data: [], error: { code: "ROUTES_UNAVAILABLE", message: "No exchange routes are currently available" }, meta: { attempts: result.attempts, requestId: request.requestId } });
    return { data: result.quotes, meta: { attempts: result.attempts, requestId: request.requestId } };
  });

  app.post("/exchanges/simulate", { schema: { tags: ["Exchanges"], summary: "Validate and simulate quote economics without broadcasting" } }, async (request, reply) => {
    const parsed = quoteRequestSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send(validationError(parsed.error));
    const result = await getQuotes(parsed.data);
    if (!result.best) return reply.code(503).send({ data: null, error: { code: "SIMULATION_UNAVAILABLE", message: "No quote was available to simulate" }, meta: { attempts: result.attempts, requestId: request.requestId } });
    return { data: { executable: true, quote: result.best, fees: estimateFees(result.best), broadcast: false }, meta: { requestId: request.requestId } };
  });

  app.post("/exchanges/fees", { schema: { tags: ["Exchanges"], summary: "Estimate slippage reserve and provider fee metadata" } }, async (request, reply) => {
    const parsed = quoteRequestSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send(validationError(parsed.error));
    const result = await getQuotes(parsed.data);
    if (!result.best) return reply.code(503).send({ data: null, error: { code: "FEE_ESTIMATE_UNAVAILABLE", message: "No quote was available for fee estimation" }, meta: { attempts: result.attempts, requestId: request.requestId } });
    return { data: { quote: result.best, fees: estimateFees(result.best) }, meta: { requestId: request.requestId } };
  });

  app.post("/exchanges/swap", { schema: { tags: ["Exchanges"], summary: "Create an unsigned swap transaction; never broadcasts or signs" } }, async (request, reply) => {
    const parsed = swapRequestSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send(validationError(parsed.error));
    try {
      const data = await createSwapTransaction(parsed.data);
      return reply.code(201).send({ data, meta: { requestId: request.requestId, broadcast: false, signed: false } });
    } catch (error) {
      return reply.code(503).send({ data: null, error: { code: "SWAP_TRANSACTION_UNAVAILABLE", message: error instanceof Error ? error.message : "Swap transaction unavailable" }, meta: { requestId: request.requestId } });
    }
  });
}

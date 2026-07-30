import type { FastifyInstance } from "fastify";
import { getWalletBalances } from "../../services/wallet-balance-service.js";
import { parseOrThrow } from "../../schemas/common.js";
import { walletBalanceQuerySchema } from "../../schemas/wallet.js";
import { exchangeRoutes } from "./exchanges.js";

export async function apiV2(app: FastifyInstance) {
  await app.register(exchangeRoutes);
  app.get("/wallets/:address/balances", { schema: { tags: ["Wallets"], summary: "Get verified native wallet balance with provider fallbacks" } }, async (request, reply) => {
    const params = request.params as { address: string };
    const query = request.query as Record<string, unknown>;
    const input = parseOrThrow(walletBalanceQuerySchema, { ...query, address: params.address });
    const result = await getWalletBalances(input.address, input.network, input.environment);
    if (!result.available) return reply.code(503).send({ data: null, error: { code: "BALANCE_UNAVAILABLE", message: "No configured provider returned a verified balance." }, meta: result });
    return { data: result.data, meta: { provider: result.provider, attempts: result.attempts, environment: input.environment, requestId: request.requestId } };
  });

  app.get("/health", { schema: { tags: ["System"], summary: "API v2 health" } }, async request => ({ data: { status: "ok", version: "v2" }, meta: { requestId: request.requestId, timestamp: new Date().toISOString() } }));
}

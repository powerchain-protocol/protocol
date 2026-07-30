import type { FastifyInstance } from "fastify";
import { parseOrThrow } from "../../schemas/common.js";
import { signatureChallengeSchema, signatureVerifySchema, walletBalanceQuerySchema } from "../../schemas/wallet.js";
import { getWalletBalances } from "../../services/wallet-balance-service.js";
import { consumeChallenge, createChallenge } from "../../services/signature-challenge-service.js";
import { verifyWalletSignature } from "../../security/wallet-signatures.js";

export async function walletRoutes(app: FastifyInstance) {
  app.get("/wallet/balances", { schema: { tags: ["Wallets"], summary: "Get wallet balances" } }, async (request, reply) => {
    const input = parseOrThrow(walletBalanceQuerySchema, request.query);
    const result = await getWalletBalances(input.address, input.network, input.environment);
    if (!result.available) return reply.code(503).send({ data: null, error: { code: "BALANCE_UNAVAILABLE" }, meta: result });
    return { data: result.data, meta: { provider: result.provider, environment: input.environment, requestId: request.requestId } };
  });

  app.post("/wallet/signatures/challenge", { schema: { tags: ["Wallets"], summary: "Create replay-protected wallet challenge" } }, async (request, reply) => {
    const input = parseOrThrow(signatureChallengeSchema, request.body);
    const challenge = createChallenge(input);
    return reply.code(201).send({ data: { challengeId: challenge.id, message: challenge.message, expiresAt: new Date(challenge.expiresAt).toISOString() } });
  });

  app.post("/wallet/signatures/verify", { schema: { tags: ["Wallets"], summary: "Verify wallet signature" } }, async (request, reply) => {
    const input = parseOrThrow(signatureVerifySchema, request.body);
    const challenge = consumeChallenge(input.challengeId, input.address, input.network, input.message);
    if (!challenge) return reply.code(401).send({ error: { code: "INVALID_OR_EXPIRED_CHALLENGE" } });
    const verification = verifyWalletSignature(input);
    if (!verification.valid) return reply.code(401).send({ error: { code: "INVALID_SIGNATURE", details: verification.reason } });
    return { data: { verified: true, address: input.address, network: input.network, verifiedAt: new Date().toISOString() } };
  });

  app.post("/wallet/transactions", { schema: { tags: ["Wallets"], summary: "Submit signed wallet transaction" } }, async (request, reply) =>
    reply.code(202).send({ data: { id: `tx_${crypto.randomUUID().slice(0, 8)}`, ...(request.body as object), status: "submitted" } })
  );
}

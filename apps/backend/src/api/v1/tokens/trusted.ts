
import type { FastifyInstance } from "fastify";

const trustedTokens = [
  { id: "token_sol", chain: "solana", symbol: "SOL", address: "So11111111111111111111111111111111111111112", decimals: 9 },
  { id: "token_pwrc", chain: "solana", symbol: "PWRC", address: "PWRCRXXZxbg6FdQZfK3PMD7KP8xfxs9acvifJiG46wc", decimals: 9 },
  { id: "token_usdc_sol", chain: "solana", symbol: "USDC", address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", decimals: 6 },
  { id: "token_sui", chain: "sui", symbol: "SUI", address: "0x2::sui::SUI", decimals: 9 }
];

export async function trustedTokenRoutes(app: FastifyInstance) {
  app.get("/tokens/trusted", async () => ({ data: trustedTokens }));
  app.get<{ Params: { chain: string; address: string } }>("/tokens/trusted/:chain/:address", async (request, reply) => {
    const token = trustedTokens.find((item) =>
      item.chain === request.params.chain &&
      item.address.toLowerCase() === request.params.address.toLowerCase()
    );
    return token ? { data: token } : reply.code(404).send({ error: { code: "TOKEN_NOT_TRUSTED" } });
  });
}

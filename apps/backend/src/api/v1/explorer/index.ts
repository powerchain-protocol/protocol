import type { FastifyInstance } from "fastify";
import { z } from "zod";

const networkSchema = z.enum(["solana", "sui"]);
const addressSchema = z.string().trim().min(20).max(128);

export async function explorerRoutes(app: FastifyInstance) {
  app.get("/explorer/networks", async () => ({
    data: [
      { id: "solana", name: "Solana", nativeSymbol: "SOL", status: "configured" },
      { id: "sui", name: "Sui", nativeSymbol: "SUI", status: "configured" },
    ],
  }));

  app.get<{ Params: { network: string; address: string } }>("/explorer/:network/address/:address", async (request, reply) => {
    const parsed = z.object({ network: networkSchema, address: addressSchema }).safeParse(request.params);
    if (!parsed.success) return reply.code(400).send({ error: { code: "INVALID_EXPLORER_QUERY", message: "Invalid network or address." } });
    return { data: { ...parsed.data, balances: [], transactions: [], source: "provider-fallback", status: "not-indexed" } };
  });

  app.get<{ Params: { network: string; signature: string } }>("/explorer/:network/transaction/:signature", async (request, reply) => {
    const parsed = z.object({ network: networkSchema, signature: z.string().min(32).max(256) }).safeParse(request.params);
    if (!parsed.success) return reply.code(400).send({ error: { code: "INVALID_TRANSACTION", message: "Invalid transaction signature." } });
    return { data: { ...parsed.data, status: "unknown", confirmations: null, source: "provider-fallback" } };
  });
}

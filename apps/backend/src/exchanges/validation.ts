import { z } from "zod";
import { exchangeIds } from "./types.js";

const positiveIntegerString = z.string().regex(/^[1-9]\d*$/, "amount must be a positive integer string").max(40);
const tokenId = z.string().trim().min(2).max(128).regex(/^[A-Za-z0-9:_\-.]+$/, "invalid token identifier");

export const exchangeIdSchema = z.enum(exchangeIds);
export const exchangeNetworkSchema = z.enum(["solana", "sui"]);

const quoteRequestBaseSchema = z.object({
  inputMint: tokenId,
  outputMint: tokenId,
  amount: positiveIntegerString,
  slippageBps: z.coerce.number().int().min(1).max(500).default(50),
  exchange: exchangeIdSchema.optional(),
  network: exchangeNetworkSchema.optional(),
  userPublicKey: z.string().trim().min(20).max(128).optional()
});

export const quoteRequestSchema = quoteRequestBaseSchema.superRefine((value, ctx) => {
  if (value.inputMint === value.outputMint) ctx.addIssue({ code: "custom", path: ["outputMint"], message: "inputMint and outputMint must differ" });
});

export const swapRequestSchema = quoteRequestBaseSchema.extend({
  userPublicKey: z.string().trim().min(20).max(128),
  idempotencyKey: z.string().trim().min(16).max(128).regex(/^[A-Za-z0-9._:-]+$/)
}).superRefine((value, ctx) => {
  if (value.inputMint === value.outputMint) ctx.addIssue({ code: "custom", path: ["outputMint"], message: "inputMint and outputMint must differ" });
});

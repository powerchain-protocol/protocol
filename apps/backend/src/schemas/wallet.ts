import { z } from "zod";
import { addressSchema, environmentSchema, networkSchema } from "./common.js";

export const walletBalanceQuerySchema = z.object({
  address: addressSchema,
  network: networkSchema.default("solana"),
  environment: environmentSchema.default("mainnet")
});

export const signatureChallengeSchema = z.object({
  address: addressSchema,
  network: networkSchema,
  domain: z.string().min(3).max(255),
  statement: z.string().min(1).max(500).default("Sign in to Powerchain"),
  ttlSeconds: z.coerce.number().int().min(60).max(900).default(300)
});

export const signatureVerifySchema = z.object({
  challengeId: z.string().uuid(),
  address: addressSchema,
  network: networkSchema,
  signature: z.string().min(32).max(1024),
  publicKey: z.string().min(32).max(2048),
  message: z.string().min(1).max(4096)
});

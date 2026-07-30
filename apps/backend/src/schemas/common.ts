import { z } from "zod";

export const environmentSchema = z.enum(["mock", "devnet", "mainnet"]);
export const networkSchema = z.enum(["solana", "sui"]);
export const paginationSchema = z.object({
  cursor: z.string().min(1).max(256).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25)
});
export const requestIdSchema = z.string().uuid().optional();
export const idempotencyKeySchema = z.string().min(16).max(128).regex(/^[A-Za-z0-9._:-]+$/);
export const addressSchema = z.string().min(16).max(128).regex(/^[A-Za-z0-9:_-]+$/);

export function parseOrThrow<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) {
    const error = new Error("Request validation failed") as Error & { statusCode?: number; code?: string; details?: unknown };
    error.statusCode = 400;
    error.code = "VALIDATION_ERROR";
    error.details = result.error.flatten();
    throw error;
  }
  return result.data;
}

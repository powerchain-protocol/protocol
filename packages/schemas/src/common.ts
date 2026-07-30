import { z } from "zod";
export const idSchema = z.string().min(1).max(128);
export const isoDateSchema = z.string().datetime({ offset: true });
export const paginationQuerySchema = z.object({ cursor: z.string().optional(), limit: z.coerce.number().int().min(1).max(100).default(25) });
export const moneySchema = z.object({ amount: z.number().finite().nonnegative(), currency: z.string().length(3).default("EUR") });
export const geoPointSchema = z.object({ latitude: z.number().min(-90).max(90), longitude: z.number().min(-180).max(180) });
export const apiErrorSchema = z.object({ error: z.object({ code: z.string(), message: z.string(), requestId: z.string().optional(), details: z.unknown().optional() }) });


import { z } from "zod";

export const walletAddressSchema = z.string().min(16).max(128);
export const positiveAmountSchema = z.number().finite().positive();
export const organizationIdSchema = z.string().regex(/^org_[a-zA-Z0-9_-]+$/);

export function sanitizeSearch(value: string) {
  return value.trim().replace(/[<>]/g, "").slice(0, 160);
}

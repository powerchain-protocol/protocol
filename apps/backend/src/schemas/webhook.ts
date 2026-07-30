import { z } from "zod";

export const webhookProviderSchema = z.enum(["circle", "stripe", "helius", "jupiter", "github", "custom"]);
export const webhookEventSchema = z.object({
  id: z.string().min(1).max(255),
  type: z.string().min(1).max(255),
  createdAt: z.string().datetime().optional(),
  data: z.unknown()
});

export const webhookSubscriptionSchema = z.object({
  organizationId: z.string().min(1).max(128),
  url: z.string().url().refine(value => value.startsWith("https://"), "Webhook URLs must use HTTPS"),
  events: z.array(z.string().min(1).max(128)).min(1).max(50),
  description: z.string().max(500).optional()
});

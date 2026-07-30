
import {z} from "zod";
export const chatInputSchema=z.object({prompt:z.string().trim().min(2).max(8000),model:z.string().default("Powerchain GPT-4o"),organizationId:z.string().min(1),attachments:z.array(z.string()).max(8).default([])});

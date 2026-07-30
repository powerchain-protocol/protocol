
import {z} from "zod";
export const checkoutAssetSchema=z.enum(["SOL","USDC","PWRC","CCT"]);
export const createCheckoutSessionSchema=z.object({
  merchantId:z.string().min(3),merchantReference:z.string().min(1),
  lineItems:z.array(z.object({
    id:z.string(),name:z.string(),description:z.string().optional(),quantity:z.number().int().positive(),
    unitAmount:z.number().positive(),currency:z.enum(["USD","EUR"]),metadata:z.record(z.string(),z.string()).optional()
  })).min(1),
  customer:z.object({email:z.string().email().optional(),name:z.string().optional(),walletAddress:z.string().optional(),country:z.string().length(2).optional()}).optional(),
  settlementAssets:z.array(checkoutAssetSchema).min(1),preferredAsset:checkoutAssetSchema.optional(),
  successUrl:z.string().url(),cancelUrl:z.string().url(),expiresInSeconds:z.number().int().min(300).max(86400).default(1800),
  metadata:z.record(z.string(),z.string()).optional()
});

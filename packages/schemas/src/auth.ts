import { z } from "zod";
export const appRoleSchema = z.enum(["OWNER","EXECUTIVE","FINANCE_ADMIN","ENERGY_MANAGER","GRID_OPERATOR","ASSET_MANAGER","SUSTAINABILITY_MANAGER","DEVELOPER","ANALYST","AUDITOR","VIEWER"]);
export const sessionTokenSchema = z.string().min(32).max(512);
export const walletAuthRequestSchema = z.object({ network: z.enum(["solana","sui","evm"]), address: z.string().min(16).max(128), signature: z.string().min(32), challengeId: z.string().min(8), message: z.string().min(16).max(2048) });
export const authSessionSchema = z.object({ user: z.object({ id:z.string(), email:z.string().email(), name:z.string().nullable().optional(), avatarUrl:z.string().url().nullable().optional() }), memberships:z.array(z.object({ organizationId:z.string(), organizationName:z.string(), role:appRoleSchema })), expiresAt:z.string().datetime() });
export type AuthSession = z.infer<typeof authSessionSchema>;

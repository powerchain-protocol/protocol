"use server";
import { z } from "zod";
const contributionSchema=z.object({ projectId:z.string().min(1), amount:z.coerce.number().positive().max(100000), kind:z.enum(["donation","crowdfunding"]) });
export async function createEnergyContribution(formData:FormData){
  const parsed=contributionSchema.safeParse(Object.fromEntries(formData));
  if(!parsed.success) return { ok:false as const, error:parsed.error.issues[0]?.message ?? "Invalid contribution" };
  return { ok:true as const, contributionId:crypto.randomUUID(), ...parsed.data, status:"pending_wallet_signature" as const };
}

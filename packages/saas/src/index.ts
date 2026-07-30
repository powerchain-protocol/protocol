import { z } from "zod";
export const planIds=["starter","growth","enterprise"] as const;
export const saasPlanSchema=z.object({id:z.enum(planIds),name:z.string().min(2),monthlyPrice:z.number().nonnegative(),projects:z.number().int().positive(),members:z.number().int().positive(),apiRequests:z.number().int().positive()});
export type SaasPlan=z.infer<typeof saasPlanSchema>;
export type WorkspaceRole="owner"|"admin"|"developer"|"analyst"|"viewer";
export interface SaasWorkspace { id:string; name:string; slug:string; plan:SaasPlan["id"]; role:WorkspaceRole; members:number; projects:number; status:"active"|"trial"|"past_due"; }
export const saasPlans:SaasPlan[]=[
 {id:"starter",name:"Starter",monthlyPrice:0,projects:2,members:3,apiRequests:25000},
 {id:"growth",name:"Growth",monthlyPrice:99,projects:20,members:25,apiRequests:500000},
 {id:"enterprise",name:"Enterprise",monthlyPrice:499,projects:250,members:250,apiRequests:10000000},
];
export function calculateMonthlyPrice(plan:SaasPlan,seats:number){if(!Number.isInteger(seats)||seats<1) throw new Error("seats must be a positive integer"); return plan.monthlyPrice+Math.max(0,seats-plan.members)*12;}

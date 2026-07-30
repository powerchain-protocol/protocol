import type { FastifyInstance } from "fastify"; import { saasPlans, calculateMonthlyPrice } from "@powerchain/saas"; import { z } from "zod";
const quoteSchema=z.object({planId:z.enum(["starter","growth","enterprise"]),seats:z.coerce.number().int().min(1).max(10000)});
export async function saasRoutes(app:FastifyInstance){
 app.get("/saas/plans",{schema:{tags:["SaaS"],summary:"List SaaS plans"}},async()=>({data:saasPlans}));
 app.get("/saas/quote",{schema:{tags:["SaaS"],summary:"Calculate a SaaS subscription quote"}},async(req,reply)=>{const parsed=quoteSchema.safeParse(req.query);if(!parsed.success)return reply.code(400).send({error:"invalid_request",issues:parsed.error.issues});const plan=saasPlans.find(p=>p.id===parsed.data.planId)!;return {data:{planId:plan.id,seats:parsed.data.seats,monthlyTotal:calculateMonthlyPrice(plan,parsed.data.seats),currency:"USD"}};});
 app.get("/saas/health",{schema:{tags:["SaaS"],summary:"SaaS subsystem health"}},async()=>({status:"operational",version:"1.0.0-beta.1",services:["tenancy","billing","entitlements","usage"]}));
}

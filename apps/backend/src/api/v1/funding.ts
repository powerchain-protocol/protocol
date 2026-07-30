import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { createContributionSchema, donationSchema } from "@powerchain/schemas";
const projects=[{id:"project-community-solar",title:"Community Solar Roofs",category:"solar",goalEur:350000,raisedEur:214500,status:"open"},{id:"project-island-microgrid",title:"Island Resilience Microgrid",category:"grid",goalEur:800000,raisedEur:492000,status:"open"}];
export async function fundingRoutes(app:FastifyInstance){
 app.get("/funding/projects",{schema:{tags:["Funding"],summary:"List donation and crowdfunding projects"}},async r=>({data:projects,meta:{requestId:r.id}}));
 app.post("/funding/contributions",{schema:{tags:["Funding"],summary:"Create a crowdfunding contribution intent"}},async(r,reply)=>{const input=createContributionSchema.parse(r.body);return reply.code(201).send({data:{id:randomUUID(),...input,status:"awaiting-payment",createdAt:new Date().toISOString()},meta:{requestId:r.id}})});
 app.post("/donations",{schema:{tags:["Funding"],summary:"Create a renewable project donation intent"}},async(r,reply)=>{const input=donationSchema.parse(r.body);return reply.code(201).send({data:{id:randomUUID(),...input,status:"awaiting-payment",createdAt:new Date().toISOString()},meta:{requestId:r.id}})});
}


import type { FastifyInstance } from "fastify";

export async function accessRoutes(app:FastifyInstance){
  app.get("/access/roles",async()=>({data:["OWNER","EXECUTIVE","FINANCE_ADMIN","ENERGY_MANAGER","GRID_OPERATOR","ASSET_MANAGER","SUSTAINABILITY_MANAGER","DEVELOPER","ANALYST","AUDITOR","VIEWER"]}));
  app.post<{Body:{role:string;proof?:string}}>("/access/zk/verify",async(request,reply)=>{
    if(!request.body.proof) return reply.code(400).send({error:{code:"ZK_PROOF_REQUIRED"}});
    return {data:{verified:true,role:request.body.role,verifiedAt:new Date().toISOString()}};
  });
}

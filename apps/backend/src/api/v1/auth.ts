import type { FastifyInstance, FastifyRequest } from "fastify";
import { readSession, revokeSession } from "../../services/auth-session-service.js";
function bearer(request:FastifyRequest){ const value=request.headers.authorization; return value?.startsWith("Bearer ") ? value.slice(7).trim() : null; }
export async function authRoutes(app:FastifyInstance){
  app.get("/auth/session",{schema:{tags:["Authentication"],summary:"Read current authenticated session"}},async(request,reply)=>{ const token=bearer(request); if(!token) return reply.code(401).send({data:null,error:{code:"AUTH_REQUIRED"}}); const session=await readSession(token); if(!session) return reply.code(401).send({data:null,error:{code:"INVALID_SESSION"}}); return {data:session}; });
  app.post("/auth/logout",{schema:{tags:["Authentication"],summary:"Revoke current session"}},async(request,reply)=>{ const token=bearer(request); if(token) await revokeSession(token); return reply.code(200).send({data:{signedOut:true}}); });
}

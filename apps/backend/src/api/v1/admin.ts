
import type {FastifyInstance} from "fastify";
export async function adminRoutes(app:FastifyInstance){
 app.get("/admin/companies",async()=>({data:[
  {id:"company_001",name:"Nordic Grid Labs",status:"active",clients:1284},
  {id:"company_002",name:"Oulu Solar Community",status:"active",clients:628}
 ]}));
 app.get("/admin/features",async()=>({data:[
  {id:"admin",enabled:true},{id:"clients",enabled:true},{id:"prosumers",enabled:true},{id:"ai",enabled:true}
 ]}));
}

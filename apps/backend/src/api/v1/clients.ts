
import type {FastifyInstance} from "fastify";
export async function clientRoutes(app:FastifyInstance){
 app.get("/clients",async()=>({data:[{id:"client_001",name:"Nordic Grid Labs",status:"active"},{id:"client_002",name:"Oulu Solar Community",status:"active"}]}));
 app.get<{Params:{id:string}}>("/clients/:id",async(request)=>({data:{id:request.params.id,name:"Client account",services:["energy","billing","assets"]}}));
}

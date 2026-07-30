
import type {FastifyInstance} from "fastify";
export async function prosumerRoutes(app:FastifyInstance){
 app.get("/prosumers",async()=>({data:[{id:"prosumer_001",name:"Oulu Solar Household",netExportKwh:5800,status:"active"}]}));
 app.get<{Params:{id:string}}>("/prosumers/:id",async(request)=>({data:{id:request.params.id,generationKwh:18400,consumptionKwh:12600}}));
}

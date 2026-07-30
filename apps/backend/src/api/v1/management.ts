
import type {FastifyInstance} from "fastify";
export async function managementRoutes(app:FastifyInstance){
 app.get("/management/overview",async()=>({data:{companies:248,clients:12486,prosumers:6218,users:38204}}));
 app.get("/management/services",async()=>({data:["energy","assets","payments","crm","erp","ai","integrations"]}));
}

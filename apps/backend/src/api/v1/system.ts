
import type {FastifyInstance} from "fastify";
const services=[
{id:"api",status:"operational",latencyMs:84},{id:"solana",status:"operational",latencyMs:112},
{id:"checkout",status:"operational",latencyMs:127},{id:"ai",status:"operational",latencyMs:246},
{id:"iot",status:"operational",latencyMs:71},{id:"depin",status:"operational",latencyMs:94}
];
export async function systemRoutes(app:FastifyInstance){
 app.get("/system",async()=>({data:{version:"1.0.0-beta.17",services,updatedAt:new Date().toISOString()}}));
 app.get("/system/services",async()=>({data:services}));
}

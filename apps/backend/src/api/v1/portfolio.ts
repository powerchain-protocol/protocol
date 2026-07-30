
import type {FastifyInstance} from "fastify";
export async function portfolioRoutes(app:FastifyInstance){
 app.get<{Querystring:{mode?:"mock"|"devnet"|"mainnet"}}>("/portfolio",async(request)=>{
  if(request.query.mode==="mainnet")return {data:{ownerId:"mainnet",currency:"USD",totalValueUsd:null,change24hPercent:null,assets:[],dataMode:"mainnet",updatedAt:new Date().toISOString(),disclaimer:"Live mainnet portfolio requires configured wallet and providers."}};
  return {data:{ownerId:"demo",currency:"USD",totalValueUsd:128420.44,change24hPercent:4.18,dataMode:"mock",updatedAt:new Date().toISOString(),assets:[],disclaimer:"Mock data only."}};
 });
}

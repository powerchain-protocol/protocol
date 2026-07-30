
import type {FastifyInstance} from "fastify";
export async function blockchainRoutes(app:FastifyInstance){
 app.get("/blockchain/networks",async()=>({data:[
  {id:"solana",status:"operational",chainId:"mainnet-beta"},{id:"sui",status:"operational",chainId:"sui:mainnet"},{id:"base",status:"operational",chainId:"8453"}
 ]}));
 app.post<{Body:{network:string;signature:string}}>("/blockchain/transactions/confirm",async(request)=>({data:{...request.body,status:"confirmed",confirmedAt:new Date().toISOString()}}));
}


import {MOCK_PORTFOLIO} from "@/data/portfolio";
export async function GET(request:Request){
 const mode=new URL(request.url).searchParams.get("mode")??"mock";
 if(mode==="mock")return Response.json({data:{...MOCK_PORTFOLIO,updatedAt:new Date().toISOString()}});
 if(mode==="devnet")return Response.json({data:{ownerId:"devnet_user",currency:"USD",totalValueUsd:null,change24hPercent:null,dataMode:"devnet",updatedAt:new Date().toISOString(),assets:[],disclaimer:"Devnet assets do not have canonical market values."}});
 return Response.json({data:{ownerId:"mainnet_user",currency:"USD",totalValueUsd:null,change24hPercent:null,dataMode:"mainnet",updatedAt:new Date().toISOString(),assets:[],disclaimer:"No mainnet portfolio data is returned until wallet addresses and live providers are configured."}});
}

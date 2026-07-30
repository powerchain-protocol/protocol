
import {fetchMetaplexMetadata} from "@powerchain/solana-infrastructure";
export async function GET(_request:Request,{params}:{params:Promise<{mint:string}>}){
 const {mint}=await params;
 const rpcUrl=process.env.SOLANA_RPC_URL??"https://api.mainnet-beta.solana.com";
 return Response.json({data:await fetchMetaplexMetadata({rpcUrl,mint})});
}

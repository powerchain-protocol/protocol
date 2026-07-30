
import {HeliusClient} from "@powerchain/solana-infrastructure";
export async function GET(_request:Request,{params}:{params:Promise<{owner:string}>}){
 const {owner}=await params;const key=process.env.HELIUS_API_KEY;
 if(!key)return Response.json({error:{code:"HELIUS_NOT_CONFIGURED"}},{status:503});
 const client=new HeliusClient({apiKey:key,network:process.env.NEXT_PUBLIC_SOLANA_CLUSTER==="devnet"?"devnet":"mainnet"});
 return Response.json({data:await client.getAssetsByOwner(owner)});
}

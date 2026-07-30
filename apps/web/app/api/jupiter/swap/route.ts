
import {JupiterApiClient} from "@powerchain/solana-infrastructure";
export async function POST(request:Request){
 const input=await request.json();
 const client=new JupiterApiClient({apiKey:process.env.JUPITER_API_KEY});
 return Response.json({data:await client.swap(input)});
}

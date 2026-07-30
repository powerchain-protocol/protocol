
import {JupiterApiClient,jupiterQuoteRequestSchema} from "@powerchain/solana-infrastructure";
export async function GET(request:Request){
 const url=new URL(request.url);
 const input=jupiterQuoteRequestSchema.parse({
  inputMint:url.searchParams.get("inputMint"),outputMint:url.searchParams.get("outputMint"),
  amount:url.searchParams.get("amount"),slippageBps:Number(url.searchParams.get("slippageBps")??50),
  swapMode:url.searchParams.get("swapMode")??"ExactIn",restrictIntermediateTokens:url.searchParams.get("restrictIntermediateTokens")!=="false"
 });
 const client=new JupiterApiClient({apiKey:process.env.JUPITER_API_KEY});
 return Response.json({data:await client.quote(input)});
}

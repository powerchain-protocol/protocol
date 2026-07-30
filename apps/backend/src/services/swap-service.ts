
import {JupiterApiClient} from "@powerchain/solana-infrastructure";
import {PowerchainError} from "@powerchain/utils";
export class SwapService{
 private jupiter=new JupiterApiClient({apiKey:process.env.JUPITER_API_KEY});
 async quote(input:{environment:"mock"|"devnet"|"mainnet";inputMint:string;outputMint:string;amount:string;slippageBps:number}){
  if(input.environment!=="mainnet")return {provider:"mock",inputMint:input.inputMint,outputMint:input.outputMint,inAmount:input.amount,outAmount:input.amount,priceImpactPct:"0",expiresAt:new Date(Date.now()+30000).toISOString()};
  try{return {...await this.jupiter.quote({...input,swapMode:"ExactIn",restrictIntermediateTokens:true}),provider:"jupiter",expiresAt:new Date(Date.now()+20000).toISOString()}}
  catch(error){throw new PowerchainError("No executable swap route is currently available.","UPSTREAM_UNAVAILABLE",503,{provider:"jupiter"},error instanceof Error?{cause:error}:undefined)}
 }
}

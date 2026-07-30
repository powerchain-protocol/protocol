
import {z} from "zod";

export const jupiterQuoteRequestSchema=z.object({
  inputMint:z.string().min(32),
  outputMint:z.string().min(32),
  amount:z.string().regex(/^\d+$/),
  slippageBps:z.number().int().min(1).max(5000).default(50),
  swapMode:z.enum(["ExactIn","ExactOut"]).default("ExactIn"),
  restrictIntermediateTokens:z.boolean().default(true)
});
export type JupiterQuoteRequest=z.infer<typeof jupiterQuoteRequestSchema>;

export type JupiterQuote={
  inputMint:string;inAmount:string;outputMint:string;outAmount:string;
  otherAmountThreshold?:string;swapMode:string;slippageBps:number;
  priceImpactPct?:string;routePlan?:unknown[];contextSlot?:number;timeTaken?:number
};

export class JupiterApiClient{
  constructor(private readonly input:{apiKey?:string;baseUrl?:string;fetch?:typeof fetch}={}){}
  private get baseUrl(){return (this.input.baseUrl??"https://api.jup.ag").replace(/\/$/,"")}
  private headers(){return {"content-type":"application/json",...(this.input.apiKey?{"x-api-key":this.input.apiKey}:{})}}

  async quote(request:JupiterQuoteRequest,signal?:AbortSignal):Promise<JupiterQuote>{
    const value=jupiterQuoteRequestSchema.parse(request);
    const query=new URLSearchParams({
      inputMint:value.inputMint,outputMint:value.outputMint,amount:value.amount,
      slippageBps:String(value.slippageBps),swapMode:value.swapMode,
      restrictIntermediateTokens:String(value.restrictIntermediateTokens)
    });
    const response=await (this.input.fetch??fetch)(`${this.baseUrl}/swap/v2/quote?${query}`,{headers:this.headers(),signal});
    if(!response.ok)throw new Error(`Jupiter quote failed with ${response.status}.`);
    return response.json() as Promise<JupiterQuote>;
  }

  async swap(input:{quoteResponse:JupiterQuote;userPublicKey:string;wrapAndUnwrapSol?:boolean},signal?:AbortSignal){
    const response=await (this.input.fetch??fetch)(`${this.baseUrl}/swap/v2/swap`,{
      method:"POST",headers:this.headers(),signal,
      body:JSON.stringify({quoteResponse:input.quoteResponse,userPublicKey:input.userPublicKey,wrapAndUnwrapSol:input.wrapAndUnwrapSol??true})
    });
    if(!response.ok)throw new Error(`Jupiter swap failed with ${response.status}.`);
    return response.json() as Promise<{swapTransaction:string;lastValidBlockHeight?:number;prioritizationFeeLamports?:number}>;
  }
}

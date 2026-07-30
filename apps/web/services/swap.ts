
import {api} from "@/lib/api";
export type SwapQuote={provider:string;inputMint:string;outputMint:string;inAmount:string;outAmount:string;priceImpactPct?:string;expiresAt:string};
export function fetchSwapQuote(input:{environment:"mock"|"devnet"|"mainnet";inputMint:string;outputMint:string;amount:string;slippageBps:number}){return api<SwapQuote>("/api/swaps/quote",{method:"POST",body:JSON.stringify(input)})}

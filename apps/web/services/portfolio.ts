
import type {Portfolio} from "@/types/portfolio";
export async function fetchPortfolio(input:{solanaAddress?:string;suiAddress?:string;mode?:"mock"|"devnet"|"mainnet";signal?:AbortSignal}):Promise<Portfolio>{
 const params=new URLSearchParams();if(input.solanaAddress)params.set("solana",input.solanaAddress);if(input.suiAddress)params.set("sui",input.suiAddress);params.set("mode",input.mode??"mock");
 const response=await fetch(`/api/portfolio?${params}`,{cache:"no-store",signal:input.signal});
 if(!response.ok)throw new Error("Portfolio request failed.");
 const body=await response.json() as {data:Portfolio};return body.data;
}

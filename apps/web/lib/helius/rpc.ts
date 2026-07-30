import { z } from "zod";
const envSchema=z.object({HELIUS_API_KEY:z.string().min(1),HELIUS_RPC_URL:z.string().url().optional()});
export class HeliusRpcClient { private id=0; constructor(private endpoint:string){}
 static fromEnv(){const e=envSchema.parse({HELIUS_API_KEY:process.env.HELIUS_API_KEY,HELIUS_RPC_URL:process.env.HELIUS_RPC_URL}); return new HeliusRpcClient(e.HELIUS_RPC_URL??`https://mainnet.helius-rpc.com/?api-key=${e.HELIUS_API_KEY}`)}
 async call<T>(method:string,params:unknown):Promise<T>{const res=await fetch(this.endpoint,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:++this.id,method,params}),cache:"no-store"}); if(!res.ok)throw new Error(`Helius RPC ${res.status}`); const body=await res.json() as {result?:T;error?:{message:string}}; if(body.error)throw new Error(body.error.message); if(body.result===undefined)throw new Error("Helius RPC returned no result"); return body.result;}
}

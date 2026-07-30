
import type {FastifyInstance} from "fastify";import {SwapService} from "../../services/swap-service.js";import {ok} from "../../lib/http.js";
export async function swapRoutes(app:FastifyInstance){const service=new SwapService();
 app.post<{Body:{environment:"mock"|"devnet"|"mainnet";inputMint:string;outputMint:string;amount:string;slippageBps?:number}}>("/swaps/quote",{schema:{tags:["Swaps"],summary:"Create a swap quote"}},async(r,reply)=>ok(reply,await service.quote({...r.body,slippageBps:r.body.slippageBps??50})));
}

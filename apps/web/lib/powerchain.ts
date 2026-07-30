
import {api} from "./api";
export const powerchain={
 portfolio:(mode:"mock"|"devnet"|"mainnet"="mock")=>api(`/api/portfolio?mode=${mode}`),
 prices:(environment:"mock"|"devnet"|"mainnet"="mock")=>api(`/api/rates/assets?environment=${environment}`),
 tokens:(environment:"mock"|"devnet"|"mainnet"="mock")=>api(`/api/tokens?environment=${environment}`),
 renewableAssets:()=>api("/api/renewable-assets"),
 renewablePools:()=>api("/api/renewable-pools"),
 quoteSolarRental:(input:unknown)=>api("/api/rentals/solar/quote",{method:"POST",body:JSON.stringify(input)}),
 quoteSwap:(input:unknown)=>api("/api/swaps/quote",{method:"POST",body:JSON.stringify(input)}),
 quoteBridge:(input:unknown)=>api("/api/bridges/quote",{method:"POST",body:JSON.stringify(input)}),
 createPayment:(input:unknown)=>api("/api/payments/intents",{method:"POST",body:JSON.stringify(input)}),
 chat:(prompt:string)=>api("/api/ai/chat",{method:"POST",body:JSON.stringify({prompt})})
};


import {api} from "@/lib/api";
export type BridgeQuote={from:string;to:string;asset:string;amount:number;provider:string;feeUsd:number;estimatedSeconds:number;expiresAt:string};
export function fetchBridgeRoutes(){return api<any[]>("/api/bridges/routes")}
export function fetchBridgeQuote(input:{from:string;to:string;asset:string;amount:number}){return api<BridgeQuote>("/api/bridges/quote",{method:"POST",body:JSON.stringify(input)})}

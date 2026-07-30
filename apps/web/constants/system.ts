
import type {SystemService} from "@/types/system";
export const SYSTEM_SERVICES:SystemService[]=[
{id:"api",name:"Powerchain API",category:"api",status:"operational",latencyMs:84,updatedAt:new Date().toISOString()},
{id:"solana",name:"Solana RPC",category:"blockchain",status:"operational",latencyMs:112,updatedAt:new Date().toISOString()},
{id:"checkout",name:"Checkout",category:"payments",status:"operational",latencyMs:127,updatedAt:new Date().toISOString()},
{id:"ai",name:"AI Operations",category:"ai",status:"operational",latencyMs:246,updatedAt:new Date().toISOString()},
{id:"iot",name:"IoT Gateway",category:"iot",status:"operational",latencyMs:71,updatedAt:new Date().toISOString()},
{id:"depin",name:"DePIN Network",category:"depin",status:"operational",latencyMs:94,updatedAt:new Date().toISOString()}
];

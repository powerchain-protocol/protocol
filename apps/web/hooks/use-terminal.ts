"use client";
import { useCallback, useMemo, useState } from "react";
export interface TerminalLine { id: string; kind: "input"|"output"|"error"|"info"; text: string; timestamp: number; }
const help = "Commands: help, clear, network, rpc-health, wallet";
export function useTerminal() {
  const [lines,setLines]=useState<TerminalLine[]>([{id:"welcome",kind:"info",text:"Powerchain terminal ready. Type help.",timestamp:Date.now()}]);
  const [history,setHistory]=useState<string[]>([]);
  const append=useCallback((kind:TerminalLine["kind"],text:string)=>setLines((current)=>[...current,{id:crypto.randomUUID(),kind,text,timestamp:Date.now()}]),[]);
  const execute=useCallback(async(raw:string)=>{const command=raw.trim();if(!command)return;setHistory((h)=>[command,...h].slice(0,100));append("input",`$ ${command}`);if(command==="clear"){setLines([]);return;}if(command==="help")return append("output",help);if(command==="network")return append("output",process.env.NEXT_PUBLIC_SOLANA_NETWORK ?? "devnet");if(command==="wallet")return append("output","Wallet status is available from the connected Solana provider.");if(command==="rpc-health"){try{const {solanaRpc}=await import("@/utils/rpc");const health=await solanaRpc.health();return append("output",JSON.stringify(health));}catch(error){return append("error",error instanceof Error?error.message:"RPC health check failed");}}append("error",`Unknown command: ${command}`);},[append]);
  return useMemo(()=>({lines,history,execute,append,clear:()=>setLines([])}),[lines,history,execute,append]);
}

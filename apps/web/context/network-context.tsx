
"use client";
import {createContext,useContext,useEffect,useMemo,useState} from "react";
import {NETWORK_OPTIONS} from "@/config/networks";
import type {ChainId,NetworkProviderId} from "@/types/network";
const C=createContext<any>(null);
export function NetworkProvider({children}:{children:React.ReactNode}){
 const [chain,setChain]=useState<ChainId>("solana-mainnet");const [provider,setProvider]=useState<NetworkProviderId>("solana-public");const [rpcUrl,setRpcUrl]=useState(NETWORK_OPTIONS[0].rpcUrl);const [customRpcUrl,setCustomRpcUrl]=useState("");
 useEffect(()=>{const raw=localStorage.getItem("powerchain_network");if(raw){try{const v=JSON.parse(raw);setChain(v.chain);setProvider(v.provider);setRpcUrl(v.rpcUrl);setCustomRpcUrl(v.customRpcUrl??"")}catch{}}},[]);
 function selectChain(value:ChainId){setChain(value);const item=NETWORK_OPTIONS.find(x=>x.id===value);if(item){setProvider(item.provider as NetworkProviderId);if(item.rpcUrl)setRpcUrl(item.rpcUrl)}}
 function applyCustomRpc(){const url=new URL(customRpcUrl);if(!["http:","https:"].includes(url.protocol))throw new Error("RPC URL must use HTTP or HTTPS.");setProvider("custom");setRpcUrl(url.toString())}
 useEffect(()=>{localStorage.setItem("powerchain_network",JSON.stringify({chain,provider,rpcUrl,customRpcUrl}))},[chain,provider,rpcUrl,customRpcUrl]);
 return <C.Provider value={useMemo(()=>({chain,provider,rpcUrl,customRpcUrl,selectChain,setCustomRpcUrl,applyCustomRpc}),[chain,provider,rpcUrl,customRpcUrl])}>{children}</C.Provider>
}
export function useNetwork(){const v=useContext(C);if(!v)throw new Error("NetworkProvider missing");return v}


"use client";
import {createContext,useContext,useEffect,useMemo,useState} from "react";
const options={ "solana-mainnet":"https://api.mainnet-beta.solana.com","solana-devnet":"https://api.devnet.solana.com","sui-mainnet":"https://fullnode.mainnet.sui.io:443","sui-devnet":"https://fullnode.devnet.sui.io:443","custom":"" } as const;
const C=createContext<any>(null);
export function DashboardNetworkProvider({children}:{children:React.ReactNode}){const [network,setNetwork]=useState<keyof typeof options>("solana-mainnet");const [rpcUrl,setRpcUrl]=useState(options["solana-mainnet"]);const [customRpcUrl,setCustomRpcUrl]=useState("");useEffect(()=>{const raw=localStorage.getItem("dashboard_network");if(raw){try{const v=JSON.parse(raw);setNetwork(v.network);setRpcUrl(v.rpcUrl);setCustomRpcUrl(v.customRpcUrl??"")}catch{}}},[]);function selectNetwork(v:keyof typeof options){setNetwork(v);if(v!=="custom")setRpcUrl(options[v])}function applyCustomRpc(){const u=new URL(customRpcUrl);setRpcUrl(u.toString())}useEffect(()=>localStorage.setItem("dashboard_network",JSON.stringify({network,rpcUrl,customRpcUrl})),[network,rpcUrl,customRpcUrl]);return <C.Provider value={useMemo(()=>({network,rpcUrl,customRpcUrl,selectNetwork,setCustomRpcUrl,applyCustomRpc}),[network,rpcUrl,customRpcUrl])}>{children}</C.Provider>}
export const useDashboardNetwork=()=>useContext(C);

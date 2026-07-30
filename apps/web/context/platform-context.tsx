
"use client";
import {createContext,useContext,useMemo,useState} from "react";
type PlatformNetwork="solana-mainnet"|"solana-devnet"|"sui-mainnet";
const C=createContext<{network:PlatformNetwork;setNetwork:(network:PlatformNetwork)=>void;selectedCompanyId:string;setSelectedCompanyId:(id:string)=>void}|null>(null);
export function PlatformProvider({children}:{children:React.ReactNode}){const [network,setNetwork]=useState<PlatformNetwork>("solana-mainnet");const [selectedCompanyId,setSelectedCompanyId]=useState("company_powerchain");const value=useMemo(()=>({network,setNetwork,selectedCompanyId,setSelectedCompanyId}),[network,selectedCompanyId]);return <C.Provider value={value}>{children}</C.Provider>}
export function usePlatform(){const value=useContext(C);if(!value)throw new Error("PlatformProvider is missing.");return value}

"use client";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { NETWORKS } from "@powerchain/protocol/networks";

type NetworkKey = keyof typeof NETWORKS;
interface ProtocolContextValue { network: NetworkKey; setNetwork: (network: NetworkKey)=>void; connected: boolean; walletAddress?: string; }
const ProtocolContext=createContext<ProtocolContextValue|null>(null);
export function ProtocolProvider({children}:{children:ReactNode}) {
 const [network,setNetwork]=useState<NetworkKey>("solanaDevnet");
 const value=useMemo(()=>({network,setNetwork,connected:false}),[network]);
 return <ProtocolContext.Provider value={value}>{children}</ProtocolContext.Provider>;
}
export function useProtocol(){const value=useContext(ProtocolContext);if(!value)throw new Error("useProtocol must be used inside ProtocolProvider");return value;}

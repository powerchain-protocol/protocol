
"use client";
import {createContext,useContext,useMemo,useState} from "react";
import type {WalletIdentity,BlockchainTransaction} from "@powerchain/blockchain";
type WalletState={
 connected:boolean;wallet?:WalletIdentity;transactions:BlockchainTransaction[];
 connect:(network:WalletIdentity["network"],address?:string)=>void;disconnect:()=>void;
 addTransaction:(transaction:BlockchainTransaction)=>void
};
const C=createContext<WalletState|null>(null);
export function WalletProvider({children}:{children:React.ReactNode}){
 const [wallet,setWallet]=useState<WalletIdentity>();
 const [transactions,setTransactions]=useState<BlockchainTransaction[]>([]);
 const value=useMemo(()=>({
  connected:Boolean(wallet),wallet,transactions,
  connect:(network:WalletIdentity["network"],address?:string)=>setWallet({network,address:address??(network==="solana"?"PWRCRXXZxbg6FdQZfK3PMD7KP8xfxs9acvifJiG46wc":"0x7A3B9c2F"),connectedAt:new Date().toISOString()}),
  disconnect:()=>setWallet(undefined),
  addTransaction:(transaction:BlockchainTransaction)=>setTransactions((items)=>[transaction,...items])
 }),[wallet,transactions]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export function useWallet(){const value=useContext(C);if(!value)throw new Error("WalletProvider is missing.");return value}

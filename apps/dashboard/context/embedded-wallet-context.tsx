
"use client"; import {createContext,useContext,useState} from "react"; import {toast} from "sonner";
const C=createContext<{address?:string;createWallet:()=>Promise<void>;disconnect:()=>void}|null>(null);
export function EmbeddedWalletProvider({children}:{children:React.ReactNode}){const [address,setAddress]=useState<string>();async function createWallet(){await new Promise(r=>setTimeout(r,400));setAddress("PwrcEmbeddedWallet7ZkRole");toast.success("Embedded wallet created")}return <C.Provider value={{address,createWallet,disconnect:()=>setAddress(undefined)}}>{children}</C.Provider>}
export function useEmbeddedWallet(){const c=useContext(C);if(!c)throw new Error("EmbeddedWalletProvider missing");return c}

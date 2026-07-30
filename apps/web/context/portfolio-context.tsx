
"use client";
import {createContext,useContext,useMemo,useState} from "react";
import type {Portfolio} from "@/types/portfolio";
const C=createContext<any>(null);
export function PortfolioProvider({children}:{children:React.ReactNode}){const [portfolio,setPortfolio]=useState<Portfolio|null>(null);const [selectedAssetId,setSelectedAssetId]=useState<string>();return <C.Provider value={useMemo(()=>({portfolio,setPortfolio,selectedAssetId,setSelectedAssetId}),[portfolio,selectedAssetId])}>{children}</C.Provider>}
export function usePortfolioContext(){const v=useContext(C);if(!v)throw new Error("PortfolioProvider missing");return v}

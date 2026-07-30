
"use client";
import {useCallback,useEffect,useState} from "react";
import {fetchPortfolio} from "@/services/portfolio";
import type {Portfolio} from "@/types/portfolio";
export function usePortfolio(input:{solanaAddress?:string;suiAddress?:string;mode?:"mock"|"devnet"|"mainnet";refreshMs?:number}){
 const [portfolio,setPortfolio]=useState<Portfolio|null>(null);const [loading,setLoading]=useState(false);const [error,setError]=useState<string>();
 const refresh=useCallback(async()=>{setLoading(true);try{setPortfolio(await fetchPortfolio(input));setError(undefined)}catch(e){setError(e instanceof Error?e.message:"Portfolio request failed.")}finally{setLoading(false)}},[input.solanaAddress,input.suiAddress,input.mode]);
 useEffect(()=>{const controller=new AbortController();void refresh();const timer=input.refreshMs?setInterval(refresh,input.refreshMs):undefined;return()=>{controller.abort();if(timer)clearInterval(timer)}},[refresh,input.refreshMs]);
 const totalAvailable=portfolio?.assets.filter(a=>a.availability==="available").reduce((sum,a)=>sum+(a.valueUsd??0),0)??0;
 return {portfolio,loading,error,refresh,totalAvailable};
}

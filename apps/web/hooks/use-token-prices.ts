
"use client";
import {useEffect,useState} from "react";
import type {PriceEnvironment,PriceFeedResponse} from "@/types/market-price";
export function useTokenPrices(environment:PriceEnvironment){
 const [result,setResult]=useState<PriceFeedResponse>();const [loading,setLoading]=useState(true);const [error,setError]=useState<string>();
 useEffect(()=>{const controller=new AbortController();setLoading(true);fetch(`/api/rates/assets?environment=${environment}`,{signal:controller.signal}).then(async r=>{if(!r.ok)throw new Error("Price feed unavailable.");return r.json()}).then(setResult).catch(e=>{if(e.name!=="AbortError")setError(e.message)}).finally(()=>setLoading(false));return()=>controller.abort()},[environment]);
 return {result,loading,error};
}


"use client";
import {useCallback,useState} from "react";
import type {MarketplaceOrderInput} from "@powerchain/marketplace";
export function useMarketplace(){
 const [loading,setLoading]=useState(false);const [error,setError]=useState<string>();
 const placeOrder=useCallback(async(input:MarketplaceOrderInput)=>{setLoading(true);setError(undefined);try{const response=await fetch("/api/marketplace/orders",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(input)});if(!response.ok)throw new Error("Order failed.");return await response.json()}catch(cause){setError(cause instanceof Error?cause.message:"Order failed.");throw cause}finally{setLoading(false)}},[]);
 return {placeOrder,loading,error};
}

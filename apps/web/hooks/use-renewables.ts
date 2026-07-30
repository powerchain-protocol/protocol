
"use client";
import {useEffect,useState} from "react";
import type {RenewableAsset} from "@powerchain/renewables";
export function useRenewables(){
 const [assets,setAssets]=useState<RenewableAsset[]>([]);const [loading,setLoading]=useState(true);
 useEffect(()=>{fetch("/api/renewables").then(r=>r.json()).then(b=>setAssets(b.data??[])).finally(()=>setLoading(false))},[]);
 return {assets,loading};
}

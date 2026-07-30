"use client";
import {useCallback,useEffect,useState} from "react";
import {fetchRwaPortfolio} from "@/services/rwa";
import type {RwaPortfolio} from "@/types/rwa";
export function useRwaPortfolio(owner?:string){const [data,setData]=useState<RwaPortfolio|null>(null),[loading,setLoading]=useState(false),[error,setError]=useState<string>(); const refresh=useCallback(async()=>{if(!owner)return;setLoading(true);try{setData(await fetchRwaPortfolio(owner));setError(undefined)}catch(e){setError(e instanceof Error?e.message:"Failed to load RWA portfolio")}finally{setLoading(false)}},[owner]); useEffect(()=>{void refresh()},[refresh]); return{data,loading,error,refresh};}

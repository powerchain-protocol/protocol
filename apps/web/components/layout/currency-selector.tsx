
"use client";
import {useEffect,useState} from "react";
const currencies=["USD","EUR","GBP"] as const;
export function CurrencySelector(){
 const [value,setValue]=useState<(typeof currencies)[number]>("USD");
 useEffect(()=>{const saved=localStorage.getItem("powerchain_currency") as typeof value|null;if(saved&&currencies.includes(saved))setValue(saved)},[]);
 return <select aria-label="Currency" value={value} onChange={e=>{const v=e.target.value as typeof value;setValue(v);localStorage.setItem("powerchain_currency",v);document.cookie=`powerchain_currency=${v};path=/;max-age=31536000;samesite=lax`}} className="h-10 rounded-xl border bg-background px-3 text-sm font-semibold">{currencies.map(c=><option key={c}>{c}</option>)}</select>
}

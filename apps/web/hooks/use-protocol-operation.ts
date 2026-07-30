"use client";
import { useCallback, useState } from "react";
import type { ProtocolOperation } from "@powerchain/protocol";
export function useProtocolOperation(operation: ProtocolOperation){
 const [pending,setPending]=useState(false); const [error,setError]=useState<string>();
 const execute=useCallback(async(payload:unknown)=>{setPending(true);setError(undefined);try{const r=await fetch(`/api/v1/${operation}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});if(!r.ok)throw new Error((await r.json().catch(()=>null))?.error??`Request failed (${r.status})`);return await r.json();}catch(e){const m=e instanceof Error?e.message:"Operation failed";setError(m);throw e;}finally{setPending(false)}},[operation]);
 return {execute,pending,error};
}


"use client";
import {useState} from "react";
export function useAiOperations(){
 const [loading,setLoading]=useState(false);const [result,setResult]=useState<string>();
 async function analyse(prompt:string){setLoading(true);try{const response=await fetch("/api/ai/operations",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({prompt})});const body=await response.json();setResult(body.data?.summary??"No insight returned.");return body}finally{setLoading(false)}}
 return {analyse,loading,result};
}

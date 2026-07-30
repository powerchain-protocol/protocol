
"use client";

import { useState } from "react";

export function useMail(){
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string>();

  async function sendWelcome(input:{email:string;name:string;organization:string}){
    setLoading(true);setError(undefined);
    try{
      const response=await fetch("/api/mail/welcome",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(input)});
      if(!response.ok) throw new Error("Email could not be sent.");
      return await response.json();
    }catch(cause){
      setError(cause instanceof Error?cause.message:"Email could not be sent.");
      return undefined;
    }finally{setLoading(false);}
  }

  return {sendWelcome,loading,error};
}

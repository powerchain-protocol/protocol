
import {ClientApiError} from "./errors";
type ApiEnvelope<T>={data:T;meta?:Record<string,unknown>};
export async function api<T>(path:string,init:RequestInit&{timeoutMs?:number;retries?:number}={}):Promise<T>{
 const {timeoutMs=15000,retries=1,...requestInit}=init;let attempt=0;
 while(true){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeoutMs);
  try{const response=await fetch(path,{...requestInit,signal:controller.signal,headers:{"content-type":"application/json",...(requestInit.headers??{})}});
   const body=await response.json().catch(()=>({}));
   if(!response.ok)throw new ClientApiError(body?.error?.message??"Powerchain API request failed.",response.status,body?.error?.code,body?.error?.details);
   return (body as ApiEnvelope<T>).data;
  }catch(error){if(attempt>=retries||error instanceof ClientApiError&&error.status<500)throw error;attempt++;await new Promise(r=>setTimeout(r,250*attempt))}
  finally{clearTimeout(timer)}
 }
}

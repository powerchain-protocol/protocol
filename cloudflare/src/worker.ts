
interface Env {
  ORIGIN_API: string;
  ORIGIN_WEB: string;
  AUTH_RATE_LIMITER: { limit(input:{key:string}):Promise<{success:boolean}> };
  API_RATE_LIMITER: { limit(input:{key:string}):Promise<{success:boolean}> };
}

function securityHeaders(response:Response){
  const headers=new Headers(response.headers);
  headers.set("x-content-type-options","nosniff");
  headers.set("x-frame-options","DENY");
  headers.set("referrer-policy","strict-origin-when-cross-origin");
  headers.set("permissions-policy","camera=(), microphone=(), geolocation=()");
  headers.set("strict-transport-security","max-age=31536000; includeSubDomains; preload");
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}

export default {
  async fetch(request:Request,env:Env):Promise<Response>{
    const url=new URL(request.url);
    const key=request.headers.get("cf-connecting-ip")??"unknown";
    const limiter=url.pathname.startsWith("/api/v1/auth")?env.AUTH_RATE_LIMITER:env.API_RATE_LIMITER;
    const result=await limiter.limit({key:`${key}:${url.pathname.split("/").slice(0,4).join("/")}`});
    if(!result.success) return securityHeaders(new Response(JSON.stringify({error:{code:"RATE_LIMITED"}}),{status:429,headers:{"content-type":"application/json","retry-after":"60"}}));

    const target=new URL(url.pathname+url.search,env.ORIGIN_API);
    const response=await fetch(new Request(target,request));
    return securityHeaders(response);
  }
};

import { cookies } from "next/headers";
export async function GET() {
  const token=(await cookies()).get("powerchain_session")?.value;
  if(!token) return Response.json({data:null},{status:401});
  const base=process.env.APP_API_URL ?? "http://localhost:4000";
  const r=await fetch(`${base}/api/v1/auth/session`,{headers:{authorization:`Bearer ${token}`},cache:"no-store"}).catch(()=>null);
  if(!r) return Response.json({data:null,error:{code:"AUTH_BACKEND_UNAVAILABLE"}},{status:503});
  return new Response(await r.text(),{status:r.status,headers:{"content-type":"application/json"}});
}

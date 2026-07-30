
const API=process.env.API_URL??"http://localhost:4000/api/v1";
export async function GET(request:Request){
 const response=await fetch(`${API}/bridges/routes`,{method:"GET",headers:{"content-type":"application/json","x-powerchain-environment":request.headers.get("x-powerchain-environment")??"mock"},cache:"no-store"});
 return new Response(response.body,{status:response.status,headers:{"content-type":"application/json"}});
}

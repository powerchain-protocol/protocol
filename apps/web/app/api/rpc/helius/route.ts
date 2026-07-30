
export async function POST(request:Request){
 const key=process.env.HELIUS_API_KEY;if(!key)return Response.json({error:{code:"HELIUS_NOT_CONFIGURED"}},{status:503});
 const url=new URL(request.url);const network=url.searchParams.get("network")==="devnet"?"devnet":"mainnet";
 const response=await fetch(`https://${network}.helius-rpc.com/?api-key=${encodeURIComponent(key)}`,{
  method:"POST",headers:{"content-type":"application/json"},body:await request.text()
 });
 return new Response(response.body,{status:response.status,headers:{"content-type":"application/json","cache-control":"no-store"}});
}


import {marketplaceOrderSchema,calculateMarketplaceOrder} from "@powerchain/marketplace";
export async function POST(request:Request){const input=marketplaceOrderSchema.parse(await request.json());const totals=calculateMarketplaceOrder(input);const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL??"http://localhost:4000/api/v1"}/marketplace/orders`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...input,...totals})});return new Response(await response.text(),{status:response.status,headers:{"content-type":"application/json"}})}

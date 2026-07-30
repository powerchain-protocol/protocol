
import {calculateMarketplaceOrder,marketplaceOrderSchema,type MarketplaceOrderInput} from "@powerchain/marketplace";
export async function createMarketplaceOrder(input:MarketplaceOrderInput){
 const parsed=marketplaceOrderSchema.parse(input);
 const totals=calculateMarketplaceOrder(parsed);
 const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL??"https://api.powerchain.energy/api/v1"}/marketplace/orders`,{
  method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...parsed,...totals}),cache:"no-store"
 });
 if(!response.ok)throw new Error("Marketplace order could not be created.");
 return response.json();
}

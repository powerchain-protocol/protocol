
"use server";
import {marketplaceOrderSchema} from "@powerchain/marketplace";
import {createMarketplaceOrder} from "@/services/marketplace";
export async function placeMarketplaceOrder(input:unknown){return createMarketplaceOrder(marketplaceOrderSchema.parse(input))}

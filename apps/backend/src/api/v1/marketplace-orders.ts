
import type {FastifyInstance} from "fastify";import {marketplaceOrderSchema,calculateMarketplaceOrder} from "@powerchain/marketplace";
export async function marketplaceOrderRoutes(app:FastifyInstance){
 app.post("/marketplace/orders",async(request,reply)=>{const input=marketplaceOrderSchema.parse(request.body);const totals=calculateMarketplaceOrder(input);return reply.code(201).send({data:{id:`order_${crypto.randomUUID().slice(0,8)}`,...input,...totals,status:"created",createdAt:new Date().toISOString()}})});
}

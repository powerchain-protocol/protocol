import type { FastifyInstance } from "fastify";
import { createEnergyOfferSchema, energyQuoteRequestSchema, energyRouteRequestSchema, localEnergyMapQuerySchema } from "@powerchain/schemas";
import { EnergyMarketService } from "../../../services/energy-market-service.js";

export async function energyMarketplaceRoutes(app: FastifyInstance) {
  const service = new EnergyMarketService();
  app.get<{ Querystring:{source?:string;region?:string} }>("/energy/offers", { schema:{tags:["Energy Marketplace"],summary:"List verified local energy offers"} }, async r => ({ data:service.listOffers(r.query), meta:{requestId:r.id} }));
  app.post("/energy/offers", { schema:{tags:["Energy Marketplace"],summary:"Create a metered P2P energy offer"} }, async (r,reply) => { const input=createEnergyOfferSchema.parse(r.body); return reply.code(201).send({data:service.createOffer(input),meta:{requestId:r.id}}); });
  app.post("/energy/quotes", { schema:{tags:["Energy Marketplace"],summary:"Create a P2P energy quote"} }, async r => { const input=energyQuoteRequestSchema.parse(r.body); return {data:service.quote(input.offerId,input.quantityKwh,input.buyerId),meta:{requestId:r.id}}; });
  app.get("/energy/map", { schema:{tags:["Energy Maps"],summary:"Find local energy offers around a coordinate"} }, async r => { const input=localEnergyMapQuerySchema.parse(r.query); return {data:service.localMap(input),meta:{requestId:r.id}}; });
  app.post("/energy/wayfinder", { schema:{tags:["Energy Maps"],summary:"Build an optimized local-energy supply route"} }, async r => { const input=energyRouteRequestSchema.parse(r.body); return {data:service.wayfind(input),meta:{requestId:r.id}}; });
}

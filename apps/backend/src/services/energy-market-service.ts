import { randomUUID } from "node:crypto";
import type { z } from "zod";
import type { createEnergyOfferSchema, energyRouteRequestSchema } from "@powerchain/schemas";

type CreateOffer = z.infer<typeof createEnergyOfferSchema>;
type RouteRequest = z.infer<typeof energyRouteRequestSchema>;

const offers = [
  { id: "offer-helsinki-solar", sellerId: "prosumer-helsinki-01", source: "solar", region: "Helsinki", location: { latitude: 60.1699, longitude: 24.9384 }, availableKwh: 420, pricePerKwh: 0.112, currency: "EUR", carbonIntensityGco2Kwh: 22, status: "open", meterId: "meter-fi-001" },
  { id: "offer-espoo-wind", sellerId: "coop-espoo-wind", source: "wind", region: "Espoo", location: { latitude: 60.2055, longitude: 24.6559 }, availableKwh: 980, pricePerKwh: 0.104, currency: "EUR", carbonIntensityGco2Kwh: 12, status: "open", meterId: "meter-fi-014" },
  { id: "offer-vantaa-storage", sellerId: "battery-vantaa", source: "battery", region: "Vantaa", location: { latitude: 60.2934, longitude: 25.0378 }, availableKwh: 260, pricePerKwh: 0.139, currency: "EUR", carbonIntensityGco2Kwh: 34, status: "open", meterId: "meter-fi-021" }
] as const;

function km(a:{latitude:number;longitude:number},b:{latitude:number;longitude:number}) { const r=6371; const dLat=(b.latitude-a.latitude)*Math.PI/180; const dLon=(b.longitude-a.longitude)*Math.PI/180; const x=Math.sin(dLat/2)**2+Math.cos(a.latitude*Math.PI/180)*Math.cos(b.latitude*Math.PI/180)*Math.sin(dLon/2)**2; return 2*r*Math.asin(Math.sqrt(x)); }

export class EnergyMarketService {
  listOffers(filters?: { source?: string; region?: string }) { return offers.filter(o => (!filters?.source || o.source === filters.source) && (!filters?.region || o.region.toLowerCase().includes(filters.region.toLowerCase()))); }
  createOffer(input: CreateOffer) { return { id: randomUUID(), ...input, status: input.status ?? "open", createdAt: new Date().toISOString() }; }
  quote(offerId:string, quantityKwh:number, buyerId:string) { const offer=offers.find(o=>o.id===offerId); if(!offer) throw Object.assign(new Error("Energy offer not found"),{statusCode:404,code:"ENERGY_OFFER_NOT_FOUND"}); if(quantityKwh>offer.availableKwh) throw Object.assign(new Error("Requested energy exceeds availability"),{statusCode:409,code:"INSUFFICIENT_ENERGY"}); const subtotal=quantityKwh*offer.pricePerKwh; const protocolFee=subtotal*0.005; return { id:randomUUID(), offerId,buyerId,quantityKwh,subtotalEur:Number(subtotal.toFixed(4)),protocolFeeEur:Number(protocolFee.toFixed(4)),totalEur:Number((subtotal+protocolFee).toFixed(4)),avoidedKgCo2:Number((quantityKwh*Math.max(0,240-offer.carbonIntensityGco2Kwh)/1000).toFixed(3)),expiresAt:new Date(Date.now()+5*60_000).toISOString() }; }
  localMap(input:{latitude:number;longitude:number;radiusKm:number;source?:string}) { const origin={latitude:input.latitude,longitude:input.longitude}; return offers.map(o=>({...o,distanceKm:Number(km(origin,o.location).toFixed(2))})).filter(o=>o.distanceKm<=input.radiusKm&&(!input.source||o.source===input.source)).sort((a,b)=>a.distanceKm-b.distanceKm); }
  wayfind(input:RouteRequest) { const candidates=this.localMap({latitude:input.origin.latitude,longitude:input.origin.longitude,radiusKm:input.maxDistanceKm}).filter(o=>(!input.preferredSources.length||input.preferredSources.includes(o.source as never))&&(input.maxCarbonIntensityGco2Kwh===undefined||o.carbonIntensityGco2Kwh<=input.maxCarbonIntensityGco2Kwh)); let remaining=input.demandKwh; const legs=[]; for(const offer of candidates.sort((a,b)=>(a.pricePerKwh+a.distanceKm*0.0001)-(b.pricePerKwh+b.distanceKm*0.0001))){ if(remaining<=0) break; const quantity=Math.min(remaining,offer.availableKwh); legs.push({offerId:offer.id,sellerId:offer.sellerId,source:offer.source,quantityKwh:quantity,pricePerKwh:offer.pricePerKwh,distanceKm:offer.distanceKm}); remaining-=quantity; } return { routeId:randomUUID(), demandKwh:input.demandKwh, matchedKwh:input.demandKwh-remaining, unmatchedKwh:remaining, legs, estimatedTotalEur:Number(legs.reduce((s,l)=>s+l.quantityKwh*l.pricePerKwh,0).toFixed(4)), status:remaining===0?"fully-matched":"partially-matched" }; }
}

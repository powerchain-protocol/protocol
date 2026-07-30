import { ENERGY_MARKETS } from "@/constants/energy-market";
import type { EnergyRoute, LocalEnergyMarket } from "@/types/energy-market";

export function filterMarkets(query = "", maxDistanceKm = Number.POSITIVE_INFINITY): LocalEnergyMarket[] {
  const normalized = query.trim().toLowerCase();
  return ENERGY_MARKETS.filter((market) => market.distanceKm <= maxDistanceKm && (!normalized || [market.name, market.region, market.source].some((value) => value.toLowerCase().includes(normalized))));
}

export function quoteEnergy(market: LocalEnergyMarket, kwh: number) {
  const quantity = Math.max(0, Math.min(kwh, market.availableKwh));
  const subtotal = quantity * market.pricePerKwh;
  const protocolFee = subtotal * 0.005;
  return { quantity, subtotal, protocolFee, total: subtotal + protocolFee, avoidedKgCo2: quantity * Math.max(0, (250 - market.carbonIntensity)) / 1000 };
}

export function buildWayfinderRoute(markets: readonly LocalEnergyMarket[], requestedKwh: number): EnergyRoute {
  let remaining = Math.max(0, requestedKwh);
  let cost = 0;
  let distance = 0;
  let avoided = 0;
  const marketIds: string[] = [];
  for (const market of [...markets].filter((item) => item.status === "open").sort((a,b) => a.pricePerKwh - b.pricePerKwh || a.distanceKm - b.distanceKm)) {
    if (remaining <= 0) break;
    const allocation = Math.min(remaining, market.availableKwh);
    marketIds.push(market.id);
    cost += allocation * market.pricePerKwh;
    distance = Math.max(distance, market.distanceKm);
    avoided += allocation * Math.max(0, 250 - market.carbonIntensity) / 1000;
    remaining -= allocation;
  }
  return { marketIds, totalDistanceKm: distance, estimatedKwh: requestedKwh - remaining, estimatedCost: cost, avoidedKgCo2: avoided };
}

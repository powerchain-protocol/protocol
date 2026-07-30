import type { RwaAsset, RwaTradeQuote } from "./types";

export function validateRwaTrade(asset: RwaAsset, units: number): void {
  if (!Number.isFinite(units) || units <= 0) throw new Error("Trade units must be greater than zero");
  if (asset.status !== "listed" && asset.status !== "trading") throw new Error("Asset is not available for trading");
  if (units > asset.availableUnits) throw new Error("Trade exceeds available asset units");
}

export function quoteRwaTrade(asset: RwaAsset, units: number, side: "buy" | "sell" = "buy", feeBps = 25): RwaTradeQuote {
  validateRwaTrade(asset, units);
  if (!Number.isInteger(feeBps) || feeBps < 0 || feeBps > 10_000) throw new Error("Invalid fee basis points");
  const subtotal = units * asset.price;
  const protocolFee = subtotal * feeBps / 10_000;
  return {
    assetId: asset.id,
    side,
    units,
    unitPrice: asset.price,
    subtotal,
    protocolFee,
    settlementTotal: side === "buy" ? subtotal + protocolFee : subtotal - protocolFee,
    currency: asset.currency,
  };
}

export function tokenizeEnergyOutput(input: { assetId: string; generatedKwh: number; meterReadingId: string }) {
  if (input.generatedKwh <= 0) throw new Error("Generated energy must be positive");
  if (!input.meterReadingId.trim()) throw new Error("A verified meter reading is required");
  return {
    assetId: input.assetId,
    units: input.generatedKwh,
    unit: "kWh" as const,
    proofReference: input.meterReadingId,
    createdAt: new Date().toISOString(),
  };
}

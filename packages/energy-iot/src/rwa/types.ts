export type RwaAssetClass = "renewable" | "energy" | "carbon" | "hardware";
export type RwaAssetStatus = "draft" | "verified" | "listed" | "trading" | "retired";

export interface RwaAsset {
  id: string;
  symbol: string;
  name: string;
  assetClass: RwaAssetClass;
  status: RwaAssetStatus;
  issuer: string;
  region: string;
  unit: "kWh" | "MWh" | "tCO2e" | "unit";
  availableUnits: number;
  price: number;
  currency: "USDC" | "PWRC";
  tokenMint?: string;
  metadataUri?: string;
  verifiedAt?: string;
  attributes?: Record<string, string | number | boolean>;
}

export interface RwaTradeQuote {
  assetId: string;
  side: "buy" | "sell";
  units: number;
  unitPrice: number;
  subtotal: number;
  protocolFee: number;
  settlementTotal: number;
  currency: RwaAsset["currency"];
}

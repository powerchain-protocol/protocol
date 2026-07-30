
export type ElectricityRate = {
  id:string;
  countryCode:string;
  region:string;
  currency:string;
  pricePerKwh:number;
  source:string;
  updatedAt:string;
};

export type AssetRate = {
  symbol:"SOL"|"USDC"|"PWRC";
  priceUsd:number;
  change24hPercent:number;
  updatedAt:string;
};

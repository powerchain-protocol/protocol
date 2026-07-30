
export type PriceEnvironment="mock"|"devnet"|"mainnet";
export type PriceAvailability="available"|"unavailable"|"not-listed"|"not-configured"|"error";
export type PriceSource="initial"|"mock"|"birdeye"|"jupiter"|"manual";

export type TokenPriceRecord={
  symbol:string;
  mint?:string;
  network:"solana"|"sui";
  environment:PriceEnvironment;
  priceUsd:number|null;
  change24hPercent:number|null;
  source:PriceSource;
  availability:PriceAvailability;
  observedAt:string|null;
  disclaimer?:string;
};

export type PriceFeedResponse={
  data:TokenPriceRecord[];
  meta:{
    environment:PriceEnvironment;
    live:boolean;
    generatedAt:string;
    providers:string[];
    disclaimer:string;
  };
};

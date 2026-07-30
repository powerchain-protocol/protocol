
export type PortfolioAsset={
 id:string;symbol:string;name:string;network:"solana"|"sui";kind:"token"|"renewable"|"carbon"|"cash";
 quantity:number;priceUsd:number|null;valueUsd:number|null;change24hPercent:number|null;allocationPercent:number;
 dataMode:"mock"|"devnet"|"mainnet";availability:"available"|"unavailable"|"not-listed"
};
export type Portfolio={
 ownerId:string;currency:"USD";totalValueUsd:number|null;change24hPercent:number|null;
 assets:PortfolioAsset[];updatedAt:string;dataMode:"mock"|"devnet"|"mainnet";
 disclaimer:string
};

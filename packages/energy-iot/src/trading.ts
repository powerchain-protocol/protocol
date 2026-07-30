import type{P2PEnergyOffer}from"./types.js";
export function quoteEnergyTrade(o:P2PEnergyOffer,kwh:number){if(kwh<=0)throw new Error("Energy must be positive");if(kwh>o.energyKwh)throw new Error("Insufficient offered energy");return{energyKwh:kwh,total:Number((kwh*o.unitPrice).toFixed(6)),currency:o.currency}}
export const calculateSettlementFee=(amount:number,bps=25)=>{if(amount<0)throw new Error("Amount must be non-negative");return Number((amount*bps/10000).toFixed(6))};


export function calculateElectricityCost(input:{consumptionKwh:number;pricePerKwh:number;renewableSharePercent:number}){
  const totalCostUsd=input.consumptionKwh*input.pricePerKwh;
  const renewableKwh=input.consumptionKwh*(input.renewableSharePercent/100);
  const gridKwh=input.consumptionKwh-renewableKwh;
  return {totalCostUsd,renewableKwh,gridKwh};
}

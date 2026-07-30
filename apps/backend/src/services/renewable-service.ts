
import {PowerchainError} from "@powerchain/utils";
import {calculatePoolMetrics,calculateRentalQuote,type RenewablePool,type SolarPanelRental} from "@powerchain/renewables";
const assets=[
 {id:"solar-fi-001",name:"Nordic Solar I",type:"solar",country:"FI",capacityMw:84,currentOutputMw:61.2,annualGenerationMwh:91400,avoidedCarbonTonnes:18400,status:"operational"},
 {id:"wind-se-001",name:"Baltic Wind Cluster",type:"wind",country:"SE",capacityMw:240,currentOutputMw:172,annualGenerationMwh:682000,avoidedCarbonTonnes:128000,status:"operational"}
] as const;
const pools:RenewablePool[]=[{id:"pool-solar-fi",name:"Nordic Solar Pool",assetIds:["solar-fi-001"],targetUsd:2500000,committedUsd:1480000,annualYieldPercent:7.4,status:"funding"}];
export class RenewableService{
 listAssets(){return assets}
 listPools(){return pools.map(pool=>({...pool,metrics:calculatePoolMetrics(pool)}))}
 getAsset(id:string){const item=assets.find(asset=>asset.id===id);if(!item)throw new PowerchainError("Renewable asset not found.","NOT_FOUND",404);return item}
 quoteRental(input:{panelCount:number;months:number;monthlyPanelPriceUsd:number}){return calculateRentalQuote(input)}
 createRental(input:{userId:string;assetId:string;panelCount:number;months:number;monthlyPanelPriceUsd:number}):SolarPanelRental{
  this.getAsset(input.assetId);const quote=calculateRentalQuote(input);return {id:`rent_${crypto.randomUUID().slice(0,10)}`,...input,status:"reserved",startAt:new Date().toISOString(),endAt:new Date(Date.now()+input.months*30*86400000).toISOString(),totalUsd:quote.totalUsd}
 }
}

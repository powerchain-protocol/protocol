
import type {RenewableAsset} from "@powerchain/renewables";
export const RENEWABLE_ASSETS:RenewableAsset[]=[
{id:"ren_solar_01",name:"Nordic Solar I",type:"solar",country:"FI",capacityMw:84,currentOutputMw:61,annualGenerationMwh:112000,avoidedCarbonTonnes:34500,status:"operational",tokenAddress:"SoLar1111111111111111111111111111111111111"},
{id:"ren_wind_01",name:"Baltic Wind Cluster",type:"wind",country:"SE",capacityMw:240,currentOutputMw:186,annualGenerationMwh:780000,avoidedCarbonTonnes:228000,status:"operational"},
{id:"ren_battery_01",name:"Helsinki Storage",type:"battery",country:"FI",capacityMw:48,currentOutputMw:14,annualGenerationMwh:62000,avoidedCarbonTonnes:12000,status:"operational"}
];

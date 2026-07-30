
import type {ElectricityRate} from "@/types/rates";

export interface ElectricityPriceProvider{
  name:string;
  supports(countryCode:string):boolean;
  getRate(input:{countryCode:string;region?:string;signal?:AbortSignal}):Promise<ElectricityRate>;
}

export async function fetchGlobalElectricityRates(){
  const response=await fetch("/api/rates/electricity",{cache:"no-store"});
  if(!response.ok)throw new Error("Electricity rates could not be loaded.");
  return response.json() as Promise<{data:ElectricityRate[]}>;
}


import {GLOBAL_ELECTRICITY_RATES} from "@/data/rates";
export async function GET(){return Response.json({data:GLOBAL_ELECTRICITY_RATES,meta:{mode:"demo",updatedAt:new Date().toISOString()}})}

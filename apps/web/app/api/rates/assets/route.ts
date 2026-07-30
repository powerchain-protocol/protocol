
import {getTokenPrices} from "@/services/token-price-service";
import type {PriceEnvironment} from "@/types/market-price";
export async function GET(request:Request){
  const environment=(new URL(request.url).searchParams.get("environment")??"mock") as PriceEnvironment;
  if(!["mock","devnet","mainnet"].includes(environment))return Response.json({error:{code:"INVALID_ENVIRONMENT"}},{status:400});
  return Response.json(await getTokenPrices(environment),{headers:{"cache-control":environment==="mainnet"?"s-maxage=20, stale-while-revalidate=40":"no-store"}});
}

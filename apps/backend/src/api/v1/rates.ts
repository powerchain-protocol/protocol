
import type {FastifyInstance} from "fastify";
import {PriceService} from "../../services/price-service.js";

const electricity=[
  {countryCode:"FI",region:"Finland",currency:"USD",pricePerKwh:0.089},
  {countryCode:"DE",region:"Germany",currency:"USD",pricePerKwh:0.134},
  {countryCode:"GB",region:"United Kingdom",currency:"USD",pricePerKwh:0.151},
  {countryCode:"US",region:"California",currency:"USD",pricePerKwh:0.194},
  {countryCode:"AU",region:"New South Wales",currency:"USD",pricePerKwh:0.126}
];

export async function rateRoutes(app:FastifyInstance){
  const prices=new PriceService();
  app.get("/rates/electricity",async()=>({data:electricity,meta:{mode:"demo",updatedAt:new Date().toISOString(),disclaimer:"Demo rate data only."}}));
  app.get<{Querystring:{environment?:"mock"|"devnet"|"mainnet"}}>("/rates/assets",async(request)=>prices.get(request.query.environment??"mock"));
}

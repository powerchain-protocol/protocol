
const PWRC_INITIAL_PRICE_USD=0.000002;
type Environment="mock"|"devnet"|"mainnet";

export class PriceService{
 async get(environment:Environment){
  if(environment==="mock")return {data:[
   {symbol:"SOL",priceUsd:143,source:"mock",availability:"available"},
   {symbol:"USDC",priceUsd:1,source:"mock",availability:"available"},
   {symbol:"PWRC",priceUsd:PWRC_INITIAL_PRICE_USD,source:"initial",availability:"available"}
  ],meta:{environment,live:false,disclaimer:"Mock data only."}};

  if(environment==="devnet")return {data:[
   {symbol:"SOL",priceUsd:null,source:"none",availability:"unavailable"},
   {symbol:"USDC",priceUsd:null,source:"none",availability:"unavailable"},
   {symbol:"PWRC",priceUsd:PWRC_INITIAL_PRICE_USD,source:"initial",availability:"available"}
  ],meta:{environment,live:false,disclaimer:"Devnet values are test references and not market prices."}};

  const mint=process.env.PWRC_MAINNET_MINT;
  if(!mint)return {data:[{symbol:"PWRC",priceUsd:null,source:"none",availability:"not-listed"}],meta:{environment,live:true,disclaimer:"No mainnet mint is configured. No price is fabricated."}};
  if(!process.env.BIRDEYE_API_KEY)return {data:[{symbol:"PWRC",priceUsd:null,source:"none",availability:"not-configured"}],meta:{environment,live:true,disclaimer:"Live provider credentials are not configured."}};
  const response=await fetch(`https://public-api.birdeye.so/defi/price?address=${encodeURIComponent(mint)}`,{headers:{"X-API-KEY":process.env.BIRDEYE_API_KEY,"x-chain":"solana"}});
  if(!response.ok)return {data:[{symbol:"PWRC",priceUsd:null,source:"birdeye",availability:"unavailable"}],meta:{environment,live:true,disclaimer:"Birdeye returned no usable mainnet price."}};
  const body=await response.json() as any;
  const price=typeof body?.data?.value==="number"?body.data.value:null;
  return {data:[{symbol:"PWRC",priceUsd:price,source:"birdeye",availability:price===null?"unavailable":"available"}],meta:{environment,live:true,disclaimer:"Informational market data only."}};
 }
}

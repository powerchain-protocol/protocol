
import {PWRC_INITIAL_PRICE_USD,TOKEN_CONFIGURATION} from "@/config/tokens";
import type {PriceEnvironment,PriceFeedResponse,TokenPriceRecord} from "@/types/market-price";

type Fetcher=typeof fetch;

function unavailable(symbol:string,environment:PriceEnvironment,availability:TokenPriceRecord["availability"],disclaimer:string):TokenPriceRecord{
  return {symbol,network:"solana",environment,priceUsd:null,change24hPercent:null,source:"initial",availability,observedAt:null,disclaimer};
}

async function fetchBirdeyePrice(input:{mint:string;symbol:string;apiKey:string;fetcher:Fetcher}):Promise<TokenPriceRecord>{
  const response=await input.fetcher(`https://public-api.birdeye.so/defi/price?address=${encodeURIComponent(input.mint)}`,{
    headers:{"X-API-KEY":input.apiKey,"x-chain":"solana"},cache:"no-store"
  });
  if(!response.ok)throw new Error(`Birdeye returned ${response.status}.`);
  const body=await response.json() as {success?:boolean;data?:{value?:number;updateUnixTime?:number}};
  if(!body.success||typeof body.data?.value!=="number")throw new Error("Birdeye price was unavailable.");
  return {symbol:input.symbol,mint:input.mint,network:"solana",environment:"mainnet",priceUsd:body.data.value,change24hPercent:null,source:"birdeye",availability:"available",observedAt:body.data.updateUnixTime?new Date(body.data.updateUnixTime*1000).toISOString():new Date().toISOString()};
}

async function fetchJupiterQuotePrice(input:{mint:string;symbol:string;apiKey?:string;fetcher:Fetcher}):Promise<TokenPriceRecord>{
  const usdc=TOKEN_CONFIGURATION.USDC.mainnetMint;
  const amount="1000000";
  const params=new URLSearchParams({inputMint:input.mint,outputMint:usdc,amount,slippageBps:"100",swapMode:"ExactIn",restrictIntermediateTokens:"true"});
  const response=await input.fetcher(`https://api.jup.ag/swap/v2/quote?${params}`,{
    headers:input.apiKey?{"x-api-key":input.apiKey}:{},cache:"no-store"
  });
  if(!response.ok)throw new Error(`Jupiter returned ${response.status}.`);
  const body=await response.json() as {inAmount?:string;outAmount?:string};
  if(!body.inAmount||!body.outAmount)throw new Error("Jupiter route was unavailable.");
  const tokenUnits=Number(body.inAmount)/1_000_000;
  const usdcUnits=Number(body.outAmount)/1_000_000;
  const price=usdcUnits/tokenUnits;
  if(!Number.isFinite(price)||price<=0)throw new Error("Jupiter price could not be derived.");
  return {symbol:input.symbol,mint:input.mint,network:"solana",environment:"mainnet",priceUsd:price,change24hPercent:null,source:"jupiter",availability:"available",observedAt:new Date().toISOString(),disclaimer:"Derived from a live executable quote and may include routing effects."};
}

export async function getTokenPrices(environment:PriceEnvironment,fetcher:Fetcher=fetch):Promise<PriceFeedResponse>{
  const generatedAt=new Date().toISOString();
  const disclaimer="Market prices are informational only and are not an offer, valuation, or guarantee. Mainnet responses never substitute mock values when live data is unavailable.";

  if(environment==="mock"){
    return {data:[
      {symbol:"SOL",network:"solana",environment,priceUsd:143,change24hPercent:1.82,source:"mock",availability:"available",observedAt:generatedAt},
      {symbol:"USDC",network:"solana",environment,priceUsd:1,change24hPercent:0,source:"mock",availability:"available",observedAt:generatedAt},
      {symbol:"PWRC",network:"solana",environment,priceUsd:PWRC_INITIAL_PRICE_USD,change24hPercent:0,source:"initial",availability:"available",observedAt:generatedAt,disclaimer:"Initial reference price for demo and pre-market use only."}
    ],meta:{environment,live:false,generatedAt,providers:["mock"],disclaimer}};
  }

  if(environment==="devnet"){
    return {data:[
      unavailable("SOL",environment,"unavailable","No canonical USD market price is asserted for devnet SOL."),
      unavailable("USDC",environment,"unavailable","No canonical USD market price is asserted for a devnet test token."),
      {symbol:"PWRC",mint:TOKEN_CONFIGURATION.PWRC.devnetMint??undefined,network:"solana",environment,priceUsd:PWRC_INITIAL_PRICE_USD,change24hPercent:0,source:"initial",availability:"available",observedAt:generatedAt,disclaimer:"Initial reference price only; not a live market price."}
    ],meta:{environment,live:false,generatedAt,providers:["initial"],disclaimer}};
  }

  const records:TokenPriceRecord[]=[];
  for(const token of [TOKEN_CONFIGURATION.SOL,TOKEN_CONFIGURATION.USDC,TOKEN_CONFIGURATION.PWRC]){
    const mint=token.mainnetMint;
    if(!mint){
      records.push(unavailable(token.symbol,environment,"not-listed","No mainnet mint is configured; no mainnet price is published."));
      continue;
    }
    try{
      if(process.env.BIRDEYE_API_KEY){
        records.push(await fetchBirdeyePrice({mint,symbol:token.symbol,apiKey:process.env.BIRDEYE_API_KEY,fetcher}));
        continue;
      }
      records.push(await fetchJupiterQuotePrice({mint,symbol:token.symbol,apiKey:process.env.JUPITER_API_KEY,fetcher}));
    }catch(error){
      records.push(unavailable(token.symbol,environment,"unavailable",error instanceof Error?error.message:"Live price unavailable."));
    }
  }
  return {data:records,meta:{environment,live:true,generatedAt,providers:["birdeye","jupiter"],disclaimer}};
}

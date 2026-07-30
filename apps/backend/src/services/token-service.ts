
import {PowerchainError} from "@powerchain/utils";
const INITIAL_PWRC_PRICE_USD=0.000002;
export class TokenService{
 async list(environment:"mock"|"devnet"|"mainnet"){
  if(environment==="mainnet"&&!process.env.PWRC_MAINNET_MINT)return [{
   symbol:"PWRC",name:"Powerchain",network:"solana",mint:null,priceUsd:null,
   availability:"not-listed",environment,initialReferencePriceUsd:INITIAL_PWRC_PRICE_USD
  }];
  return [{
   symbol:"PWRC",name:"Powerchain",network:"solana",
   mint:environment==="mainnet"?process.env.PWRC_MAINNET_MINT:process.env.PWRC_DEVNET_MINT??null,
   priceUsd:environment==="mainnet"?null:INITIAL_PWRC_PRICE_USD,
   availability:environment==="mainnet"?"unavailable":"available",environment,
   initialReferencePriceUsd:INITIAL_PWRC_PRICE_USD
  }];
 }
 async get(symbol:string,environment:"mock"|"devnet"|"mainnet"){
  const token=(await this.list(environment)).find(item=>item.symbol.toLowerCase()===symbol.toLowerCase());
  if(!token)throw new PowerchainError("Token not found.","NOT_FOUND",404);
  return token;
 }
}

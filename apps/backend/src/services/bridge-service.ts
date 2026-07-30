
import {PowerchainError} from "@powerchain/utils";
export type BridgeNetwork="solana"|"sui"|"base"|"bnb";
export class BridgeService{
 routes(){return [
  {from:"solana",to:"sui",assets:["USDC","PWRC"],provider:"powerchain",status:"available"},
  {from:"solana",to:"base",assets:["USDC"],provider:"cctp",status:"available"},
  {from:"base",to:"solana",assets:["USDC"],provider:"cctp",status:"available"}
 ]}
 quote(input:{from:BridgeNetwork;to:BridgeNetwork;asset:string;amount:number}){
  const route=this.routes().find(route=>route.from===input.from&&route.to===input.to&&route.assets.includes(input.asset));
  if(!route)throw new PowerchainError("No bridge route is available.","NOT_FOUND",404);
  return {...input,provider:route.provider,feeUsd:Math.max(.25,input.amount*.001),estimatedSeconds:route.provider==="cctp"?900:180,expiresAt:new Date(Date.now()+30000).toISOString()}
 }
}

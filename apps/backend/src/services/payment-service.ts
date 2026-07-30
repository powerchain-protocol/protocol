
import {PowerchainError,createId} from "@powerchain/utils";
export class PaymentService{
 create(input:{rail:string;amountUsd:number;reference:string;walletAddress?:string}){
  if(!Number.isFinite(input.amountUsd)||input.amountUsd<=0)throw new PowerchainError("Payment amount must be positive.","VALIDATION_ERROR",400);
  return {id:createId("pay"),...input,currency:"USD",status:"created",createdAt:new Date().toISOString(),fallbacks:["retry-provider","manual-review"]}
 }
}

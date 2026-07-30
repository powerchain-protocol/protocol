
import {z} from "zod";
export const paymentSchema=z.object({id:z.string(),merchantId:z.string(),amount:z.number().positive(),currency:z.enum(["USD","EUR"]),asset:z.enum(["USDC","SOL","PWRC","CCT"]),reference:z.string()});
export type PaymentRequest=z.infer<typeof paymentSchema>; export type PaymentStatus="created"|"pending"|"confirmed"|"failed"|"refunded";
export type PaymentResult={id:string;status:PaymentStatus;signature?:string;explorerUrl?:string};
export interface PaymentProvider{name:string;supports(asset:string):boolean;create(request:PaymentRequest,signal?:AbortSignal):Promise<PaymentResult>;confirm(id:string,signal?:AbortSignal):Promise<PaymentResult>}
export function paymentFees(amount:number,feeBps=200,networkFee=0){if(amount<=0)throw new Error("Amount must be positive.");const platformFee=amount*feeBps/10000;return{amount,platformFee,networkFee,total:amount+platformFee+networkFee}}

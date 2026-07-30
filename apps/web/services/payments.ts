
import {api} from "@/lib/api";
export type PaymentConfig={rails:string[];fallbacks:string[]};
export function fetchPaymentConfig(){return api<PaymentConfig>("/api/payments/config")}
export function createPaymentIntent(input:{rail:string;amountUsd:number;reference:string;walletAddress?:string}){return api<any>("/api/payments/intents",{method:"POST",body:JSON.stringify(input)})}

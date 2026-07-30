
import type {PaymentRail} from "@/types/payment";
export const PAYMENT_RAILS:{id:PaymentRail;label:string;description:string}[]=[
{id:"card",label:"Card",description:"Hosted card payment through configured provider."},
{id:"solana-pay",label:"Solana Pay",description:"Wallet payment using a Solana Pay request."},
{id:"usdc",label:"USDC",description:"Direct stablecoin settlement."},
{id:"pwrc",label:"PWRC",description:"Powerchain token settlement."},
{id:"x402",label:"x402",description:"HTTP-native payment challenge and settlement."},
{id:"cctp",label:"CCTP",description:"Cross-chain USDC transfer through Circle CCTP."}
];

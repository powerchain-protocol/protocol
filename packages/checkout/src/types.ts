
export type CheckoutAsset = "SOL" | "USDC" | "PWRC" | "CCT";
export type CheckoutSessionStatus = "open" | "processing" | "paid" | "expired" | "cancelled" | "failed";
export type CheckoutLineItem = { id:string; name:string; description?:string; quantity:number; unitAmount:number; currency:"USD"|"EUR"; metadata?:Record<string,string> };
export type CheckoutCustomer = { email?:string; name?:string; walletAddress?:string; country?:string };
export type CreateCheckoutSessionRequest = {
  merchantId:string; merchantReference:string; lineItems:CheckoutLineItem[]; customer?:CheckoutCustomer;
  settlementAssets:CheckoutAsset[]; preferredAsset?:CheckoutAsset; successUrl:string; cancelUrl:string;
  expiresInSeconds?:number; metadata?:Record<string,string>
};
export type CheckoutPayment = { reference:string; asset:CheckoutAsset; amount:string; transactionSignature?:string; explorerUrl?:string; confirmedAt?:string };
export type CheckoutSession = CreateCheckoutSessionRequest & {
  id:string; status:CheckoutSessionStatus; hostedUrl:string; payment?:CheckoutPayment;
  createdAt:string; updatedAt:string; expiresAt:string
};
export type PriceQuoteRequest={baseCurrency:"USD"|"EUR";asset:CheckoutAsset;amount:number};
export type PriceQuote={asset:CheckoutAsset;baseCurrency:"USD"|"EUR";assetAmount:string;rate:number;expiresAt:string;provider:string};
export interface PriceProvider { name:string; supports(request:PriceQuoteRequest):boolean; quote(request:PriceQuoteRequest,signal?:AbortSignal):Promise<PriceQuote> }
export type SettlementRequest={sessionId:string;asset:CheckoutAsset;amount:string;walletAddress?:string;reference:string};
export type SettlementResult={reference:string;status:"created"|"pending"|"confirmed"|"failed";transactionSignature?:string;explorerUrl?:string};
export interface SettlementProvider { name:string; supports(asset:string):boolean; create(request:SettlementRequest,signal?:AbortSignal):Promise<SettlementResult>; confirm(reference:string,signal?:AbortSignal):Promise<SettlementResult> }

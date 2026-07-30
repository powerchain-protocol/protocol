
import type {CheckoutSession,CreateCheckoutSessionRequest} from "./types.js";
import {createCheckoutSessionSchema} from "./schemas.js";
export class CheckoutApiError extends Error { constructor(message:string,public status:number,public code:string){super(message)} }
export class PowerchainCheckoutClient {
  constructor(private options:{baseUrl?:string;apiKey?:string;fetch?:typeof fetch}={}){}
  private async request<T>(path:string,init?:RequestInit):Promise<T>{
    const response=await (this.options.fetch??fetch)(`${(this.options.baseUrl??"https://api.powerchain.energy/api/v1").replace(/\/$/,"")}${path}`,{
      ...init,headers:{"content-type":"application/json",...(this.options.apiKey?{authorization:`Bearer ${this.options.apiKey}`}:{ }),...init?.headers}
    });
    const body=await response.json().catch(()=>({}));
    if(!response.ok) throw new CheckoutApiError((body as any)?.error?.message??"Checkout API request failed.",response.status,(body as any)?.error?.code??"CHECKOUT_API_ERROR");
    return ((body as any).data??body) as T;
  }
  createSession(input:CreateCheckoutSessionRequest){return this.request<CheckoutSession>("/checkout/sessions",{method:"POST",body:JSON.stringify(createCheckoutSessionSchema.parse(input))})}
  getSession(id:string){return this.request<CheckoutSession>(`/checkout/sessions/${encodeURIComponent(id)}`)}
}


import type {CheckoutSession} from "./types.js";
export const checkoutFixture:CheckoutSession={
  id:"chk_demo",merchantId:"merchant_demo",merchantReference:"ORDER-10042",status:"open",
  lineItems:[{id:"credit",name:"Renewable energy credit",quantity:250,unitAmount:0.18,currency:"USD"}],
  settlementAssets:["USDC","SOL","PWRC"],preferredAsset:"USDC",
  successUrl:"http://localhost:3000/success",cancelUrl:"http://localhost:3000/cancel",
  hostedUrl:"http://localhost:3002/checkout/demo",
  createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),expiresAt:new Date(Date.now()+1800000).toISOString()
};

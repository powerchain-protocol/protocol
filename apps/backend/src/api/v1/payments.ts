
import type {FastifyInstance} from "fastify";import {PaymentService} from "../../services/payment-service.js";import {created,ok} from "../../lib/http.js";
export async function paymentRoutes(app:FastifyInstance){const service=new PaymentService();
 app.post<{Body:{rail:string;amountUsd:number;walletAddress?:string;reference:string}}>("/payments/intents",{schema:{tags:["Payments"],summary:"Create payment intent"}},async(r,reply)=>created(reply,service.create(r.body)));
 app.get("/payments/config",{schema:{tags:["Payments"],summary:"Get enabled payment rails"}},async(_r,reply)=>ok(reply,{rails:["card","solana-pay","usdc","pwrc","x402","cctp"],fallbacks:["retry-provider","manual-review"]}));
 app.get("/payments/transactions",{schema:{tags:["Payments"],summary:"List payment transactions"}},async(_r,reply)=>ok(reply,[]));
}

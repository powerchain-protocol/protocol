
import type {FastifyInstance} from "fastify";import {createCheckoutSessionSchema} from "@powerchain/checkout";import {createHmac,timingSafeEqual} from "node:crypto";
const sessions=new Map<string,any>();
export async function checkoutRoutes(app:FastifyInstance){
 app.post("/checkout/sessions",async(req,reply)=>{const input=createCheckoutSessionSchema.parse(req.body);const now=new Date();const id=`chk_${crypto.randomUUID().slice(0,8)}`;const s={...input,id,status:"open",hostedUrl:`${process.env.NEXT_PUBLIC_CHECKOUT_BASE_URL??"https://checkout.powerchain.energy"}/checkout/${id}`,createdAt:now.toISOString(),updatedAt:now.toISOString(),expiresAt:new Date(now.getTime()+(input.expiresInSeconds??1800)*1000).toISOString()};sessions.set(id,s);return reply.code(201).send({data:s})});
 app.get<{Params:{id:string}}>("/checkout/sessions/:id",async(req,reply)=>sessions.has(req.params.id)?{data:sessions.get(req.params.id)}:reply.code(404).send({error:{code:"CHECKOUT_SESSION_NOT_FOUND"}}));
 app.post("/checkout/callbacks",async(req,reply)=>{const secret=process.env.POWERCHAIN_CHECKOUT_CALLBACK_SECRET;const sig=String(req.headers["x-powerchain-signature"]??"");if(!secret)return reply.code(503).send({error:{code:"CALLBACK_SECRET_NOT_CONFIGURED"}});const expected=Buffer.from(createHmac("sha256",secret).update(JSON.stringify(req.body)).digest("hex"));const got=Buffer.from(sig);if(expected.length!==got.length||!timingSafeEqual(expected,got))return reply.code(401).send({error:{code:"INVALID_CALLBACK_SIGNATURE"}});return reply.code(202).send({data:{accepted:true}})});
}


import Fastify from "fastify";import {checkoutFixture,createCheckoutSessionSchema} from "@powerchain/checkout";
const app=Fastify();const sessions=new Map([[checkoutFixture.id,checkoutFixture]]);
app.get("/fixtures/checkout",async()=>({data:checkoutFixture}));
app.post("/api/v1/checkout/sessions",async(req,reply)=>{const input=createCheckoutSessionSchema.parse(req.body);const id=`chk_${crypto.randomUUID().slice(0,8)}`;const now=new Date();const session={...input,id,status:"open",hostedUrl:`http://localhost:${process.env.CHECKOUT_EMULATOR_PORT??4310}/checkout/${id}`,createdAt:now.toISOString(),updatedAt:now.toISOString(),expiresAt:new Date(now.getTime()+(input.expiresInSeconds??1800)*1000).toISOString()};sessions.set(id,session);return reply.code(201).send({data:session})});
app.get("/api/v1/checkout/sessions/:id",async(req:any,reply)=>sessions.has(req.params.id)?{data:sessions.get(req.params.id)}:reply.code(404).send({error:{code:"NOT_FOUND"}}));
await app.listen({port:Number(process.env.CHECKOUT_EMULATOR_PORT??4310),host:"0.0.0.0"});

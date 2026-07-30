
import type {FastifyInstance} from "fastify";

const plans=[
  {tier:"developer",monthlyUsd:0,yearlyUsd:0,seats:1},
  {tier:"starter",monthlyUsd:49,yearlyUsd:490,seats:5},
  {tier:"growth",monthlyUsd:299,yearlyUsd:2990,seats:25},
  {tier:"enterprise",monthlyUsd:null,yearlyUsd:null,seats:null}
];

export async function subscriptionRoutes(app:FastifyInstance){
  app.get("/subscriptions/plans",async()=>({data:plans}));
  app.post<{Body:{tierId:string;billingCycle:"monthly"|"yearly";companyId?:string}}>("/subscriptions/purchase",async(request,reply)=>{
    const plan=plans.find(item=>item.tier===request.body.tierId);
    if(!plan)return reply.code(404).send({error:{code:"PLAN_NOT_FOUND"}});
    const reference=`sub_${crypto.randomUUID().slice(0,8)}`;
    return reply.code(201).send({data:{reference,plan,billingCycle:request.body.billingCycle,status:"checkout-created"}});
  });
}

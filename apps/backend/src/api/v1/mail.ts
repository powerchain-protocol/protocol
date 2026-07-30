
import type { FastifyInstance } from "fastify";
import { sendMail, welcomeEmail } from "@powerchain/email";

export async function mailRoutes(app:FastifyInstance){
  app.post<{Body:{email:string;name:string;organization:string}}>("/mail/welcome",async(request,reply)=>{
    const template=welcomeEmail(request.body);
    const result=await sendMail({to:[{email:request.body.email,name:request.body.name}],subject:template.subject,html:template.html,text:template.text});
    return reply.code(202).send({data:result});
  });
}

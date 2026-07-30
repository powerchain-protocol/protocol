
import type { MailMessage, MailProvider, MailResult } from "../types.js";

export class ResendMailProvider implements MailProvider {
  name="resend";
  constructor(private readonly apiKey:string){}

  async send(message:MailMessage):Promise<MailResult>{
    const response=await fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{authorization:`Bearer ${this.apiKey}`,"content-type":"application/json"},
      body:JSON.stringify({
        from:`${message.from?.name??"Powerchain"} <${message.from?.email??"notifications@powerchain.energy"}>`,
        to:message.to.map((address)=>address.name?`${address.name} <${address.email}>`:address.email),
        subject:message.subject,
        html:message.html,
        text:message.text,
        reply_to:message.replyTo?.email,
        tags:message.tags?.map((name)=>({name,value:"true"}))
      })
    });
    if(!response.ok) throw new Error(`Resend request failed with ${response.status}.`);
    const body=await response.json() as {id:string};
    return {id:body.id,provider:this.name,accepted:message.to.map((address)=>address.email)};
  }
}

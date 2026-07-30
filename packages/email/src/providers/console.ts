
import type { MailMessage, MailProvider, MailResult } from "../types.js";

export class ConsoleMailProvider implements MailProvider {
  name="console";
  async send(message:MailMessage):Promise<MailResult>{
    console.log("[mail]",{to:message.to.map((item)=>item.email),subject:message.subject});
    return {id:`console_${crypto.randomUUID()}`,provider:this.name,accepted:message.to.map((item)=>item.email)};
  }
}

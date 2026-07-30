
import { sendMail, welcomeEmail, accessChangedEmail } from "@powerchain/email";

export async function sendWelcomeMail(input:{email:string;name:string;organization:string}){
  const template=welcomeEmail(input);
  return sendMail({to:[{email:input.email,name:input.name}],subject:template.subject,html:template.html,text:template.text,tags:["welcome"]});
}

export async function sendAccessChangedMail(input:{email:string;name:string;role:string;organization:string}){
  const template=accessChangedEmail(input);
  return sendMail({to:[{email:input.email,name:input.name}],subject:template.subject,html:template.html,text:template.text,tags:["access"]});
}

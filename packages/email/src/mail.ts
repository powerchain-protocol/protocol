
import type { MailMessage, MailProvider } from "./types.js";
import { ConsoleMailProvider } from "./providers/console.js";
import { ResendMailProvider } from "./providers/resend.js";

export function createMailProvider():MailProvider{
  if(process.env.RESEND_API_KEY) return new ResendMailProvider(process.env.RESEND_API_KEY);
  return new ConsoleMailProvider();
}

export async function sendMail(message:MailMessage){
  return createMailProvider().send(message);
}

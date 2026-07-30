
export type MailAddress = { email:string; name?:string };
export type MailMessage = {
  to: MailAddress[];
  from?: MailAddress;
  subject: string;
  html: string;
  text?: string;
  replyTo?: MailAddress;
  tags?: string[];
};
export type MailResult = { id:string; provider:string; accepted:string[] };
export interface MailProvider {
  name:string;
  send(message:MailMessage):Promise<MailResult>;
}

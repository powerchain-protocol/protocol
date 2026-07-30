
import { z } from "zod";
import { sendWelcomeMail } from "@/services/mail";

const schema=z.object({email:z.string().email(),name:z.string().min(1),organization:z.string().min(2)});

export async function POST(request:Request){
  const result=await sendWelcomeMail(schema.parse(await request.json()));
  return Response.json({data:result},{status:202});
}

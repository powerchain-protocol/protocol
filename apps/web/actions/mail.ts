
"use server";

import { z } from "zod";
import { sendWelcomeMail } from "@/services/mail";

const schema=z.object({
  email:z.string().email(),
  name:z.string().min(1).max(100),
  organization:z.string().min(2).max(120)
});

export async function sendWelcomeEmail(input:z.infer<typeof schema>){
  return sendWelcomeMail(schema.parse(input));
}


"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { COMPANY_ROLES } from "@/types/access";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  organization: z.string().min(2).max(120),
  companyRole: z.enum(COMPANY_ROLES)
});

export async function signUp(input: z.infer<typeof signUpSchema>) {
  const data = signUpSchema.parse(input);
  const supabase = await createClient();

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: `${data.firstName} ${data.lastName}`,
        organization: data.organization,
        company_role: data.companyRole
      }
    }
  });

  if (result.error) throw new Error(result.error.message);
  return { userId: result.data.user?.id, requiresEmailConfirmation: !result.data.session };
}

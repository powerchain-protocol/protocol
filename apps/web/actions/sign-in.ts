
"use server";

import {cookies} from "next/headers";
import {z} from "zod";
import {DEMO_ACCOUNT} from "@/config/demo";
import {createClient} from "@/utils/supabase/server";

const schema=z.object({email:z.string().email(),password:z.string().min(8),remember:z.boolean().default(false)});

export async function signIn(input:z.infer<typeof schema>){
  const parsed=schema.parse(input);
  const store=await cookies();

  if(parsed.email.toLowerCase()===DEMO_ACCOUNT.email&&parsed.password===DEMO_ACCOUNT.password){
    store.set("powerchain_demo","1",{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:parsed.remember?60*60*24*30:60*60*8});
    store.set("powerchain_session","demo-session",{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:parsed.remember?60*60*24*30:60*60*8});
    return {demo:true,redirectTo:DEMO_ACCOUNT.dashboardUrl};
  }

  const supabase=await createClient(store);
  const result=await supabase.auth.signInWithPassword({email:parsed.email,password:parsed.password});
  if(result.error)throw new Error(result.error.message);
  return {demo:false,redirectTo:"https://dashboard.powerchain.energy"};
}

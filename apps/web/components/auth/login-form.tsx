
"use client";

import Link from "next/link";
import {useState,useTransition} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {DEMO_ACCOUNT} from "@/config/demo";
import {signIn} from "@/actions/sign-in";

export function LoginForm(){
  const [message,setMessage]=useState("");
  const [pending,startTransition]=useTransition();

  function submit(form:HTMLFormElement){
    const data=new FormData(form);
    startTransition(async()=>{
      try{
        const result=await signIn({
          email:String(data.get("email")),
          password:String(data.get("password")),
          remember:data.get("remember")==="on"
        });
        window.location.assign(result.redirectTo);
      }catch(cause){
        setMessage(cause instanceof Error?cause.message:"Sign-in failed.");
      }
    });
  }

  return <form className="space-y-5" onSubmit={(event)=>{event.preventDefault();submit(event.currentTarget)}}>
    <label><Label>Email address</Label><Input name="email" required className="mt-2" type="email" placeholder="you@company.com"/></label>
    <label><div className="flex justify-between"><Label>Password</Label><Link href="/auth/reset-password" className="text-xs font-semibold text-emerald-700">Forgot password?</Link></div><Input name="password" required minLength={8} className="mt-2" type="password"/></label>
    <label className="flex items-center gap-2 text-sm text-slate-600"><input name="remember" type="checkbox" className="size-4 accent-emerald-700"/>Remember me</label>
    <Button disabled={pending} className="w-full">{pending?"Signing in…":"Sign in securely"}</Button>
    <button type="button" onClick={()=>{const form=document.querySelector("form") as HTMLFormElement;const email=form.elements.namedItem("email") as HTMLInputElement;const password=form.elements.namedItem("password") as HTMLInputElement;email.value=DEMO_ACCOUNT.email;password.value=DEMO_ACCOUNT.password;submit(form)}} className="w-full rounded-xl border border-emerald-200 bg-emerald-50 py-3 text-sm font-bold text-emerald-800">Access demo dashboard</button>
    {message&&<p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{message}</p>}
    <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500"><b>Demo credentials</b><br/>{DEMO_ACCOUNT.email}<br/>{DEMO_ACCOUNT.password}</div>
  </form>
}

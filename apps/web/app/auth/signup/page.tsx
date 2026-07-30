
"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { SocialLogin } from "@/components/auth/social-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CompanyRoleSelect } from "@/components/auth/company-role-select";
import type { CompanyRole } from "@/types/access";
import { signUp } from "@/actions/auth";

export default function SignUpPage() {
  const [role,setRole]=useState<CompanyRole>("OWNER");
  const [message,setMessage]=useState("");
  const [pending,startTransition]=useTransition();

  return (
    <AuthShell title="Create your workspace" description="Launch a secure Powerchain organization for your renewable infrastructure operations.">
      <SocialLogin />
      <div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200"/>or use work email<span className="h-px flex-1 bg-slate-200"/></div>
      <form className="space-y-5" onSubmit={(event)=>{
        event.preventDefault();
        const form=new FormData(event.currentTarget);
        startTransition(async()=>{
          try {
            const result=await signUp({
              firstName:String(form.get("firstName")),
              lastName:String(form.get("lastName")),
              email:String(form.get("email")),
              organization:String(form.get("organization")),
              password:String(form.get("password")),
              companyRole:role
            });
            setMessage(result.requiresEmailConfirmation?"Check your email to confirm the account.":"Account created.");
          } catch (error) {
            setMessage(error instanceof Error?error.message:"Unable to create account.");
          }
        });
      }}>
        <div className="grid grid-cols-2 gap-3">
          <label><Label>First name</Label><Input name="firstName" required className="mt-2"/></label>
          <label><Label>Last name</Label><Input name="lastName" required className="mt-2"/></label>
        </div>
        <label><Label>Work email</Label><Input name="email" required className="mt-2" type="email" placeholder="you@company.com"/></label>
        <label><Label>Organization</Label><Input name="organization" required className="mt-2"/></label>
        <label><Label>Company role</Label><div className="mt-2"><CompanyRoleSelect value={role} onChange={setRole}/></div></label>
        <label><Label>Password</Label><Input name="password" required minLength={12} className="mt-2" type="password"/></label>
        <Button disabled={pending} className="w-full">{pending?"Creating account…":"Create enterprise account"}</Button>
      </form>
      {message&&<p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm">{message}</p>}
      <p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link href="/auth/signin" className="font-semibold text-emerald-700">Sign in</Link></p>
    </AuthShell>
  );
}

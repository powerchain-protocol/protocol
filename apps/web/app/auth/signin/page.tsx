
import Link from "next/link";
import {AuthShell} from "@/components/auth/auth-shell";
import {SocialLogin} from "@/components/auth/social-login";
import {LoginForm} from "@/components/auth/login-form";

export default function SignInPage(){
  return <AuthShell title="Welcome back" description="Sign in to manage your organisation, wallet, energy assets, and settlements.">
    <SocialLogin/>
    <div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200"/>or continue with email<span className="h-px flex-1 bg-slate-200"/></div>
    <LoginForm/>
    <p className="mt-6 text-center text-sm text-slate-500">New to Powerchain? <Link href="/auth/signup" className="font-semibold text-emerald-700">Create an account</Link></p>
  </AuthShell>
}

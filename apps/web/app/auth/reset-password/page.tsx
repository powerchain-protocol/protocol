
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Reset your password" description="Enter your account email and we will send a secure password-reset link.">
      <form className="space-y-5">
        <label><Label>Email address</Label><Input className="mt-2" type="email" placeholder="you@company.com" /></label>
        <Button className="w-full">Send reset link</Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500"><Link href="/auth/signin" className="font-semibold text-emerald-700">Return to sign in</Link></p>
    </AuthShell>
  );
}


import { Github } from "lucide-react";

export function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold shadow-sm hover:bg-slate-50"><Github className="size-4" />GitHub</button>
      <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold shadow-sm hover:bg-slate-50"><span className="font-black text-blue-600">G</span>Google</button>
    </div>
  );
}

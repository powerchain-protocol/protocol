
import Link from "next/link";
import { Github, MessageCircle } from "lucide-react";

export function DeveloperCommunity() {
  return (
    <section className="mx-auto max-w-[1480px] px-5 py-5 lg:px-8">
      <div className="developer-map relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-8 lg:px-8">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-xl font-bold">Join the Powerchain Developer Community</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
            Collaborate, ask questions, and build the future of renewable infrastructure together.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="#" className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white">
              <MessageCircle className="size-4" /> Join Discord
            </Link>
            <Link href="#" className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold">
              <Github className="size-4" /> Go to GitHub
            </Link>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 hidden w-[54%] opacity-75 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,.14),transparent_4px)] [background-size:38px_38px]" />
          {[["12%","52%"],["28%","38%"],["40%","63%"],["58%","42%"],["75%","58%"],["88%","35%"]].map(([left, top]) => (
            <span key={`${left}-${top}`} className="absolute size-2 rounded-full bg-emerald-400 shadow-[0_0_18px_6px_rgba(16,185,129,.23)]" style={{ left, top }} />
          ))}
        </div>
      </div>
    </section>
  );
}

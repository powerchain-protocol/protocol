
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AiWorkspace } from "@/components/ai/ai-workspace";

export default function AiPage() {
  return (
    <>
      <Header />
      <main className="pc-shell min-h-[850px] px-5 py-14">
        <div className="mx-auto max-w-[1550px]">
          <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Agents, LoRA and MPC</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight">AI operations workspace.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">Chat with specialized Powerchain agents, manage prompts, review alarms, and configure controlled signing tools.</p>
          <div className="mt-10"><AiWorkspace /></div>
        </div>
      </main>
      <Footer />
    </>
  );
}

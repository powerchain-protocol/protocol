import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FaucetCard, FoucetHistories } from "@/components/foucets";

export default function FaucetsPage() {
  return (
    <>
      <Header />
      <main className="pc-shell min-h-[760px] px-5 py-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-black uppercase tracking-[.18em] text-emerald-700 dark:text-emerald-400">PowerChain developer tools</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-6xl">Test PWRC safely on Solana devnet.</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">The portal validates the connected wallet and cluster before issuing test-only PWRC from the configured faucet treasury.</p>
          <div className="mt-10"><FaucetCard /></div>
          <div className="mt-8"><FoucetHistories /></div>
          <div className="mt-6 rounded-2xl border bg-white p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            <strong className="text-slate-900 dark:text-white">Supply note:</strong> the deployment script creates a fixed devnet test supply of 1,000,000,000 PWRC with 9 decimals. It never deploys or mints mainnet assets.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

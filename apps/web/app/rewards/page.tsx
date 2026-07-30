import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { RewardsPanel } from "@/components/rewards/rewards-panel";

export default function RewardsPage() {
  return (
    <>
      <Header />
      <main className="pc-shell min-h-screen px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">PowerChain rewards</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Earn and claim protocol rewards.</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-600">Review missions, community rankings, and rewards associated with your wallet.</p>
          <div className="mt-10"><RewardsPanel /></div>
        </div>
      </main>
      <Footer />
    </>
  );
}


import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RewardsPanel } from "@/components/rewards/rewards-panel";

export default function LeaderboardPage() {
  return <><Header/><main className="pc-shell min-h-[820px] px-5 py-14"><div className="mx-auto max-w-[1450px]"><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Powerchain rewards</p><h1 className="mt-3 text-5xl font-semibold tracking-tight">Leaderboard and rewards.</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">Earn PWRC rewards for verified energy activity, carbon retirement, referrals, and ecosystem participation.</p><div className="mt-10"><RewardsPanel/></div></div></main><Footer/></>
}

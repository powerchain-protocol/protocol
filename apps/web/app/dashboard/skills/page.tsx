import Link from "next/link";
import { Bot, Boxes, CircleDollarSign, Code2, GitBranch, Landmark, ShieldCheck, WalletCards, Zap } from "lucide-react";

const skills = [
  {name:"Wallet operations",description:"Accounts, signing, recovery and keypair tools.",href:"/wallet",icon:WalletCards},
  {name:"Payments",description:"Checkout, invoices, billing and settlement.",href:"/payments",icon:CircleDollarSign},
  {name:"Exchange",description:"Quotes, swaps, bridges and portfolio workflows.",href:"/swap",icon:GitBranch},
  {name:"Treasury",description:"Liquidity, controls, forecasting and reporting.",href:"/dashboard",icon:Landmark},
  {name:"Energy",description:"GridOS™, renewable assets and carbon markets.",href:"/energy",icon:Zap},
  {name:"AI agents",description:"Copilots, automation, risk and analytics.",href:"/dashboard/ai",icon:Bot},
  {name:"Security",description:"Identity, policy, audit and transaction simulation.",href:"/system",icon:ShieldCheck},
  {name:"Developer tools",description:"SDKs, generators, terminal and API utilities.",href:"/dashboard/developer/generator",icon:Code2},
];
export default function SkillsPage(){return <div className="mx-auto max-w-7xl"><div className="flex items-center gap-3 text-emerald-400"><Boxes/><p className="text-xs font-bold uppercase tracking-[.18em]">Skills catalog</p></div><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">PowerChain skills</h1><p className="mt-3 max-w-3xl text-slate-400">Reusable capabilities that connect dashboard workflows with the PowerChain SDK.</p><div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{skills.map(({name,description,href,icon:Icon})=><Link key={name} href={href} className="rounded-2xl border border-white/10 bg-white/[.04] p-5 transition hover:border-emerald-400/50 hover:bg-white/[.07]"><Icon className="text-emerald-400"/><h2 className="mt-5 text-lg font-semibold">{name}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></Link>)}</div></div>}

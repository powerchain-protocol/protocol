
"use client";
import {motion} from "framer-motion";
import {Wifi} from "lucide-react";

export function AnimatedCreditCard({holder="POWERCHAIN DEMO",last4="2048",brand="VIRTUAL"}:{holder?:string;last4?:string;brand?:string}){
  return <motion.div whileHover={{rotateX:5,rotateY:-8,scale:1.02}} transition={{type:"spring",stiffness:160,damping:18}} className="relative aspect-[1.58/1] w-full max-w-md overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-emerald-950 to-emerald-700 p-7 text-white shadow-[0_35px_90px_rgba(6,78,59,.3)] [transform-style:preserve-3d]">
    <div className="absolute -right-16 -top-16 size-56 rounded-full border border-white/15"/>
    <div className="absolute -bottom-20 -left-12 size-56 rounded-full bg-lime-300/10 blur-2xl"/>
    <div className="flex items-start justify-between"><div><small className="text-[9px] font-bold uppercase tracking-[.2em] text-emerald-200">Powerchain Pay</small><b className="mt-1 block">{brand}</b></div><Wifi className="size-6 rotate-90"/></div>
    <div className="mt-12 font-mono text-xl tracking-[.22em]">•••• •••• •••• {last4}</div>
    <div className="mt-8 flex justify-between text-xs"><div><small className="block text-[9px] uppercase text-white/50">Cardholder</small><b>{holder}</b></div><div><small className="block text-[9px] uppercase text-white/50">Valid</small><b>12/30</b></div></div>
  </motion.div>;
}

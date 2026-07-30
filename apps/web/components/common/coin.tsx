
"use client";
import {motion} from "framer-motion";

export function Coin({symbol="PWRC",subtitle="Powerchain",className=""}:{symbol?:string;subtitle?:string;className?:string}){
  return <motion.div animate={{rotateY:[0,360],y:[0,-8,0]}} transition={{rotateY:{duration:9,repeat:Infinity,ease:"linear"},y:{duration:3,repeat:Infinity,ease:"easeInOut"}}} className={`relative grid aspect-square w-36 place-items-center rounded-full border-[10px] border-amber-300 bg-gradient-to-br from-amber-100 via-yellow-300 to-amber-500 shadow-[0_24px_55px_rgba(245,158,11,.28)] [transform-style:preserve-3d] ${className}`}>
    <div className="absolute inset-3 rounded-full border border-amber-700/30"/>
    <div className="text-center text-amber-950"><b className="block text-2xl tracking-tight">{symbol}</b><small className="text-[9px] font-bold uppercase tracking-[.16em]">{subtitle}</small></div>
  </motion.div>;
}

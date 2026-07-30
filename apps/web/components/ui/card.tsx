
import type {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";
export function Card({className,...props}:HTMLAttributes<HTMLDivElement>){return <div className={cn("rounded-[28px] border border-slate-200/70 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,.065)] backdrop-blur-sm transition-shadow hover:shadow-[0_28px_80px_rgba(15,23,42,.09)]",className)} {...props}/>}
export function CardHeader({className,...props}:HTMLAttributes<HTMLDivElement>){return <div className={cn("flex items-start justify-between gap-4 p-6 pb-0",className)} {...props}/>}
export function CardContent({className,...props}:HTMLAttributes<HTMLDivElement>){return <div className={cn("p-6",className)} {...props}/>}
export function CardFooter({className,...props}:HTMLAttributes<HTMLDivElement>){return <div className={cn("flex items-center gap-3 border-t border-slate-100 p-6",className)} {...props}/>}

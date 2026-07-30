
import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva,type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

export const buttonVariants=cva(
 "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-700/15 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
 {variants:{
  variant:{
   default:"bg-gradient-to-b from-emerald-700 to-emerald-900 text-white shadow-[0_10px_26px_rgba(4,120,87,.22)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(4,120,87,.28)]",
   outline:"border border-slate-200/90 bg-white/95 text-slate-900 shadow-[0_5px_16px_rgba(15,23,42,.06)] hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/40",
   ghost:"text-slate-700 hover:bg-slate-100/80",
   soft:"bg-emerald-50 text-emerald-800 shadow-[inset_0_0_0_1px_rgba(16,185,129,.12)] hover:bg-emerald-100",
   dark:"bg-slate-950 text-white shadow-[0_12px_28px_rgba(2,6,23,.22)] hover:-translate-y-0.5 hover:bg-slate-800",
   danger:"bg-rose-600 text-white shadow-[0_10px_24px_rgba(225,29,72,.2)] hover:bg-rose-700"
  },
  size:{sm:"h-9 px-3 text-xs",default:"h-11 px-5 text-sm",lg:"h-12 px-7 text-sm",xl:"h-14 px-8 text-base",icon:"size-10 p-0"}
 },defaultVariants:{variant:"default",size:"default"}}
);
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants>{asChild?:boolean;loading?:boolean}
export const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(({asChild,className,variant,size,loading,children,disabled,...props},ref)=>{const Component=asChild?Slot:"button";return <Component ref={ref} disabled={disabled||loading} className={cn(buttonVariants({variant,size,className}))} {...props}>{loading?<span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"/>:children}</Component>});
Button.displayName="Button";

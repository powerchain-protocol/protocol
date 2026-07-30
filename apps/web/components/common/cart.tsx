
"use client";
import {ShoppingCart,Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
export type CartLine={id:string;name:string;quantity:number;unitPriceUsd:number};
export function Cart({items,onRemove,onCheckout}:{items:CartLine[];onRemove?:(id:string)=>void;onCheckout?:()=>void}){
 const subtotal=items.reduce((s,i)=>s+i.quantity*i.unitPriceUsd,0);
 return <section className="rounded-[28px] border bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,.07)]"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-800"><ShoppingCart className="size-5"/></span><div><h2 className="font-bold">Cart</h2><p className="text-xs text-slate-500">{items.length} item(s)</p></div></div><div className="mt-5 space-y-3">{items.length?items.map(i=><div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4" key={i.id}><div><b className="text-sm">{i.name}</b><p className="text-xs text-slate-500">{i.quantity} × ${i.unitPriceUsd.toFixed(2)}</p></div><button onClick={()=>onRemove?.(i.id)} className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-rose-600"><Trash2 className="size-4"/></button></div>):<p className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">Your cart is empty.</p>}</div><div className="mt-5 flex items-center justify-between border-t pt-5"><span className="text-sm text-slate-500">Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><Button className="mt-4 w-full" disabled={!items.length} onClick={onCheckout}>Continue to checkout</Button></section>
}


"use client";
import {useEffect,useState} from "react";
import {PowerchainCheckoutClient,type CheckoutSession,type CreateCheckoutSessionRequest} from "@powerchain/checkout";
export function CheckoutButton({request,children="Checkout",className}:{request:CreateCheckoutSessionRequest;children?:React.ReactNode;className?:string}){
 const [loading,setLoading]=useState(false);
 return <button className={className} disabled={loading} onClick={async()=>{setLoading(true);try{const s=await new PowerchainCheckoutClient().createSession(request);location.assign(s.hostedUrl)}finally{setLoading(false)}}}>{loading?"Opening checkout…":children}</button>
}
export function CheckoutReceipt({session,autoCloseMs,onClose}:{session:CheckoutSession;autoCloseMs?:number;onClose?:()=>void}){
 useEffect(()=>{if(!autoCloseMs||!onClose)return;const id=setTimeout(onClose,autoCloseMs);return()=>clearTimeout(id)},[autoCloseMs,onClose]);
 return <section><h2>Payment {session.status}</h2><p>{session.merchantReference}</p>{session.payment?.explorerUrl&&<a href={session.payment.explorerUrl} target="_blank" rel="noreferrer">View transaction</a>}{onClose&&<button onClick={onClose}>Close</button>}</section>
}

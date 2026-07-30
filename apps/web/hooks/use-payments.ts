
"use client";
import {useState} from "react";import type {PaymentRail} from "@/types/payment";
export function usePayments(){const [loading,setLoading]=useState(false);const [error,setError]=useState<string>();async function create(input:{rail:PaymentRail;amountUsd:number;walletAddress?:string;reference:string}){setLoading(true);setError(undefined);try{const r=await fetch("/api/payments/intents",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(input)});if(!r.ok)throw new Error("Payment failed.");return r.json()}catch(e){setError(e instanceof Error?e.message:"Payment failed.");throw e}finally{setLoading(false)}}return {create,loading,error}}

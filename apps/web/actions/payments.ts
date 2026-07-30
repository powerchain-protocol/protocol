
"use server";
import {z} from "zod";
const schema=z.object({rail:z.enum(["card","solana-pay","usdc","pwrc","x402","cctp"]),amountUsd:z.number().positive(),walletAddress:z.string().optional(),reference:z.string().min(1)});
export async function createPaymentIntent(input:unknown){const value=schema.parse(input);const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL??"http://localhost:4000/api/v1"}/payments/intents`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(value),cache:"no-store"});if(!response.ok)throw new Error("Payment intent could not be created.");return response.json()}

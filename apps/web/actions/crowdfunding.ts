
"use server";
import {z} from "zod";
const schema=z.object({campaignId:z.string(),amountUsd:z.number().positive(),paymentMethod:z.enum(["card","solana-pay","usdc","pwrc","onramp"]),walletAddress:z.string().optional()});
export async function createCrowdfundingContribution(input:unknown){
 const parsed=schema.parse(input);
 const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL??"https://api.powerchain.energy/api/v1"}/crowdfunding/investments`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(parsed),cache:"no-store"});
 if(!response.ok)throw new Error("Contribution could not be created.");
 return response.json();
}

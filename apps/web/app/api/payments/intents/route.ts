
import {z} from "zod";const schema=z.object({rail:z.enum(["card","solana-pay","usdc","pwrc","x402","cctp"]),amountUsd:z.number().positive(),walletAddress:z.string().optional(),reference:z.string()});
export async function POST(request:Request){const input=schema.parse(await request.json());return Response.json({data:{id:`pay_${crypto.randomUUID().slice(0,8)}`,...input,currency:"USD",status:"created",createdAt:new Date().toISOString()}},{status:201})}

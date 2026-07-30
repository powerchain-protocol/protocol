import { NextResponse } from "next/server";
import { z } from "zod";
import { quoteProtocolOperation } from "../../../../../services/protocol";
const schema=z.object({amount:z.string().regex(/^\d+$/).transform(BigInt)});
export async function POST(request:Request){try{const {amount}=schema.parse(await request.json());const quote=quoteProtocolOperation("escrow" as any,amount);return NextResponse.json({...quote,inputAmount:quote.inputAmount.toString(),feeAmount:quote.feeAmount.toString(),outputAmount:quote.outputAmount.toString()});}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Invalid request"},{status:400});}}

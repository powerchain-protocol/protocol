import {NextRequest,NextResponse} from "next/server";
import {fetchRwaPortfolio} from "@/services/rwa";
export async function GET(req:NextRequest){const owner=req.nextUrl.searchParams.get("owner"); if(!owner)return NextResponse.json({error:"owner is required"},{status:400}); try{return NextResponse.json(await fetchRwaPortfolio(owner))}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Portfolio request failed"},{status:502})}}

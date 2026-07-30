import { NextResponse } from "next/server";import { ENERGY_MARKETS } from "@/constants/energy-market";
export async function GET(){return NextResponse.json({markets:ENERGY_MARKETS,updatedAt:new Date().toISOString()},{headers:{"cache-control":"public, max-age=30, stale-while-revalidate=120"}})}

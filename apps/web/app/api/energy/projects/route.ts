import { NextResponse } from "next/server";import { ENERGY_PROJECTS } from "@/constants/energy-market";
export async function GET(){return NextResponse.json({projects:ENERGY_PROJECTS,updatedAt:new Date().toISOString()},{headers:{"cache-control":"public, max-age=60, stale-while-revalidate=300"}})}

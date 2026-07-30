"use client";
import { useMemo, useState } from "react";
import { ENERGY_MARKETS } from "@/constants/energy-market";
import { filterMarkets } from "@/lib/energy/marketplace";
export function useEnergyMarkets(){
  const [query,setQuery]=useState("");
  const [maxDistanceKm,setMaxDistanceKm]=useState(60);
  const markets=useMemo(()=>filterMarkets(query,maxDistanceKm),[query,maxDistanceKm]);
  return { markets, allMarkets:ENERGY_MARKETS, query,setQuery,maxDistanceKm,setMaxDistanceKm };
}

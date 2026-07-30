
"use client";
import { createContext, useContext, useMemo, useState } from "react";

type EnergyMarketContextValue = {
  region: string;
  setRegion: (region: string) => void;
  currency: "GBP" | "EUR";
};

const Context = createContext<EnergyMarketContextValue | null>(null);

export function EnergyMarketProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState("FI");
  const value = useMemo(() => ({ region, setRegion, currency: region === "GB" ? "GBP" as const : "EUR" as const }), [region]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useEnergyMarket() {
  const context = useContext(Context);
  if (!context) throw new Error("EnergyMarketProvider is missing");
  return context;
}

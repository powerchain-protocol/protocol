import type { EnergyProject, LocalEnergyMarket } from "@/types/energy-market";

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`Energy API request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export const energyMarketService = {
  listMarkets: () => getJson<{ markets: LocalEnergyMarket[] }>("/api/energy/markets"),
  listProjects: () => getJson<{ projects: EnergyProject[] }>("/api/energy/projects"),
  route: async (requestedKwh: number) => {
    const response = await fetch("/api/energy/route", { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({ requestedKwh }) });
    if (!response.ok) throw new Error("Unable to calculate energy route");
    return response.json();
  },
};

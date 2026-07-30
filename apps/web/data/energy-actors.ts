
import type { EnergyActor } from "@/types/energy-actors";

export const ENERGY_ACTORS: EnergyActor[] = [
  {
    id: "actor_prosumer_001",
    userId: "usr_001",
    role: "prosumer",
    displayName: "Oulu Solar Household",
    municipality: "Oulu",
    walletAddress: "PWRCRXXZxbg6FdQZfK3PMD7KP8xfxs9acvifJiG46wc",
    meterIds: ["meter_oulu_001"],
    annualConsumptionKwh: 12600,
    annualProductionKwh: 18400,
    status: "active"
  },
  {
    id: "actor_consumer_001",
    userId: "usr_002",
    role: "consumer",
    displayName: "Helsinki Mobility Hub",
    municipality: "Helsinki",
    meterIds: ["meter_hki_014"],
    annualConsumptionKwh: 245000,
    annualProductionKwh: 0,
    status: "active"
  }
];

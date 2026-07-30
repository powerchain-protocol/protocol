
export type EnergyActorRole = "prosumer" | "consumer" | "operator";

export type EnergyActor = {
  id: string;
  userId: string;
  role: EnergyActorRole;
  displayName: string;
  municipality: string;
  walletAddress?: string;
  meterIds: string[];
  annualConsumptionKwh: number;
  annualProductionKwh: number;
  status: "active" | "pending" | "suspended";
};

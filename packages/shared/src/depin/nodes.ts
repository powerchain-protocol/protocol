
export type DepinNode = {
  id: string;
  ownerWallet: string;
  location: { latitude: number; longitude: number; region: string };
  capabilities: string[];
  uptimePercent: number;
  rewardsAccrued: string;
  status: "active" | "inactive" | "slashed" | "maintenance";
};

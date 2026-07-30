
export type CarbonProject = {
  id: string;
  slug: string;
  name: string;
  location: string;
  standard: "PCC" | "VCS" | "Gold Standard";
  issuedCredits: number;
  availableCredits: number;
  retiredCredits: number;
  pricePerCreditEur: number;
  verificationRate: number;
  status: "verified" | "issuing" | "sold-out" | "retired";
  operator: string;
  image: string;
  tokenMint?: string;
};

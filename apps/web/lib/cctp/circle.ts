
export type CctpDomain = 0 | 1 | 2 | 3 | 6 | 7;

export const CCTP_DOMAINS = {
  ethereum: 0,
  avalanche: 1,
  optimism: 2,
  arbitrum: 3,
  base: 6,
  solana: 5
} as const;

export function buildCctpTransfer(input: {
  sourceDomain: number;
  destinationDomain: number;
  amountBaseUnits: bigint;
  mintRecipient: string;
}) {
  if (input.amountBaseUnits <= 0n) throw new Error("CCTP amount must be positive");
  return {
    id: crypto.randomUUID(),
    protocol: "circle-cctp",
    type: "burn-and-mint",
    ...input,
    amountBaseUnits: input.amountBaseUnits.toString(),
    status: "awaiting_signature"
  };
}

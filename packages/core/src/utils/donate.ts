export interface DonationRequest {
  campaignId: string;
  donor: string;
  amountBaseUnits: bigint;
  memo?: string;
}

export interface DonationPolicy {
  minimumBaseUnits: bigint;
  maximumBaseUnits?: bigint;
  maxMemoLength?: number;
}

export function validateDonation(request: DonationRequest, policy: DonationPolicy): DonationRequest {
  if (!request.campaignId.trim()) throw new Error("Campaign ID is required");
  if (!request.donor.trim()) throw new Error("Donor address is required");
  if (request.amountBaseUnits < policy.minimumBaseUnits) throw new RangeError("Donation is below the minimum amount");
  if (policy.maximumBaseUnits !== undefined && request.amountBaseUnits > policy.maximumBaseUnits) throw new RangeError("Donation exceeds the maximum amount");
  if (request.memo && request.memo.length > (policy.maxMemoLength ?? 280)) throw new RangeError("Donation memo is too long");
  return { ...request, campaignId: request.campaignId.trim(), donor: request.donor.trim(), memo: request.memo?.trim() || undefined };
}

export function createDonationReference(campaignId: string, donor: string, nonce: string): string {
  const value = `${campaignId.trim()}:${donor.trim()}:${nonce.trim()}`;
  if (value.includes("::")) throw new Error("Donation reference fields cannot be empty");
  return value;
}


export type X402PaymentRequirement = {
  scheme: "exact";
  network: string;
  maxAmountRequired: string;
  resource: string;
  description: string;
  mimeType: string;
  payTo: string;
  maxTimeoutSeconds: number;
  asset: string;
  extra?: Record<string, unknown>;
};

export function createX402Requirement(input: Omit<X402PaymentRequirement, "scheme">): X402PaymentRequirement {
  if (BigInt(input.maxAmountRequired) <= 0n) throw new Error("x402 amount must be positive");
  return { scheme: "exact", ...input };
}

export function x402Response(requirement: X402PaymentRequirement) {
  return Response.json(
    { error: "Payment Required", accepts: [requirement] },
    {
      status: 402,
      headers: {
        "cache-control": "no-store",
        "x-powerchain-payment-version": "1"
      }
    }
  );
}


export type MpcPolicy = {
  organizationId: string;
  requiredApprovals: number;
  spendingLimitBaseUnits: string;
  allowedPrograms: string[];
};

export function validateMpcOperation(input: {
  policy: MpcPolicy;
  amountBaseUnits: bigint;
  programId: string;
  approvalCount: number;
}) {
  if (input.amountBaseUnits > BigInt(input.policy.spendingLimitBaseUnits)) {
    throw new Error("MPC spending limit exceeded");
  }
  if (!input.policy.allowedPrograms.includes(input.programId)) {
    throw new Error("Program is not approved by MPC policy");
  }
  if (input.approvalCount < input.policy.requiredApprovals) {
    throw new Error("Additional MPC approvals are required");
  }
  return true;
}

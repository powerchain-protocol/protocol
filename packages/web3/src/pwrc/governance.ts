export const PIP_STAGES = [
  "proposal",
  "technical-review",
  "community-discussion",
  "voting",
  "quorum-validation",
  "timelock",
  "execution",
] as const;

export type PipStage = (typeof PIP_STAGES)[number];
export type GovernanceParameter =
  | "protocol-upgrade"
  | "treasury-parameters"
  | "fee-configuration"
  | "bridge-parameters"
  | "security-policy";

export interface GovernancePolicy {
  readonly quorumBasisPoints: number;
  readonly approvalBasisPoints: number;
  readonly votingPeriodSeconds: number;
  readonly timelockSeconds: number;
  readonly emergencyCouncilThreshold: number;
}

export const DEFAULT_GOVERNANCE_POLICY: GovernancePolicy = {
  quorumBasisPoints: 2_000,
  approvalBasisPoints: 5_001,
  votingPeriodSeconds: 7 * 24 * 60 * 60,
  timelockSeconds: 48 * 60 * 60,
  emergencyCouncilThreshold: 3,
};

export function validateGovernancePolicy(policy: GovernancePolicy): void {
  if (policy.quorumBasisPoints < 0 || policy.quorumBasisPoints > 10_000) {
    throw new RangeError("Governance quorum must be between 0 and 10,000 basis points");
  }
  if (policy.approvalBasisPoints <= 5_000 || policy.approvalBasisPoints > 10_000) {
    throw new RangeError("Governance approval must be a strict majority");
  }
  if (policy.votingPeriodSeconds <= 0 || policy.timelockSeconds < 0) {
    throw new RangeError("Governance timing values are invalid");
  }
  if (!Number.isInteger(policy.emergencyCouncilThreshold) || policy.emergencyCouncilThreshold < 2) {
    throw new RangeError("Emergency council threshold must be at least two signers");
  }
}

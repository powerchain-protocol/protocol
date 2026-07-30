export interface SquadsMultisigPolicy {
  readonly members: readonly string[];
  readonly threshold: number;
  readonly transactionIndex?: bigint;
}

export function validateSquadsPolicy(policy: SquadsMultisigPolicy): void {
  const members = policy.members.map((member) => member.trim());
  if (members.some((member) => !member)) throw new TypeError("Squads members cannot be empty");
  if (new Set(members).size !== members.length) throw new RangeError("Squads members must be unique");
  if (!Number.isInteger(policy.threshold) || policy.threshold < 1 || policy.threshold > members.length) {
    throw new RangeError("Squads threshold must be between one and the member count");
  }
  if (policy.transactionIndex !== undefined && policy.transactionIndex < 0n) {
    throw new RangeError("Squads transaction index cannot be negative");
  }
}

export function hasSquadsApproval(policy: SquadsMultisigPolicy, approvedMembers: readonly string[]): boolean {
  validateSquadsPolicy(policy);
  const members = new Set(policy.members);
  const uniqueApprovals = new Set(approvedMembers.filter((member) => members.has(member)));
  return uniqueApprovals.size >= policy.threshold;
}

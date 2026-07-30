import { mulDiv } from "./amounts.js";

export interface QuorumInput {
  readonly eligibleVotingPower: bigint;
  readonly participatingVotingPower: bigint;
  readonly votesFor: bigint;
  readonly votesAgainst: bigint;
  readonly abstainedVotes?: bigint;
  readonly quorumBasisPoints: number;
  readonly approvalBasisPoints: number;
}
export interface QuorumResult {
  readonly quorumRequired: bigint;
  readonly quorumReached: boolean;
  readonly decisiveVotes: bigint;
  readonly approvalReached: boolean;
  readonly passed: boolean;
}

export function evaluateQuorum(input: QuorumInput): QuorumResult {
  for (const [name, value] of Object.entries(input)) {
    if (typeof value === "bigint" && value < 0n) throw new RangeError(`${name} cannot be negative`);
  }
  if (input.participatingVotingPower > input.eligibleVotingPower) throw new RangeError("Participation exceeds eligible voting power");
  if (input.votesFor + input.votesAgainst + (input.abstainedVotes ?? 0n) > input.participatingVotingPower) {
    throw new RangeError("Recorded votes exceed participating voting power");
  }
  if (![input.quorumBasisPoints, input.approvalBasisPoints].every((v) => Number.isInteger(v) && v >= 0 && v <= 10_000)) {
    throw new RangeError("Governance thresholds must be valid basis points");
  }
  const quorumRequired = mulDiv(input.eligibleVotingPower, BigInt(input.quorumBasisPoints), 10_000n, "up");
  const decisiveVotes = input.votesFor + input.votesAgainst;
  const approvalRequired = decisiveVotes === 0n ? 1n : mulDiv(decisiveVotes, BigInt(input.approvalBasisPoints), 10_000n, "up");
  const quorumReached = input.participatingVotingPower >= quorumRequired;
  const approvalReached = decisiveVotes > 0n && input.votesFor >= approvalRequired;
  return { quorumRequired, quorumReached, decisiveVotes, approvalReached, passed: quorumReached && approvalReached };
}

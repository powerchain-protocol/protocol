import { calculateBasisPoints } from "./calculations.js";
import { PWRC_QUARTERLY_BURN_BASIS_POINTS, assertValidSupply } from "./specification.js";

export interface BurnProposal {
  readonly circulatingSupplyBaseUnits: bigint;
  readonly treasuryBurnableBalanceBaseUnits: bigint;
  readonly alreadyBurnedThisQuarterBaseUnits?: bigint;
  readonly approvedByGovernance: boolean;
  readonly timelockExpired?: boolean;
  readonly paused?: boolean;
  readonly multisigApprovals: number;
  readonly requiredMultisigApprovals: number;
}

export function calculateQuarterlyBurn(proposal: BurnProposal): bigint {
  assertValidSupply(proposal.circulatingSupplyBaseUnits);
  if (!proposal.approvedByGovernance) throw new Error("Burn requires governance approval");
  if (proposal.timelockExpired === false) throw new Error("Burn timelock has not expired");
  if (proposal.paused) throw new Error("Burn execution is paused");
  if (!Number.isInteger(proposal.multisigApprovals) || !Number.isInteger(proposal.requiredMultisigApprovals) || proposal.requiredMultisigApprovals < 1) {
    throw new RangeError("Burn multisig values are invalid");
  }
  if (proposal.multisigApprovals < proposal.requiredMultisigApprovals) throw new Error("Burn requires the configured multisig threshold");
  if (proposal.treasuryBurnableBalanceBaseUnits < 0n) throw new RangeError("Burnable treasury balance cannot be negative");
  const quarterCap = calculateBasisPoints(proposal.circulatingSupplyBaseUnits, PWRC_QUARTERLY_BURN_BASIS_POINTS, "down");
  const alreadyBurned = proposal.alreadyBurnedThisQuarterBaseUnits ?? 0n;
  if (alreadyBurned < 0n || alreadyBurned > quarterCap) throw new RangeError("Already-burned amount exceeds the quarterly cap");
  const remainingQuarterCap = quarterCap - alreadyBurned;
  return remainingQuarterCap <= proposal.treasuryBurnableBalanceBaseUnits ? remainingQuarterCap : proposal.treasuryBurnableBalanceBaseUnits;
}

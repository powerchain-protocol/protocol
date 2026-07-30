"use client";

import { formatDecimalAmount, PWRC_DECIMALS, type VestingSchedule } from "@powerchain/web3/pwrc";
import { useVesting } from "../../hooks/use-vesting";

export function Vesting({ schedule, now }: { schedule: VestingSchedule; now?: number }) {
  const state = useVesting(schedule, now);
  if (!state) return null;
  const format = (value: bigint) => `${formatDecimalAmount(value, PWRC_DECIMALS)} PWRC`;
  return (
    <section aria-labelledby="vesting-heading">
      <h2 id="vesting-heading">PWRC vesting</h2>
      <progress max={10_000} value={state.progressBasisPoints} aria-label="Vesting progress" />
      <dl>
        <div><dt>Vested</dt><dd>{format(state.vestedAmountBaseUnits)}</dd></div>
        <div><dt>Available</dt><dd>{format(state.releasableAmountBaseUnits)}</dd></div>
        <div><dt>Unvested</dt><dd>{format(state.unvestedAmountBaseUnits)}</dd></div>
      </dl>
    </section>
  );
}

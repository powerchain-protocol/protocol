import { mulDiv } from "./amounts.js";

export interface VestingSchedule {
  readonly totalAmountBaseUnits: bigint;
  readonly startTimestampSeconds: bigint;
  readonly cliffTimestampSeconds: bigint;
  readonly endTimestampSeconds: bigint;
  readonly releasedAmountBaseUnits: bigint;
}
export interface VestingState {
  readonly vestedAmountBaseUnits: bigint;
  readonly releasableAmountBaseUnits: bigint;
  readonly unvestedAmountBaseUnits: bigint;
  readonly progressBasisPoints: number;
}

export function calculateVesting(schedule: VestingSchedule, nowTimestampSeconds: bigint): VestingState {
  if (schedule.totalAmountBaseUnits < 0n || schedule.releasedAmountBaseUnits < 0n) throw new RangeError("Vesting amounts cannot be negative");
  if (schedule.releasedAmountBaseUnits > schedule.totalAmountBaseUnits) throw new RangeError("Released amount exceeds total vesting amount");
  if (schedule.startTimestampSeconds > schedule.cliffTimestampSeconds || schedule.cliffTimestampSeconds > schedule.endTimestampSeconds) {
    throw new RangeError("Vesting timestamps are not ordered");
  }
  let vestedAmountBaseUnits = 0n;
  if (nowTimestampSeconds >= schedule.endTimestampSeconds) vestedAmountBaseUnits = schedule.totalAmountBaseUnits;
  else if (nowTimestampSeconds >= schedule.cliffTimestampSeconds) {
    const elapsed = nowTimestampSeconds - schedule.startTimestampSeconds;
    const duration = schedule.endTimestampSeconds - schedule.startTimestampSeconds;
    vestedAmountBaseUnits = duration === 0n ? schedule.totalAmountBaseUnits : mulDiv(schedule.totalAmountBaseUnits, elapsed, duration, "down");
  }
  const releasableAmountBaseUnits = vestedAmountBaseUnits > schedule.releasedAmountBaseUnits
    ? vestedAmountBaseUnits - schedule.releasedAmountBaseUnits : 0n;
  const unvestedAmountBaseUnits = schedule.totalAmountBaseUnits - vestedAmountBaseUnits;
  const progressBasisPoints = schedule.totalAmountBaseUnits === 0n ? 10_000 : Number(mulDiv(vestedAmountBaseUnits, 10_000n, schedule.totalAmountBaseUnits, "down"));
  return { vestedAmountBaseUnits, releasableAmountBaseUnits, unvestedAmountBaseUnits, progressBasisPoints };
}

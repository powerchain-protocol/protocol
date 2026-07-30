"use client";

import { useMemo } from "react";
import { calculateVesting, type VestingSchedule } from "@powerchain/web3/pwrc";

export function useVesting(schedule: VestingSchedule | null, now = Date.now()) {
  return useMemo(() => {
    if (!schedule) return null;
    return calculateVesting(schedule, BigInt(Math.floor(now / 1000)));
  }, [schedule, now]);
}

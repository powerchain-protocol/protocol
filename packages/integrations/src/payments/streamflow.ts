
export type StreamflowSchedule = {
  recipient: string;
  mint: string;
  amountBaseUnits: bigint;
  startAt: number;
  cliffAt?: number;
  endAt: number;
};

export function validateStreamflowSchedule(schedule: StreamflowSchedule) {
  if (schedule.amountBaseUnits <= 0n) throw new Error("Stream amount must be positive");
  if (schedule.endAt <= schedule.startAt) throw new Error("End time must be after start time");
  if (schedule.cliffAt && schedule.cliffAt < schedule.startAt) throw new Error("Cliff cannot precede start");
  return schedule;
}


export type DeviceTelemetry<T = Record<string, number | string | boolean>> = {
  deviceId: string;
  sequence: number;
  recordedAt: string;
  payload: T;
  signature?: string;
};


export type SmartMeter = {
  id: string;
  actorId: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  protocol: "DLMS" | "Modbus" | "MQTT" | "IEC-62056";
  status: "online" | "offline" | "degraded";
  lastReadingKwh: number;
  lastSeenAt: string;
  firmwareVersion: string;
  signedTelemetry: boolean;
};

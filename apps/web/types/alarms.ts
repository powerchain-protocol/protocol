
export type AlarmSeverity = "info" | "warning" | "critical";

export type PlatformAlarm = {
  id: string;
  title: string;
  description: string;
  severity: AlarmSeverity;
  source: "grid" | "device" | "wallet" | "market" | "security" | "ai";
  acknowledged: boolean;
  createdAt: string;
  actionHref?: string;
};

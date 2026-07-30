
import type { AnalyticsMetric, AnalyticsSeries } from "@/types/analytics";

export const ANALYTICS_METRICS: AnalyticsMetric[] = [
  { id: "metric_energy", label: "Energy traded", value: 8720, unit: "MWh", changePercent: 18.23 },
  { id: "metric_revenue", label: "Settlement volume", value: 3240000, unit: "EUR", changePercent: 12.45 },
  { id: "metric_carbon", label: "Carbon retired", value: 1240000, unit: "tCO₂e", changePercent: 22.11 },
  { id: "metric_devices", label: "Online devices", value: 1284, unit: "devices", changePercent: 3.4 }
];

export const ANALYTICS_SERIES: AnalyticsSeries[] = [
  {
    id: "series_energy",
    name: "Energy traded",
    points: [820, 860, 910, 890, 960, 1020, 1080, 1130].map((value, index) => ({
      id: `energy_${index}`,
      label: `D${index + 1}`,
      value
    }))
  }
];

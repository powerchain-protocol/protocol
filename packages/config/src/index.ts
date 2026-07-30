
export const platformConfig = {
  name: "Powerchain",
  locale: "fi-FI",
  currency: "GBP",
  urls: {
    web: process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3000",
    dashboard: process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3001",
    api: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1"
  },
  features: {
    walletConnect: true,
    newsletter: true,
    liveDashboard: true
  },
  telemetry: {
    nextJsEnabled: process.env.NEXT_TELEMETRY_DISABLED !== "1"
  }
} as const;

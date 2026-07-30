
export const siteConfig = {
  name: "Powerchain",
  description: "The infrastructure layer for renewable energy markets.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1",
  dashboardUrl: process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3001",
  locale: "fi-FI",
  currency: "EUR",
  social: {
    github: "https://github.com/powerchain-protocol",
    discord: "https://discord.com",
    linkedin: "https://linkedin.com"
  }
} as const;

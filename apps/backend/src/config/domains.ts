
export const domainConfig = {
  apiUrl: process.env.PUBLIC_API_URL ?? "https://api.powerchain.energy",
  docsUrl: process.env.PUBLIC_DOCS_URL ?? "https://docs.powerchain.energy",
  corsOrigins: (
    process.env.CORS_ORIGIN ??
    "https://powerchain.energy,https://dashboard.powerchain.energy,https://checkout.powerchain.energy,https://docs.powerchain.energy,http://localhost:3000,http://localhost:3001"
  ).split(",").map((origin) => origin.trim()).filter(Boolean),
  trustedHosts: (
    process.env.TRUSTED_HOSTS ?? "api.powerchain.energy,localhost,127.0.0.1"
  ).split(",").map((host) => host.trim()).filter(Boolean)
} as const;

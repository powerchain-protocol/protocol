
function enabled(value: string | undefined, fallback = false) {
  if (value === undefined) return fallback;
  return value === "true";
}

export const featureFlags = {
  ai: enabled(process.env.NEXT_PUBLIC_ENABLE_AI, true),
  swap: enabled(process.env.NEXT_PUBLIC_ENABLE_SWAP, true),
  bridge: enabled(process.env.NEXT_PUBLIC_ENABLE_BRIDGE, true),
  pwa: enabled(process.env.NEXT_PUBLIC_ENABLE_PWA, true),
  developerPortal: enabled(process.env.NEXT_PUBLIC_ENABLE_DEVELOPER_PORTAL, true),
  telemetry: enabled(process.env.NEXT_PUBLIC_ENABLE_TELEMETRY, false)
} as const;

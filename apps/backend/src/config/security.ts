
export const securityConfig = {
  rateLimit: {
    global: 300,
    authenticated: 600,
    window: "1 minute"
  },
  headers: {
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy": "camera=(), microphone=(), geolocation=()"
  }
} as const;

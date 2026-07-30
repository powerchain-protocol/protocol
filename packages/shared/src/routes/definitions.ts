
export const API_ROUTES = {
  health: "/health",
  portfolio: "/portfolio",
  markets: "/markets",
  transactions: "/transactions",
  devices: "/iot/devices",
  depinNodes: "/depin/nodes",
  energyMarkets: "/energy/markets",
  tradeOrders: "/trade/orders",
  x402Config: "/payments/x402/config"
} as const;

export type ApiRouteName = keyof typeof API_ROUTES;


export const primaryRoutes = [
  { id: "overview", label: "Overview", href: "/" },
  { id: "developers", label: "Developers", href: "/developers" },
  { id: "energy", label: "Energy", href: "/energy" },
  { id: "trade", label: "Trade", href: "/trade" },
  { id: "wallet", label: "Wallet", href: "/wallet" }
] as const;

export const productRoutes = [
  { id: "swap", label: "Swap", href: "/swap" },
  { id: "bridge", label: "Bridge", href: "/bridge" },
  { id: "devices", label: "Devices", href: "/devices" },
  { id: "depin", label: "DePIN", href: "/depin" },
  { id: "checkout", label: "Payments", href: "/checkout" }
] as const;

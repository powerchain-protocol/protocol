export type Product = { id: string; slug: string; name: string; category: "meter" | "gateway" | "sensor" | "inverter" | "renewable-kit"; priceEur: number; inventory: number; compatibleNetworks: string[]; };
export const products: Product[] = [
  { id: "product-sm-pro", slug: "smart-meter-pro", name: "PowerChain Smart Meter Pro", category: "meter", priceEur: 249, inventory: 184, compatibleNetworks: ["LoRaWAN", "MQTT", "Modbus"] },
  { id: "product-lora-gateway", slug: "lorawan-energy-gateway", name: "LoRaWAN Energy Gateway", category: "gateway", priceEur: 589, inventory: 62, compatibleNetworks: ["LoRaWAN", "Ethernet", "LTE"] },
  { id: "product-solar-kit", slug: "community-solar-kit", name: "Community Solar Monitoring Kit", category: "renewable-kit", priceEur: 1290, inventory: 28, compatibleNetworks: ["Solana", "Sui", "Helius"] },
];

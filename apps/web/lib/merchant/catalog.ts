import type{EnergyDevice,EnergyProduct,P2PEnergyOffer,CarbonCredit}from"@powerchain/energy-iot";
export const products:EnergyProduct[]=[
{id:"sm-100",sku:"SM-LORA-100",name:"PowerChain LoRaWAN Smart Meter",category:"device",price:249,currency:"USDC",inventory:84},
{id:"gw-8",sku:"GW-LORA-8",name:"8-channel LoRaWAN Gateway",category:"hardware",price:699,currency:"USDC",inventory:21},
{id:"solar-5",sku:"SOLAR-5KW",name:"5 kW Solar Generation Kit",category:"renewable",price:6400,currency:"USDC",inventory:12},
{id:"carbon-1",sku:"CCT-2026",name:"Verified Carbon Credit — 1 tCO₂e",category:"carbon",price:18.5,currency:"USDC",inventory:5000}];
export const devices:EnergyDevice[]=[{id:"meter-helsinki-01",merchantId:"merchant-demo",name:"Warehouse smart meter",kind:"smart-meter",status:"online",serialNumber:"PCSM-001928",firmware:"1.4.2",lastSeenAt:"2026-07-30T07:00:00Z"},{id:"gateway-turku-02",merchantId:"merchant-demo",name:"Turku LoRaWAN gateway",kind:"lorawan-gateway",status:"online",serialNumber:"PCLG-00982",firmware:"2.1.0",lastSeenAt:"2026-07-30T07:00:00Z"}];
export const offers:P2PEnergyOffer[]=[{id:"offer-001",sellerWallet:"8F7...Pwrc",region:"FI-Uusimaa",energyKwh:1250,unitPrice:.084,currency:"USDC",source:"solar",status:"open"}];
export const carbonCredits:CarbonCredit[]=[{id:"credit-001",project:"Nordic Forest Restoration",vintage:2025,tonnes:1200,standard:"Verra VCS",status:"listed"}];

export const rwaAssets = [
  {id:"rwa-solar-helsinki",symbol:"SOL-HKI",name:"Helsinki Community Solar Output",assetClass:"renewable",status:"listed",issuer:"PowerChain Energy Cooperative",region:"FI-Uusimaa",unit:"kWh",availableUnits:24000,price:.091,currency:"USDC",verifiedAt:"2026-07-30T07:00:00Z",attributes:{technology:"solar",metered:true}},
  {id:"rwa-p2p-turku",symbol:"P2P-TKU",name:"Turku Local Grid Energy",assetClass:"energy",status:"trading",issuer:"Turku Microgrid",region:"FI-Varsinais-Suomi",unit:"kWh",availableUnits:9800,price:.086,currency:"USDC",verifiedAt:"2026-07-30T07:00:00Z",attributes:{source:"mixed-renewable",settlement:"hourly"}},
  {id:"rwa-carbon-nordic",symbol:"CCT-NORD",name:"Nordic Forest Carbon Credit",assetClass:"carbon",status:"listed",issuer:"Nordic Forest Restoration",region:"Nordics",unit:"tCO2e",availableUnits:1200,price:18.5,currency:"USDC",verifiedAt:"2026-07-01T00:00:00Z",attributes:{standard:"Verra VCS",vintage:2025}},
  {id:"rwa-meter-fleet",symbol:"METER-FLT",name:"LoRaWAN Smart Meter Fleet",assetClass:"hardware",status:"listed",issuer:"PowerChain Devices",region:"EU",unit:"unit",availableUnits:84,price:249,currency:"USDC",attributes:{connectivity:"LoRaWAN",depin:true}}
] as const satisfies import("@powerchain/energy-iot").RwaAsset[];

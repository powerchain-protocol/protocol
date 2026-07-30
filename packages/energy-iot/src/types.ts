export type DeviceKind="smart-meter"|"lorawan-gateway"|"iot-sensor"|"solar-inverter"|"battery-controller";
export type RenewableKind="solar"|"wind"|"battery"|"hydrogen"|"hydro";
export interface EnergyDevice{id:string;merchantId:string;name:string;kind:DeviceKind;status:"online"|"offline"|"maintenance";serialNumber:string;firmware:string;lastSeenAt:string}
export interface MeterReading{deviceId:string;importedKwh:number;exportedKwh:number;voltage:number;powerKw:number;recordedAt:string}
export interface EnergyProduct{id:string;sku:string;name:string;category:"device"|"hardware"|"renewable"|"carbon";price:number;currency:"USD"|"USDC"|"PWRC";inventory:number}
export interface P2PEnergyOffer{id:string;sellerWallet:string;region:string;energyKwh:number;unitPrice:number;currency:"USDC"|"PWRC";source:RenewableKind;status:"open"|"matched"|"settled"|"cancelled"}
export interface CarbonCredit{id:string;project:string;vintage:number;tonnes:number;standard:string;status:"issued"|"listed"|"retired";tokenMint?:string}

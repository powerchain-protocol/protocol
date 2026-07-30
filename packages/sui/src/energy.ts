import { Transaction } from "@mysten/sui/transactions";
export function buildEnergySettlement(input: { packageId: string; adminId: string; seller: string; meterId: Uint8Array; wattHours: bigint; unitPriceMicros: bigint; renewable: boolean }) {
  const tx = new Transaction();
  tx.moveCall({ target: `${input.packageId}::energy_market::settle`, arguments: [tx.object(input.adminId), tx.pure.address(input.seller), tx.pure.vector("u8", [...input.meterId]), tx.pure.u64(input.wattHours), tx.pure.u64(input.unitPriceMicros), tx.pure.bool(input.renewable)] });
  return tx;
}

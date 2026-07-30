import { z } from "zod";
export * from "./networks";

export const BPS_DENOMINATOR = 10_000n;
export const protocolAmount = z.bigint().nonnegative();
export const address = z.string().min(32).max(128);

export function feeFromBps(amount: bigint, bps: number): bigint {
  if (amount < 0n || !Number.isInteger(bps) || bps < 0 || bps > 10_000) throw new RangeError("Invalid amount or basis points");
  return (amount * BigInt(bps) + BPS_DENOMINATOR - 1n) / BPS_DENOMINATOR;
}

export interface ProgramAddresses {
  token?: string; swap?: string; bridge?: string; checkout?: string;
  payments?: string; escrow?: string; crowdfunding?: string;
}

export function getProgramAddresses(): ProgramAddresses {
  return {
    token: process.env.NEXT_PUBLIC_POWERCHAIN_TOKEN_PROGRAM_ID,
    swap: process.env.NEXT_PUBLIC_POWERCHAIN_SWAP_PROGRAM_ID,
    bridge: process.env.NEXT_PUBLIC_POWERCHAIN_BRIDGE_PROGRAM_ID,
    checkout: process.env.NEXT_PUBLIC_POWERCHAIN_CHECKOUT_PROGRAM_ID,
    payments: process.env.NEXT_PUBLIC_POWERCHAIN_PAYMENTS_PROGRAM_ID,
    escrow: process.env.NEXT_PUBLIC_POWERCHAIN_ESCROW_PROGRAM_ID,
    crowdfunding: process.env.NEXT_PUBLIC_POWERCHAIN_CROWDFUNDING_PROGRAM_ID
  };
}

export type ProtocolOperation = "swap"|"bridge"|"checkout"|"payment"|"escrow"|"crowdfunding";
export interface OperationQuote { operation: ProtocolOperation; inputAmount: bigint; feeAmount: bigint; outputAmount: bigint; expiresAt: string; }
export function createQuote(operation: ProtocolOperation, inputAmount: bigint, feeBps: number, ttlSeconds=60): OperationQuote {
  const feeAmount=feeFromBps(inputAmount,feeBps);
  return {operation,inputAmount,feeAmount,outputAmount:inputAmount-feeAmount,expiresAt:new Date(Date.now()+ttlSeconds*1000).toISOString()};
}
export * from "./zk-snark/index";

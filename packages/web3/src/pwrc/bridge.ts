export type BridgeChain = "solana" | "sui";
export type BridgeTransferStatus = "locked" | "verified" | "minted" | "released" | "rejected";

export interface BridgeTransfer {
  readonly transferId: string;
  readonly sourceChain: BridgeChain;
  readonly destinationChain: BridgeChain;
  readonly sourceTransaction: string;
  readonly sender: string;
  readonly recipient: string;
  readonly amount: bigint;
  readonly nonce: bigint;
  readonly status: BridgeTransferStatus;
}

export interface BridgeAccounting {
  readonly lockedPwrc: bigint;
  readonly mintedWrappedPwrc: bigint;
}

export function assertBridgeCollateralized(accounting: BridgeAccounting): void {
  if (accounting.lockedPwrc < 0n || accounting.mintedWrappedPwrc < 0n) {
    throw new RangeError("Bridge accounting cannot contain negative balances");
  }
  if (accounting.mintedWrappedPwrc > accounting.lockedPwrc) {
    throw new Error("Bridge is undercollateralized");
  }
}

export function replayKey(transfer: Pick<BridgeTransfer, "sourceChain" | "sourceTransaction" | "nonce">): string {
  if (!transfer.sourceTransaction) throw new TypeError("Source transaction is required");
  if (transfer.nonce < 0n) throw new RangeError("Bridge nonce cannot be negative");
  return `${transfer.sourceChain}:${transfer.sourceTransaction}:${transfer.nonce.toString()}`;
}

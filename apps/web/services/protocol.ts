import { createQuote, type ProtocolOperation } from "@powerchain/protocol";
export const DEFAULT_FEES: Record<ProtocolOperation,number>={swap:30,bridge:50,checkout:20,payment:20,escrow:35,crowdfunding:25};
export function quoteProtocolOperation(operation:ProtocolOperation,amount:bigint){return createQuote(operation,amount,DEFAULT_FEES[operation]);}

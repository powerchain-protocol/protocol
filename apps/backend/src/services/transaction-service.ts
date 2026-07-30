
import type {BlockchainTransaction} from "@powerchain/blockchain";
export class TransactionService {
 create(input:Omit<BlockchainTransaction,"id"|"status"|"createdAt">):BlockchainTransaction{return {id:`tx_${crypto.randomUUID().slice(0,8)}`,...input,status:"created",createdAt:new Date().toISOString()}}
}

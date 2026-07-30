
export type PaymentRail="card"|"solana-pay"|"usdc"|"pwrc"|"x402"|"cctp";
export type PaymentStatus="created"|"requires-action"|"submitted"|"confirmed"|"failed"|"refunded";
export type PaymentIntent={id:string;rail:PaymentRail;amountUsd:number;currency:"USD";status:PaymentStatus;walletAddress?:string;transactionId?:string;createdAt:string};
export type TransactionRecord={id:string;type:"payment"|"swap"|"bridge"|"refund"|"subscription";network:"solana"|"sui"|"offchain";asset:string;amount:string;status:PaymentStatus;createdAt:string;explorerUrl?:string};

use anchor_lang::prelude::*;
#[account]
pub struct ProtocolConfig { pub authority: Pubkey, pub treasury: Pubkey, pub fee_bps: u16, pub bump: u8 }
#[account]
pub struct BridgeReceipt { pub sender: Pubkey, pub amount: u64, pub nonce: u64, pub destination_chain: u16, pub processed: bool }
#[account]
pub struct Escrow { pub buyer: Pubkey, pub seller: Pubkey, pub mint: Pubkey, pub amount: u64, pub deadline: i64, pub state: u8, pub bump: u8 }
#[account]
pub struct Campaign { pub creator: Pubkey, pub mint: Pubkey, pub goal: u64, pub raised: u64, pub deadline: i64, pub bump: u8 }

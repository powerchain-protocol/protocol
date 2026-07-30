use anchor_lang::prelude::*;
use crate::errors::PowerchainError;
pub const DEVNET_FAUCET_MAX_BASE_UNITS:u64=10_000_000_000_000;
pub fn validate_devnet_claim(amount:u64,last_claim:i64,now:i64)->Result<()> {require!(amount>0 && amount<=DEVNET_FAUCET_MAX_BASE_UNITS,PowerchainError::InvalidAmount);require!(now.saturating_sub(last_claim)>=86_400,PowerchainError::Unauthorized);Ok(())}

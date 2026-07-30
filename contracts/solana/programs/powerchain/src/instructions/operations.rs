use anchor_lang::prelude::*;
use crate::errors::PowerchainError;

pub fn checked_fee(amount:u64,fee_bps:u16)->Result<u64>{
 require!(amount>0,PowerchainError::InvalidAmount);
 let numerator=(amount as u128).checked_mul(fee_bps as u128).ok_or(PowerchainError::ArithmeticOverflow)?;
 let fee=numerator.checked_add(9_999).ok_or(PowerchainError::ArithmeticOverflow)?/10_000;
 u64::try_from(fee).map_err(|_| error!(PowerchainError::ArithmeticOverflow))
}

#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct SwapArgs { pub amount_in:u64, pub minimum_out:u64, pub fee_bps:u16 }
pub fn swap(args:SwapArgs)->Result<u64>{let fee=checked_fee(args.amount_in,args.fee_bps)?;let out=args.amount_in.checked_sub(fee).ok_or(PowerchainError::ArithmeticOverflow)?;require!(out>=args.minimum_out,PowerchainError::SlippageExceeded);Ok(out)}

#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct BridgeArgs { pub amount:u64, pub nonce:u64, pub destination_chain:u16 }
pub fn bridge(args:BridgeArgs)->Result<()> {require!(args.amount>0,PowerchainError::InvalidAmount);require!(args.nonce>0,PowerchainError::ReplayDetected);Ok(())}

#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct PaymentArgs { pub amount:u64, pub reference:[u8;32] }
pub fn payment(args:PaymentArgs)->Result<()> {require!(args.amount>0,PowerchainError::InvalidAmount);Ok(())}

#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct EscrowArgs { pub amount:u64, pub deadline:i64 }
pub fn escrow(args:EscrowArgs)->Result<()> {require!(args.amount>0,PowerchainError::InvalidAmount);require!(args.deadline>Clock::get()?.unix_timestamp,PowerchainError::InvalidEscrowState);Ok(())}

#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct CampaignArgs { pub goal:u64, pub deadline:i64 }
pub fn crowdfunding(args:CampaignArgs)->Result<()> {require!(args.goal>0,PowerchainError::InvalidAmount);require!(args.deadline>Clock::get()?.unix_timestamp,PowerchainError::CampaignClosed);Ok(())}

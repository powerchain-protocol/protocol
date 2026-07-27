//! PowerChain PWRC Token-2022 Protocol™
//!
//! Transfer Fee Distribution Module
//!
//! Handles:
//! - Token-2022 withheld fee accounting
//! - Treasury allocation
//! - Staking reward allocation
//! - Governance-controlled fee parameters
//!
//! Default configuration:
//!
//! Transfer Fee:
//!     200 bps (2%)
//!
//! Distribution:
//!
//! Treasury:
//!     70%
//!
//! Staking:
//!     30%


use anchor_lang::prelude::*;





// =====================================================
// CONSTANTS
// =====================================================


/// Maximum transfer fee
pub const MAX_TRANSFER_FEE_BPS:u16 = 1000;



/// Default protocol fee
pub const DEFAULT_TRANSFER_FEE_BPS:u16 = 200;



/// Treasury allocation
pub const DEFAULT_TREASURY_SHARE_BPS:u16 = 7000;



/// Staking allocation
pub const DEFAULT_STAKING_SHARE_BPS:u16 = 3000;





// =====================================================
// FEE CONFIGURATION
// =====================================================


#[account]
pub struct FeeConfig {


    /// PDA bump
    pub bump:u8,


    /// Governance authority
    pub authority:Pubkey,



    /// Transfer fee rate

    /// Example:
    /// 200 = 2%

    pub transfer_fee_bps:u16,



    /// Maximum fee amount
    pub maximum_fee:u64,



    /// Treasury percentage

    /// 7000 = 70%

    pub treasury_share_bps:u16,



    /// Staking percentage

    /// 3000 = 30%

    pub staking_share_bps:u16,



    /// Total fees collected

    pub total_collected:u64,



    /// Total sent to treasury

    pub treasury_total:u64,



    /// Total sent to staking

    pub staking_total:u64,

}





impl FeeConfig {


    pub const SIZE:usize =

        8 +       // discriminator

        1 +       // bump

        32 +      // authority

        2 +       // fee bps

        8 +       // max fee

        2 +       // treasury

        2 +       // staking

        8 +       // collected

        8 +       // treasury total

        8;        // staking total



}





// =====================================================
// FEE CALCULATION
// =====================================================


/// Calculates protocol transfer fee.
///
/// Example:
///
/// amount:
/// 1000 PWRC
///
/// fee:
/// 2%
///
/// result:
/// 20 PWRC
///

pub fn calculate_fee(
    amount:u64,
    fee_bps:u16,
)->Result<u64>{


    require!(
        fee_bps <= MAX_TRANSFER_FEE_BPS,
        FeeError::InvalidFeeRate
    );


    let fee = amount
        .checked_mul(
            fee_bps as u64
        )
        .ok_or(
            FeeError::Overflow
        )?
        .checked_div(10_000)
        .ok_or(
            FeeError::DivisionError
        )?;


    Ok(fee)

}





/// Split collected fees between:
///
/// Treasury
/// Staking
///

pub fn split_fee(
    amount:u64,
    treasury_bps:u16,
    staking_bps:u16,
)->Result<(u64,u64)>{


    require!(
        treasury_bps
            .checked_add(staking_bps)
            == Some(10_000),
        FeeError::InvalidAllocation
    );



    let treasury = amount
        .checked_mul(
            treasury_bps as u64
        )
        .ok_or(
            FeeError::Overflow
        )?
        .checked_div(10_000)
        .ok_or(
            FeeError::DivisionError
        )?;



    let staking =
        amount
        .checked_sub(treasury)
        .ok_or(
            FeeError::Overflow
        )?;


    Ok((
        treasury,
        staking
    ))

}





// =====================================================
// FEE DISTRIBUTION LOGIC
// =====================================================


pub fn distribute_fees(
    config:&mut Account<FeeConfig>,
    amount:u64,
)->Result<()> {


    require!(
        amount > 0,
        FeeError::InvalidAmount
    );


    let (treasury,staking)=
        split_fee(
            amount,
            config.treasury_share_bps,
            config.staking_share_bps
        )?;



    config.total_collected =
        config.total_collected
        .checked_add(amount)
        .ok_or(
            FeeError::Overflow
        )?;



    config.treasury_total =
        config.treasury_total
        .checked_add(treasury)
        .ok_or(
            FeeError::Overflow
        )?;



    config.staking_total =
        config.staking_total
        .checked_add(staking)
        .ok_or(
            FeeError::Overflow
        )?;



    emit!(
        FeeDistributed {

            amount,

            treasury,

            staking

        }
    );



    Ok(())

}





// =====================================================
// EVENTS
// =====================================================


#[event]
pub struct FeeDistributed {


    pub amount:u64,


    pub treasury:u64,


    pub staking:u64,

}





#[event]
pub struct FeeConfigUpdated {


    pub authority:Pubkey,


    pub transfer_fee_bps:u16,


}






// =====================================================
// ERRORS
// =====================================================


#[error_code]
pub enum FeeError {


    #[msg("Invalid transfer fee rate")]
    InvalidFeeRate,


    #[msg("Invalid fee allocation")]
    InvalidAllocation,


    #[msg("Invalid fee amount")]
    InvalidAmount,


    #[msg("Arithmetic overflow")]
    Overflow,


    #[msg("Division error")]
    DivisionError,


}

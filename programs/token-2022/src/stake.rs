//! PowerChain PWRC Token-2022 Protocol™
//!
//! Staking Module
//!
//! Provides:
//! - PWRC staking positions
//! - Reward distribution
//! - Lock periods
//! - Epoch accounting
//! - Governance-controlled parameters
//!
//! Model:
//!
//! User
//!  |
//!  |
//! Stake PWRC
//!  |
//!  |
//! Staking Vault PDA
//!  |
//!  |
//! Reward Engine
//!  |
//!  |
//! PWRC Rewards
//!


use anchor_lang::prelude::*;





// =====================================================
// CONSTANTS
// =====================================================


/// Basis point denominator

pub const BPS:u64 = 10_000;



/// Default annual reward rate

/// 1200 = 12%

pub const DEFAULT_APY_BPS:u64 = 1200;



/// Maximum APY governance limit

pub const MAX_APY_BPS:u64 = 3000;



/// Minimum lock period

/// 7 days

pub const MIN_LOCK_SECONDS:u64 =
    604800;





// =====================================================
// STAKING CONFIGURATION
// =====================================================


#[account]
pub struct StakeConfig {


    /// PDA bump

    pub bump:u8,



    /// Governance authority

    pub authority:Pubkey,



    /// Reward vault

    pub reward_vault:Pubkey,



    /// Total staked PWRC

    pub total_staked:u64,



    /// Total distributed rewards

    pub total_rewards_paid:u64,



    /// Annual percentage yield

    /// Example:

    /// 1200 = 12%

    pub apy_bps:u64,



    /// Reward epoch duration

    pub epoch_seconds:u64,



    /// Staking enabled

    pub enabled:bool,


}





impl StakeConfig {


    pub const SIZE:usize =

        8 +

        1 +

        32 +

        32 +

        8 +

        8 +

        8 +

        8 +

        1;

}






// =====================================================
// USER STAKE POSITION
// =====================================================


#[account]
pub struct StakePosition {


    /// Owner

    pub owner:Pubkey,



    /// Amount staked

    pub amount:u64,



    /// Deposit timestamp

    pub deposited_at:i64,



    /// Unlock timestamp

    pub unlock_time:i64,



    /// Last reward claim

    pub last_claim:i64,



    /// Accumulated rewards

    pub rewards_earned:u64,



    /// Position active

    pub active:bool,


}





impl StakePosition {


    pub const SIZE:usize =

        8 +

        32 +

        8 +

        8 +

        8 +

        8 +

        8 +

        1;

}






// =====================================================
// STAKING LOGIC
// =====================================================


/// Create staking position

pub fn stake_pwrc(

    config:&mut StakeConfig,

    position:&mut StakePosition,

    owner:Pubkey,

    amount:u64,

    lock_seconds:u64,

)->Result<()> {



    require!(
        config.enabled,
        StakeError::Disabled
    );



    require!(
        amount > 0,
        StakeError::InvalidAmount
    );



    require!(
        lock_seconds >= MIN_LOCK_SECONDS,
        StakeError::LockTooShort
    );



    let clock =
        Clock::get()?;



    position.owner =
        owner;



    position.amount =
        amount;



    position.deposited_at =
        clock.unix_timestamp;



    position.unlock_time =
        clock.unix_timestamp
        +
        lock_seconds as i64;



    position.last_claim =
        clock.unix_timestamp;



    position.rewards_earned =
        0;



    position.active =
        true;



    config.total_staked =
        config.total_staked
        .checked_add(amount)
        .ok_or(
            StakeError::Overflow
        )?;



    emit!(
        StakeCreated {

            owner,

            amount,

            unlock_time:
                position.unlock_time

        }
    );



    Ok(())

}






/// Calculate pending rewards
///
/// Formula:
///
/// reward =
///
/// amount × APY × time
/// ----------------
/// year × 10000
///

pub fn calculate_rewards(

    position:&StakePosition,

    apy_bps:u64,

)->Result<u64>{



    let now =
        Clock::get()?
        .unix_timestamp;



    let elapsed = now
        .checked_sub(
            position.last_claim
        )
        .ok_or(
            StakeError::Overflow
        )?
        as u64;



    let reward =

        position.amount
        .checked_mul(
            apy_bps
        )
        .ok_or(
            StakeError::Overflow
        )?
        .checked_mul(
            elapsed
        )
        .ok_or(
            StakeError::Overflow
        )?
        .checked_div(
            365 * 24 * 60 * 60 * BPS
        )
        .ok_or(
            StakeError::Overflow
        )?;



    Ok(reward)

}






/// Claim staking rewards

pub fn claim_rewards(

    config:&mut StakeConfig,

    position:&mut StakePosition,

)->Result<u64>{


    require!(
        position.active,
        StakeError::InactivePosition
    );



    let reward =
        calculate_rewards(
            position,
            config.apy_bps
        )?;



    require!(
        reward > 0,
        StakeError::NoRewards
    );



    position.last_claim =
        Clock::get()?
        .unix_timestamp;



    position.rewards_earned =
        position.rewards_earned
        .checked_add(reward)
        .ok_or(
            StakeError::Overflow
        )?;



    config.total_rewards_paid =
        config.total_rewards_paid
        .checked_add(reward)
        .ok_or(
            StakeError::Overflow
        )?;



    emit!(
        RewardClaimed {

            owner:
                position.owner,

            amount:
                reward

        }
    );



    Ok(reward)

}






/// Withdraw staked PWRC

pub fn unstake(

    config:&mut StakeConfig,

    position:&mut StakePosition,

)->Result<u64>{



    require!(
        position.active,
        StakeError::InactivePosition
    );



    let now =
        Clock::get()?
        .unix_timestamp;



    require!(
        now >= position.unlock_time,
        StakeError::StillLocked
    );



    let amount =
        position.amount;



    config.total_staked =
        config.total_staked
        .checked_sub(amount)
        .ok_or(
            StakeError::Overflow
        )?;



    position.active=false;


    emit!(
        StakeWithdrawn {

            owner:
                position.owner,

            amount

        }
    );



    Ok(amount)

}






// =====================================================
// EVENTS
// =====================================================


#[event]
pub struct StakeCreated {


    pub owner:Pubkey,


    pub amount:u64,


    pub unlock_time:i64,

}





#[event]
pub struct RewardClaimed {


    pub owner:Pubkey,


    pub amount:u64,

}





#[event]
pub struct StakeWithdrawn {


    pub owner:Pubkey,


    pub amount:u64,

}






// =====================================================
// ERRORS
// =====================================================


#[error_code]
pub enum StakeError {


    #[msg("Staking is disabled")]
    Disabled,


    #[msg("Invalid staking amount")]
    InvalidAmount,


    #[msg("Lock period too short")]
    LockTooShort,


    #[msg("Stake position inactive")]
    InactivePosition,


    #[msg("No rewards available")]
    NoRewards,


    #[msg("Stake is still locked")]
    StillLocked,


    #[msg("Arithmetic overflow")]
    Overflow,


}

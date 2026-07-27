//! PowerChain PWRC Token-2022 Protocol™
//!
//! Vesting Module
//!
//! Provides:
//!
//! - Token allocation locking
//! - Cliff schedules
//! - Linear vesting
//! - Claim tracking
//! - Governance-controlled releases
//!
//!
//! Vesting Model:
//!
//! Allocation Created
//!          |
//!          |
//! Tokens Locked
//!          |
//!          |
//! Cliff Period
//!          |
//!          |
//! Linear Unlock
//!          |
//!          |
//! Claim Available
//!


use anchor_lang::prelude::*;





// =====================================================
// CONSTANTS
// =====================================================


/// Seconds per year

pub const YEAR_SECONDS:u64 =
    31_536_000;



/// Maximum vesting duration

pub const MAX_VESTING_DURATION:u64 =
    10 * YEAR_SECONDS;



/// Minimum cliff

pub const MIN_CLIFF:u64 =
    30 * 24 * 60 * 60;





// =====================================================
// VESTING CONFIGURATION
// =====================================================


#[account]
pub struct VestingConfig {


    /// PDA bump

    pub bump:u8,


    /// Governance authority

    pub authority:Pubkey,


    /// Total tokens allocated

    pub total_allocated:u64,


    /// Total tokens released

    pub total_released:u64,


    /// Number of schedules

    pub schedule_count:u64,


    /// Vesting enabled

    pub enabled:bool,

}





impl VestingConfig {


    pub const SIZE:usize =

        8 +

        1 +

        32 +

        8 +

        8 +

        8 +

        1;

}







// =====================================================
// VESTING SCHEDULE
// =====================================================


#[account]
pub struct VestingSchedule {


    /// Beneficiary wallet

    pub beneficiary:Pubkey,



    /// Token allocation

    pub total_amount:u64,



    /// Amount already claimed

    pub claimed_amount:u64,



    /// Start timestamp

    pub start_time:i64,



    /// Cliff duration

    pub cliff_seconds:u64,



    /// Total vesting duration

    pub duration_seconds:u64,



    /// Schedule active

    pub active:bool,



    /// Schedule identifier

    pub schedule_id:u64,


}





impl VestingSchedule {


    pub const SIZE:usize =

        8 +

        32 +

        8 +

        8 +

        8 +

        8 +

        8 +

        1 +

        8;

}







// =====================================================
// CREATE VESTING
// =====================================================


pub fn create_schedule(

    config:&mut VestingConfig,

    schedule:&mut VestingSchedule,

    beneficiary:Pubkey,

    amount:u64,

    start_time:i64,

    cliff_seconds:u64,

    duration_seconds:u64,

)->Result<()> {


    require!(
        config.enabled,
        VestingError::Disabled
    );


    require!(
        amount > 0,
        VestingError::InvalidAmount
    );



    require!(
        cliff_seconds <= duration_seconds,
        VestingError::InvalidCliff
    );



    require!(
        duration_seconds <= MAX_VESTING_DURATION,
        VestingError::DurationTooLong
    );



    config.schedule_count =

        config.schedule_count

        .checked_add(1)

        .ok_or(
            VestingError::Overflow
        )?;



    config.total_allocated =

        config.total_allocated

        .checked_add(amount)

        .ok_or(
            VestingError::Overflow
        )?;





    schedule.beneficiary =
        beneficiary;



    schedule.total_amount =
        amount;



    schedule.claimed_amount =
        0;



    schedule.start_time =
        start_time;



    schedule.cliff_seconds =
        cliff_seconds;



    schedule.duration_seconds =
        duration_seconds;



    schedule.schedule_id =
        config.schedule_count;



    schedule.active =
        true;



    emit!(
        VestingCreated {

            beneficiary,

            amount,

            schedule_id:
                schedule.schedule_id

        }
    );



    Ok(())

}







// =====================================================
// CALCULATE RELEASED TOKENS
// =====================================================


pub fn calculate_releasable(

    schedule:&VestingSchedule,

)->Result<u64>{



    let now =

        Clock::get()?
        .unix_timestamp;



    require!(
        now >= schedule.start_time,
        VestingError::NotStarted
    );



    let elapsed =

        (now -
        schedule.start_time)
        as u64;




    let vested_amount:u64;



    if elapsed < schedule.cliff_seconds {


        vested_amount = 0;


    }

    else if elapsed >= schedule.duration_seconds {


        vested_amount =
            schedule.total_amount;


    }

    else {


        vested_amount =

            schedule.total_amount

            .checked_mul(elapsed)

            .ok_or(
                VestingError::Overflow
            )?

            .checked_div(
                schedule.duration_seconds
            )

            .ok_or(
                VestingError::Overflow
            )?;

    }




    let claimable =

        vested_amount

        .checked_sub(
            schedule.claimed_amount
        )

        .ok_or(
            VestingError::Overflow
        )?;



    Ok(claimable)

}








// =====================================================
// CLAIM TOKENS
// =====================================================


pub fn claim_vested(

    config:&mut VestingConfig,

    schedule:&mut VestingSchedule,

)->Result<u64>{



    require!(
        schedule.active,
        VestingError::Inactive
    );



    let amount =

        calculate_releasable(
            schedule
        )?;



    require!(
        amount > 0,
        VestingError::NothingAvailable
    );



    schedule.claimed_amount =

        schedule.claimed_amount

        .checked_add(amount)

        .ok_or(
            VestingError::Overflow
        )?;




    config.total_released =

        config.total_released

        .checked_add(amount)

        .ok_or(
            VestingError::Overflow
        )?;





    if schedule.claimed_amount
        >= schedule.total_amount
    {

        schedule.active=false;

    }




    emit!(
        VestingClaimed {

            beneficiary:
                schedule.beneficiary,

            amount

        }
    );



    Ok(amount)

}







// =====================================================
// EVENTS
// =====================================================


#[event]
pub struct VestingCreated {


    pub beneficiary:Pubkey,


    pub amount:u64,


    pub schedule_id:u64,

}





#[event]
pub struct VestingClaimed {


    pub beneficiary:Pubkey,


    pub amount:u64,

}







// =====================================================
// ERRORS
// =====================================================


#[error_code]
pub enum VestingError {


    #[msg("Vesting system disabled")]
    Disabled,


    #[msg("Invalid token amount")]
    InvalidAmount,


    #[msg("Invalid cliff configuration")]
    InvalidCliff,


    #[msg("Vesting duration too long")]
    DurationTooLong,


    #[msg("Vesting has not started")]
    NotStarted,


    #[msg("No tokens available to claim")]
    NothingAvailable,


    #[msg("Schedule inactive")]
    Inactive,


    #[msg("Arithmetic overflow")]
    Overflow,

}

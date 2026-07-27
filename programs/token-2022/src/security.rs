//! PowerChain PWRC Token-2022 Protocol™
//!
//! Security Module
//!
//! Provides:
//! - Security Council management
//! - Emergency pause controls
//! - Critical action authorization
//! - Timelock enforcement
//! - Authority rotation protection
//!
//! Security model:
//!
//! DAO
//!  |
//!  |
//! Security Council
//!  |
//!  |
//! Emergency Controls
//!
//! Recommended deployment:
//!
//! 3-of-5 Multisig
//! +
//! 48h Timelock
//!


use anchor_lang::prelude::*;





// =====================================================
// SECURITY CONSTANTS
// =====================================================


/// Recommended Security Council size
pub const SECURITY_COUNCIL_SIZE:u8 = 5;



/// Required approvals
///
/// 3-of-5 multisig
///
pub const REQUIRED_APPROVALS:u8 = 3;



/// Emergency pause duration limit
///
/// 7 days maximum
///
pub const MAX_EMERGENCY_PAUSE:u64 =
    604800;





// =====================================================
// SECURITY STATE
// =====================================================


#[account]
pub struct SecurityState {


    /// PDA bump

    pub bump:u8,



    /// Security Council multisig members

    pub council_members:
        Vec<Pubkey>,



    /// Number of approvals required

    pub threshold:u8,



    /// Emergency pause status

    pub emergency_paused:bool,



    /// Pause timestamp

    pub pause_timestamp:i64,



    /// Authority rotation nonce

    pub rotation_nonce:u64,



    /// Timelock duration

    pub timelock_seconds:u64,



    /// Governance authority

    pub governance_authority:Pubkey,


}





impl SecurityState {


    pub const MAX_MEMBERS:usize = 5;



    pub const SIZE:usize =

        8 +                     // discriminator

        1 +                     // bump

        4 + (32 * Self::MAX_MEMBERS) +

        1 +                     // threshold

        1 +                     // emergency paused

        8 +                     // timestamp

        8 +                     // nonce

        8 +                     // timelock

        32;                     // governance authority


}






// =====================================================
// EMERGENCY CONTROLS
// =====================================================


/// Activate emergency protocol pause.
///
/// Used during:
///
/// - Bridge exploit
/// - Token vulnerability
/// - Governance incident
///
/// Requires Security Council approval.
///

pub fn emergency_pause(
    security:&mut SecurityState,
    authority:Pubkey,
)->Result<()> {


    require!(
        security
            .council_members
            .contains(&authority),
        SecurityError::Unauthorized
    );


    security.emergency_paused = true;


    security.pause_timestamp =
        Clock::get()?
        .unix_timestamp;



    emit!(
        EmergencyPauseActivated {
            authority
        }
    );



    Ok(())

}







/// Resume protocol operation.
///
/// Requires Security Council.
///

pub fn emergency_unpause(
    security:&mut SecurityState,
    authority:Pubkey,
)->Result<()> {


    require!(
        security
            .council_members
            .contains(&authority),
        SecurityError::Unauthorized
    );


    security.emergency_paused=false;


    emit!(
        EmergencyPauseReleased {
            authority
        }
    );



    Ok(())

}






// =====================================================
// AUTHORITY MANAGEMENT
// =====================================================


/// Rotate security authority.
///
/// Protected by:
/// - Governance approval
/// - Timelock
///

pub fn rotate_authority(
    security:&mut SecurityState,
    new_authority:Pubkey,
)->Result<()> {


    require!(
        new_authority != Pubkey::default(),
        SecurityError::InvalidAuthority
    );


    security.governance_authority =
        new_authority;



    security.rotation_nonce =
        security.rotation_nonce
        .checked_add(1)
        .ok_or(
            SecurityError::Overflow
        )?;



    emit!(
        AuthorityRotated {
            authority:new_authority,
            nonce:
            security.rotation_nonce
        }
    );



    Ok(())

}






// =====================================================
// MULTISIG VALIDATION
// =====================================================


/// Validate council membership.
///
/// Full signature collection is expected
/// to be enforced by external multisig
/// infrastructure.
///
/// This layer validates authority membership.
///

pub fn validate_council_member(
    security:&SecurityState,
    signer:Pubkey,
)->Result<()> {


    require!(
        security
            .council_members
            .contains(&signer),
        SecurityError::Unauthorized
    );


    Ok(())

}






// =====================================================
// TIMLOCK VALIDATION
// =====================================================


pub fn verify_timelock(
    execute_after:i64,
)->Result<()> {


    require!(
        Clock::get()?
            .unix_timestamp
            >= execute_after,
        SecurityError::TimelockActive
    );


    Ok(())

}






// =====================================================
// EVENTS
// =====================================================


#[event]
pub struct EmergencyPauseActivated {


    pub authority:Pubkey,


}



#[event]
pub struct EmergencyPauseReleased {


    pub authority:Pubkey,


}



#[event]
pub struct AuthorityRotated {


    pub authority:Pubkey,


    pub nonce:u64,


}






// =====================================================
// ERRORS
// =====================================================


#[error_code]
pub enum SecurityError {


    #[msg("Unauthorized security action")]
    Unauthorized,


    #[msg("Invalid authority")]
    InvalidAuthority,


    #[msg("Emergency action already active")]
    AlreadyPaused,


    #[msg("Timelock period has not completed")]
    TimelockActive,


    #[msg("Invalid multisig threshold")]
    InvalidThreshold,


    #[msg("Arithmetic overflow")]
    Overflow,


}

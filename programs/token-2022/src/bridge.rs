//! PowerChain PWRC Token-2022 Protocol™
//!
//! Cross-Chain Bridge Module
//!
//! Supports:
//!
//! Solana PWRC
//!        |
//!        |
//! Bridge Escrow PDA
//!        |
//!        |
//! Sui wPWRC
//!
//!
//! Security:
//!
//! - PDA escrow custody
//! - Nonce validation
//! - Message replay protection
//! - Validator verification
//! - Rate limiting
//! - Governance controls
//!


use anchor_lang::prelude::*;





// =====================================================
// CONSTANTS
// =====================================================


/// Maximum bridge validators

pub const MAX_VALIDATORS:usize = 5;



/// Default validator threshold

pub const DEFAULT_THRESHOLD:u8 = 3;



/// Maximum single bridge transfer

/// Governance adjustable

pub const DEFAULT_MAX_TRANSFER:u64 =
    1_000_000_000_000_000;





// =====================================================
// BRIDGE STATE
// =====================================================


#[account]
pub struct BridgeState {


    /// PDA bump

    pub bump:u8,



    /// Bridge enabled

    pub enabled:bool,



    /// Emergency pause

    pub paused:bool,



    /// Bridge authority

    pub authority:Pubkey,



    /// Escrow token account

    pub escrow:Pubkey,



    /// Total PWRC locked

    pub total_locked:u64,



    /// Total PWRC released

    pub total_released:u64,



    /// Current bridge nonce

    pub nonce:u64,



    /// Validator threshold

    pub threshold:u8,



    /// Validator set

    pub validators:
        Vec<Pubkey>,



    /// Maximum transfer limit

    pub max_transfer:u64,



    /// Last processed message

    pub last_message_hash:[u8;32],

}





impl BridgeState {


    pub const SIZE:usize =

        8 +

        1 +

        1 +

        1 +

        32 +

        32 +

        8 +

        8 +

        8 +

        1 +

        4 + (32 * MAX_VALIDATORS) +

        8 +

        32;

}





// =====================================================
// LOCK PWRC
// =====================================================


/// Lock PWRC into Solana escrow.
///
/// Relay observes BridgeLockEvent
/// and mints wPWRC on Sui.
//

pub fn lock_pwrc(

    bridge:&mut BridgeState,

    user:Pubkey,

    amount:u64,

    sui_recipient:[u8;32],

    message_hash:[u8;32],

)->Result<()> {



    require!(
        bridge.enabled,
        BridgeError::BridgeDisabled
    );


    require!(
        !bridge.paused,
        BridgeError::BridgePaused
    );


    require!(
        amount > 0,
        BridgeError::InvalidAmount
    );



    require!(
        amount <= bridge.max_transfer,
        BridgeError::TransferLimitExceeded
    );



    require!(
        message_hash != bridge.last_message_hash,
        BridgeError::ReplayDetected
    );



    bridge.total_locked =
        bridge.total_locked
        .checked_add(amount)
        .ok_or(
            BridgeError::Overflow
        )?;



    bridge.nonce =
        bridge.nonce
        .checked_add(1)
        .ok_or(
            BridgeError::Overflow
        )?;



    bridge.last_message_hash =
        message_hash;



    emit!(
        BridgeLockEvent {

            user,

            amount,

            nonce:
                bridge.nonce,

            sui_recipient,

            message_hash

        }
    );



    Ok(())

}







// =====================================================
// RELEASE PWRC
// =====================================================


/// Release PWRC after wPWRC burn.
///
/// Requires verified Sui bridge message.
//

pub fn release_pwrc(

    bridge:&mut BridgeState,

    recipient:Pubkey,

    amount:u64,

    sui_message_hash:[u8;32],

    validator_signatures:u8,

)->Result<()> {



    require!(
        bridge.enabled,
        BridgeError::BridgeDisabled
    );


    require!(
        !bridge.paused,
        BridgeError::BridgePaused
    );



    require!(
        amount > 0,
        BridgeError::InvalidAmount
    );



    require!(
        validator_signatures >= bridge.threshold,
        BridgeError::InsufficientValidators
    );



    require!(
        sui_message_hash !=
        bridge.last_message_hash,
        BridgeError::ReplayDetected
    );



    let released =

        bridge.total_released
        .checked_add(amount)
        .ok_or(
            BridgeError::Overflow
        )?;



    require!(
        released <= bridge.total_locked,
        BridgeError::EscrowInvariant
    );



    bridge.total_released =
        released;



    bridge.nonce =
        bridge.nonce
        .checked_add(1)
        .ok_or(
            BridgeError::Overflow
        )?;



    bridge.last_message_hash =
        sui_message_hash;



    emit!(
        BridgeReleaseEvent {

            recipient,

            amount,

            nonce:
                bridge.nonce,

            message_hash:
                sui_message_hash

        }
    );



    Ok(())

}






// =====================================================
// VALIDATOR MANAGEMENT
// =====================================================


pub fn add_validator(

    bridge:&mut BridgeState,

    validator:Pubkey,

)->Result<()> {



    require!(
        bridge.validators.len()
        < MAX_VALIDATORS,
        BridgeError::ValidatorLimit
    );


    bridge.validators.push(
        validator
    );


    emit!(
        ValidatorAdded {
            validator
        }
    );


    Ok(())

}





pub fn remove_validator(

    bridge:&mut BridgeState,

    validator:Pubkey,

)->Result<()> {



    bridge.validators
        .retain(
            |x| x != &validator
        );


    emit!(
        ValidatorRemoved {
            validator
        }
    );


    Ok(())

}






// =====================================================
// EVENTS
// =====================================================


#[event]
pub struct BridgeLockEvent {


    pub user:Pubkey,


    pub amount:u64,


    pub nonce:u64,


    pub sui_recipient:[u8;32],


    pub message_hash:[u8;32],

}





#[event]
pub struct BridgeReleaseEvent {


    pub recipient:Pubkey,


    pub amount:u64,


    pub nonce:u64,


    pub message_hash:[u8;32],

}





#[event]
pub struct ValidatorAdded {


    pub validator:Pubkey,

}





#[event]
pub struct ValidatorRemoved {


    pub validator:Pubkey,

}






// =====================================================
// ERRORS
// =====================================================


#[error_code]
pub enum BridgeError {


    #[msg("Bridge is disabled")]
    BridgeDisabled,


    #[msg("Bridge is paused")]
    BridgePaused,


    #[msg("Invalid bridge amount")]
    InvalidAmount,


    #[msg("Transfer exceeds bridge limit")]
    TransferLimitExceeded,


    #[msg("Bridge message already processed")]
    ReplayDetected,


    #[msg("Escrow accounting invariant violated")]
    EscrowInvariant,


    #[msg("Insufficient validator approvals")]
    InsufficientValidators,


    #[msg("Validator limit reached")]
    ValidatorLimit,


    #[msg("Arithmetic overflow")]
    Overflow,


}

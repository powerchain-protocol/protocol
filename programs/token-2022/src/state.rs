//! PowerChain PWRC Token-2022 Protocol™
//!
//! Protocol State Storage
//!
//! Contains:
//! - Global protocol configuration
//! - Bridge state
//! - Governance parameters
//! - Treasury accounting
//! - Burn tracking
//!
//! All critical parameters are controlled through
//! governance and multisig authorities.


use anchor_lang::prelude::*;





// =====================================================
// PROTOCOL STATE
// =====================================================


/// Global PWRC protocol configuration.
///
/// PDA:
/// seeds = ["protocol_state"]
///
#[account]
pub struct ProtocolState {


    /// PDA bump
    pub bump: u8,


    /// Emergency protocol pause
    pub paused: bool,


    /// Main governance authority
    ///
    /// Recommended:
    /// DAO multisig
    ///
    pub authority: Pubkey,



    // ---------------------------------------------
    // Bridge Accounting
    // ---------------------------------------------


    /// Total PWRC locked into bridge
    pub total_locked: u64,


    /// Total PWRC released from bridge
    pub total_released: u64,


    /// Number of bridge messages processed
    pub bridge_messages_processed: u64,



    // ---------------------------------------------
    // Burn Accounting
    // ---------------------------------------------


    /// Total PWRC permanently burned
    pub total_burned: u64,


    /// Last burn execution timestamp
    pub last_burn_timestamp: i64,


    /// Total number of burn executions
    pub burn_count: u64,



    // ---------------------------------------------
    // Fee Accounting
    // ---------------------------------------------


    /// Total transfer fees collected
    pub total_fees_collected: u64,


    /// Treasury allocation
    pub treasury_balance: u64,


    /// Staking reward allocation
    pub staking_balance: u64,



    // ---------------------------------------------
    // Governance
    // ---------------------------------------------


    /// Transfer fee in basis points
    ///
    /// Default:
    /// 200 = 2%
    ///
    pub transfer_fee_bps: u16,


    /// Treasury percentage
    ///
    /// Default:
    /// 7000 = 70%
    ///
    pub treasury_share_bps: u16,


    /// Staking percentage
    ///
    /// Default:
    /// 3000 = 30%
    ///
    pub staking_share_bps: u16,



    /// Governance timelock duration
    /// seconds
    pub timelock_seconds: u64,



    // ---------------------------------------------
    // Replay Protection
    // ---------------------------------------------


    /// Processed bridge message hashes
    ///
    /// Prevents:
    /// - double mint
    /// - double release
    /// - relay replay attacks
    ///
    pub processed_messages:
        Vec<[u8;32]>,



    // ---------------------------------------------
    // Upgrade Metadata
    // ---------------------------------------------


    /// Protocol version
    pub version: u16,


    /// Reserved storage
    ///
    /// Allows future upgrades without
    /// account migration.
    ///
    pub reserved:
        [u8;64],

}




impl ProtocolState {


    /// Calculate account size.
    ///
    /// Dynamic vector allocation is handled
    /// with reserved space during initialization.
    ///
    pub const INIT_SPACE: usize =

        8 +       // discriminator

        1 +       // bump

        1 +       // paused

        32 +      // authority


        // bridge

        8 +
        8 +
        8 +


        // burn

        8 +
        8 +
        8 +


        // fees

        8 +
        8 +
        8 +


        // governance

        2 +
        2 +
        2 +
        8 +


        // replay vector allocation

        4 + (32 * 1000) +


        // version

        2 +


        // reserved

        64;

}





// =====================================================
// BRIDGE STATE
// =====================================================


/// Dedicated bridge PDA.
///
/// Separates bridge security
/// from general protocol state.
///
#[account]
pub struct BridgeState {


    pub bump:u8,


    /// Bridge enabled status
    pub enabled:bool,


    /// Bridge authority
    ///
    /// Recommended:
    /// 3-of-5 multisig
    ///
    pub authority:Pubkey,



    /// Total locked PWRC
    pub locked_amount:u64,


    /// Total released PWRC
    pub released_amount:u64,



    /// Current bridge nonce
    pub nonce:u64,



    /// Last processed message
    pub last_message_hash:[u8;32],


}





// =====================================================
// GOVERNANCE STATE
// =====================================================


/// Governance-controlled parameters.
///
/// Modified only through:
///
/// DAO proposal
///      ↓
/// Timelock
///      ↓
/// Execution
///
#[account]
pub struct GovernanceState {


    pub bump:u8,


    /// DAO authority
    pub dao_authority:Pubkey,


    /// Security council authority
    pub security_council:Pubkey,


    /// Proposal nonce
    pub proposal_nonce:u64,


    /// Voting delay
    pub voting_delay:u64,


    /// Execution delay
    pub execution_delay:u64,


    /// Upgrade authority
    pub upgrade_authority:Pubkey,


}





// =====================================================
// BURN STATE
// =====================================================


/// Quarterly burn scheduler state.
///
#[account]
pub struct BurnState {


    pub bump:u8,


    /// Last completed burn period
    pub last_epoch:u64,


    /// Total burned
    pub total_burned:u64,


    /// Burn rate
    ///
    /// Example:
    /// 200 = 2%
    ///
    pub burn_rate_bps:u16,


    /// Next scheduled burn timestamp
    pub next_burn_timestamp:i64,


}






// =====================================================
// EVENTS
// =====================================================


#[event]
pub struct ProtocolStateUpdated {


    pub authority:Pubkey,


    pub timestamp:i64,


}





#[event]
pub struct BridgeStateUpdated {


    pub nonce:u64,


    pub locked:u64,


    pub released:u64,


}





#[event]
pub struct BurnStateUpdated {


    pub total_burned:u64,


    pub timestamp:i64,


}

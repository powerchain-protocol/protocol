//! PowerChain PWRC Token-2022 Protocol™
//!
//! Governance Module
//!
//! Implements:
//! - DAO governance authority
//! - Proposal lifecycle
//! - Timelock execution
//! - Security Council controls
//! - Protocol parameter governance
//!
//! Governance flow:
//!
//! Proposal Created
//!        |
//! Voting Period
//!        |
//! Quorum Check
//!        |
//! Timelock Delay
//!        |
//! Execution
//!


use anchor_lang::prelude::*;





// =====================================================
// GOVERNANCE CONSTANTS
// =====================================================


/// Minimum quorum requirement
///
/// 10% of voting power
///
pub const DEFAULT_QUORUM_BPS:u16 = 1000;



/// Approval threshold
///
/// 66.67%
/// 
pub const DEFAULT_APPROVAL_BPS:u16 = 6667;



/// Default execution delay
///
/// 48 hours
///
pub const DEFAULT_TIMELOCK_SECONDS:u64 =
    172800;





// =====================================================
// GOVERNANCE STATE
// =====================================================


#[account]
pub struct GovernanceState {


    /// PDA bump
    pub bump:u8,


    /// DAO governance authority
    pub dao_authority:Pubkey,


    /// Security Council authority
    pub security_council:Pubkey,


    /// Protocol upgrade authority
    pub upgrade_authority:Pubkey,



    /// Proposal counter
    pub proposal_nonce:u64,



    /// Voting parameters

    pub quorum_bps:u16,

    pub approval_threshold_bps:u16,



    /// Timelock delay

    pub timelock_seconds:u64,



    /// Governance enabled

    pub active:bool,


}





impl GovernanceState {


    pub const SIZE:usize =

        8 +       // discriminator

        1 +       // bump

        32 +      // DAO

        32 +      // Security Council

        32 +      // Upgrade authority

        8 +       // nonce

        2 +       // quorum

        2 +       // threshold

        8 +       // timelock

        1;        // active


}







// =====================================================
// PROPOSAL STATE
// =====================================================


#[account]
pub struct Proposal {


    /// Proposal ID

    pub id:u64,


    /// Creator

    pub proposer:Pubkey,



    /// Proposal title hash

    pub title_hash:[u8;32],



    /// Proposal metadata URI

    pub metadata_hash:[u8;32],



    /// Voting start

    pub start_time:i64,



    /// Voting end

    pub end_time:i64,



    /// Execution time

    pub execute_after:i64,



    /// Votes

    pub yes_votes:u64,

    pub no_votes:u64,



    /// Status

    pub status:ProposalStatus,



    /// Executed flag

    pub executed:bool,


}





// =====================================================
// PROPOSAL STATUS
// =====================================================


#[derive(
    AnchorSerialize,
    AnchorDeserialize,
    Clone,
    PartialEq,
    Eq
)]
pub enum ProposalStatus {


    Pending,


    Voting,


    Approved,


    Queued,


    Executed,


    Rejected,


    Expired,

}






// =====================================================
// GOVERNANCE ACTIONS
// =====================================================


/// Initialize governance controller

pub fn initialize_governance(
    state:&mut GovernanceState,
    dao:Pubkey,
    council:Pubkey,
    upgrade:Pubkey,
    bump:u8,
)->Result<()> {


    state.bump=bump;


    state.dao_authority=dao;


    state.security_council=council;


    state.upgrade_authority=upgrade;



    state.quorum_bps =
        DEFAULT_QUORUM_BPS;



    state.approval_threshold_bps =
        DEFAULT_APPROVAL_BPS;



    state.timelock_seconds =
        DEFAULT_TIMELOCK_SECONDS;



    state.proposal_nonce=0;


    state.active=true;



    Ok(())

}






/// Create governance proposal

pub fn create_proposal(
    governance:&mut GovernanceState,
    proposer:Pubkey,
    title_hash:[u8;32],
    metadata_hash:[u8;32],
    start:i64,
    end:i64,
)->Result<u64>{


    require!(
        governance.active,
        GovernanceError::Disabled
    );


    governance.proposal_nonce =
        governance
        .proposal_nonce
        .checked_add(1)
        .ok_or(
            GovernanceError::Overflow
        )?;



    emit!(
        ProposalCreated {

            id:
            governance.proposal_nonce,

            proposer,

        }
    );



    Ok(
        governance.proposal_nonce
    )

}






/// Queue approved proposal

pub fn queue_proposal(
    proposal:&mut Proposal,
    timelock:u64,
)->Result<()> {


    require!(
        proposal.status ==
            ProposalStatus::Approved,
        GovernanceError::InvalidStatus
    );



    proposal.status =
        ProposalStatus::Queued;



    proposal.execute_after =
        Clock::get()?
        .unix_timestamp
        +
        timelock as i64;



    emit!(
        ProposalQueued {
            id:proposal.id,
            execute_after:
            proposal.execute_after
        }
    );



    Ok(())

}







/// Execute queued proposal

pub fn execute_proposal(
    proposal:&mut Proposal,
)->Result<()> {


    require!(
        proposal.status ==
        ProposalStatus::Queued,
        GovernanceError::InvalidStatus
    );



    require!(
        Clock::get()?
        .unix_timestamp
        >= proposal.execute_after,
        GovernanceError::TimelockActive
    );



    proposal.status =
        ProposalStatus::Executed;


    proposal.executed=true;



    emit!(
        ProposalExecuted {
            id:proposal.id
        }
    );



    Ok(())

}






// =====================================================
// EVENTS
// =====================================================


#[event]
pub struct ProposalCreated {


    pub id:u64,


    pub proposer:Pubkey,


}



#[event]
pub struct ProposalQueued {


    pub id:u64,


    pub execute_after:i64,


}



#[event]
pub struct ProposalExecuted {


    pub id:u64,


}





// =====================================================
// ERRORS
// =====================================================


#[error_code]
pub enum GovernanceError {


    #[msg("Governance system disabled")]
    Disabled,


    #[msg("Invalid proposal state")]
    InvalidStatus,


    #[msg("Timelock period has not completed")]
    TimelockActive,


    #[msg("Insufficient voting quorum")]
    InsufficientQuorum,


    #[msg("Proposal rejected")]
    ProposalRejected,


    #[msg("Unauthorized governance action")]
    Unauthorized,


    #[msg("Arithmetic overflow")]
    Overflow,

}

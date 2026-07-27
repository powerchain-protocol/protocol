//! PowerChain PWRC Token-2022 Protocol™
//!
//! Centralized protocol errors.
//!
//! All program failures are returned through
//! this error registry for consistent client
//! handling and monitoring.


use anchor_lang::prelude::*;





#[error_code]
pub enum PwrcError {


    // =================================================
    // AUTHORIZATION
    // =================================================


    #[msg("Unauthorized operation")]
    Unauthorized,


    #[msg("Invalid authority")]
    InvalidAuthority,


    #[msg("Caller is not governance authority")]
    NotGovernanceAuthority,


    #[msg("Caller is not security council")]
    NotSecurityCouncil,


    #[msg("Caller is not bridge authority")]
    NotBridgeAuthority,



    #[msg("Multisig approval requirement not satisfied")]
    MultisigRequired,



    #[msg("Timelock period has not completed")]
    TimelockActive,





    // =================================================
    // PROTOCOL STATE
    // =================================================


    #[msg("Protocol is currently paused")]
    ProtocolPaused,


    #[msg("Protocol is not initialized")]
    NotInitialized,


    #[msg("Invalid protocol version")]
    InvalidVersion,


    #[msg("Protocol state update rejected")]
    StateUpdateRejected,





    // =================================================
    // TOKEN ERRORS
    // =================================================


    #[msg("Invalid token mint")]
    InvalidMint,


    #[msg("Invalid token account")]
    InvalidTokenAccount,


    #[msg("Invalid token supply")]
    InvalidSupply,


    #[msg("Maximum supply exceeded")]
    SupplyExceeded,


    #[msg("Insufficient token balance")]
    InsufficientBalance,


    #[msg("Invalid token amount")]
    InvalidAmount,


    #[msg("Amount must be greater than zero")]
    ZeroAmount,





    // =================================================
    // BURN MECHANISM
    // =================================================


    #[msg("Burn execution is not available yet")]
    BurnNotReady,


    #[msg("Burn already executed for this period")]
    BurnAlreadyExecuted,


    #[msg("Invalid burn calculation")]
    InvalidBurnAmount,


    #[msg("Burn authority validation failed")]
    InvalidBurnAuthority,


    #[msg("Burn schedule violation")]
    BurnScheduleViolation,





    // =================================================
    // TRANSFER FEES / TREASURY
    // =================================================


    #[msg("Invalid transfer fee configuration")]
    InvalidFeeConfiguration,


    #[msg("Fee distribution mismatch")]
    FeeDistributionMismatch,


    #[msg("Treasury accounting error")]
    TreasuryAccountingError,


    #[msg("Staking allocation error")]
    StakingAccountingError,





    // =================================================
    // BRIDGE SECURITY
    // =================================================


    #[msg("Bridge is disabled")]
    BridgeDisabled,


    #[msg("Bridge is paused")]
    BridgePaused,


    #[msg("Invalid bridge escrow account")]
    InvalidEscrowAccount,


    #[msg("Escrow accounting invariant violated")]
    EscrowInvariantViolation,


    #[msg("Bridge message already processed")]
    ReplayDetected,


    #[msg("Invalid bridge message")]
    InvalidBridgeMessage,


    #[msg("Invalid bridge nonce")]
    InvalidBridgeNonce,


    #[msg("Bridge release exceeds locked amount")]
    ReleaseExceedsEscrow,


    #[msg("Bridge authority verification failed")]
    BridgeAuthorityFailure,





    // =================================================
    // CROSS-CHAIN
    // =================================================


    #[msg("Invalid Sui recipient")]
    InvalidSuiRecipient,


    #[msg("Invalid wrapped token amount")]
    InvalidWrappedAmount,


    #[msg("Cross-chain verification failed")]
    CrossChainVerificationFailed,


    #[msg("Relay signature verification failed")]
    InvalidRelaySignature,





    // =================================================
    // GOVERNANCE
    // =================================================


    #[msg("Proposal does not exist")]
    ProposalNotFound,


    #[msg("Proposal has expired")]
    ProposalExpired,


    #[msg("Proposal execution rejected")]
    ProposalExecutionFailed,


    #[msg("Voting period is still active")]
    VotingPeriodActive,


    #[msg("Insufficient governance quorum")]
    InsufficientQuorum,


    #[msg("Governance parameter out of range")]
    InvalidGovernanceParameter,





    // =================================================
    // SECURITY
    // =================================================


    #[msg("Emergency action rejected")]
    EmergencyActionRejected,


    #[msg("Security check failed")]
    SecurityCheckFailed,


    #[msg("Account validation failed")]
    AccountValidationFailed,


    #[msg("Invalid PDA derivation")]
    InvalidPDA,





    // =================================================
    // ARITHMETIC
    // =================================================


    #[msg("Arithmetic overflow")]
    Overflow,


    #[msg("Arithmetic underflow")]
    Underflow,


    #[msg("Division by zero")]
    DivisionByZero,





    // =================================================
    // STORAGE
    // =================================================


    #[msg("Storage capacity exceeded")]
    StorageExceeded,


    #[msg("Invalid account size")]
    InvalidAccountSize,


    #[msg("State migration required")]
    MigrationRequired,

}

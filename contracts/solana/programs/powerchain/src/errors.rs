use anchor_lang::prelude::*;
#[error_code]
pub enum PowerchainError {
 #[msg("The supplied amount must be greater than zero")] InvalidAmount,
 #[msg("Arithmetic overflow")] ArithmeticOverflow,
 #[msg("The signer is not authorized")] Unauthorized,
 #[msg("Slippage tolerance exceeded")] SlippageExceeded,
 #[msg("Bridge message was already processed")] ReplayDetected,
 #[msg("Escrow is not in the required state")] InvalidEscrowState,
 #[msg("Campaign deadline has passed")] CampaignClosed,
 #[msg("Required quorum was not reached")] QuorumNotReached,
}

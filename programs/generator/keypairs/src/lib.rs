use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod powerchain_keypair_generator {
    use super::*;

    /// Registers a public key for an authenticated dashboard identity.
    /// Private keys are intentionally never accepted by the program.
    pub fn register_public_key(ctx: Context<RegisterPublicKey>, label: String) -> Result<()> {
        require!(label.as_bytes().len() <= 48, GeneratorError::LabelTooLong);
        let record = &mut ctx.accounts.record;
        record.owner = ctx.accounts.owner.key();
        record.wallet = ctx.accounts.wallet.key();
        record.label = label;
        record.bump = ctx.bumps.record;
        record.created_at = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct RegisterPublicKey<'info> {
    #[account(mut)] pub owner: Signer<'info>,
    /// CHECK: Public wallet address only; no secret material is read.
    pub wallet: UncheckedAccount<'info>,
    #[account(init, payer = owner, space = 8 + KeypairRecord::INIT_SPACE, seeds=[b"keypair", owner.key().as_ref(), wallet.key().as_ref()], bump)]
    pub record: Account<'info, KeypairRecord>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct KeypairRecord {
    pub owner: Pubkey,
    pub wallet: Pubkey,
    #[max_len(48)] pub label: String,
    pub created_at: i64,
    pub bump: u8,
}

#[error_code]
pub enum GeneratorError { #[msg("The wallet label exceeds 48 bytes.")] LabelTooLong }

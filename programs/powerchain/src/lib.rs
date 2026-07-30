pub mod rwa;
pub mod errors;
pub mod faucets;
pub mod idl;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod powerchain {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, authority: Pubkey, treasury: Pubkey) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.authority = authority;
        state.treasury = treasury;
        state.paused = false;
        state.asset_count = 0;
        state.settlement_count = 0;
        Ok(())
    }

    pub fn protocol_swap(ctx: Context<AdminAction>, args: instructions::SwapArgs) -> Result<()> {
        assert_authority(&ctx.accounts.state, &ctx.accounts.authority)?;
        let _amount_out = instructions::swap(args)?;
        Ok(())
    }

    pub fn protocol_bridge(ctx: Context<AdminAction>, args: instructions::BridgeArgs) -> Result<()> {
        assert_authority(&ctx.accounts.state, &ctx.accounts.authority)?;
        instructions::bridge(args)
    }

    pub fn protocol_payment(ctx: Context<AdminAction>, args: instructions::PaymentArgs) -> Result<()> {
        assert_authority(&ctx.accounts.state, &ctx.accounts.authority)?;
        instructions::payment(args)
    }

    pub fn protocol_escrow(ctx: Context<AdminAction>, args: instructions::EscrowArgs) -> Result<()> {
        assert_authority(&ctx.accounts.state, &ctx.accounts.authority)?;
        instructions::escrow(args)
    }

    pub fn protocol_crowdfunding(ctx: Context<AdminAction>, args: instructions::CampaignArgs) -> Result<()> {
        assert_authority(&ctx.accounts.state, &ctx.accounts.authority)?;
        instructions::crowdfunding(args)
    }

    pub fn set_paused(ctx: Context<AdminAction>, paused: bool) -> Result<()> {
        assert_authority(&ctx.accounts.state, &ctx.accounts.authority)?;
        ctx.accounts.state.paused = paused;
        Ok(())
    }

    pub fn register_asset(
        ctx: Context<RegisterAsset>,
        external_id: [u8; 32],
        owner: Pubkey,
        capacity_wh: u64,
    ) -> Result<()> {
        assert_authority(&ctx.accounts.state, &ctx.accounts.authority)?;
        require!(!ctx.accounts.state.paused, PowerchainError::ProtocolPaused);
        require!(capacity_wh > 0, PowerchainError::InvalidAmount);

        let asset = &mut ctx.accounts.asset;
        asset.external_id = external_id;
        asset.owner = owner;
        asset.capacity_wh = capacity_wh;
        asset.energy_recorded_wh = 0;
        asset.active = true;

        ctx.accounts.state.asset_count = ctx.accounts.state.asset_count
            .checked_add(1)
            .ok_or(PowerchainError::Overflow)?;
        Ok(())
    }

    pub fn record_settlement(
        ctx: Context<RecordSettlement>,
        energy_wh: u64,
        value_base_units: u64,
        reference: [u8; 32],
    ) -> Result<()> {
        assert_authority(&ctx.accounts.state, &ctx.accounts.authority)?;
        require!(!ctx.accounts.state.paused, PowerchainError::ProtocolPaused);
        require!(energy_wh > 0 && value_base_units > 0, PowerchainError::InvalidAmount);

        let asset = &mut ctx.accounts.asset;
        require!(asset.active, PowerchainError::InactiveAsset);
        asset.energy_recorded_wh = asset.energy_recorded_wh
            .checked_add(energy_wh)
            .ok_or(PowerchainError::Overflow)?;

        let settlement = &mut ctx.accounts.settlement;
        settlement.asset = asset.key();
        settlement.energy_wh = energy_wh;
        settlement.value_base_units = value_base_units;
        settlement.reference = reference;
        settlement.recorded_at = Clock::get()?.unix_timestamp;

        ctx.accounts.state.settlement_count = ctx.accounts.state.settlement_count
            .checked_add(1)
            .ok_or(PowerchainError::Overflow)?;
        Ok(())
    }
}

fn assert_authority(state: &Account<ProtocolState>, authority: &Signer) -> Result<()> {
    require_keys_eq!(authority.key(), state.authority, PowerchainError::Unauthorized);
    Ok(())
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = payer, space = 8 + ProtocolState::INIT_SPACE)]
    pub state: Account<'info, ProtocolState>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AdminAction<'info> {
    #[account(mut)]
    pub state: Account<'info, ProtocolState>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(external_id: [u8; 32])]
pub struct RegisterAsset<'info> {
    #[account(mut)]
    pub state: Account<'info, ProtocolState>,
    #[account(
        init,
        payer = authority,
        space = 8 + EnergyAsset::INIT_SPACE,
        seeds = [b"asset", external_id.as_ref()],
        bump
    )]
    pub asset: Account<'info, EnergyAsset>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(energy_wh: u64, value_base_units: u64, reference: [u8; 32])]
pub struct RecordSettlement<'info> {
    #[account(mut)]
    pub state: Account<'info, ProtocolState>,
    #[account(mut)]
    pub asset: Account<'info, EnergyAsset>,
    #[account(
        init,
        payer = authority,
        space = 8 + SettlementRecord::INIT_SPACE,
        seeds = [b"settlement", asset.key().as_ref(), reference.as_ref()],
        bump
    )]
    pub settlement: Account<'info, SettlementRecord>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct ProtocolState {
    pub authority: Pubkey,
    pub treasury: Pubkey,
    pub paused: bool,
    pub asset_count: u64,
    pub settlement_count: u64,
}

#[account]
#[derive(InitSpace)]
pub struct EnergyAsset {
    pub external_id: [u8; 32],
    pub owner: Pubkey,
    pub capacity_wh: u64,
    pub energy_recorded_wh: u64,
    pub active: bool,
}

#[account]
#[derive(InitSpace)]
pub struct SettlementRecord {
    pub asset: Pubkey,
    pub energy_wh: u64,
    pub value_base_units: u64,
    pub reference: [u8; 32],
    pub recorded_at: i64,
}

#[error_code]
pub enum PowerchainError {
    #[msg("The signer is not authorized.")]
    Unauthorized,
    #[msg("The protocol is paused.")]
    ProtocolPaused,
    #[msg("The amount must be greater than zero.")]
    InvalidAmount,
    #[msg("The asset is inactive.")]
    InactiveAsset,
    #[msg("Arithmetic overflow.")]
    Overflow,
}

#[derive(Clone, Debug, PartialEq)]
pub enum RenewablePoolStatus { Draft, Funding, Active, Settling, Closed }

#[derive(Clone, Debug)]
pub struct RenewablePoolState {
    pub authority: [u8; 32],
    pub target_amount: u64,
    pub committed_amount: u64,
    pub yield_bps: u16,
    pub status: RenewablePoolStatus,
}

impl RenewablePoolState {
    pub fn contribute(&mut self, amount: u64) -> std::result::Result<(), &'static str> {
        if self.status != RenewablePoolStatus::Funding { return Err("pool not funding"); }
        self.committed_amount = self.committed_amount.checked_add(amount).ok_or("overflow")?;
        if self.committed_amount >= self.target_amount { self.status = RenewablePoolStatus::Active; }
        Ok(())
    }
}

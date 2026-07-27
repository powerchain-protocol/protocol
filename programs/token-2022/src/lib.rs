//! PowerChain PWRC Token-2022 Protocol™
//!
//! Native utility and governance asset
//!
//! Network:
//!   Solana
//!
//! Standard:
//!   SPL Token-2022
//!
//! Modules:
//!
//! - Token management
//! - Transfer fee economy
//! - Treasury accounting
//! - Governance
//! - Security Council
//! - Bridge interoperability
//! - Staking
//! - Quarterly burns
//! - Vesting
//!
//! Security Model:
//!
//! DAO
//!  |
//! Timelock
//!  |
//! Security Council
//!  |
//! Protocol Execution


use anchor_lang::prelude::*;





// =====================================================
// MODULES
// =====================================================


pub mod state;
pub mod error;

pub mod fees;

pub mod governance;

pub mod security;

pub mod bridge;

pub mod stake;

pub mod burn;

pub mod vesting;





// =====================================================
// IMPORTS
// =====================================================


use crate::state::*;

use crate::error::*;





// =====================================================
// PROGRAM ID
// =====================================================


declare_id!(
    "PWRCmint1111111111111111111111111111111111111"
);





// =====================================================
// CONSTANTS
// =====================================================


/// Fixed maximum supply:
///
/// 18,446,000,000 PWRC
///
/// 9 decimals
///
pub const TOTAL_SUPPLY:u64 =
    18_446_000_000_000_000_000;



/// Token-2022 transfer fee

pub const TRANSFER_FEE_BPS:u16 =
    200;



/// Quarterly burn rate

pub const BURN_RATE_BPS:u64 =
    200;



// =====================================================
// PROGRAM
// =====================================================


#[program]
pub mod pwrc_token {


    use super::*;





    // -------------------------------------------------
    // INITIALIZATION
    // -------------------------------------------------


    /// Initialize protocol state PDA

    pub fn initialize(

        ctx:Context<Initialize>,

    )->Result<()> {



        let state =
            &mut ctx.accounts.protocol_state;



        state.bump =
            ctx.bumps.protocol_state;



        state.authority =
            ctx.accounts.authority.key();



        state.paused=false;



        state.total_locked=0;

        state.total_released=0;

        state.total_burned=0;



        state.last_burn_timestamp=0;



        state.transfer_fee_bps =
            TRANSFER_FEE_BPS;



        state.version=1;



        emit!(
            ProtocolInitialized {

                authority:
                    state.authority

            }
        );



        Ok(())

    }







    // -------------------------------------------------
    // SECURITY
    // -------------------------------------------------


    pub fn set_pause(

        ctx:Context<SetPause>,

        paused:bool,

    )->Result<()> {



        let state =
            &mut ctx.accounts.protocol_state;



        require_keys_eq!(

            ctx.accounts.authority.key(),

            state.authority,

            PwrcError::Unauthorized

        );



        state.paused =
            paused;



        emit!(
            PauseEvent {

                paused

            }
        );



        Ok(())

    }







    // -------------------------------------------------
    // BRIDGE CONTROL
    // -------------------------------------------------


    pub fn bridge_lock(

        ctx:Context<BridgeAction>,

        amount:u64,

        message_hash:[u8;32],

    )->Result<()> {



        bridge::lock_pwrc(

            &mut ctx.accounts.bridge,

            ctx.accounts.authority.key(),

            amount,

            [0u8;32],

            message_hash

        )

    }







    pub fn bridge_release(

        ctx:Context<BridgeAction>,

        amount:u64,

        message_hash:[u8;32],

    )->Result<()> {



        bridge::release_pwrc(

            &mut ctx.accounts.bridge,

            ctx.accounts.authority.key(),

            amount,

            message_hash,

            3

        )

    }







    // -------------------------------------------------
    // BURN
    // -------------------------------------------------


    pub fn execute_burn(

        ctx:Context<BurnAction>,

        circulating_supply:u64,

    )->Result<u64>{



        burn::execute_burn(

            &mut ctx.accounts.burn_config,

            circulating_supply

        )

    }







    // -------------------------------------------------
    // FEES
    // -------------------------------------------------


    pub fn distribute_fees(

        ctx:Context<FeeAction>,

        amount:u64,

    )->Result<()> {



        fees::distribute_fees(

            &mut ctx.accounts.fee_config,

            amount

        )

    }







    // -------------------------------------------------
    // STAKING
    // -------------------------------------------------


    pub fn claim_rewards(

        ctx:Context<StakeClaim>,

    )->Result<u64>{



        stake::claim_rewards(

            &mut ctx.accounts.stake_config,

            &mut ctx.accounts.position

        )

    }







    // -------------------------------------------------
    // VESTING
    // -------------------------------------------------


    pub fn claim_vesting(

        ctx:Context<VestingClaim>,

    )->Result<u64>{



        vesting::claim_vested(

            &mut ctx.accounts.vesting_config,

            &mut ctx.accounts.schedule

        )

    }


}







// =====================================================
// ACCOUNT CONTEXTS
// =====================================================


#[derive(Accounts)]
pub struct Initialize<'info>{


    #[account(mut)]
    pub authority:
        Signer<'info>,



    #[account(

        init,

        payer=authority,

        space=4096,

        seeds=[
            b"protocol_state"
        ],

        bump

    )]

    pub protocol_state:
        Account<'info,ProtocolState>,



    pub system_program:
        Program<'info,System>,


}







#[derive(Accounts)]
pub struct SetPause<'info>{


    pub authority:
        Signer<'info>,



    #[account(mut)]
    pub protocol_state:
        Account<'info,ProtocolState>,


}







#[derive(Accounts)]
pub struct BridgeAction<'info>{


    pub authority:
        Signer<'info>,


    #[account(mut)]
    pub bridge:
        Account<'info,bridge::BridgeState>,


}







#[derive(Accounts)]
pub struct BurnAction<'info>{


    #[account(mut)]
    pub burn_config:
        Account<'info,burn::BurnConfig>,


}







#[derive(Accounts)]
pub struct FeeAction<'info>{


    #[account(mut)]
    pub fee_config:
        Account<'info,fees::FeeConfig>,


}







#[derive(Accounts)]
pub struct StakeClaim<'info>{


    #[account(mut)]
    pub stake_config:
        Account<'info,stake::StakeConfig>,


    #[account(mut)]
    pub position:
        Account<'info,stake::StakePosition>,


}







#[derive(Accounts)]
pub struct VestingClaim<'info>{


    #[account(mut)]
    pub vesting_config:
        Account<'info,vesting::VestingConfig>,



    #[account(mut)]
    pub schedule:
        Account<'info,vesting::VestingSchedule>,


}







// =====================================================
// EVENTS
// =====================================================


#[event]
pub struct ProtocolInitialized {


    pub authority:Pubkey,


}



#[event]
pub struct PauseEvent {


    pub paused:bool,


}

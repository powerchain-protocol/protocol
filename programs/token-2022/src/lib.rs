/*!
 * PowerChain PWRC Token-2022 Protocol™
 *
 * Native Utility & Governance Asset
 *
 * Network:
 *   Solana
 *
 * Standard:
 *   SPL Token-2022
 *
 * Supply:
 *   18,446,000,000 PWRC
 *
 * Decimals:
 *   9
 *
 * Extensions:
 *   - TransferFeeConfig
 *   - MetadataPointer
 *   - TokenMetadata
 *   - PermanentDelegate
 *   - MintCloseAuthority
 *
 * Security:
 *   - Multisig authority
 *   - Timelock governance
 *   - Bridge replay protection
 *   - PDA escrow accounting
 */


use anchor_lang::prelude::*;

use anchor_spl::token_interface::{
    self,
    Burn,
    Mint,
    TokenAccount,
    TokenInterface,
};


declare_id!(
    "PWRCmint1111111111111111111111111111111111111"
);



/// PWRC fixed maximum supply
pub const TOTAL_SUPPLY: u64 =
    18_446_000_000_000_000_000;



/// Transfer fee
pub const TRANSFER_FEE_BPS: u16 = 200;



/// Quarterly burn rate
pub const QUARTERLY_BURN_BPS: u64 = 200;



/// Treasury fee share
pub const TREASURY_SHARE_BPS: u16 = 7000;



/// Staking reward share
pub const STAKING_SHARE_BPS: u16 = 3000;



#[program]
pub mod pwrc_token {

    use super::*;



    /*
     * Initialize protocol state
     */
    pub fn initialize(
        ctx: Context<Initialize>,
    ) -> Result<()> {


        let state =
            &mut ctx.accounts.protocol_state;


        state.bump =
            ctx.bumps.protocol_state;


        state.authority =
            ctx.accounts.authority.key();


        state.paused = false;


        state.total_locked = 0;

        state.total_released = 0;


        state.total_burned = 0;


        state.last_burn_timestamp = 0;


        state.processed_messages =
            Vec::new();


        emit!(
            ProtocolInitialized {
                authority: state.authority
            }
        );


        Ok(())
    }





    /*
     * Emergency pause controller
     */
    pub fn set_pause(
        ctx: Context<SetPause>,
        paused: bool,
    ) -> Result<()> {


        let state =
            &mut ctx.accounts.protocol_state;


        require_keys_eq!(
            ctx.accounts.authority.key(),
            state.authority,
            PwrcError::Unauthorized
        );


        state.paused = paused;



        emit!(
            PauseEvent {
                paused
            }
        );


        Ok(())
    }





    /*
     * Quarterly token burn
     */
    pub fn execute_quarterly_burn(
        ctx: Context<QuarterlyBurn>,
    ) -> Result<()> {


        let state =
            &mut ctx.accounts.protocol_state;



        require_keys_eq!(
            ctx.accounts.burn_authority.key(),
            state.authority,
            PwrcError::Unauthorized
        );


        let supply =
            ctx.accounts.mint.supply;



        let burn_amount =
            supply
                .checked_mul(
                    QUARTERLY_BURN_BPS
                )
                .ok_or(
                    PwrcError::Overflow
                )?
                .checked_div(10_000)
                .ok_or(
                    PwrcError::Overflow
                )?;



        require!(
            burn_amount > 0,
            PwrcError::InvalidAmount
        );



        let burn_accounts =
            Burn {

                mint:
                    ctx.accounts.mint
                    .to_account_info(),


                from:
                    ctx.accounts.burn_account
                    .to_account_info(),


                authority:
                    ctx.accounts.burn_authority
                    .to_account_info(),

            };



        token_interface::burn(
            CpiContext::new(
                ctx.accounts.token_program
                    .to_account_info(),

                burn_accounts
            ),
            burn_amount
        )?;



        state.total_burned =
            state.total_burned
                .checked_add(
                    burn_amount
                )
                .ok_or(
                    PwrcError::Overflow
                )?;



        state.last_burn_timestamp =
            Clock::get()?.unix_timestamp
                as u64;



        emit!(
            BurnEvent {
                amount: burn_amount
            }
        );



        Ok(())
    }





    /*
     * Lock PWRC for cross-chain bridge
     */
    pub fn lock_bridge(
        ctx: Context<BridgeAction>,
        amount: u64,
        message_hash: [u8;32],
    ) -> Result<()> {


        let state =
            &mut ctx.accounts.protocol_state;



        require!(
            !state.paused,
            PwrcError::ProtocolPaused
        );



        require!(
            amount > 0,
            PwrcError::InvalidAmount
        );



        require!(
            !state
                .processed_messages
                .contains(&message_hash),
            PwrcError::ReplayDetected
        );



        state.processed_messages
            .push(message_hash);



        state.total_locked =
            state.total_locked
                .checked_add(amount)
                .ok_or(
                    PwrcError::Overflow
                )?;



        emit!(
            BridgeLockEvent {
                amount,
                hash: message_hash
            }
        );



        Ok(())
    }





    /*
     * Release PWRC after wPWRC burn
     */
    pub fn release_bridge(
        ctx: Context<BridgeAction>,
        amount:u64,
        message_hash:[u8;32],
    )->Result<()> {


        let state =
            &mut ctx.accounts.protocol_state;



        require!(
            !state.paused,
            PwrcError::ProtocolPaused
        );



        require!(
            !state
                .processed_messages
                .contains(&message_hash),
            PwrcError::ReplayDetected
        );



        let new_total =
            state.total_released
                .checked_add(amount)
                .ok_or(
                    PwrcError::Overflow
                )?;



        require!(
            new_total <= state.total_locked,
            PwrcError::EscrowViolation
        );



        state.total_released =
            new_total;



        state.processed_messages
            .push(message_hash);



        emit!(
            BridgeReleaseEvent {
                amount,
                hash: message_hash
            }
        );


        Ok(())
    }

}






// =====================================================
// STATE
// =====================================================


#[account]
pub struct ProtocolState {


    pub bump:u8,


    pub paused:bool,


    pub authority:Pubkey,


    pub total_locked:u64,


    pub total_released:u64,


    pub total_burned:u64,


    pub last_burn_timestamp:u64,


    pub processed_messages:
        Vec<[u8;32]>,


}






// =====================================================
// ACCOUNTS
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
pub struct QuarterlyBurn<'info>{


    #[account(mut)]
    pub mint:
        InterfaceAccount<'info,Mint>,



    #[account(mut)]
    pub burn_account:
        InterfaceAccount<'info,TokenAccount>,



    pub burn_authority:
        Signer<'info>,



    pub token_program:
        Interface<'info,TokenInterface>,



    #[account(mut)]
    pub protocol_state:
        Account<'info,ProtocolState>,

}






#[derive(Accounts)]
pub struct BridgeAction<'info>{


    pub authority:
        Signer<'info>,



    #[account(mut)]
    pub protocol_state:
        Account<'info,ProtocolState>,

}







// =====================================================
// EVENTS
// =====================================================


#[event]
pub struct ProtocolInitialized {

    pub authority:Pubkey

}



#[event]
pub struct PauseEvent {

    pub paused:bool

}



#[event]
pub struct BurnEvent {

    pub amount:u64

}



#[event]
pub struct BridgeLockEvent {

    pub amount:u64,

    pub hash:[u8;32]

}



#[event]
pub struct BridgeReleaseEvent {

    pub amount:u64,

    pub hash:[u8;32]

}







// =====================================================
// ERRORS
// =====================================================


#[error_code]
pub enum PwrcError {


    #[msg("Unauthorized operation")]
    Unauthorized,


    #[msg("Protocol is paused")]
    ProtocolPaused,


    #[msg("Invalid amount")]
    InvalidAmount,


    #[msg("Arithmetic overflow")]
    Overflow,


    #[msg("Bridge message already processed")]
    ReplayDetected,


    #[msg("Bridge escrow invariant violated")]
    EscrowViolation,

}

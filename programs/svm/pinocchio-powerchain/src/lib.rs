#![no_std]

use pinocchio::{
    account_info::AccountInfo,
    entrypoint,
    program_error::ProgramError,
    pubkey::Pubkey,
    ProgramResult,
};
use pinocchio_log::log;

entrypoint!(process_instruction);

pub const VERSION: &str = env!("CARGO_PKG_VERSION");
pub const INITIALIZE: u8 = 0;
pub const RECORD_ENERGY: u8 = 1;
pub const SETTLE_ENERGY: u8 = 2;

#[repr(C)]
pub struct EnergyRecord {
    pub meter: Pubkey,
    pub owner: Pubkey,
    pub watt_hours: u64,
    pub settled_watt_hours: u64,
    pub bump: u8,
}

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let (discriminator, payload) = instruction_data
        .split_first()
        .ok_or(ProgramError::InvalidInstructionData)?;

    match *discriminator {
        INITIALIZE => initialize(accounts, payload),
        RECORD_ENERGY => record_energy(accounts, payload),
        SETTLE_ENERGY => settle_energy(accounts, payload),
        _ => Err(ProgramError::InvalidInstructionData),
    }
}

fn initialize(accounts: &[AccountInfo], payload: &[u8]) -> ProgramResult {
    require_accounts(accounts, 2)?;
    if payload.len() != 32 {
        return Err(ProgramError::InvalidInstructionData);
    }
    log!("PowerChain SVM initialize v{}", VERSION);
    Ok(())
}

fn record_energy(accounts: &[AccountInfo], payload: &[u8]) -> ProgramResult {
    require_accounts(accounts, 2)?;
    let watt_hours = read_u64(payload)?;
    if watt_hours == 0 {
        return Err(ProgramError::InvalidArgument);
    }
    log!("PowerChain SVM record energy: {} Wh", watt_hours);
    Ok(())
}

fn settle_energy(accounts: &[AccountInfo], payload: &[u8]) -> ProgramResult {
    require_accounts(accounts, 3)?;
    let watt_hours = read_u64(payload)?;
    if watt_hours == 0 {
        return Err(ProgramError::InvalidArgument);
    }
    log!("PowerChain SVM settle energy: {} Wh", watt_hours);
    Ok(())
}

fn read_u64(payload: &[u8]) -> Result<u64, ProgramError> {
    let bytes: [u8; 8] = payload
        .get(..8)
        .ok_or(ProgramError::InvalidInstructionData)?
        .try_into()
        .map_err(|_| ProgramError::InvalidInstructionData)?;
    Ok(u64::from_le_bytes(bytes))
}

fn require_accounts(accounts: &[AccountInfo], minimum: usize) -> ProgramResult {
    if accounts.len() < minimum {
        return Err(ProgramError::NotEnoughAccountKeys);
    }
    Ok(())
}

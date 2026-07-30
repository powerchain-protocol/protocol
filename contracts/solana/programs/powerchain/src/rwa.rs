use anchor_lang::prelude::*;
#[account] pub struct RwaRegistry { pub authority: Pubkey, pub asset_count:u64, pub bump:u8 }
#[account] pub struct RwaRecord { pub registry:Pubkey, pub owner:Pubkey, pub mint:Pubkey, pub kind:u8, pub status:u8, pub metadata_uri:String, pub valuation_usd:u64, pub issued_at:i64, pub bump:u8 }
#[event] pub struct RwaRegistered { pub mint:Pubkey, pub owner:Pubkey, pub kind:u8 }
#[event] pub struct EnergyCertificateRetired { pub mint:Pubkey, pub beneficiary:Pubkey, pub energy_mwh:u64 }
pub fn validate_metadata_uri(uri:&str)->Result<()> { require!(uri.len()<=200, RwaError::MetadataTooLong); require!(uri.starts_with("https://")||uri.starts_with("ipfs://")||uri.starts_with("ar://"),RwaError::InvalidMetadataUri); Ok(()) }
#[error_code] pub enum RwaError { #[msg("RWA metadata URI is too long")] MetadataTooLong, #[msg("RWA metadata URI must use HTTPS, IPFS or Arweave")] InvalidMetadataUri }

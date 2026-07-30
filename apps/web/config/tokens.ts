
export const PWRC_INITIAL_PRICE_USD=0.000002;

export const TOKEN_CONFIGURATION={
  SOL:{
    symbol:"SOL",
    network:"solana",
    mainnetMint:"So11111111111111111111111111111111111111112",
    devnetMint:null
  },
  USDC:{
    symbol:"USDC",
    network:"solana",
    mainnetMint:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    devnetMint:null
  },
  PWRC:{
    symbol:"PWRC",
    network:"solana",
    mainnetMint:process.env.NEXT_PUBLIC_PWRC_MAINNET_MINT??null,
    devnetMint:process.env.NEXT_PUBLIC_PWRC_DEVNET_MINT??null
  }
} as const;

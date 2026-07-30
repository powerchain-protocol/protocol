
export const DEMO_ACCOUNT={
  email:"demo@powerchain.energy",
  password:"PowerchainDemo2026!",
  name:"Demo Operator",
  company:"Powerchain Demo Energy",
  role:"ENERGY_MANAGER",
  dashboardUrl:"https://dashboard.powerchain.energy?demo=1"
} as const;

export const DEMO_WALLET={
  network:"solana" as const,
  address:"DemoPWRCRXXZxbg6FdQZfK3PMD7KP8xfxs9ac",
  balances:[
    {symbol:"SOL",amount:4.28,usdValue:612.04},
    {symbol:"USDC",amount:2500,usdValue:2500},
    {symbol:"PWRC",amount:125000,usdValue:287.50}
  ]
} as const;

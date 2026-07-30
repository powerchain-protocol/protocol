
export async function GET() {
  return Response.json({
    data: {
      id: "wallet_compatibility_v1",
      solana: {
        standard: "Solana Wallet Standard",
        requiredCapabilities: ["connect", "signTransaction"],
        optionalCapabilities: ["signMessage", "signAllTransactions"],
        mobile: "WalletConnect and compatible mobile wallet deep links"
      },
      sui: {
        standard: "Sui Wallet Standard",
        requiredCapabilities: ["connect", "signTransaction"]
      }
    }
  });
}

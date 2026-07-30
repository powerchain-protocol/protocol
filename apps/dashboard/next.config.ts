
import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@powerchain/config",
    "@powerchain/types",
    "@powerchain/utils",
    "@powerchain/shared",
    "@powerchain/storage",
    "@powerchain/store"
  ],
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@web3icons/react",
      "@solana/wallet-adapter-react"
    ]
  }
};

export default config;

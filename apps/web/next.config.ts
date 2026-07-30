
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(currentDirectory, "../..");

const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "https://checkout.powerchain.energy";
const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL ?? "https://docs.powerchain.energy";
const apiUrl = process.env.APP_API_URL ?? "https://api.powerchain.energy";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  compress: true,
  output: "standalone",
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot
  },
  productionBrowserSourceMaps: false,
  generateEtags: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800,
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 192, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.powerchain.io" },
      { protocol: "https", hostname: "cdn.powerchain.energy" }
    ]
  },
  experimental: {
    useTypeScriptCli: true,
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "@web3icons/react",
      "@solana/wallet-adapter-react",
      "@mysten/sui"
    ]
  },
  transpilePackages: [
    "@powerchain/config",
    "@powerchain/types",
    "@powerchain/utils",
    "@powerchain/web3.js",
    "@powerchain/shared",
    "@powerchain/storage",
    "@powerchain/store",
    "@powerchain/data",
    "@powerchain/marketplace",
    "@powerchain/renewables",
    "@powerchain/payments",
    "@powerchain/wallet",
    "@powerchain/ai",
    "@powerchain/blockchain",
    "@powerchain/integrations"
  ],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), payment=(self)" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Content-Security-Policy", value: "default-src 'self'; connect-src 'self' https://api.powerchain.energy https://*.solana.com https://*.helius-rpc.com; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; frame-src 'self' https://checkout.powerchain.energy; object-src 'none'; base-uri 'self'; form-action 'self' https://checkout.powerchain.energy" }
        ]
      },
      {
        source: "/icons/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      },
      {
        source: "/screenshots/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }]
      }
    ];
  },
  async rewrites() {
    return [
      { source: "/api/v1/:path*", destination: `${apiUrl}/api/v1/:path*` },
      { source: "/api/v2/:path*", destination: `${apiUrl}/api/v2/:path*` },
      { source: "/api-health/:path*", destination: `${apiUrl}/:path*` },
      { source: "/openapi.json", destination: `${apiUrl}/openapi.json` },
      { source: "/swagger.yaml", destination: `${apiUrl}/swagger.yaml` }
    ];
  },
  async redirects() {
    return [
      { source: "/portal", destination: "/dashboard", permanent: false },
      { source: "/ai", destination: "/dashboard/ai", permanent: false },
      { source: "/ai/chat", destination: "/dashboard/ai", permanent: false },
      { source: "/chat", destination: "/dashboard/ai", permanent: false },
      { source: "/assistant", destination: "/dashboard/ai", permanent: false },
      { source: "/copilot", destination: "/dashboard/ai", permanent: false },
      { source: "/skills", destination: "/dashboard/skills", permanent: false },
      { source: "/generator", destination: "/dashboard/developer/generator", permanent: false },
      { source: "/merchant", destination: "/dashboard/merchant", permanent: false },
      { source: "/faucet", destination: "/dashboard/faucet", permanent: false },
      { source: "/foucets", destination: "/faucets", permanent: true },
      { source: "/rewards", destination: "/dashboard/rewards", permanent: false },
      { source: "/checkout", destination: checkoutUrl, permanent: false },
      { source: "/documentation", destination: "/docs", permanent: true },
      { source: "/swagger", destination: `${apiUrl}/api-docs`, permanent: false },
      { source: "/hardware", destination: "/hardwares", permanent: true },
      { source: "/devices", destination: "/iot", permanent: false },
      { source: "/nodes", destination: "/depin", permanent: false },
      { source: "/developer", destination: "/developers", permanent: true }
    ];
  }
};

export default nextConfig;

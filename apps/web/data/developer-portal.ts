
import {
  Api,
  BookOpen,
  Boxes,
  Braces,
  CircleGauge,
  Code2,
  FileCode2,
  Fuel,
  GitBranch,
  Globe2,
  Hammer,
  ListChecks,
  RadioTower,
  Search,
  ShieldCheck,
  TerminalSquare,
  Wrench
} from "lucide-react";

export const developerNavigation = [
  { label: "Docs", href: "#documentation" },
  { label: "API Reference", href: "#api-reference" },
  { label: "SDKs", href: "#sdks" },
  { label: "Guides", href: "#guides" },
  { label: "Programs", href: "#programs" },
  { label: "Resources", href: "#resources" }
] as const;

export const developerFeatures = [
  {
    title: "APIs",
    description: "Powerful REST APIs for assets, telemetry, markets, wallets, and settlement.",
    href: "#api-reference",
    icon: Api
  },
  {
    title: "SDKs & Libraries",
    description: "Official SDKs in TypeScript, Python, Rust, and additional ecosystem languages.",
    href: "#sdks",
    icon: Braces
  },
  {
    title: "Smart Programs",
    description: "Build on verified Powerchain and Solana programs with typed interfaces.",
    href: "#programs",
    icon: FileCode2
  },
  {
    title: "Guides",
    description: "Step-by-step tutorials, recipes, architecture patterns, and integration examples.",
    href: "#guides",
    icon: BookOpen
  },
  {
    title: "Reference",
    description: "Complete API schemas, events, errors, token metadata, and developer resources.",
    href: "#documentation",
    icon: TerminalSquare
  },
  {
    title: "Tools",
    description: "CLI utilities, explorers, faucets, network status, and deployment tools.",
    href: "#resources",
    icon: Wrench
  }
] as const;

export const documentationLinks = [
  "Overview",
  "Architecture",
  "Getting Started",
  "Smart Grid Integration",
  "Energy Assets API",
  "Smart Programs",
  "Token Standards",
  "Security Best Practices"
] as const;

export const featuredGuides = [
  {
    title: "Integrate a Smart Meter",
    description: "Connect IoT devices and send signed telemetry.",
    icon: RadioTower
  },
  {
    title: "Mint a PET-20 Energy Token",
    description: "Create and manage real-world energy assets.",
    icon: Fuel
  },
  {
    title: "Build a Marketplace App",
    description: "List, trade, and settle assets on-chain.",
    icon: Boxes
  },
  {
    title: "Cross-Chain with PowerBridge",
    description: "Bridge assets between Solana and Sui.",
    icon: GitBranch
  },
  {
    title: "Verifiable Energy Settlement",
    description: "Use oracles and PoG for trusted settlement.",
    icon: ShieldCheck
  }
] as const;

export const developerResources = [
  { title: "Testnet Faucet", description: "Get test tokens", icon: Fuel },
  { title: "RPC Endpoints", description: "High-performance access", icon: ListChecks },
  { title: "CLI Tools", description: "Command-line tools", icon: TerminalSquare },
  { title: "Contract Explorer", description: "Browse programs", icon: Search },
  { title: "Status", description: "System status", icon: CircleGauge },
  { title: "Changelog", description: "Latest updates", icon: GitBranch }
] as const;

export const developerStats = [
  ["250M+", "Transactions"],
  ["12K+", "Developers"],
  ["150+", "dApps Built"],
  ["99.99%", "Network Uptime"],
  ["<500ms", "Finality"]
] as const;

export const footerColumns = {
  Platform: ["Overview", "Marketplace", "Energy Assets", "AI Platform", "Tokenomics"],
  Developers: ["Docs", "API Reference", "SDKs", "Guides", "GitHub"],
  Programs: ["pwrc-energy", "pwrc-oracle", "pwrc-registry", "pwrc-settlement", "All Programs"],
  Resources: ["Blog", "Whitepaper", "Case Studies", "Brand Kit", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Security", "Compliance"]
} as const;

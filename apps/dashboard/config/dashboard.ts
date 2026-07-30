
import type {DashboardFeature,DashboardNavItem} from "@/types/dashboard";
export const DASHBOARD_FEATURES:DashboardFeature[]=[
{id:"admin",enabled:true,label:"Super administration",description:"Platform-wide management.",requiredPermission:"admin.access"},
{id:"management",enabled:true,label:"Company management",description:"Teams, clients, services, and access.",requiredPermission:"companies.manage"},
{id:"marketplace",enabled:true,label:"Marketplace",description:"Energy, renewable, and carbon assets.",requiredPermission:"assets.read"},
{id:"renewables",enabled:true,label:"Renewables",description:"Production and impact operations.",requiredPermission:"assets.read"},
{id:"crowdfunding",enabled:true,label:"Crowdfunding",description:"Renewable infrastructure investment.",requiredPermission:"billing.read"},
{id:"payments",enabled:true,label:"Payments",description:"Checkout and settlement.",requiredPermission:"billing.read"},
{id:"blockchain",enabled:true,label:"Blockchain",description:"Cross-chain integrations and transactions.",requiredPermission:"integrations.read"},
{id:"wallet",enabled:true,label:"Wallet",description:"Balances, accounts, and signing.",requiredPermission:"billing.read"},
{id:"iot",enabled:true,label:"IoT",description:"Device telemetry and automation.",requiredPermission:"energy.read"},
{id:"depin",enabled:true,label:"DePIN",description:"Distributed infrastructure nodes.",requiredPermission:"energy.read"},
{id:"hardware",enabled:true,label:"Hardware",description:"Meters, gateways, and sensors.",requiredPermission:"assets.read"},
{id:"ai",enabled:true,label:"AI operations",description:"Role-aware AI insights.",requiredPermission:"ai.use"},
{id:"integrations",enabled:true,label:"Integrations",description:"Blockchain and enterprise integrations.",requiredPermission:"integrations.read"}
];
export const DASHBOARD_NAVIGATION:DashboardNavItem[]=[
{id:"overview",label:"Overview",href:"/",icon:"home",section:"workspace",permission:"dashboard.read"},
{id:"admin",label:"Super Admin",href:"/admin",icon:"shield",section:"administration",permission:"admin.access",featureFlag:"admin"},
{id:"management",label:"Company Management",href:"/management",icon:"building",section:"administration",permission:"companies.manage",featureFlag:"management"},
{id:"clients",label:"Clients",href:"/clients",icon:"users",section:"company",permission:"clients.read"},
{id:"prosumers",label:"Prosumers",href:"/prosumers",icon:"zap",section:"company",permission:"prosumers.read"},
{id:"users",label:"Users & Access",href:"/users",icon:"userCog",section:"company",permission:"users.read"},
{id:"marketplace",label:"Marketplace",href:"/marketplace",icon:"shopping",section:"operations",permission:"assets.read",featureFlag:"marketplace"},
{id:"renewables",label:"Renewables",href:"/renewables",icon:"leaf",section:"operations",permission:"assets.read",featureFlag:"renewables"},
{id:"crowdfunding",label:"Crowdfunding",href:"/crowdfunding",icon:"heart",section:"operations",permission:"billing.read",featureFlag:"crowdfunding"},
{id:"payments",label:"Payments",href:"/payments",icon:"card",section:"operations",permission:"billing.read",featureFlag:"payments"},
{id:"blockchain",label:"Blockchain",href:"/blockchain",icon:"blocks",section:"platform",permission:"integrations.read",featureFlag:"blockchain"},
{id:"wallet",label:"Wallet",href:"/wallet",icon:"wallet",section:"operations",permission:"billing.read",featureFlag:"wallet"},
{id:"energy",label:"Energy Operations",href:"/energy",icon:"activity",section:"operations",permission:"energy.read"},
{id:"iot",label:"IoT",href:"/iot",icon:"radio",section:"operations",permission:"energy.read",featureFlag:"iot"},
{id:"depin",label:"DePIN",href:"/depin",icon:"network",section:"operations",permission:"energy.read",featureFlag:"depin"},
{id:"hardware",label:"Hardware",href:"/hardware",icon:"cpu",section:"operations",permission:"assets.read",featureFlag:"hardware"},
{id:"analytics",label:"Analytics",href:"/analytics",icon:"chart",section:"operations",permission:"dashboard.read"},
{id:"ai",label:"AI Operations",href:"/ai/chat",icon:"brain",section:"platform",permission:"ai.use",featureFlag:"ai"},
{id:"integrations",label:"Integrations",href:"/integrations",icon:"plug",section:"platform",permission:"integrations.read",featureFlag:"integrations"},
{id:"developers",label:"Developers",href:"/developers",icon:"code",section:"platform",permission:"integrations.read"},
{id:"settings",label:"Settings",href:"/settings",icon:"settings",section:"workspace",permission:"settings.read"}
];
export function featureEnabled(id?:string){return id?DASHBOARD_FEATURES.find(x=>x.id===id)?.enabled??false:true}

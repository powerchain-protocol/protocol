
import type {NavItem} from "@/types";
export const LEFT_NAV:NavItem[]=[
{label:"Portal Home",href:"/",icon:"home"},
{label:"Overview",href:"/",icon:"layout",permission:"dashboard:read"},
{label:"Infrastructure",href:"/explorer",icon:"building",permission:"dashboard:read"},
{label:"Assets",href:"/explorer",icon:"cube",permission:"dashboard:read"},
{label:"Marketplace",href:"/explorer",icon:"shopping",permission:"dashboard:read"},
{label:"Payments",href:"/explorer",icon:"card",permission:"payments:write"},
{label:"Governance",href:"/governance",icon:"bank",permission:"governance:read"},
{label:"AI Operations",href:"/ai/chat",icon:"brain",permission:"ai:use"},
{label:"Staking",href:"/staking",icon:"shield"},
{label:"Developer Portal",href:"/developers",icon:"code"},
{label:"Documentation",href:"/documentation",icon:"book"}
];
export const SYSTEM_STATUS=["Core Network","RPC Endpoints","Oracle Network","PowerBridge","AI Services","Explorer API"];

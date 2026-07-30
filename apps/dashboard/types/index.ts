
import type {Role} from "@powerchain/shared";
export type DashboardUser={id:string;name:string;email:string;role:Role;organization:string};
export type ChatMessage={id:string;role:"user"|"assistant";content:string;createdAt:string};
export type NavItem={label:string;href:string;icon:string;permission?:string};

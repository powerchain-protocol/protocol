
"use client";

import {createContext,useContext,useMemo,useState} from "react";
import {canAccess} from "@/config/access";
import {dashboardLandingPage} from "@/config/redirects";
import {DASHBOARD_DEMO} from "@/config/demo";
import type {DashboardPermission} from "@/types/access";
import type {DashboardRole} from "@/types/roles";

export type DashboardUser={
  id:string;name:string;email:string;role:DashboardRole;organization:string;
  companyId:string;clientId?:string;prosumerId?:string
};

const admin:DashboardUser={
  id:"usr_super_admin",name:"Alex Kim",email:"admin@powerchain.energy",
  role:"SUPER_ADMIN",organization:"Powerchain",companyId:"company_powerchain"
};

const Context=createContext<{
  user:DashboardUser;isDemo:boolean;setDemo:(value:boolean)=>void;
  setRole:(role:DashboardRole)=>void;can:(permission:DashboardPermission)=>boolean;landingPage:string;
}|null>(null);

export function AuthProvider({children}:{children:React.ReactNode}){
  const [isDemo,setDemo]=useState(typeof window!=="undefined"&&new URLSearchParams(window.location.search).get("demo")==="1");
  const [adminUser,setAdminUser]=useState(admin);
  const user:DashboardUser=isDemo?DASHBOARD_DEMO.user:adminUser;
  const value=useMemo(()=>({
    user,isDemo,setDemo,
    setRole:(role:DashboardRole)=>isDemo?undefined:setAdminUser((current)=>({...current,role})),
    can:(permission:DashboardPermission)=>canAccess(user.role,permission),
    landingPage:dashboardLandingPage(user.role)
  }),[user,isDemo]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAuth(){
  const value=useContext(Context);
  if(!value)throw new Error("AuthProvider is missing.");
  return value;
}

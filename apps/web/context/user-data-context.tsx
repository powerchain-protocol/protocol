
"use client";
import {createContext,useContext,useEffect,useMemo,useState} from "react";
import type {UserDataProfile,UserEnvironmentPreference} from "@/types/user-profile";
const seed:UserDataProfile={id:"demo_user",email:"demo@powerchain.energy",displayName:"Demo Operator",companyId:"company_demo",prosumerId:"prosumer_demo",environment:"mock"};
const C=createContext<any>(null);
export function UserDataProvider({children}:{children:React.ReactNode}){const [profile,setProfile]=useState(seed);useEffect(()=>{const raw=localStorage.getItem("powerchain_user_data");if(raw){try{setProfile(JSON.parse(raw))}catch{}}},[]);function setEnvironment(environment:UserEnvironmentPreference){setProfile(p=>({...p,environment}));}function acceptDisclaimer(){setProfile(p=>({...p,acceptedMarketDataDisclaimerAt:new Date().toISOString()}));}useEffect(()=>localStorage.setItem("powerchain_user_data",JSON.stringify(profile)),[profile]);return <C.Provider value={useMemo(()=>({profile,setEnvironment,acceptDisclaimer}),[profile])}>{children}</C.Provider>}
export function useUserData(){const v=useContext(C);if(!v)throw new Error("UserDataProvider missing");return v}

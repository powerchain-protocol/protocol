
"use client";import {createContext,useContext,useMemo,useState} from "react";import {runtimeConfig} from "@/config/runtime";
const C=createContext<any>(null);
export function RuntimeProvider({children}:{children:React.ReactNode}){const [environment,setEnvironment]=useState(runtimeConfig.defaultEnvironment);const [fallbacksEnabled,setFallbacksEnabled]=useState(runtimeConfig.allowMockFallback);return <C.Provider value={useMemo(()=>({environment,setEnvironment,fallbacksEnabled,setFallbacksEnabled}),[environment,fallbacksEnabled])}>{children}</C.Provider>}
export function useRuntime(){const value=useContext(C);if(!value)throw new Error("RuntimeProvider missing");return value}

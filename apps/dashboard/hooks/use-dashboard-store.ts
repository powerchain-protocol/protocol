
"use client"; import {useSyncExternalStore} from "react"; import {dashboardStore,type DashboardState} from "@/store/dashboard-store";
export function useDashboardStore<T>(selector:(state:DashboardState)=>T){return useSyncExternalStore(dashboardStore.subscribe,()=>selector(dashboardStore.getState()),()=>selector(dashboardStore.getState()))}

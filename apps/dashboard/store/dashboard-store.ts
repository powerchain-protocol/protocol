
"use client"; import {createStore} from "@powerchain/store";
export const dashboardStore=createStore({leftSidebarOpen:true,rightSidebarOpen:true,commandOpen:false,activeOrganization:"Power Utilities Ltd."});
export type DashboardState=ReturnType<typeof dashboardStore.getState>;

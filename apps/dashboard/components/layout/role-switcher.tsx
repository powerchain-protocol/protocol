
"use client";
import {DASHBOARD_ROLES,type DashboardRole} from "@/types/roles";
import {useAuth} from "@/context/auth-context";
export function RoleSwitcher(){
 const {user,setRole}=useAuth();
 return <select aria-label="Dashboard role" value={user.role} onChange={(event)=>setRole(event.target.value as DashboardRole)} className="hidden h-9 max-w-44 rounded-lg border bg-white px-2 text-xs font-semibold xl:block">
   {DASHBOARD_ROLES.map((role)=><option key={role} value={role}>{role.replaceAll("_"," ")}</option>)}
 </select>
}

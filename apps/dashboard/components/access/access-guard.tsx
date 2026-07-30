
"use client";
import {useAuth} from "@/context/auth-context";
import type {DashboardPermission} from "@/types/access";
export function AccessGuard({permission,children}:{permission:DashboardPermission;children:React.ReactNode}){
 const {can,user}=useAuth();
 if(!can(permission))return <section className="rounded-3xl border bg-white p-10 text-center"><h1 className="text-2xl font-bold">Access restricted</h1><p className="mt-3 text-slate-500">The {user.role.replaceAll("_"," ").toLowerCase()} role cannot access this service.</p></section>;
 return <>{children}</>;
}

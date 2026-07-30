
"use client";

import { COMPANY_ROLES, type CompanyRole } from "@/types/access";

const labels: Record<CompanyRole,string> = {
  OWNER:"Company owner",
  EXECUTIVE:"Executive",
  FINANCE_ADMIN:"Finance administrator",
  ENERGY_MANAGER:"Energy manager",
  GRID_OPERATOR:"Grid operator",
  ASSET_MANAGER:"Asset manager",
  SUSTAINABILITY_MANAGER:"Sustainability manager",
  DEVELOPER:"Developer",
  ANALYST:"Analyst",
  AUDITOR:"Auditor",
  VIEWER:"Viewer"
};

export function CompanyRoleSelect({
  value,
  onChange
}: {
  value: CompanyRole;
  onChange: (value: CompanyRole) => void;
}) {
  return (
    <select value={value} onChange={(event)=>onChange(event.target.value as CompanyRole)} className="h-11 w-full rounded-xl border bg-white px-3">
      {COMPANY_ROLES.map((role)=><option value={role} key={role}>{labels[role]}</option>)}
    </select>
  );
}

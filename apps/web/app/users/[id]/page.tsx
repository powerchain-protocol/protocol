
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { UserDashboard } from "@/components/users/user-dashboard";
import { USER_DASHBOARDS } from "@/data/users";

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^usr_[a-zA-Z0-9_-]+$/.test(id)) notFound();
  const data = USER_DASHBOARDS[id];
  if (!data) notFound();

  return <><Header/><main className="pc-shell min-h-[820px] px-5 py-14"><div className="mx-auto max-w-7xl"><UserDashboard data={data}/></div></main><Footer/></>
}

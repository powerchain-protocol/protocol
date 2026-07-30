
import type { Metadata } from "next";
import { DeveloperCommunity } from "@/components/developers/developer-community";
import { DeveloperContentGrid } from "@/components/developers/developer-content-grid";
import { DeveloperFeatureGrid } from "@/components/developers/developer-feature-grid";
import { DeveloperFooter } from "@/components/developers/developer-footer";
import { DeveloperHeader } from "@/components/developers/developer-header";
import { DeveloperHero } from "@/components/developers/developer-hero";
import { DeveloperStats } from "@/components/developers/developer-stats";

export const metadata: Metadata = {
  title: "Developer Portal",
  description: "Build renewable infrastructure applications with Powerchain APIs, SDKs, programs, and developer tools."
};

export default function DevelopersPage() {
  return (
    <div className="developer-portal min-h-screen bg-white text-slate-950">
      <DeveloperHeader />
      <main>
        <DeveloperHero />
        <DeveloperFeatureGrid />
        <DeveloperContentGrid />
        <DeveloperStats />
        <DeveloperCommunity />
      </main>
      <DeveloperFooter />
    </div>
  );
}

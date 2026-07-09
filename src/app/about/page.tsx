import { AppShell } from "@/components/layout/AppShell";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata = {
  title: "About — SkinSight AI",
};

export default function AboutPage() {
  return (
    <AppShell
      title="About SkinSight AI"
      subtitle="Portfolio case study — AI-assisted dermatology triage concept"
    >
      <AboutContent />
    </AppShell>
  );
}

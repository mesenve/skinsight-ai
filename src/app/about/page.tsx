import { AppShell } from "@/components/layout/AppShell";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata = {
  title: "Case Study — SkinSight AI",
  description:
    "A UI/UX case study on designing a safer AI-assisted dermatology review experience.",
};

export default function AboutPage() {
  return (
    <AppShell
      title="Case Study"
      subtitle="Compact product design case study"
    >
      <AboutContent />
    </AppShell>
  );
}

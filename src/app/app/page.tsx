import { AppShell } from "@/components/layout/AppShell";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export const metadata = {
  title: "Patient Queue — SkinSight AI",
  description:
    "AI-assisted dermatology triage dashboard for clinician decision support.",
};

export default function AppDashboardPage() {
  return (
    <AppShell
      title="Patient Queue"
      subtitle="AI-assisted dermatology triage — clinician verification required"
    >
      <DashboardContent />
    </AppShell>
  );
}

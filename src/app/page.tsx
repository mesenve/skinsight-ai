import { AppShell } from "@/components/layout/AppShell";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export default function DashboardPage() {
  return (
    <AppShell
      title="Patient Queue"
      subtitle="AI-assisted dermatology triage — clinician verification required"
    >
      <DashboardContent />
    </AppShell>
  );
}

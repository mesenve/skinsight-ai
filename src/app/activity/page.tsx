import { AppShell } from "@/components/layout/AppShell";
import { ActivityContent } from "@/components/activity/ActivityContent";

export default function ActivityPage() {
  return (
    <AppShell
      title="Activity Log"
      subtitle="Audit trail of all clinician and AI actions"
      breadcrumb={[{ label: "Activity Log" }]}
    >
      <ActivityContent />
    </AppShell>
  );
}

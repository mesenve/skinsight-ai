import { AppShell } from "@/components/layout/AppShell";
import { NotificationsContent } from "@/components/notifications/NotificationsContent";

export default function NotificationsPage() {
  return (
    <AppShell
      title="Notifications"
      subtitle="Alerts, reminders and AI review updates"
      breadcrumb={[{ label: "Notifications" }]}
    >
      <NotificationsContent />
    </AppShell>
  );
}

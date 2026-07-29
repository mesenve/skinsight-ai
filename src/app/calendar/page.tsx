import { AppShell } from "@/components/layout/AppShell";
import { CalendarContent } from "@/components/calendar/CalendarContent";

export default function CalendarPage() {
  return (
    <AppShell
      title="Follow-up Calendar"
      subtitle="Scheduled check-ins and re-scan appointments"
      breadcrumb={[{ label: "Calendar" }]}
    >
      <CalendarContent />
    </AppShell>
  );
}

import { AppShell } from "@/components/layout/AppShell";
import { NewPatientForm } from "@/components/cases/NewPatientForm";

export const metadata = {
  title: "New Case — SkinSight AI",
};

export default function NewCasePage() {
  return (
    <AppShell
      title="New Patient Case"
      subtitle="Register intake details and lesion capture for AI-assisted review"
    >
      <NewPatientForm />
    </AppShell>
  );
}

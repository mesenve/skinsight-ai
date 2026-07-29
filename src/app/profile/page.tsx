import { AppShell } from "@/components/layout/AppShell";
import { ProfileContent } from "@/components/profile/ProfileContent";

export default function ProfilePage() {
  return (
    <AppShell
      title="Clinician Profile"
      subtitle="Dr. Maya Laurent — Consultant Dermatologist"
      breadcrumb={[{ label: "Profile" }]}
    >
      <ProfileContent />
    </AppShell>
  );
}

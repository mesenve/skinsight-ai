import { ClinicianOnboardingWizard } from "@/components/onboarding/ClinicianOnboardingWizard";

export const metadata = {
  title: "Clinician Onboarding — SkinSight AI",
  description:
    "Register as a clinician and configure your SkinSight AI triage workspace.",
};

export default function OnboardingPage() {
  return (
    <div className="mesh-bg min-h-screen">
      <ClinicianOnboardingWizard />
    </div>
  );
}

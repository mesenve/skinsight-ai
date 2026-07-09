import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ReportPreview } from "@/components/report/ReportPreview";
import { getCaseById, getCases } from "@/lib/mock-data";

export function generateStaticParams() {
  return getCases().map((patientCase) => ({
    id: patientCase.id,
  }));
}

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const patientCase = getCaseById(id);

  if (!patientCase) {
    notFound();
  }

  return (
    <AppShell
      title="Report Preview"
      subtitle="Clinician-approved assessment — decision support only"
      breadcrumb={[
        { label: "Queue", href: "/" },
        { label: patientCase.patientName, href: `/cases/${id}` },
        { label: "Report" },
      ]}
    >
      <ReportPreview patientCase={patientCase} />
    </AppShell>
  );
}

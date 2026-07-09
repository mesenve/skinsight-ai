import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { CaseDetailContent } from "@/components/case/CaseDetailContent";
import { getCaseById, getCases } from "@/lib/mock-data";

export function generateStaticParams() {
  return getCases().map((patientCase) => ({
    id: patientCase.id,
  }));
}

interface CasePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ analyzing?: string }>;
}

export default async function CasePage({ params, searchParams }: CasePageProps) {
  const { id } = await params;
  const { analyzing } = await searchParams;
  const patientCase = getCaseById(id);

  if (!patientCase) {
    notFound();
  }

  const autoScan = analyzing === "1" || analyzing === undefined;

  return (
    <AppShell
      title="Case Review"
      subtitle={`${patientCase.patientName} — ${patientCase.lesionLocation}`}
      breadcrumb={[
        { label: "Queue", href: "/" },
        { label: patientCase.patientName },
      ]}
    >
      <CaseDetailContent patientCase={patientCase} autoScan={autoScan} />
    </AppShell>
  );
}

import { AppShell } from "@/components/layout/AppShell";
import { CasePageClient } from "@/components/cases/CasePageClient";
import { getCaseById } from "@/lib/mock-data";

export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, index) => ({
    id: `case-${String(index + 1).padStart(3, "0")}`,
  }));
}

interface CasePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ analyzing?: string }>;
}

export default async function CasePage({ params, searchParams }: CasePageProps) {
  const { id } = await params;
  const { analyzing } = await searchParams;
  const staticCase = getCaseById(id);
  const autoScan = analyzing === "1" || (staticCase !== undefined && analyzing === undefined);

  return (
    <AppShell
      title="Case Review"
      subtitle={
        staticCase
          ? `${staticCase.patientName} — ${staticCase.lesionLocation}`
          : "Clinician review workspace"
      }
      breadcrumb={[
        { label: "Queue", href: "/app" },
        { label: staticCase?.patientName ?? "Case" },
      ]}
    >
      <CasePageClient id={id} autoScan={autoScan} />
    </AppShell>
  );
}

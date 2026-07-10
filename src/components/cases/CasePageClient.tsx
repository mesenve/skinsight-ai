"use client";

import Link from "next/link";
import { CaseDetailContent } from "@/components/case/CaseDetailContent";
import { useCases } from "@/context/CasesContext";
import { getCaseById as getStaticCaseById } from "@/lib/mock-data";

interface CasePageClientProps {
  id: string;
  autoScan: boolean;
}

export function CasePageClient({ id, autoScan }: CasePageClientProps) {
  const { getCaseById, hydrated } = useCases();
  const staticCase = getStaticCaseById(id);
  const patientCase = staticCase ?? (hydrated ? getCaseById(id) : undefined);

  if (!staticCase && !hydrated) {
    return (
      <div className="smooth-card rounded-2xl p-8 text-center text-sm text-muted">
        Loading case...
      </div>
    );
  }

  if (!patientCase) {
    return (
      <div className="smooth-card rounded-2xl p-8 text-center">
        <p className="font-display text-lg font-semibold text-navy">Case not found</p>
        <p className="mt-2 text-sm text-muted">
          This case may have been removed from your local demo storage.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex text-sm font-semibold text-medical-blue hover:underline"
        >
          Return to queue
        </Link>
      </div>
    );
  }

  return <CaseDetailContent key={id} patientCase={patientCase} autoScan={autoScan} />;
}

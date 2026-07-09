"use client";

import Link from "next/link";
import { Calendar, Camera, CheckCircle2, ChevronRight } from "lucide-react";

interface CaseActionBarProps {
  caseId: string;
}

export function CaseActionBar({ caseId }: CaseActionBarProps) {
  return (
    <div className="smooth-card rounded-2xl p-5">
      <p className="section-label">Clinician Actions</p>
      <p className="mt-1 text-xs text-muted">
        Human-in-the-loop — verify before finalizing
      </p>
      <div className="mt-4 flex flex-col gap-2.5">
        <Link
          href={`/cases/${caseId}/report`}
          className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-medical-blue to-medical-blue-light px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-medical-blue/20 transition-all hover:shadow-lg hover:shadow-medical-blue/25"
        >
          <CheckCircle2 className="h-4 w-4" />
          Approve Report
          <ChevronRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-medium text-navy transition-all hover:bg-medical-blue/[0.04] hover:shadow-sm"
        >
          <Camera className="h-4 w-4 text-muted" />
          Request New Photo
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-medium text-navy transition-all hover:bg-medical-blue/[0.04] hover:shadow-sm"
        >
          <Calendar className="h-4 w-4 text-muted" />
          Schedule Follow-up
        </button>
      </div>
    </div>
  );
}

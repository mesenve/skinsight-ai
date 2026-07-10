"use client";

import Link from "next/link";
import { Calendar, Camera, CheckCircle2, ChevronRight } from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/Button";

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
          className={buttonStyles({
            variant: "primary",
            size: "md",
            className: "group w-full",
          })}
        >
          <CheckCircle2 className="h-4 w-4" />
          Approve Report
          <ChevronRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <div className="flex gap-2.5">
          <Button variant="secondary" size="md" className="flex-1 whitespace-nowrap">
            <Camera className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-medical-blue" />
            Request New Photo
          </Button>
          <Button variant="secondary" size="md" className="flex-1 whitespace-nowrap">
            <Calendar className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-medical-blue" />
            Schedule Follow-up
          </Button>
        </div>
      </div>
    </div>
  );
}

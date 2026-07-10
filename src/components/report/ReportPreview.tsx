"use client";

import Link from "next/link";
import { ArrowLeft, Printer, Shield } from "lucide-react";
import type { PatientCase } from "@/lib/types";
import { LogoMark } from "@/components/shared/LogoMark";
import { RiskBadge } from "@/components/shared/RiskBadge";

interface ReportPreviewProps {
  patientCase: PatientCase;
}

export function ReportPreview({ patientCase }: ReportPreviewProps) {
  const reportDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      <div className="no-print flex items-center justify-between">
        <Link
          href={`/cases/${patientCase.id}`}
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-medical-blue"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to case
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="smooth-card inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-navy transition-all hover:shadow-[var(--shadow-hover)]"
        >
          <Printer className="h-4 w-4" />
          Print Layout
        </button>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-start gap-3 rounded-xl bg-cyan-accent/10 p-4 shadow-sm">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-medical-blue" />
          <div>
            <p className="text-sm font-semibold text-navy">
              Decision-support only — final evaluation belongs to the
              clinician
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              This report contains AI-assisted observations for clinician
              review. It does not constitute a medical diagnosis and does not
              replace professional medical judgment.
            </p>
          </div>
        </div>

        <div className="smooth-card-elevated overflow-hidden rounded-2xl">
          <div className="bg-navy px-8 py-6 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <LogoMark size={44} className="shadow-none ring-1 ring-white/15" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-cyan-accent">
                    SkinSight AI
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold">
                    Dermatology Triage Report
                  </h1>
                  <p className="mt-2 text-sm text-white/70">
                    Case {patientCase.id.toUpperCase()} · {reportDate}
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2 text-center">
                <p className="text-xs text-white/70">Status</p>
                <p className="text-sm font-semibold">Clinician Approved</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 px-8 py-6">
            <section>
              <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
                Patient Information
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted">Name</p>
                  <p className="font-medium text-navy">
                    {patientCase.patientName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted">MRN</p>
                  <p className="font-medium text-navy">{patientCase.mrn}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Age</p>
                  <p className="font-medium text-navy">{patientCase.age}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Lesion Location</p>
                  <p className="font-medium text-navy">
                    {patientCase.lesionLocation}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <RiskBadge level={patientCase.priority} />
                <span className="ml-3 text-sm text-muted">
                  AI risk signal: {patientCase.aiRiskScore}/100
                </span>
              </div>
            </section>

            <section>
              <div className="rounded-xl bg-medical-blue/5 p-5 shadow-inner">
                <h2 className="text-sm font-semibold text-medical-blue">
                  AI-Generated Observations
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Automated analysis for clinician review — not a final
                  assessment
                </p>
                <ul className="mt-4 space-y-2">
                  {patientCase.aiObservations.map((obs, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm leading-relaxed text-navy"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-medical-blue" />
                      {obs}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-navy">
                Clinician Final Assessment
              </h2>
              <p className="mt-1 text-xs text-muted">
                Verified by Dr. Maya Laurent — Dermatology
              </p>
              <div className="smooth-inset mt-4 rounded-xl p-5">
                <p className="text-sm leading-relaxed text-navy">
                  {patientCase.clinicianAssessment}
                </p>
              </div>

              {patientCase.doctorNotes && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-muted">
                    Additional Notes
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-navy">
                    {patientCase.doctorNotes}
                  </p>
                </div>
              )}
            </section>

            <div className="smooth-inset rounded-xl p-4 text-center">
              <p className="text-xs leading-relaxed text-muted">
                Decision-support only — final evaluation belongs to the
                clinician. SkinSight AI is a concept prototype for
                AI-assisted dermatology triage and does not provide medical
                diagnoses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

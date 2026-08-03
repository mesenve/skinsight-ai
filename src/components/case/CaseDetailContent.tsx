"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import type { PatientCase } from "@/lib/types";
import { useCases } from "@/context/CasesContext";
import { analyzeLesion, AnalyzeLesionError, getAnalyzeErrorMessage } from "@/lib/analyze-lesion";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { PatientIdPhoto } from "@/components/shared/PatientIdPhoto";
import { ClinicalWorkflow } from "./ClinicalWorkflow";
import { LesionImageViewer } from "./LesionImageViewer";
import { AIRiskScoreCard } from "./AIRiskScoreCard";
import { ABCDEAssessmentSection } from "./ABCDEAssessmentSection";
import { BodyMap } from "./BodyMap";
import { Timeline } from "./Timeline";
import { BeforeAfterCompare } from "./BeforeAfterCompare";
import { DoctorNotesPanel } from "./DoctorNotesPanel";
import { CaseActionBar } from "./CaseActionBar";

interface CaseDetailContentProps {
  patientCase: PatientCase;
  autoScan?: boolean;
}

type AnalysisPatch = Pick<
  PatientCase,
  "abcd" | "aiRiskScore" | "priority" | "aiObservations" | "analysisPending" | "clinicianAssessment"
>;

function getWorkflowStep(
  status: PatientCase["status"],
  analysisReady: boolean
): "intake" | "ai_review" | "clinician" | "report" {
  if (status === "approved") return "report";
  if (!analysisReady) return "ai_review";
  return "clinician";
}

export function CaseDetailContent({
  patientCase: initialCase,
  autoScan = true,
}: CaseDetailContentProps) {
  const { getCaseById, updateCase } = useCases();
  const storedCase = getCaseById(initialCase.id) ?? initialCase;

  const [isScanning, setIsScanning] = useState(false);
  const [scanKey, setScanKey] = useState(0);
  const [scanError, setScanError] = useState<string | null>(null);
  const [analysisPatch, setAnalysisPatch] = useState<AnalysisPatch | null>(null);
  const [analysisReady, setAnalysisReady] = useState(() => {
    if (storedCase.analysisPending) return false;
    return !autoScan;
  });
  const [activeScanId, setActiveScanId] = useState(storedCase.timeline[0]?.id);
  const analysisRequestRef = useRef<ReturnType<typeof analyzeLesion> | null>(null);
  const autoScanStartedRef = useRef(false);

  const patientCase = useMemo(
    () => (analysisPatch ? { ...storedCase, ...analysisPatch } : storedCase),
    [analysisPatch, storedCase]
  );

  const activeImage =
    patientCase.timeline.find((e) => e.id === activeScanId)?.imageUrl ??
    patientCase.timeline[0]?.imageUrl ??
    "/lesions/lesion-a.jpg";

  const beginAnalysis = useCallback(() => {
    const current = getCaseById(initialCase.id) ?? initialCase;
    const imageUrl =
      current.timeline.find((e) => e.id === activeScanId)?.imageUrl ??
      current.timeline[0]?.imageUrl;

    if (!imageUrl) {
      setScanError(getAnalyzeErrorMessage(400, "No lesion image available for AI review."));
      return;
    }

    setScanError(null);
    setAnalysisReady(false);
    setScanKey((k) => k + 1);
    setIsScanning(true);

    analysisRequestRef.current = analyzeLesion({
      caseId: current.id,
      imageUrl,
      patientContext: {
        patientName: current.patientName,
        age: current.age,
        lesionLocation: current.lesionLocation,
      },
    });
  }, [activeScanId, getCaseById, initialCase]);

  const handleScanComplete = useCallback(async () => {
    const current = getCaseById(initialCase.id) ?? initialCase;

    try {
      const request = analysisRequestRef.current;
      if (!request) {
        throw new AnalyzeLesionError(
          getAnalyzeErrorMessage(500, "AI review did not start correctly."),
          500
        );
      }

      const analysis = await request;
      const fullPatch: AnalysisPatch = {
        ...analysis,
        analysisPending: false,
        clinicianAssessment:
          "AI-assisted review complete. Clinician verification and final assessment required.",
      };

      setAnalysisPatch(fullPatch);
      if (current.isCustom) {
        updateCase(current.id, fullPatch);
      }

      setAnalysisReady(true);
    } catch (error) {
      const status = error instanceof AnalyzeLesionError ? error.status : 500;
      const raw = error instanceof Error ? error.message : undefined;
      setScanError(getAnalyzeErrorMessage(status, raw));
      if (!current.analysisPending) {
        setAnalysisReady(true);
      }
    } finally {
      setIsScanning(false);
      analysisRequestRef.current = null;
    }
  }, [getCaseById, initialCase, updateCase]);

  const handleRunScan = useCallback(() => {
    beginAnalysis();
  }, [beginAnalysis]);

  useEffect(() => {
    if (!autoScan || autoScanStartedRef.current) return;

    autoScanStartedRef.current = true;
    const timer = setTimeout(() => {
      beginAnalysis();
    }, 600);

    return () => clearTimeout(timer);
  }, [autoScan, initialCase.id, beginAnalysis]);

  const workflowStep = getWorkflowStep(patientCase.status, analysisReady);

  return (
    <div className="space-y-6">
      <Link
        href="/app"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-medical-blue"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to queue
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="smooth-card sticky top-4 z-20 rounded-2xl"
      >
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-4">
            <PatientIdPhoto
              src={patientCase.avatarUrl}
              alt={`ID photo of ${patientCase.patientName}`}
              size="lg"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl font-bold tracking-tight text-navy sm:text-2xl">
                  {patientCase.patientName}
                </h2>
                <RiskBadge level={patientCase.priority} />
              </div>
              <p className="mt-0.5 text-sm text-muted">
                {patientCase.age} years · {patientCase.mrn} · {patientCase.lesionLocation}
              </p>
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-3 divide-x divide-border-subtle rounded-xl border border-border-subtle/80 bg-background/50">
            {[
              {
                label: "Last scan",
                value: new Date(patientCase.lastScanDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
              },
              { label: "Case ID", value: patientCase.id.toUpperCase() },
              { label: "Total scans", value: String(patientCase.timeline.length) },
            ].map((item) => (
              <div
                key={item.label}
                className="min-w-[8.25rem] px-4 py-2 text-center"
              >
                <p className="section-label text-[10px]">{item.label}</p>
                <p className="font-display mt-0.5 text-xs font-bold text-navy">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="smooth-card overflow-hidden rounded-2xl"
      >
        <div className="grid gap-6 px-5 py-4 sm:px-6 lg:grid-cols-5 lg:items-center">
          <div className="flex lg:col-span-3 lg:min-h-[11rem] lg:items-center">
            <ClinicalWorkflow currentStep={workflowStep} inline />
          </div>
          <div className="lg:col-span-2 lg:border-l lg:border-border-subtle/80 lg:pl-6">
            <DoctorNotesPanel initialNotes={patientCase.doctorNotes} compact />
          </div>
        </div>
      </motion.div>

      {scanError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-risk-high/20 bg-risk-high/5 px-4 py-4 sm:px-5"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-risk-high" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-navy">AI review couldn&apos;t be completed</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{scanError}</p>
            {!isScanning && (
              <button
                type="button"
                onClick={handleRunScan}
                className="mt-3 text-sm font-semibold text-medical-blue transition-colors hover:text-medical-blue-light"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-3">
          <LesionImageViewer
            imageUrl={activeImage}
            alt={`Lesion scan for ${patientCase.patientName}`}
            isScanning={isScanning}
            scanKey={scanKey}
            onScanComplete={handleScanComplete}
            onRunScan={handleRunScan}
          />
          <BeforeAfterCompare events={patientCase.timeline} />
          <Timeline
            events={patientCase.timeline}
            activeId={activeScanId}
            onSelect={setActiveScanId}
          />
        </div>

        <div className="space-y-6 xl:col-span-2">
          <AIRiskScoreCard
            score={patientCase.aiRiskScore}
            priority={patientCase.priority}
            loading={!analysisReady}
          />

          <ABCDEAssessmentSection
            abcd={patientCase.abcd}
            analysisReady={analysisReady}
          />

          <BodyMap
            region={patientCase.bodyMapRegion}
            lesionLocation={patientCase.lesionLocation}
            caseId={patientCase.id}
            scanCount={patientCase.timeline.length}
            lastScanDate={patientCase.lastScanDate}
          />
          <CaseActionBar caseId={patientCase.id} />
        </div>
      </div>
    </div>
  );
}

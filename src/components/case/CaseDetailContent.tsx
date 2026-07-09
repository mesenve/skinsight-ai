"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import type { PatientCase } from "@/lib/types";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { PatientIdPhoto } from "@/components/shared/PatientIdPhoto";
import { ClinicalWorkflow } from "./ClinicalWorkflow";
import { LesionImageViewer } from "./LesionImageViewer";
import { AIRiskScoreCard } from "./AIRiskScoreCard";
import { ABCDAnalysisCard } from "./ABCDAnalysisCard";
import { BodyMap } from "./BodyMap";
import { Timeline } from "./Timeline";
import { BeforeAfterCompare } from "./BeforeAfterCompare";
import { DoctorNotesPanel } from "./DoctorNotesPanel";
import { CaseActionBar } from "./CaseActionBar";

interface CaseDetailContentProps {
  patientCase: PatientCase;
  autoScan?: boolean;
}

const abcdLabels = [
  { key: "asymmetry" as const, title: "Asymmetry" },
  { key: "border" as const, title: "Border" },
  { key: "color" as const, title: "Color" },
  { key: "diameter" as const, title: "Diameter" },
  { key: "evolution" as const, title: "Evolution" },
];

function getWorkflowStep(
  status: PatientCase["status"],
  analysisReady: boolean
): "intake" | "ai_review" | "clinician" | "report" {
  if (status === "approved") return "report";
  if (!analysisReady) return "ai_review";
  return "clinician";
}

export function CaseDetailContent({
  patientCase,
  autoScan = true,
}: CaseDetailContentProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanKey, setScanKey] = useState(0);
  const [analysisReady, setAnalysisReady] = useState(!autoScan);
  const [activeScanId, setActiveScanId] = useState(
    patientCase.timeline[0]?.id
  );

  const handleScanComplete = useCallback(() => {
    setIsScanning(false);
    setAnalysisReady(true);
  }, []);

  const handleRunScan = useCallback(() => {
    setAnalysisReady(false);
    setScanKey((k) => k + 1);
    setIsScanning(true);
  }, []);

  useEffect(() => {
    if (autoScan) {
      const timer = setTimeout(() => {
        setScanKey((k) => k + 1);
        setIsScanning(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [autoScan]);

  const activeImage =
    patientCase.timeline.find((e) => e.id === activeScanId)?.imageUrl ??
    patientCase.timeline[0]?.imageUrl ??
    "/lesions/lesion-a.jpg";

  const workflowStep = getWorkflowStep(patientCase.status, analysisReady);

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-medical-blue"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to queue
      </Link>

      <ClinicalWorkflow currentStep={workflowStep} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="smooth-card rounded-2xl p-5 sm:p-6"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <PatientIdPhoto
              src={patientCase.avatarUrl}
              alt={`ID photo of ${patientCase.patientName}`}
              size="lg"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-display text-xl font-bold tracking-tight text-navy sm:text-2xl">
                  {patientCase.patientName}
                </h2>
                <RiskBadge level={patientCase.priority} />
              </div>
              <p className="mt-1 text-sm text-muted">
                {patientCase.age} years · {patientCase.mrn} ·{" "}
                {patientCase.lesionLocation}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-light">
                <Clock className="h-3.5 w-3.5" />
                Last scan{" "}
                {new Date(patientCase.lastScanDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="smooth-inset rounded-xl px-4 py-2.5 text-center">
              <p className="section-label">Case ID</p>
              <p className="font-display mt-0.5 text-sm font-bold text-navy">
                {patientCase.id.toUpperCase()}
              </p>
            </div>
            <div className="smooth-inset rounded-xl px-4 py-2.5 text-center">
              <p className="section-label">Scans</p>
              <p className="font-display mt-0.5 text-sm font-bold text-navy">
                {patientCase.timeline.length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

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

          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="section-label">Pattern Analysis</p>
                <h3 className="font-display mt-0.5 text-base font-bold text-navy">
                  ABCDE Assessment
                </h3>
              </div>
              {!analysisReady && (
                <span className="rounded-full bg-cyan-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-accent">
                  Analyzing
                </span>
              )}
            </div>
            <div className="grid gap-3">
              {abcdLabels.map((item, index) => (
                <ABCDAnalysisCard
                  key={item.key}
                  title={item.title}
                  dimension={patientCase.abcd[item.key]}
                  index={index}
                  loading={!analysisReady}
                />
              ))}
            </div>
          </div>

          <BodyMap
            region={patientCase.bodyMapRegion}
            lesionLocation={patientCase.lesionLocation}
            caseId={patientCase.id}
            scanCount={patientCase.timeline.length}
            lastScanDate={patientCase.lastScanDate}
          />
          <DoctorNotesPanel initialNotes={patientCase.doctorNotes} />
          <CaseActionBar caseId={patientCase.id} />
        </div>
      </div>
    </div>
  );
}

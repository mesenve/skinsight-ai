"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type WorkflowStep = "intake" | "ai_review" | "clinician" | "report";

const steps: { id: WorkflowStep; label: string; description: string }[] = [
  { id: "intake", label: "Intake", description: "Scan received" },
  { id: "ai_review", label: "AI Review", description: "Risk signals" },
  { id: "clinician", label: "Clinician", description: "Verification" },
  { id: "report", label: "Report", description: "Approval" },
];

interface ClinicalWorkflowProps {
  currentStep: WorkflowStep;
}

export function ClinicalWorkflow({ currentStep }: ClinicalWorkflowProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="smooth-card rounded-2xl p-5">
      <p className="section-label">Clinical Workflow</p>
      <div className="mt-4 flex items-center justify-between gap-1">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.05 : 1,
                  }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    isComplete
                      ? "bg-medical-blue text-white shadow-sm shadow-medical-blue/25"
                      : isCurrent
                        ? "bg-cyan-accent/15 text-cyan-accent shadow-sm shadow-cyan-accent/20"
                        : "bg-background text-muted-light"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : isCurrent ? (
                    <span className="h-2 w-2 rounded-full bg-cyan-accent animate-pulse-dot" />
                  ) : (
                    <Circle className="h-3 w-3" />
                  )}
                </motion.div>
                <div className="text-center">
                  <p
                    className={cn(
                      "text-xs font-semibold",
                      isCurrent ? "text-navy" : isComplete ? "text-medical-blue" : "text-muted-light"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="hidden text-[10px] text-muted sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "mx-1 mb-5 h-0.5 flex-1 rounded-full transition-colors",
                    index < currentIndex ? "bg-medical-blue" : "bg-background"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

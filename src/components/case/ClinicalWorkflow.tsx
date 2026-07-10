"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
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
  /** Renders without outer card — embed inside patient header */
  inline?: boolean;
}

function progressWidth(currentIndex: number, total: number) {
  return ((currentIndex + 1) / total) * 100;
}

export function ClinicalWorkflow({ currentStep, inline = false }: ClinicalWorkflowProps) {
  const currentIndex = Math.max(0, steps.findIndex((s) => s.id === currentStep));
  const fillPercent = progressWidth(currentIndex, steps.length);

  const content = (
    <div className={cn("flex w-full flex-col justify-center", inline && "h-full")}>
      <div className="mb-3">
        <p className="section-label">{inline ? "Clinical Workflow" : "Progress"}</p>
      </div>

      <div
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label={`Workflow progress: ${steps[currentIndex]?.label}`}
      >
        <div className="smooth-inset rounded-full px-5 py-3 sm:px-6">
          <div className="relative h-6">
            <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 overflow-hidden rounded-full bg-white/80 shadow-inner">
              <motion.div
                className="absolute inset-y-0 left-0 overflow-hidden rounded-full"
                initial={false}
                animate={{ width: `${fillPercent}%` }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="h-full w-full bg-gradient-to-r from-medical-blue via-medical-blue-light to-cyan-accent" />
              </motion.div>
            </div>

            {steps.map((step, index) => {
              const isComplete = index < currentIndex;
              const isCurrent = index === currentIndex;
              const left = `${((index + 0.5) / steps.length) * 100}%`;

              return (
                <div
                  key={step.id}
                  className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left }}
                  aria-hidden={!isCurrent}
                >
                  {isCurrent ? (
                    <div className="animate-workflow-pulse relative h-4 w-4 rounded-full bg-white">
                      <span className="animate-pulse-dot absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-accent" />
                    </div>
                  ) : isComplete ? (
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-medical-blue shadow-sm ring-[2.5px] ring-white">
                      <Check className="h-2 w-2 text-white" strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="block h-2.5 w-2.5 rounded-full border border-border bg-white/90" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-4">
          {steps.map((step, index) => {
            const isComplete = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step.id} className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    "h-2 w-px rounded-full",
                    isCurrent && "bg-cyan-accent/60",
                    isComplete && !isCurrent && "bg-medical-blue/30",
                    !isCurrent && !isComplete && "bg-border-subtle"
                  )}
                />
                <p
                  className={cn(
                    "mt-1.5 whitespace-nowrap text-[11px] font-semibold sm:text-xs",
                    isCurrent && "font-display text-navy",
                    isComplete && !isCurrent && "text-medical-blue",
                    !isCurrent && !isComplete && "text-muted-light"
                  )}
                >
                  {step.label}
                </p>
                {!inline && !isCurrent && (
                  <p className="mt-0.5 hidden whitespace-nowrap text-[10px] text-muted sm:block">
                    {step.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (inline) return content;

  return (
    <div className="smooth-card rounded-2xl p-5">
      <div className="mt-1">{content}</div>
    </div>
  );
}

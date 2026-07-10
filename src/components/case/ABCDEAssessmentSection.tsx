"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { PatientCase } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ABCDAnalysisCard } from "./ABCDAnalysisCard";

const abcdLabels = [
  { key: "asymmetry" as const, title: "Asymmetry" },
  { key: "border" as const, title: "Border" },
  { key: "color" as const, title: "Color" },
  { key: "diameter" as const, title: "Diameter" },
  { key: "evolution" as const, title: "Evolution" },
];

interface ABCDEAssessmentSectionProps {
  abcd: PatientCase["abcd"];
  analysisReady: boolean;
  className?: string;
}

export function ABCDEAssessmentSection({
  abcd,
  analysisReady,
  className,
}: ABCDEAssessmentSectionProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className={cn("smooth-card overflow-hidden rounded-2xl", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-5 text-left transition-colors hover:bg-background/40"
      >
        <div>
          <p className="section-label">Pattern Analysis</p>
          <h3 className="font-display mt-0.5 text-base font-bold text-navy">
            ABCDE Assessment
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {!analysisReady && (
            <span className="rounded-full bg-cyan-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-accent">
              Analyzing
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="grid gap-3 border-t border-border-subtle/80 px-5 pb-5 pt-4">
              {abcdLabels.map((item, index) => (
                <ABCDAnalysisCard
                  key={item.key}
                  title={item.title}
                  dimension={abcd[item.key]}
                  index={index}
                  loading={!analysisReady}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

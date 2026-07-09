"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import type { PatientCase } from "@/lib/types";
import { PatientIdPhoto } from "@/components/shared/PatientIdPhoto";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  PatientCase["status"],
  { label: string; className: string }
> = {
  waiting_review: {
    label: "Awaiting Review",
    className: "bg-medical-blue/8 text-medical-blue",
  },
  follow_up: {
    label: "Follow-up",
    className: "bg-cyan-accent/10 text-cyan-accent",
  },
  approved: {
    label: "Approved",
    className: "bg-risk-low/8 text-risk-low",
  },
  new_scan_requested: {
    label: "New Photo",
    className: "bg-risk-medium/8 text-risk-medium",
  },
};

interface PatientQueueTableProps {
  cases: PatientCase[];
}

export function PatientQueueTable({ cases }: PatientQueueTableProps) {
  if (cases.length === 0) {
    return (
      <div className="smooth-card rounded-2xl p-16 text-center">
        <p className="font-display text-lg font-semibold text-navy">
          No cases found
        </p>
        <p className="mt-2 text-sm text-muted">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cases.map((patientCase, index) => {
        const status = statusConfig[patientCase.status];

        return (
          <motion.div
            key={patientCase.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.35 }}
          >
            <Link
              href={`/cases/${patientCase.id}`}
              className={cn(
                "group smooth-card relative flex flex-col gap-4 rounded-2xl p-5 md:grid md:grid-cols-[2fr_1fr_1fr_0.8fr_1fr_1fr_auto] md:items-center md:gap-4",
                patientCase.priority === "high" &&
                  "before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-risk-high before:to-risk-high/40"
              )}
            >
              <div className="flex items-center gap-3 pl-1">
                <PatientIdPhoto
                  src={patientCase.avatarUrl}
                  alt={`ID photo of ${patientCase.patientName}`}
                  size="sm"
                />
                <div>
                  <p className="font-semibold text-navy transition-colors group-hover:text-medical-blue">
                    {patientCase.patientName}
                  </p>
                  <p className="text-xs text-muted">
                    Age {patientCase.age} · {patientCase.mrn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-light md:hidden" />
                {patientCase.lesionLocation}
              </div>

              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-light" />
                {new Date(patientCase.lastScanDate).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric" }
                )}
              </div>

              <div>
                <span
                  className={cn(
                    "font-display text-sm font-bold",
                    patientCase.priority === "high"
                      ? "text-risk-high"
                      : patientCase.priority === "medium"
                        ? "text-risk-medium"
                        : "text-risk-low"
                  )}
                >
                  {patientCase.aiRiskScore}
                </span>
                <span className="text-xs text-muted-light"> /100</span>
              </div>

              <div>
                <RiskBadge level={patientCase.priority} />
              </div>

              <div>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                    status.className
                  )}
                >
                  {status.label}
                </span>
              </div>

              <ArrowUpRight className="hidden h-4 w-4 text-muted-light transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-medical-blue md:block" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

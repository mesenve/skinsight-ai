"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

const columns = [
  "Patient",
  "Location",
  "Last Scan",
  "AI Score",
  "Risk",
  "Status",
  "",
] as const;

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
    <div className="smooth-card overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border-subtle bg-background/50">
              {columns.map((col) => (
                <th
                  key={col || "action"}
                  scope="col"
                  className={cn(
                    "px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-muted",
                    col === "" && "w-10"
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cases.map((patientCase, index) => {
              const status = statusConfig[patientCase.status];

              return (
                <motion.tr
                  key={patientCase.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="group border-b border-border-subtle/70 last:border-b-0 transition-colors hover:bg-medical-blue/[0.03]"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/cases/${patientCase.id}`}
                      className="flex items-center gap-3"
                    >
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
                    </Link>
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    <Link
                      href={`/cases/${patientCase.id}`}
                      className="block transition-colors group-hover:text-navy"
                    >
                      {patientCase.lesionLocation}
                    </Link>
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    <Link href={`/cases/${patientCase.id}`} className="block">
                      {new Date(patientCase.lastScanDate).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </Link>
                  </td>

                  <td className="px-5 py-4">
                    <Link href={`/cases/${patientCase.id}`} className="block">
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
                    </Link>
                  </td>

                  <td className="px-5 py-4">
                    <Link href={`/cases/${patientCase.id}`} className="block">
                      <RiskBadge level={patientCase.priority} />
                    </Link>
                  </td>

                  <td className="px-5 py-4">
                    <Link href={`/cases/${patientCase.id}`} className="block">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                          status.className
                        )}
                      >
                        {status.label}
                      </span>
                    </Link>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      href={`/cases/${patientCase.id}`}
                      className="inline-flex text-muted-light transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-medical-blue"
                      aria-label={`Open case for ${patientCase.patientName}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

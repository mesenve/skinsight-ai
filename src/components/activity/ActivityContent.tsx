"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  CheckCircle2,
  FileText,
  FilePlus2,
  MessageSquare,
  RefreshCw,
  ScanLine,
} from "lucide-react";
import { activityLog } from "@/lib/activity-data";
import type { ActivityEventType } from "@/lib/types";
import { cn } from "@/lib/utils";

const eventConfig: Record<
  ActivityEventType,
  { label: string; icon: typeof Activity; color: string; bg: string }
> = {
  case_opened: {
    label: "Case Opened",
    icon: ScanLine,
    color: "text-medical-blue",
    bg: "bg-medical-blue/8",
  },
  ai_scan_run: {
    label: "AI Scan",
    icon: Bot,
    color: "text-cyan-accent",
    bg: "bg-cyan-accent/8",
  },
  case_approved: {
    label: "Case Approved",
    icon: CheckCircle2,
    color: "text-risk-low",
    bg: "bg-risk-low/8",
  },
  new_scan_requested: {
    label: "Re-scan Requested",
    icon: RefreshCw,
    color: "text-risk-medium",
    bg: "bg-risk-medium/8",
  },
  doctor_note_added: {
    label: "Note Added",
    icon: MessageSquare,
    color: "text-navy",
    bg: "bg-navy/6",
  },
  report_generated: {
    label: "Report Generated",
    icon: FileText,
    color: "text-medical-blue",
    bg: "bg-medical-blue/8",
  },
  case_created: {
    label: "Case Created",
    icon: FilePlus2,
    color: "text-risk-low",
    bg: "bg-risk-low/8",
  },
};

const filterOptions: { value: ActivityEventType | "all"; label: string }[] = [
  { value: "all", label: "All Activity" },
  { value: "ai_scan_run", label: "AI Scans" },
  { value: "case_approved", label: "Approvals" },
  { value: "case_created", label: "New Cases" },
  { value: "new_scan_requested", label: "Re-scans" },
  { value: "doctor_note_added", label: "Notes" },
  { value: "report_generated", label: "Reports" },
];

function formatTime(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function groupByDate(events: typeof activityLog) {
  const groups: Record<string, typeof activityLog> = {};
  for (const event of events) {
    const day = new Date(event.timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    if (!groups[day]) groups[day] = [];
    groups[day].push(event);
  }
  return groups;
}

export function ActivityContent() {
  const [filter, setFilter] = useState<ActivityEventType | "all">("all");

  const filtered =
    filter === "all"
      ? activityLog
      : activityLog.filter((e) => e.type === filter);

  const grouped = groupByDate(filtered);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilter(opt.value)}
            className={cn(
              "inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
              filter === opt.value
                ? "bg-medical-blue text-white shadow-sm shadow-medical-blue/20"
                : "border border-border-subtle bg-white text-muted shadow-[var(--shadow-soft)] hover:border-medical-blue/30 hover:text-navy"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="smooth-card flex flex-col items-center justify-center rounded-2xl py-20 text-center">
          <Activity className="mb-3 h-8 w-8 text-muted-light" />
          <p className="text-sm font-semibold text-navy">No activity found</p>
          <p className="mt-1 text-xs text-muted">Try a different filter.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([day, events]) => (
            <div key={day}>
              <p className="section-label mb-3 px-1">{day}</p>
              <div className="smooth-card divide-y divide-border-subtle/60 overflow-hidden rounded-2xl">
                {events.map((event, i) => {
                  const cfg = eventConfig[event.type];
                  const Icon = cfg.icon;
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="flex items-start gap-4 px-5 py-4"
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                          cfg.bg
                        )}
                      >
                        <Icon className={cn("h-4 w-4", cfg.color)} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                            {cfg.label}
                          </span>
                          <span className="text-[11px] text-muted-light">
                            {formatTime(event.timestamp)}
                          </span>
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                          <Link
                            href={`/cases/${event.caseId}`}
                            className="text-sm font-semibold text-navy transition-colors hover:text-medical-blue"
                          >
                            {event.patientName}
                          </Link>
                          <span className="text-muted-light">·</span>
                          <span className="font-mono text-[11px] text-muted">
                            {event.caseId.toUpperCase()}
                          </span>
                        </div>
                        {event.detail && (
                          <p className="mt-1 text-xs leading-relaxed text-muted">
                            {event.detail}
                          </p>
                        )}
                      </div>

                      <div className="hidden shrink-0 text-right sm:block">
                        <p className="text-[11px] text-muted">
                          {event.performedBy}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

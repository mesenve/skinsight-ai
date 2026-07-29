"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Hash,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import { CLINICIAN_PHOTO } from "@/lib/patient-photos";
import { activityLog } from "@/lib/activity-data";
import { useCases } from "@/context/CasesContext";
import { PatientIdPhoto } from "@/components/shared/PatientIdPhoto";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Cases Reviewed",
    value: "248",
    icon: ShieldCheck,
    accent: "blue",
    trend: "This month: 31",
  },
  {
    label: "AI Scans Run",
    value: "186",
    icon: Bot,
    accent: "cyan",
    trend: "Avg. 6 per day",
  },
  {
    label: "Cases Approved",
    value: "197",
    icon: CheckCircle2,
    accent: "green",
    trend: "79% approval rate",
  },
  {
    label: "Avg. Review Time",
    value: "4.2m",
    icon: Clock,
    accent: "navy",
    trend: "Per case",
  },
];

const accentConfig: Record<
  string,
  { icon: string; surface: string; glow: string }
> = {
  blue: {
    icon: "bg-medical-blue/6 text-medical-blue",
    surface: "bg-gradient-to-br from-medical-blue/[0.05] via-white to-white",
    glow: "bg-medical-blue/10",
  },
  cyan: {
    icon: "bg-cyan-accent/8 text-cyan-accent",
    surface: "bg-gradient-to-br from-cyan-accent/[0.05] via-white to-white",
    glow: "bg-cyan-accent/10",
  },
  green: {
    icon: "bg-risk-low/6 text-risk-low",
    surface: "bg-gradient-to-br from-risk-low/[0.05] via-white to-white",
    glow: "bg-risk-low/10",
  },
  navy: {
    icon: "bg-navy/6 text-navy",
    surface: "bg-gradient-to-br from-navy/[0.04] via-white to-white",
    glow: "bg-navy/10",
  },
};

const specializations = [
  "Dermoscopy",
  "Melanoma Detection",
  "Pediatric Dermatology",
  "Contact Dermatitis",
  "Mohs Surgery",
];

const recentActivity = activityLog.slice(0, 5);

const monthlyData = [
  { month: "Feb", cases: 18 },
  { month: "Mar", cases: 24 },
  { month: "Apr", cases: 21 },
  { month: "May", cases: 29 },
  { month: "Jun", cases: 26 },
  { month: "Jul", cases: 31 },
];

const eventLabels: Record<string, string> = {
  ai_scan_run: "AI scan completed",
  case_opened: "submitted for review",
  case_approved: "reviewed and approved",
  new_scan_requested: "re-scan requested",
  doctor_note_added: "notes updated",
  report_generated: "report exported",
  case_created: "case registered",
};

function RecentActivityPanel({ className }: { className?: string }) {
  const { getCaseById } = useCases();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
      className={cn(
        "smooth-card flex h-full flex-col rounded-2xl p-5",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-medical-blue" />
          <p className="section-label">Recent Activity</p>
        </div>
        <Link
          href="/activity"
          className="text-[11px] font-semibold text-medical-blue transition-opacity hover:opacity-70"
        >
          View all
        </Link>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-between">
        <div className="divide-y divide-border-subtle/50">
          {recentActivity.map((event) => {
            const patientCase = getCaseById(event.caseId);
            const avatarUrl = patientCase?.avatarUrl;
            return (
              <Link
                key={event.id}
                href={`/cases/${event.caseId}`}
                className="group flex items-center gap-3 py-2.5 transition-colors first:pt-0 last:pb-0"
              >
                <PatientIdPhoto
                  src={avatarUrl}
                  alt={event.patientName}
                  size="sm"
                  className="!h-8 !w-8 rounded-full"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy group-hover:text-medical-blue">
                    {event.patientName}
                  </p>
                  <p className="truncate text-[11px] text-muted">
                    Case #{event.caseId.toUpperCase().replace("CASE-", "C-")}{" "}
                    {eventLabels[event.type] ?? event.type}
                  </p>
                </div>
                <span className="hidden shrink-0 text-[10px] text-muted sm:block">
                  {new Date(event.timestamp).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </Link>
            );
          })}
        </div>
        <Link
          href="/activity"
          className="mt-3 flex items-center justify-center gap-1 border-t border-border-subtle/60 pt-3 text-xs font-semibold text-medical-blue transition-opacity hover:opacity-70"
        >
          View full activity log →
        </Link>
      </div>
    </motion.div>
  );
}

function CaseVolumeTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const value = payload[0]?.value;

  return (
    <div className="rounded-xl border border-border-subtle/80 bg-white px-3 py-2 shadow-[var(--shadow-soft)]">
      <p className="text-[11px] font-medium text-navy">{label}</p>
      <p className="mt-0.5 text-[11px] font-normal text-muted">
        Cases: <span className="font-medium text-medical-blue">{value}</span>
      </p>
    </div>
  );
}

function CaseVolumeChart({ data }: { data: typeof monthlyData }) {
  const {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } = require("recharts");

  return (
    <div className="flex h-full min-h-[220px] w-full flex-col">
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 18, right: 10, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id="caseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2d6cb5" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#2d6cb5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="2 6"
              stroke="#e8ecf1"
              vertical={false}
              strokeOpacity={0.9}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#8c95a6", fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#8c95a6", fontWeight: 400 }}
              domain={[0, 50]}
              ticks={[0, 10, 20, 30, 40, 50]}
              width={28}
            />
            <Tooltip
              cursor={{ stroke: "#2d6cb5", strokeWidth: 1, strokeDasharray: "3 3", strokeOpacity: 0.35 }}
              content={<CaseVolumeTooltip />}
            />
            <Area
              type="monotone"
              dataKey="cases"
              stroke="#2d6cb5"
              strokeWidth={1.5}
              fill="url(#caseGradient)"
              dot={{ r: 3, fill: "#fff", stroke: "#2d6cb5", strokeWidth: 1.5 }}
              activeDot={{ r: 4.5, fill: "#2d6cb5", stroke: "#fff", strokeWidth: 1.5 }}
              label={{
                position: "top",
                fontSize: 10,
                fontWeight: 600,
                fill: "#5b6574",
                offset: 8,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 border-t border-border-subtle/50 pt-3">
        <span className="h-px w-4 rounded-full bg-medical-blue-light" />
        <span className="text-[11px] font-medium tracking-wide text-muted">
          Cases
        </span>
      </div>
    </div>
  );
}

export function ProfileContent() {
  return (
    <div className="space-y-5">
      <div className="grid items-stretch gap-4 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="smooth-card flex h-full flex-col overflow-hidden rounded-2xl lg:col-span-7"
        >
          <div className="h-20 bg-gradient-to-br from-medical-blue/12 via-cyan-accent/10 to-medical-blue/5" />
          <div className="flex flex-1 flex-col px-5 pb-5">
            <div className="-mt-10 flex items-end gap-3">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-4 ring-white shadow-[var(--shadow-soft)]">
                <Image
                  src={CLINICIAN_PHOTO}
                  alt="Dr. Maya Laurent"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="min-w-0 pb-1">
                <h2 className="font-display truncate text-lg font-bold tracking-tight text-navy">
                  Dr. Maya Laurent
                </h2>
                <p className="text-xs text-muted">Consultant Dermatologist</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-risk-low animate-pulse-dot" />
                  <span className="text-[11px] font-semibold text-risk-low">
                    On duty
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid flex-1 grid-cols-2 content-start gap-2.5 sm:grid-cols-4">
              {[
                { icon: Hash, label: "License", value: "DRM-2019-4471" },
                { icon: Stethoscope, label: "Department", value: "Dermatology" },
                {
                  icon: Building2,
                  label: "Hospital",
                  value: "St. Elara Medical",
                },
                { icon: CalendarCheck, label: "Since", value: "March 2019" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-2 rounded-xl bg-background/60 px-3 py-2.5"
                >
                  <item.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-medical-blue/60" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                      {item.label}
                    </p>
                    <p className="mt-0.5 truncate text-xs font-semibold text-navy">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border-subtle/60 pt-3">
              {specializations.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border-subtle bg-background/70 px-2.5 py-0.5 text-[10px] font-semibold text-navy"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid h-full auto-rows-fr grid-cols-2 gap-4 lg:col-span-5">
          {stats.map((stat, i) => {
            const cfg = accentConfig[stat.accent];
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className={cn(
                  "interactive-card relative flex h-full min-h-[8rem] flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-[var(--shadow-soft)] sm:p-5",
                  cfg.surface
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl",
                    cfg.glow
                  )}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <p className="section-label">{stat.label}</p>
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                      cfg.icon
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="relative mt-auto pt-4">
                  <p className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] text-muted sm:text-xs">
                    {stat.trend}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="smooth-card flex h-full min-h-[22rem] flex-col rounded-2xl p-5 lg:col-span-7"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-medical-blue" />
              <p className="section-label">Monthly Case Volume</p>
            </div>
            <span className="rounded-full border border-border-subtle bg-background/70 px-3 py-1 text-[10px] font-semibold text-muted">
              Last 6 months
            </span>
          </div>
          <div className="min-h-0 flex-1">
            <CaseVolumeChart data={monthlyData} />
          </div>
        </motion.div>

        <RecentActivityPanel className="lg:col-span-5" />
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  ClipboardList,
  Plus,
  Users,
} from "lucide-react";
import {
  filterMergedCases,
  getDashboardStatsFromCases,
} from "@/lib/case-repository";
import type { QueueFilter } from "@/lib/types";
import { useCases } from "@/context/CasesContext";
import { buttonStyles } from "@/components/ui/Button";
import { StatCard } from "./StatCard";
import { QueueSearch } from "./QueueSearch";
import { PatientQueueTable } from "./PatientQueueTable";

const filterLabels: Record<QueueFilter, string> = {
  all: "Incoming Cases",
  high_risk: "High Risk Cases",
  follow_up: "Follow-up Cases",
  doctor_review: "Waiting Review",
};

export function DashboardContent() {
  const [filter, setFilter] = useState<QueueFilter>("all");
  const [search, setSearch] = useState("");
  const { cases } = useCases();
  const stats = useMemo(() => getDashboardStatsFromCases(cases), [cases]);

  const queueCases = useMemo(
    () => filterMergedCases(cases, search, filter),
    [cases, search, filter]
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="section-label">Queue Overview</p>
            <h2 className="font-display mt-1 text-lg font-bold text-navy">
              Today&apos;s Triage Summary
            </h2>
          </div>
          <p className="hidden text-xs text-muted sm:block">
            Click a card to filter the queue
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Cases"
            value={stats.totalCases}
            icon={Users}
            accent="green"
            trend="Active in queue"
            index={0}
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <StatCard
            label="High Risk"
            value={stats.highRisk}
            icon={AlertTriangle}
            accent="red"
            trend="Needs priority review"
            index={1}
            active={filter === "high_risk"}
            onClick={() => setFilter("high_risk")}
          />
          <StatCard
            label="Waiting Review"
            value={stats.waitingReview}
            icon={ClipboardList}
            accent="blue"
            trend="Clinician verification pending"
            index={2}
            active={filter === "doctor_review"}
            onClick={() => setFilter("doctor_review")}
          />
          <StatCard
            label="Follow-up Today"
            value={stats.followUpToday}
            icon={CalendarClock}
            accent="cyan"
            trend="Scheduled check-ins"
            index={3}
            active={filter === "follow_up"}
            onClick={() => setFilter("follow_up")}
          />
        </div>
      </div>

      <div>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="section-label">Patient Queue</p>
            <h2 className="font-display mt-1 text-lg font-bold text-navy">
              {filterLabels[filter]}
            </h2>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <QueueSearch value={search} onChange={setSearch} />
            <Link
              href="/cases/new"
              className={buttonStyles({ variant: "primary", size: "md", className: "w-full sm:w-auto" })}
            >
              <Plus className="h-4 w-4" />
              New case
            </Link>
          </div>
        </div>

        <PatientQueueTable cases={queueCases} />
      </div>
    </div>
  );
}

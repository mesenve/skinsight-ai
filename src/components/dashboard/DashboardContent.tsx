"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  ClipboardList,
  Users,
} from "lucide-react";
import { filterCases, getDashboardStats } from "@/lib/mock-data";
import type { QueueFilter } from "@/lib/types";
import { StatCard } from "./StatCard";
import { QueueFilters } from "./QueueFilters";
import { QueueSearch } from "./QueueSearch";
import { PatientQueueTable } from "./PatientQueueTable";

export function DashboardContent() {
  const [filter, setFilter] = useState<QueueFilter>("all");
  const [search, setSearch] = useState("");
  const stats = getDashboardStats();

  const cases = useMemo(
    () => filterCases(search, filter),
    [search, filter]
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
            Updated just now · Mock clinic data
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Cases"
            value={stats.totalCases}
            icon={Users}
            accent="navy"
            trend="Active in queue"
            index={0}
          />
          <StatCard
            label="High Risk"
            value={stats.highRisk}
            icon={AlertTriangle}
            accent="red"
            trend="Needs priority review"
            index={1}
          />
          <StatCard
            label="Waiting Review"
            value={stats.waitingReview}
            icon={ClipboardList}
            accent="blue"
            trend="Clinician verification pending"
            index={2}
          />
          <StatCard
            label="Follow-up Today"
            value={stats.followUpToday}
            icon={CalendarClock}
            accent="cyan"
            trend="Scheduled check-ins"
            index={3}
          />
        </div>
      </div>

      <div>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="section-label">Patient Queue</p>
            <h2 className="font-display mt-1 text-lg font-bold text-navy">
              Incoming Cases
            </h2>
          </div>
          <QueueSearch value={search} onChange={setSearch} />
        </div>

        <div className="mb-4">
          <QueueFilters active={filter} onChange={setFilter} />
        </div>

        <PatientQueueTable cases={cases} />
      </div>
    </div>
  );
}

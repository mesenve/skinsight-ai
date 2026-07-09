"use client";

import type { QueueFilter } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: { id: QueueFilter; label: string }[] = [
  { id: "all", label: "All Cases" },
  { id: "high_risk", label: "High Risk" },
  { id: "follow_up", label: "Follow-up Needed" },
  { id: "doctor_review", label: "Doctor Review" },
];

interface QueueFiltersProps {
  active: QueueFilter;
  onChange: (filter: QueueFilter) => void;
}

export function QueueFilters({ active, onChange }: QueueFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onChange(filter.id)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            active === filter.id
              ? "bg-navy text-white shadow-md shadow-navy/15"
              : "smooth-card bg-white text-muted hover:text-navy"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

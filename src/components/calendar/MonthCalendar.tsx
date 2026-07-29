"use client";

import { DayPicker, type DayButtonProps } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/lib/types";
import "react-day-picker/style.css";

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDayTone(events: CalendarEvent[]) {
  if (events.some((e) => e.priority === "high")) return "high";
  if (events.some((e) => e.type === "new_scan_requested")) return "rescan";
  if (events.length > 0) return "followup";
  return null;
}

interface MonthCalendarProps {
  selected: Date;
  onSelect: (date: Date) => void;
  events?: CalendarEvent[];
  className?: string;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  showLegend?: boolean;
  compact?: boolean;
  disabledBefore?: Date;
}

export function MonthCalendar({
  selected,
  onSelect,
  events = [],
  className,
  month,
  onMonthChange,
  showLegend = true,
  compact = false,
  disabledBefore,
}: MonthCalendarProps) {
  const eventsByDate = events.reduce<Record<string, CalendarEvent[]>>((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {});

  const followUpDates = events
    .filter((e) => e.type === "follow_up" && e.priority !== "high")
    .map((e) => new Date(e.date + "T12:00:00"));
  const reScanDates = events
    .filter((e) => e.type === "new_scan_requested")
    .map((e) => new Date(e.date + "T12:00:00"));
  const highRiskDates = events
    .filter((e) => e.priority === "high")
    .map((e) => new Date(e.date + "T12:00:00"));

  function DayButton(props: DayButtonProps) {
    const { day, modifiers, ...buttonProps } = props;
    const key = toDateKey(day.date);
    const dayEvents = eventsByDate[key] ?? [];
    const tone = getDayTone(dayEvents);
    const count = dayEvents.length;

    return (
      <button
        {...buttonProps}
        type="button"
        className={cn(
          "relative flex w-full flex-col items-center justify-center rounded-xl text-sm font-semibold text-navy transition-all",
          compact ? "h-11" : "h-12",
          "bg-background/50 hover:bg-background hover:shadow-[var(--shadow-soft)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue/30",
          modifiers.selected &&
            "bg-medical-blue text-white shadow-md shadow-medical-blue/20 hover:bg-medical-blue hover:text-white",
          modifiers.today &&
            !modifiers.selected &&
            "ring-1 ring-medical-blue/35 bg-medical-blue/[0.06] text-medical-blue",
          buttonProps.className
        )}
      >
        <span className={cn(compact ? "text-[13px]" : undefined)}>{day.date.getDate()}</span>
        {count > 0 && (
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-full font-bold leading-none",
              compact
                ? "mt-0.5 h-3.5 min-w-3.5 px-0.5 text-[8px]"
                : "mt-0.5 h-4 min-w-4 px-1 text-[9px]",
              tone === "high" &&
                (modifiers.selected
                  ? "bg-white/25 text-white"
                  : "bg-risk-high/15 text-risk-high"),
              tone === "rescan" &&
                (modifiers.selected
                  ? "bg-white/25 text-white"
                  : "bg-risk-medium/15 text-risk-medium"),
              tone === "followup" &&
                (modifiers.selected
                  ? "bg-white/25 text-white"
                  : "bg-medical-blue/12 text-medical-blue")
            )}
          >
            {count}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={cn("skinsight-daypicker w-full", compact && "skinsight-daypicker-compact", className)}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(date) => {
          if (date) onSelect(date);
        }}
        month={month}
        onMonthChange={onMonthChange}
        modifiers={{
          followUp: followUpDates,
          reScan: reScanDates,
          highRisk: highRiskDates,
        }}
        disabled={
          disabledBefore
            ? {
                before: new Date(
                  disabledBefore.getFullYear(),
                  disabledBefore.getMonth(),
                  disabledBefore.getDate()
                ),
              }
            : undefined
        }
        showOutsideDays={false}
        components={{
          DayButton,
          Chevron: ({ orientation }) =>
            orientation === "left" ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            ),
        }}
        classNames={{
          root: "!w-full",
          months: "w-full",
          month: cn("w-full", compact ? "space-y-2.5" : "space-y-3"),
          month_caption: cn(
            "relative flex items-center justify-center",
            compact ? "mb-0 h-9" : "mb-1 h-10"
          ),
          caption_label: cn(
            "font-display font-bold text-navy",
            compact ? "text-[15px]" : "text-base"
          ),
          nav: "absolute inset-x-0 top-0 flex items-center justify-between",
          button_previous:
            "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-background hover:text-navy",
          button_next:
            "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-background hover:text-navy",
          month_grid: cn(
            "w-full overflow-hidden rounded-2xl border border-border-subtle/80 bg-white",
            compact && "rounded-xl"
          ),
          weekdays: cn(
            "grid w-full grid-cols-7 border-b border-border-subtle/70 bg-transparent",
            compact ? "px-1.5 pb-2 pt-1.5" : "px-1.5 pb-2.5 pt-1"
          ),
          weekday:
            "bg-transparent text-center text-[10px] font-semibold uppercase tracking-widest text-muted",
          weeks: "w-full",
          week: cn(
            "calendar-week grid w-full grid-cols-7",
            compact ? "gap-1.5 px-1.5 py-1.5" : "gap-1.5 px-1.5 py-1.5"
          ),
          day: "relative flex w-full items-center justify-center",
          day_button: "",
          selected: "",
          today: "",
          outside: "opacity-40",
          disabled: "opacity-30",
        }}
      />

      {showLegend && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 rounded-xl bg-background/60 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-medical-blue" />
            <span className="text-[11px] font-medium text-muted">Follow-up</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-risk-medium" />
            <span className="text-[11px] font-medium text-muted">Re-scan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-risk-high" />
            <span className="text-[11px] font-medium text-muted">High-risk</span>
          </div>
        </div>
      )}
    </div>
  );
}

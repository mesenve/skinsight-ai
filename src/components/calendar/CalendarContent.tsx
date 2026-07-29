"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarClock,
  CalendarDays,
  CircleAlert,
  X,
  Clock,
  RefreshCw,
  ScanLine,
} from "lucide-react";
import { calendarEvents } from "@/lib/activity-data";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { PatientIdPhoto } from "@/components/shared/PatientIdPhoto";
import { MonthCalendar } from "@/components/calendar/MonthCalendar";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { useCases } from "@/context/CasesContext";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/lib/types";

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateKey(dateKey: string) {
  return new Date(dateKey + "T12:00:00");
}

function formatAppointmentTime(time: string) {
  const [hourStr, minStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minStr} ${ampm}`;
}

function RescheduleModal({
  event,
  onClose,
}: {
  event: CalendarEvent;
  onClose: () => void;
}) {
  const baseDate = parseDateKey(event.date);
  const earliestDate = baseDate;
  const [month, setMonth] = useState(baseDate);
  const [selectedDate, setSelectedDate] = useState(baseDate);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [customTime, setCustomTime] = useState("");
  const [reason, setReason] = useState("Patient requested a new time");
  const [notifyPatient, setNotifyPatient] = useState(true);

  const timeOptions = ["9:30", "10:00", "11:30", "14:00"];
  const reasonOptions = [
    {
      value: "Patient requested a new time",
      label: "Patient requested a new time",
    },
    {
      value: "Clinician availability changed",
      label: "Clinician availability changed",
    },
    {
      value: "Follow-up interval updated",
      label: "Follow-up interval updated",
    },
  ] as const;
  const effectiveTime = customTime || selectedTime;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-navy/20 p-3 backdrop-blur-sm sm:p-4">
      <div className="smooth-card flex max-h-[calc(100vh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_rgba(11,18,32,0.18)]">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border-subtle/60 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold tracking-tight text-navy">
              Reschedule appointment
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted">
              {event.patientName} · {event.type === "follow_up" ? "Follow-up" : "Re-scan"} ·{" "}
              {event.lesionLocation} · {event.mrn}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-background hover:text-navy"
            aria-label="Close reschedule modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="shrink-0 space-y-3 px-4 py-3 sm:px-5">
          <div className="space-y-2">
            <div className="grid gap-y-2 gap-x-1 rounded-xl bg-background/70 px-3 py-1.5 text-xs font-medium text-navy sm:grid-cols-[6.5rem_1fr] sm:items-center">
              <span className="section-label !normal-case tracking-wide">Current</span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-medical-blue" />
                  {baseDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-medical-blue" />
                  {formatAppointmentTime(event.time)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-medical-blue" />
                  {event.durationMin} min
                </span>
              </div>
            </div>

            <div className="grid gap-y-2 gap-x-1 rounded-xl border border-risk-low/15 bg-risk-low/[0.08] px-3 py-1.5 text-xs font-medium text-navy sm:grid-cols-[6.5rem_1fr] sm:items-center">
              <span className="section-label !normal-case tracking-wide text-risk-low">
                Rescheduled
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-risk-low" />
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-risk-low" />
                  {formatAppointmentTime(effectiveTime)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-risk-low" />
                  {event.durationMin} min
                </span>
              </div>
            </div>
          </div>

          <div className="grid items-stretch gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div className="flex min-h-0 flex-col">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
                New date
              </p>
              <div className="flex flex-1 flex-col rounded-xl border border-border-subtle/70 bg-white p-2.5 sm:p-3">
                <MonthCalendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={month}
                  onMonthChange={setMonth}
                  events={calendarEvents}
                  showLegend={false}
                  compact
                  disabledBefore={earliestDate}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5">
              <div className="space-y-5">
                <div>
                  <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Suggestion time
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          setSelectedTime(time);
                          setCustomTime("");
                        }}
                        className={cn(
                          "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all",
                          selectedTime === time && !customTime
                            ? "border-medical-blue bg-medical-blue text-white shadow-sm shadow-medical-blue/20"
                            : "border-border-subtle bg-white text-navy hover:border-medical-blue/30 hover:text-medical-blue"
                        )}
                      >
                        {formatAppointmentTime(time)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Custom time
                  </label>
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => {
                      setCustomTime(e.target.value);
                      if (e.target.value) setSelectedTime(e.target.value);
                    }}
                    className="w-full rounded-xl border border-border-subtle/80 bg-white px-3 py-2.5 text-sm text-navy outline-none transition-all focus:border-medical-blue/40 focus:shadow-[var(--shadow-soft)]"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Reason
                  </label>
                  <Select
                    value={reason}
                    onChange={setReason}
                    options={[...reasonOptions]}
                    aria-label="Reschedule reason"
                  />
                </div>

                <Switch
                  checked={notifyPatient}
                  onCheckedChange={setNotifyPatient}
                  label="Notify patient automatically"
                />
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-risk-high/15 bg-risk-high/5 px-3.5 py-3 text-xs leading-relaxed text-risk-high">
                <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <p>
                  {event.priority === "high"
                    ? "High-risk follow-up — avoid delays longer than 7 days."
                    : "Reminder: confirm the new appointment time with the patient before finalizing."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto flex shrink-0 justify-end gap-2 border-t border-border-subtle/60 px-4 py-3 sm:px-5">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="primary" size="md" onClick={onClose}>
            Confirm reschedule
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CalendarContent() {
  const today = new Date("2026-07-09");
  const { getCaseById } = useCases();
  const [month, setMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [rescheduleEvent, setRescheduleEvent] = useState<CalendarEvent | null>(null);

  const selectedDateKey = toDateKey(selectedDate);
  const todayKey = toDateKey(today);

  const eventsByDate = useMemo(
    () =>
      calendarEvents.reduce<Record<string, typeof calendarEvents>>((acc, ev) => {
        if (!acc[ev.date]) acc[ev.date] = [];
        acc[ev.date].push(ev);
        return acc;
      }, {}),
    []
  );

  const selectedEvents = [...(eventsByDate[selectedDateKey] ?? [])].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  const upcomingAll = calendarEvents
    .filter((e) => e.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="smooth-card rounded-2xl p-5 lg:col-span-3"
        >
          <MonthCalendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={month}
            onMonthChange={setMonth}
            events={calendarEvents}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="smooth-card rounded-2xl p-5 lg:col-span-2"
        >
          <div className="mb-4 flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-medical-blue" />
            <p className="section-label">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {selectedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarClock className="mb-2 h-7 w-7 text-muted-light" />
              <p className="text-sm font-semibold text-navy">
                No appointments
              </p>
              <p className="mt-0.5 text-xs text-muted">
                Select a marked date to see scheduled follow-ups.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedEvents.map((ev) => {
                const isFollowUp = ev.type === "follow_up";
                const timeLabel = formatAppointmentTime(ev.time);

                return (
                  <div
                    key={ev.id}
                    className="overflow-hidden rounded-xl border border-border-subtle/70 bg-background/50"
                  >
                    <div className="flex items-start gap-4 p-4">
                      <div className="min-w-[64px] text-right">
                        <p className="text-sm font-bold leading-none text-navy">
                          {timeLabel.split(" ")[0]}
                        </p>
                        <p className="text-[10px] font-semibold text-muted">
                          {timeLabel.split(" ")[1]}
                        </p>
                        <div className="mt-1.5 flex items-center justify-end gap-1 text-muted">
                          <Clock className="h-3 w-3" />
                          <span className="text-[10px]">{ev.durationMin} min</span>
                        </div>
                      </div>

                      <div className="w-px self-stretch bg-medical-blue/20" />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <PatientIdPhoto
                              src={getCaseById(ev.caseId)?.avatarUrl}
                              alt={ev.patientName}
                              size="sm"
                              className="!h-8 !w-8 rounded-full"
                            />
                            <p className="truncate text-sm font-bold text-navy">
                              {ev.patientName}
                            </p>
                          </div>
                          <RiskBadge level={ev.priority} showDot={false} />
                        </div>
                        <p className="mt-0.5 text-xs text-muted">
                          {ev.lesionLocation} · {ev.mrn}
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {isFollowUp ? (
                              <ScanLine className="h-3 w-3 text-medical-blue" />
                            ) : (
                              <RefreshCw className="h-3 w-3 text-risk-medium" />
                            )}
                            <span
                              className={cn(
                                "text-[11px] font-semibold",
                                isFollowUp ? "text-medical-blue" : "text-risk-medium"
                              )}
                            >
                              {isFollowUp ? "Follow-up" : "Re-scan"}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setRescheduleEvent(ev)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-white px-3 py-1.5 text-[11px] font-semibold text-navy shadow-[var(--shadow-soft)] transition-colors hover:border-risk-medium/30 hover:text-risk-medium"
                          >
                            <CalendarClock className="h-3 w-3" />
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <p className="pt-1 text-left text-[10px] text-muted">
                All times shown in local time (UTC+3)
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="smooth-card rounded-2xl p-5"
      >
        <div className="mb-4 flex items-center gap-2">
          <p className="section-label">Upcoming Schedule</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle/60">
                {["Date & Time", "Patient", "Type", "Location", "MRN", "Priority", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="section-label pb-3 pr-6 text-[10px] font-semibold"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/40">
              {upcomingAll.map((ev) => (
                <tr
                  key={ev.id}
                  className="group transition-colors hover:bg-background/50"
                >
                  <td className="py-3 pr-6">
                    <span
                      className={cn(
                        "block font-medium",
                        ev.date === todayKey ? "text-medical-blue" : "text-navy"
                      )}
                    >
                      {parseDateKey(ev.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      {ev.date === todayKey && (
                        <span className="ml-1.5 rounded-full bg-medical-blue/10 px-1.5 py-0.5 text-[10px] font-bold text-medical-blue">
                          Today
                        </span>
                      )}
                    </span>
                    <span className="text-[11px] text-muted">{ev.time}</span>
                  </td>
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-3">
                      <PatientIdPhoto
                        src={getCaseById(ev.caseId)?.avatarUrl}
                        alt={ev.patientName}
                        size="sm"
                        className="!h-9 !w-9 rounded-full"
                      />
                      <span className="font-semibold text-navy">{ev.patientName}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-6">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        ev.type === "follow_up"
                          ? "bg-medical-blue/8 text-medical-blue"
                          : "bg-risk-medium/8 text-risk-medium"
                      )}
                    >
                      {ev.type === "follow_up" ? (
                        <ScanLine className="h-3 w-3" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                      {ev.type === "follow_up" ? "Follow-up" : "Re-scan"}
                    </span>
                  </td>
                  <td className="py-3 pr-6 text-muted">{ev.lesionLocation}</td>
                  <td className="py-3 pr-6 font-mono text-xs text-muted">
                    {ev.mrn}
                  </td>
                  <td className="py-3 pr-6">
                    <RiskBadge level={ev.priority} showDot={false} />
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/cases/${ev.caseId}`}
                      className="text-xs font-semibold text-medical-blue opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {rescheduleEvent ? (
        <RescheduleModal
          event={rescheduleEvent}
          onClose={() => setRescheduleEvent(null)}
        />
      ) : null}
    </div>
  );
}

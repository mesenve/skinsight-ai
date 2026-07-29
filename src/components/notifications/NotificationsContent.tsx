"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  BellOff,
  CalendarClock,
  CheckCheck,
  Info,
} from "lucide-react";
import { notifications as initialNotifications } from "@/lib/activity-data";
import type { AppNotification, NotificationLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

const levelConfig: Record<
  NotificationLevel,
  { icon: typeof Bell; color: string; bg: string; label: string }
> = {
  high: {
    icon: AlertTriangle,
    color: "text-risk-high",
    bg: "bg-risk-high/8",
    label: "Urgent",
  },
  info: {
    icon: Info,
    color: "text-medical-blue",
    bg: "bg-medical-blue/8",
    label: "Info",
  },
  reminder: {
    icon: CalendarClock,
    color: "text-risk-medium",
    bg: "bg-risk-medium/8",
    label: "Reminder",
  },
};

function formatTime(iso: string) {
  const date = new Date(iso);
  const now = new Date("2026-07-09T12:00:00Z");
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

type FilterType = "all" | "unread" | NotificationLevel;

export function NotificationsContent() {
  const [items, setItems] = useState<AppNotification[]>(initialNotifications);
  const [filter, setFilter] = useState<FilterType>("all");

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filtered = items.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "all") return true;
    return n.level === filter;
  });

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "unread", label: `Unread (${unreadCount})` },
    { value: "high", label: "Urgent" },
    { value: "reminder", label: "Reminders" },
    { value: "info", label: "Info" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
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

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-medical-blue transition-opacity hover:opacity-70"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark all as read
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="smooth-card flex flex-col items-center justify-center rounded-2xl py-24 text-center"
        >
          <BellOff className="mb-3 h-8 w-8 text-muted-light" />
          <p className="text-sm font-semibold text-navy">
            No notifications here
          </p>
          <p className="mt-1 text-xs text-muted">
            You&apos;re all caught up.
          </p>
        </motion.div>
      ) : (
        <div className="smooth-card divide-y divide-border-subtle/60 overflow-hidden rounded-2xl">
          {filtered.map((notif, i) => {
            const cfg = levelConfig[notif.level];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className={cn(
                  "flex items-start gap-4 px-5 py-4 transition-colors",
                  !notif.read && "bg-medical-blue/[0.025]"
                )}
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
                    <span
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wider",
                        cfg.color
                      )}
                    >
                      {cfg.label}
                    </span>
                    <span className="text-[11px] text-muted-light">
                      {formatTime(notif.timestamp)}
                    </span>
                    {!notif.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-medical-blue" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm font-semibold text-navy">
                    {notif.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    {notif.body}
                  </p>
                  {notif.caseId && (
                    <Link
                      href={`/cases/${notif.caseId}`}
                      onClick={() => markRead(notif.id)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-medical-blue transition-opacity hover:opacity-70"
                    >
                      View case →
                    </Link>
                  )}
                </div>

                {!notif.read && (
                  <button
                    type="button"
                    onClick={() => markRead(notif.id)}
                    title="Mark as read"
                    className="mt-1 shrink-0 text-muted-light transition-colors hover:text-medical-blue"
                  >
                    <CheckCheck className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

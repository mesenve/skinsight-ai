"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { CLINICIAN_PHOTO } from "@/lib/patient-photos";
import { notifications } from "@/lib/activity-data";
import { loadClinicianProfile } from "@/lib/clinician-profile";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

const utilitySurface =
  "border border-border-subtle/70 bg-white/90 shadow-[var(--shadow-soft)] transition-all duration-200 hover:shadow-[var(--shadow-hover)]";

export function Header({ title, subtitle, breadcrumb }: HeaderProps) {
  const pathname = usePathname();
  const notifActive = pathname === "/notifications";
  const profileActive = pathname === "/profile";
  const unreadCount = notifications.filter((n) => !n.read).length;
  const unreadLabel =
    unreadCount > 9 ? "9+" : unreadCount > 0 ? String(unreadCount) : null;

  const [clinicianName, setClinicianName] = useState("Dr. Maya Laurent");
  const [clinicianMeta, setClinicianMeta] = useState("Dermatology · On duty");

  useEffect(() => {
    const profile = loadClinicianProfile();
    if (!profile) return;
    setClinicianName(profile.fullName);
    setClinicianMeta(`${profile.clinicName} · On duty`);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/75 shadow-[0_1px_0_rgba(11,18,32,0.04)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3 px-4 py-4 sm:items-center sm:px-6 lg:px-10">
        <div className="min-w-0 flex-1 pl-12 lg:pl-0">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="mb-1.5 flex flex-wrap items-center gap-1.5 text-xs text-muted">
              {breadcrumb.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-muted-light">/</span>}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-medical-blue"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-navy">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="font-display text-xl font-bold tracking-tight text-navy sm:text-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 max-w-xl text-sm text-muted">{subtitle}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 pt-0.5 sm:gap-2.5 sm:pt-0">
          <Link
            href="/notifications"
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-xl",
              utilitySurface,
              notifActive
                ? "border-medical-blue/25 bg-medical-blue/8 text-medical-blue ring-1 ring-medical-blue/20"
                : "text-muted hover:text-navy"
            )}
            aria-label={
              unreadCount > 0
                ? `Notifications, ${unreadCount} unread`
                : "Notifications"
            }
          >
            <Bell className="h-[18px] w-[18px]" />
            {unreadLabel && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-risk-high px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
                {unreadLabel}
              </span>
            )}
          </Link>

          <Link
            href="/profile"
            className={cn(
              "flex h-10 items-center gap-2.5 rounded-xl px-2.5 sm:gap-3 sm:px-3",
              utilitySurface,
              profileActive &&
                "border-medical-blue/25 bg-medical-blue/[0.04] ring-1 ring-medical-blue/20"
            )}
          >
            <div className="relative h-7 w-7 shrink-0">
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-[#cfd8e3] ring-1 ring-border-subtle/80">
                <Image
                  src={CLINICIAN_PHOTO}
                  alt={clinicianName}
                  fill
                  className="object-cover object-top"
                  sizes="28px"
                />
              </div>
              <span
                className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-risk-low ring-2 ring-white"
                title="On duty"
                aria-label="On duty"
              />
            </div>
            <div className="hidden min-w-0 text-left sm:block">
              <p className="truncate text-sm font-semibold leading-tight text-navy">
                {clinicianName}
              </p>
              <p className="truncate text-[11px] text-muted">{clinicianMeta}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

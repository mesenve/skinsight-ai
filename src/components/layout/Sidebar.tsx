"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CalendarClock,
  Info,
  LayoutDashboard,
  Menu,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { LogoMark } from "@/components/shared/LogoMark";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calendar", label: "Calendar", icon: CalendarClock },
  { href: "/activity", label: "Activity Log", icon: Activity },
  { href: "/onboarding", label: "Onboarding", icon: UserPlus },
];

const demoCaseItem = { href: "/cases/case-001", label: "Demo Case", icon: Activity };
const aboutItem = { href: "/about", label: "About", icon: Info };

function isNavActive(pathname: string, href: string, label: string) {
  if (label === "Dashboard") return pathname === "/app";
  if (label === "Demo Case") return pathname.startsWith("/cases");
  if (label === "Onboarding") return pathname.startsWith("/onboarding");
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  isActive: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-white text-navy shadow-[var(--shadow-soft)] ring-1 ring-border-subtle/80"
          : "text-muted hover:bg-white/55 hover:text-navy"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          isActive
            ? "text-medical-blue"
            : "text-muted-light group-hover:text-medical-blue/70"
        )}
      />
      {label}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  const content = (
    <>
      <div className="border-b border-border-subtle/70 pb-6">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark size={40} className="shadow-medical-blue/15" />
          <div>
            <p className="font-display text-sm font-bold tracking-tight text-navy">
              SkinSight AI
            </p>
            <p className="text-[11px] font-medium text-muted">
              Dermatology Triage
            </p>
          </div>
        </Link>
      </div>

      <nav className="mt-6 flex flex-col gap-1">
        <p className="section-label mb-2 px-3">Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={isNavActive(pathname, item.href, item.label)}
            onNavigate={closeMobile}
          />
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-border-subtle/70 pt-4">
        <NavLink
          href={demoCaseItem.href}
          label={demoCaseItem.label}
          icon={demoCaseItem.icon}
          isActive={isNavActive(pathname, demoCaseItem.href, demoCaseItem.label)}
          onNavigate={closeMobile}
        />
        <NavLink
          href={aboutItem.href}
          label={aboutItem.label}
          icon={aboutItem.icon}
          isActive={isNavActive(pathname, aboutItem.href, aboutItem.label)}
          onNavigate={closeMobile}
        />

        <div className="smooth-inset mt-2 rounded-xl border border-border-subtle/60 p-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-medical-blue animate-pulse-dot" />
            <p className="text-xs font-semibold text-navy">
              Decision support only
            </p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-muted">
            AI-assisted review for clinician verification. Not a substitute for
            professional medical judgment.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-border-subtle/60 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-navy" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/20 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[14.5rem] flex-col border-r border-border-subtle/80 bg-white/75 px-4 py-6 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          type="button"
          onClick={closeMobile}
          className="absolute right-4 top-4 text-muted-light transition-colors hover:text-navy lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        {content}
      </aside>
    </>
  );
}

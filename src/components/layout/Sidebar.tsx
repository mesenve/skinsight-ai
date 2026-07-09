"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Info,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cases/case-001", label: "Cases", icon: Activity },
  { href: "/about", label: "About", icon: Info },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <>
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-medical-blue to-medical-blue-light text-white shadow-lg shadow-medical-blue/25">
          <Activity className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-navy-soft bg-cyan-accent" />
        </div>
        <div>
          <p className="font-display text-sm font-bold tracking-tight text-white">
            SkinSight AI
          </p>
          <p className="text-[11px] font-medium text-white/40">
            Dermatology Triage
          </p>
        </div>
      </div>

      <nav className="mt-10 flex flex-col gap-1">
        <p className="mb-2 px-3 section-label text-white/30">Navigation</p>
        {navItems.map((item) => {
          const isActive =
            item.label === "Dashboard"
              ? pathname === "/"
              : item.label === "Cases"
                ? pathname.startsWith("/cases")
                : pathname === "/about";
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  isActive ? "text-cyan-accent" : "text-white/40 group-hover:text-white/60"
                )}
              />
              {item.label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-accent" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl bg-white/5 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent animate-pulse-dot" />
          <p className="text-xs font-semibold text-white/70">
            Decision support only
          </p>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-white/35">
          AI-assisted review for clinician verification. Not a substitute for
          professional medical judgment.
        </p>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-navy" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[17.5rem] flex-col border-r border-white/5 bg-navy p-6 transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute right-4 top-4 text-white/40 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        {content}
      </aside>
    </>
  );
}

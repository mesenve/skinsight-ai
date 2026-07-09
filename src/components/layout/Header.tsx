"use client";

import Link from "next/link";

interface HeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function Header({ title, subtitle, breadcrumb }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/75 shadow-[0_1px_0_rgba(11,18,32,0.04)] backdrop-blur-xl">
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <div className="pl-12 lg:pl-0">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="mb-1.5 flex items-center gap-1.5 text-xs text-muted">
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
            <p className="mt-1 text-sm text-muted">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="smooth-card flex items-center gap-3 rounded-xl py-1.5 pl-4 pr-1.5">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-navy">Dr. Maya Laurent</p>
              <p className="text-[11px] text-muted">Dermatology · On duty</p>
            </div>
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-medical-blue to-medical-blue-light text-xs font-bold text-white">
              ML
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-risk-high ring-2 ring-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

import { AlertTriangle, ClipboardList, Users } from "lucide-react";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { caseStudyHero, caseStudyMeta } from "@/lib/case-study-data";
import { cn } from "@/lib/utils";

function DashboardPreview() {
  return (
    <div className="smooth-card overflow-hidden rounded-2xl border border-border-subtle/80">
      <div className="border-b border-border-subtle/70 bg-background/50 px-4 py-3">
        <p className="section-label">Queue Overview</p>
        <p className="font-display mt-0.5 text-sm font-bold text-navy">
          Today&apos;s Triage Summary
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {[
          { label: "Total", value: "10", accent: "text-risk-low" },
          { label: "High Risk", value: "3", accent: "text-risk-high" },
          { label: "Waiting", value: "5", accent: "text-medical-blue" },
        ].map((stat) => (
          <div key={stat.label} className="smooth-inset rounded-xl p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              {stat.label}
            </p>
            <p className={cn("font-display mt-1 text-xl font-bold", stat.accent)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-border-subtle/70 p-3">
        <div className="smooth-inset flex items-center gap-3 rounded-xl p-3">
          <div className="flex h-10 w-8 shrink-0 items-center justify-center rounded-sm bg-[#cfd8e3]">
            <Users className="h-4 w-4 text-muted" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-navy">Elena Vasquez</p>
            <p className="text-[11px] text-muted">Left forearm · 2d waiting</p>
          </div>
          <RiskBadge level="high" />
        </div>
        <div className="mt-2 flex items-center gap-2 px-1 text-[10px] text-muted">
          <ClipboardList className="h-3 w-3" />
          <span>Awaiting Review</span>
          <span className="text-muted-light">·</span>
          <AlertTriangle className="h-3 w-3 text-risk-high" />
          <span>Recent change detected</span>
        </div>
      </div>
    </div>
  );
}

export function CaseHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border-subtle/70 bg-white shadow-[var(--shadow-soft)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 100% 0%, rgba(26,75,140,0.06) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 0% 100%, rgba(6,182,212,0.05) 0%, transparent 50%)",
        }}
      />
      <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
        <div>
          <p className="section-label">{caseStudyHero.eyebrow}</p>
          <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            {caseStudyHero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {caseStudyHero.description}
          </p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {caseStudyMeta.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border-subtle/70 bg-background/40 px-3 py-2.5"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-light">
                  {item.label}
                </dt>
                <dd className="mt-0.5 text-sm font-medium text-navy">{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-xs leading-relaxed text-muted-light">
            {caseStudyHero.disclaimer}
          </p>
        </div>

        <div className="lg:justify-self-end lg:max-w-md lg:w-full">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

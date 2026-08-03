import { AlertTriangle, ClipboardList, Users } from "lucide-react";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { caseStudyHero, caseStudyMeta } from "@/lib/case-study-data";
import { cn } from "@/lib/utils";

function DashboardPreview() {
  return (
    <div className="smooth-card overflow-hidden rounded-xl border border-border-subtle/80">
      <div className="border-b border-border-subtle/70 bg-background/50 px-3 py-2.5">
        <p className="section-label">Queue Overview</p>
      </div>
      <div className="grid grid-cols-3 gap-2 p-2.5">
        {[
          { label: "Total", value: "10", accent: "text-risk-low" },
          { label: "High", value: "3", accent: "text-risk-high" },
          { label: "Waiting", value: "5", accent: "text-medical-blue" },
        ].map((stat) => (
          <div key={stat.label} className="smooth-inset rounded-lg p-2.5">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-muted">
              {stat.label}
            </p>
            <p className={cn("font-display mt-0.5 text-lg font-bold", stat.accent)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-border-subtle/70 p-2.5">
        <div className="smooth-inset flex items-center gap-2.5 rounded-lg p-2.5">
          <div className="flex h-8 w-7 shrink-0 items-center justify-center rounded-sm bg-[#cfd8e3]">
            <Users className="h-3.5 w-3.5 text-muted" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-navy">Elena Vasquez</p>
            <p className="text-[10px] text-muted">Left forearm · High risk</p>
          </div>
          <RiskBadge level="high" />
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 px-1 text-[10px] text-muted">
          <ClipboardList className="h-3 w-3" />
          <span>Awaiting Review</span>
          <AlertTriangle className="h-3 w-3 text-risk-high" />
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
            "radial-gradient(ellipse 70% 60% at 100% 0%, rgba(26,75,140,0.06) 0%, transparent 55%)",
        }}
      />
      <div className="relative grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="section-label">{caseStudyHero.eyebrow}</p>
          <h1 className="font-display mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            {caseStudyHero.title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {caseStudyHero.description}
          </p>

          <dl className="mt-4 flex flex-wrap gap-2">
            {caseStudyMeta.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border-subtle/70 bg-background/40 px-2.5 py-1.5"
              >
                <dt className="text-[9px] font-semibold uppercase tracking-wider text-muted-light">
                  {item.label}
                </dt>
                <dd className="text-xs font-medium text-navy">{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-[11px] leading-relaxed text-muted-light">
            {caseStudyHero.disclaimer}
          </p>
        </div>

        <div className="lg:max-w-sm lg:justify-self-end lg:w-full">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

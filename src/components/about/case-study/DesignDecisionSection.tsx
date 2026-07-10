import { Check, Clock3, UserRound } from "lucide-react";
import { SectionHeader } from "@/components/about/SectionHeader";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { Button } from "@/components/ui/Button";
import {
  abcdePreview,
  approvalChecklist,
  designDecisions,
  queuePreviewFields,
  riskSignalPreview,
} from "@/lib/case-study-data";
import { cn } from "@/lib/utils";

function QueuePreview() {
  return (
    <div className="smooth-card overflow-hidden rounded-2xl">
      <div className="border-b border-border-subtle/70 px-4 py-3">
        <p className="section-label">Patient Queue</p>
        <p className="font-display text-sm font-bold text-navy">High Risk Cases</p>
      </div>
      <div className="space-y-2 p-3">
        {[
          { name: "Elena Vasquez", wait: "2d", risk: "high" as const, change: true },
          { name: "James Okonkwo", wait: "1d", risk: "high" as const, change: false },
        ].map((row) => (
          <div
            key={row.name}
            className="smooth-inset flex items-center justify-between gap-3 rounded-xl px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-navy">{row.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted">
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3 w-3" />
                  {row.wait} waiting
                </span>
                <span className="inline-flex items-center gap-1">
                  <UserRound className="h-3 w-3" />
                  Dr. Laurent
                </span>
                {row.change && (
                  <span className="text-risk-high">Recent change</span>
                )}
              </div>
            </div>
            <RiskBadge level={row.risk} />
          </div>
        ))}
      </div>
      <ul className="border-t border-border-subtle/70 px-4 py-3 text-xs text-muted">
        {queuePreviewFields.map((field) => (
          <li key={field} className="flex items-center gap-2 py-0.5">
            <span className="h-1 w-1 rounded-full bg-medical-blue/40" />
            {field}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RiskSignalsPreview() {
  return (
    <div className="smooth-card rounded-2xl p-5">
      <p className="section-label">AI Review Signals</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="smooth-inset rounded-xl p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Review Priority
          </p>
          <p className="mt-1 text-lg font-bold text-risk-high">
            {riskSignalPreview.priority}
          </p>
        </div>
        <div className="smooth-inset rounded-xl p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Model Confidence
          </p>
          <p className="mt-1 text-lg font-bold text-medical-blue">
            {riskSignalPreview.confidence}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          Detected Signals
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {riskSignalPreview.signals.map((signal) => (
            <span
              key={signal}
              className="rounded-full bg-medical-blue/8 px-2.5 py-1 text-xs font-medium text-medical-blue"
            >
              {signal}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AbcdePreview() {
  return (
    <div className="smooth-card rounded-2xl p-5">
      <p className="section-label">ABCDE Assessment</p>
      <div className="mt-4 space-y-3">
        {abcdePreview.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border-subtle/60 bg-background/40 px-3 py-2.5"
          >
            <p className="text-sm font-semibold text-navy">{item.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApprovalPreview() {
  return (
    <div className="smooth-card rounded-2xl p-5">
      <p className="section-label">Report Approval</p>
      <ul className="mt-4 space-y-2.5">
        {approvalChecklist.map((item, index) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full",
                index < 4
                  ? "bg-risk-low/10 text-risk-low"
                  : "bg-background text-muted-light"
              )}
            >
              {index < 4 ? <Check className="h-3 w-3" /> : null}
            </span>
            {item}
          </li>
        ))}
      </ul>
      <Button variant="primary" size="md" disabled className="mt-5 w-full">
        Approve Report
      </Button>
      <p className="mt-2 text-center text-[11px] text-muted">
        Complete all checklist items to enable approval
      </p>
    </div>
  );
}

const previews = [QueuePreview, RiskSignalsPreview, AbcdePreview, ApprovalPreview];

export function DesignDecisionSection() {
  return (
    <section>
      <SectionHeader title="Key design decisions" className="mb-10" />
      <div className="space-y-12 sm:space-y-16">
        {designDecisions.map((decision, index) => {
          const Preview = previews[index];
          const reversed = index % 2 === 1;

          return (
            <article
              key={decision.id}
              className={cn(
                "grid items-center gap-6 lg:grid-cols-2 lg:gap-10",
                reversed && "lg:[&>*:first-child]:order-2"
              )}
            >
              <div className="min-w-0">
                <p className="section-label">Decision {decision.id}</p>
                <h3 className="font-display mt-2 text-xl font-bold text-navy sm:text-2xl">
                  {decision.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {decision.body}
                </p>
              </div>
              <div className="min-w-0">{Preview ? <Preview /> : null}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

import { SectionHeader } from "@/components/about/SectionHeader";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { Button } from "@/components/ui/Button";
import {
  accessibilityPoints,
  colorRoles,
  designSystemComponents,
} from "@/lib/case-study-data";
import { cn } from "@/lib/utils";

export function DesignSystemPreview() {
  return (
    <section>
      <SectionHeader
        title="A scalable clinical interface system"
        description="Core interface patterns reused across the dashboard, case review and report approval flows."
        className="mb-8"
      />

      <div className="smooth-card rounded-2xl p-6 sm:p-7">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {designSystemComponents.map((component) => {
            const Icon = component.icon;
            return (
              <div
                key={component.label}
                className="smooth-inset flex items-center gap-3 rounded-xl px-3 py-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-medical-blue/8 text-medical-blue">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-navy">{component.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border-subtle/70 pt-6">
          <Button variant="primary" size="md">
            Primary Action
          </Button>
          <Button variant="secondary" size="md">
            Secondary Action
          </Button>
          <RiskBadge level="high" />
          <span className="rounded-full bg-medical-blue/8 px-2.5 py-1 text-xs font-semibold text-medical-blue">
            Awaiting Review
          </span>
          <span className="rounded-full bg-risk-low/8 px-2.5 py-1 text-xs font-semibold text-risk-low">
            Approved
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="smooth-card rounded-2xl p-6">
          <h3 className="font-display text-lg font-bold text-navy">Color roles</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Colors are used semantically to communicate priority, status and action
            hierarchy—not as decoration.
          </p>
          <ul className="mt-5 space-y-3">
            {colorRoles.map((role) => (
              <li key={role.label} className="flex items-start gap-3">
                <span className={cn("mt-1 h-3 w-3 shrink-0 rounded-full", role.color)} />
                <div>
                  <p className="text-sm font-semibold text-navy">{role.label}</p>
                  <p className="text-xs text-muted">{role.usage}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="smooth-card rounded-2xl p-6">
          <h3 className="font-display text-lg font-bold text-navy">Accessibility</h3>
          <ul className="mt-5 space-y-2.5">
            {accessibilityPoints.map((point) => (
              <li
                key={point}
                className="flex gap-2.5 text-sm leading-relaxed text-muted"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-medical-blue/50" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

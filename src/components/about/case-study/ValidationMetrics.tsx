import { SectionHeader } from "@/components/about/SectionHeader";
import {
  validationHypotheses,
  validationMetrics,
} from "@/lib/case-study-data";

export function ValidationMetrics() {
  return (
    <section className="rounded-2xl bg-medical-blue/[0.03] px-5 py-8 sm:px-8 sm:py-10">
      <SectionHeader
        title="How the concept would be validated"
        description="As an independent concept, the next step would be validating the workflow with dermatology professionals and clinical operations teams."
        className="mb-8"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="smooth-card rounded-2xl p-6">
          <h3 className="font-display text-lg font-bold text-navy">
            Hypotheses to test
          </h3>
          <ul className="mt-4 space-y-3">
            {validationHypotheses.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border-subtle/60 bg-background/30 px-3 py-2.5 text-sm leading-relaxed text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="smooth-card rounded-2xl p-6">
          <h3 className="font-display text-lg font-bold text-navy">
            Product metrics to track
          </h3>
          <ul className="mt-4 space-y-3">
            {validationMetrics.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle/60 px-3 py-2.5"
              >
                <span className="text-sm text-muted">{item}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-light">
                  Track
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

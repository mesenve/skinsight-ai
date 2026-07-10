import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/about/SectionHeader";
import { designIterations } from "@/lib/case-study-data";

export function IterationComparison() {
  return (
    <section className="rounded-2xl bg-background/50 px-5 py-8 sm:px-8 sm:py-10">
      <SectionHeader title="Design iterations" className="mb-8" />
      <div className="space-y-5">
        {designIterations.map((iteration, index) => (
          <article
            key={iteration.before}
            className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch"
          >
            <div className="smooth-inset rounded-xl border border-border-subtle/60 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-light">
                Before
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {iteration.before}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-white text-medical-blue shadow-[var(--shadow-soft)]">
                <ArrowRight className="h-4 w-4 max-lg:rotate-90" aria-hidden />
              </div>
            </div>

            <div className="smooth-card rounded-xl border border-medical-blue/15 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-medical-blue">
                After · Iteration {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-navy">
                {iteration.after}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import { CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/about/SectionHeader";
import { projectOutcome } from "@/lib/case-study-data";

export function ProjectOutcome() {
  return (
    <section>
      <SectionHeader title={projectOutcome.title} className="mb-6" />
      <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
        {projectOutcome.body}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {projectOutcome.results.map((result) => (
          <div
            key={result}
            className="smooth-card flex items-start gap-3 rounded-2xl p-5"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-risk-low" />
            <p className="text-sm font-semibold leading-relaxed text-navy">
              {result}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

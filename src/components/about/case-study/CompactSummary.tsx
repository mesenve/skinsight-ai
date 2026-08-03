import { CaseStudySection } from "@/components/about/case-study/CaseStudySection";
import { designDecisions, projectOutcome } from "@/lib/case-study-data";

export function CompactSummary() {
  return (
    <CaseStudySection
      eyebrow="Outcome"
      title="Key decisions & results"
      description={projectOutcome.body}
    >
      <div className="smooth-card rounded-2xl p-6 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-navy">Design decisions</h3>
            <ul className="mt-3 space-y-3">
              {designDecisions.map((decision) => (
                <li
                  key={decision.id}
                  className="rounded-xl border border-border-subtle/60 bg-background/40 px-3 py-2.5"
                >
                  <p className="text-sm font-medium text-navy">{decision.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {decision.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy">What improved</h3>
            <ul className="mt-3 space-y-2">
              {projectOutcome.results.map((result) => (
                <li
                  key={result}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-medical-blue" />
                  {result}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-medical-blue/[0.05] px-3 py-2.5 text-xs leading-relaxed text-muted">
              Fictional patient data · decision-support only · clinician verification
              required before any clinical action.
            </p>
          </div>
        </div>
      </div>
    </CaseStudySection>
  );
}

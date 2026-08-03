import { CaseStudySection } from "@/components/about/case-study/CaseStudySection";
import { clinicalUserFlow, flowNote } from "@/lib/case-study-data";

export function ClinicalUserFlow() {
  return (
    <CaseStudySection eyebrow="Flow" title="Clinical workflow">
      <div className="rounded-2xl bg-medical-blue/[0.03] p-5 sm:p-6">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {clinicalUserFlow.map((step) => (
            <li key={step.title} className="smooth-card rounded-xl p-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-medical-blue/10 text-[11px] font-bold text-medical-blue">
                {step.step}
              </span>
              <h3 className="mt-2 text-sm font-semibold text-navy">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-4 text-xs leading-relaxed text-muted">{flowNote}</p>
      </div>
    </CaseStudySection>
  );
}

import { CaseStudySection } from "@/components/about/case-study/CaseStudySection";
import { projectOverview } from "@/lib/case-study-data";

export function ProjectOverview() {
  return (
    <CaseStudySection eyebrow="Context" title="Overview">
      <div className="smooth-card rounded-2xl p-6 sm:p-7">
        <h3 className="font-display text-lg font-bold text-navy">
          {projectOverview.challenge.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {projectOverview.challenge.body}
        </p>
        <p className="mt-4 border-l-2 border-medical-blue/40 pl-3 text-sm font-medium text-navy">
          {projectOverview.challenge.question}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {projectOverview.product.benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="smooth-inset rounded-xl px-3 py-3"
            >
              <p className="text-sm font-semibold text-navy">{benefit.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </CaseStudySection>
  );
}

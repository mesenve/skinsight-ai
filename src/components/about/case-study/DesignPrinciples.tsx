import { CaseStudySection } from "@/components/about/case-study/CaseStudySection";
import { designPrinciples } from "@/lib/case-study-data";

export function DesignPrinciples() {
  return (
    <CaseStudySection eyebrow="Approach" title="Design principles">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {designPrinciples.map((principle) => {
          const Icon = principle.icon;
          return (
            <article
              key={principle.title}
              className="smooth-card rounded-xl border border-border-subtle/60 p-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-medical-blue/8 text-medical-blue">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-navy">
                {principle.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {principle.body}
              </p>
            </article>
          );
        })}
      </div>
    </CaseStudySection>
  );
}

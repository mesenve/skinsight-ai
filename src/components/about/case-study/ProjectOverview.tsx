import { SectionHeader } from "@/components/about/SectionHeader";
import { projectOverview } from "@/lib/case-study-data";

export function ProjectOverview() {
  return (
    <section aria-labelledby="project-overview-heading">
      <SectionHeader
        eyebrow="Context"
        title="Project overview"
        className="mb-8"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="smooth-card rounded-2xl p-6 sm:p-7">
          <h3
            id="project-overview-heading"
            className="font-display text-lg font-bold text-navy"
          >
            {projectOverview.challenge.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {projectOverview.challenge.body}
          </p>
          <blockquote className="mt-5 border-l-2 border-medical-blue/40 pl-4 text-sm font-medium leading-relaxed text-navy">
            {projectOverview.challenge.question}
          </blockquote>
        </div>

        <div className="smooth-card rounded-2xl p-6 sm:p-7">
          <h3 className="font-display text-lg font-bold text-navy">
            {projectOverview.product.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {projectOverview.product.body}
          </p>
          <div className="mt-6 grid gap-3">
            {projectOverview.product.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="smooth-inset rounded-xl border border-border-subtle/50 p-4"
              >
                <p className="text-sm font-semibold text-navy">{benefit.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

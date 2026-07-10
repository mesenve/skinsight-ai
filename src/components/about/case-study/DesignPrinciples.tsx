import { SectionHeader } from "@/components/about/SectionHeader";
import { designPrinciples } from "@/lib/case-study-data";

export function DesignPrinciples() {
  return (
    <section>
      <SectionHeader title="Design principles" className="mb-8" />
      <div className="grid gap-4 sm:grid-cols-2">
        {designPrinciples.map((principle) => {
          const Icon = principle.icon;
          return (
            <article
              key={principle.title}
              className="smooth-card rounded-2xl border border-border-subtle/60 p-5 sm:p-6"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-medical-blue/8 text-medical-blue">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-navy sm:text-base">
                {principle.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {principle.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

import { SectionHeader } from "@/components/about/SectionHeader";
import { clinicalUserFlow, flowNote } from "@/lib/case-study-data";
import { cn } from "@/lib/utils";

function FlowCard({
  step,
  className,
}: {
  step: (typeof clinicalUserFlow)[number];
  className?: string;
}) {
  return (
    <div className={cn("smooth-card rounded-xl p-4", className)}>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-medical-blue/10 text-xs font-bold text-medical-blue">
        {step.step}
      </span>
      <h3 className="mt-3 text-sm font-semibold text-navy">{step.title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
        {step.description}
      </p>
    </div>
  );
}

export function ClinicalUserFlow() {
  return (
    <section className="rounded-2xl bg-medical-blue/[0.03] px-5 py-8 sm:px-8 sm:py-10">
      <SectionHeader
        title="From patient intake to clinical report"
        className="mb-8"
      />

      <ol className="space-y-4 md:hidden">
        {clinicalUserFlow.map((step, index) => (
          <li key={step.title} className="relative pl-8">
            {index < clinicalUserFlow.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[11px] top-8 bottom-[-16px] w-px bg-border"
              />
            )}
            <span className="absolute left-0 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-medical-blue/10 text-[11px] font-bold text-medical-blue ring-4 ring-[#eef2f7]">
              {step.step}
            </span>
            <FlowCard step={step} />
          </li>
        ))}
      </ol>

      <ol className="hidden gap-3 md:grid md:grid-cols-3 xl:grid-cols-6">
        {clinicalUserFlow.map((step, index) => (
          <li key={`desktop-${step.title}`} className="relative min-w-0">
            <FlowCard step={step} className="h-full" />
            {index < clinicalUserFlow.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-2 top-9 hidden text-sm text-muted-light xl:inline"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-6 text-sm leading-relaxed text-muted">{flowNote}</p>
    </section>
  );
}

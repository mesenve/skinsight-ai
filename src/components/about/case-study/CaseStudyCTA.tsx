import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { caseStudyCta } from "@/lib/case-study-data";

export function CaseStudyCTA() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-navy px-5 py-8 sm:px-6 sm:py-9">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 80% at 80% 20%, rgba(6,182,212,0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 10% 80%, rgba(45,108,181,0.18) 0%, transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
          {caseStudyCta.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
          {caseStudyCta.body}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={caseStudyCta.primary.href}
            className={buttonStyles({ variant: "primary", size: "md" })}
          >
            {caseStudyCta.primary.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={caseStudyCta.secondary.href}
            className={buttonStyles({
              variant: "secondary",
              size: "md",
              className: "border-white/15 bg-white/10 text-white hover:border-white/25 hover:bg-white/15 hover:text-white",
            })}
          >
            {caseStudyCta.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

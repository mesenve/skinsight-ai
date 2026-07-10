"use client";

import Link from "next/link";
import { ArrowRight, Brain, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { CaseStudyIntro } from "@/components/dashboard/CaseStudyIntro";
import { buttonStyles } from "@/components/ui/Button";

const details = [
  {
    icon: Stethoscope,
    title: "Clinical workflow",
    body: "Cases flow from intake through AI-assisted review to clinician verification and report approval — with human judgment at every decision point.",
  },
  {
    icon: Brain,
    title: "ABCDE analysis",
    body: "Pattern-based risk signals across asymmetry, border, color, diameter, and evolution — surfaced for review, never auto-diagnosed.",
  },
  {
    icon: Users,
    title: "Built for dermatologists",
    body: "Designed for board-certified clinicians and telederm nurses who need fast triage context without black-box outputs.",
  },
  {
    icon: ShieldCheck,
    title: "Safety by design",
    body: "Every screen reinforces decision-support positioning. AI observations are clearly separated from clinician final assessment.",
  },
];

export function AboutContent() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <CaseStudyIntro />

      <section className="smooth-card rounded-2xl p-6">
        <h2 className="font-display text-lg font-bold text-navy">
          Design approach
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          SkinSight AI is a portfolio prototype exploring how AI-assisted
          dermatology triage can feel trustworthy, clinical, and
          human-centered — prioritizing case review speed without replacing
          physician judgment.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {details.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="smooth-inset rounded-xl p-4"
              >
                <Icon className="h-4 w-4 text-medical-blue" />
                <h3 className="mt-2 text-sm font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex justify-center pb-4">
        <Link
          href="/cases/case-001"
          className={buttonStyles({ variant: "primary", size: "md" })}
        >
          Open sample case
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

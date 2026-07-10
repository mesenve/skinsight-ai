"use client";

import { CaseHero } from "@/components/about/case-study/CaseHero";
import { CaseStudyCTA } from "@/components/about/case-study/CaseStudyCTA";
import { ClinicalUserFlow } from "@/components/about/case-study/ClinicalUserFlow";
import { DesignDecisionSection } from "@/components/about/case-study/DesignDecisionSection";
import { DesignPrinciples } from "@/components/about/case-study/DesignPrinciples";
import { DesignSystemPreview } from "@/components/about/case-study/DesignSystemPreview";
import { IterationComparison } from "@/components/about/case-study/IterationComparison";
import { ProjectOutcome } from "@/components/about/case-study/ProjectOutcome";
import { ProjectOverview } from "@/components/about/case-study/ProjectOverview";
import { UserPersonas } from "@/components/about/case-study/UserPersonas";
import { ValidationMetrics } from "@/components/about/case-study/ValidationMetrics";

export function AboutContent() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 pb-8 sm:space-y-20 sm:pb-12">
      <CaseHero />
      <ProjectOverview />
      <UserPersonas />
      <DesignPrinciples />
      <ClinicalUserFlow />
      <DesignDecisionSection />
      <IterationComparison />
      <DesignSystemPreview />
      <ValidationMetrics />
      <ProjectOutcome />
      <CaseStudyCTA />
    </div>
  );
}

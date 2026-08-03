"use client";

import { CaseHero } from "@/components/about/case-study/CaseHero";
import { CaseStudyCTA } from "@/components/about/case-study/CaseStudyCTA";
import { ClinicalUserFlow } from "@/components/about/case-study/ClinicalUserFlow";
import { CompactSummary } from "@/components/about/case-study/CompactSummary";
import { DesignPrinciples } from "@/components/about/case-study/DesignPrinciples";
import { ProjectOverview } from "@/components/about/case-study/ProjectOverview";

export function AboutContent() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-6 sm:space-y-12 sm:pb-8">
      <CaseHero />
      <ProjectOverview />
      <DesignPrinciples />
      <ClinicalUserFlow />
      <CompactSummary />
      <CaseStudyCTA />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: Stethoscope,
    title: "The Problem",
    body: "Dermatology clinics face growing backlogs. Clinicians spend hours triaging lesion photos before high-risk cases get reviewed.",
  },
  {
    icon: Users,
    title: "Primary Users",
    body: "Board-certified dermatologists and telederm nurses who need fast, trustworthy context — not black-box diagnoses.",
  },
  {
    icon: Brain,
    title: "AI Approach",
    body: "ABCDE pattern analysis surfaces risk signals and evolution changes. Every output requires explicit clinician verification.",
  },
  {
    icon: ShieldCheck,
    title: "Human-in-the-Loop",
    body: "AI assists review; the clinician approves the final report. Decision-support only — never a replacement for medical judgment.",
  },
];

export function CaseStudyIntro() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="smooth-card-elevated relative overflow-hidden rounded-2xl"
    >
      <div className="relative bg-navy px-6 py-8 sm:px-8 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 80% at 80% 20%, rgba(6,182,212,0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 10% 80%, rgba(45,108,181,0.2) 0%, transparent 50%)",
          }}
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label text-cyan-glow/80">
              Portfolio Case Study · Product Design
            </p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              SkinSight AI
            </h2>
            <p className="mt-2 text-lg font-medium text-white/80">
              Dermatology Triage Platform
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              A concept for AI-assisted lesion review that helps dermatology
              teams prioritize cases, compare scans over time, and approve
              clinician-verified reports — with transparency at every step.
            </p>
          </div>
          <Link
            href="/cases/case-001"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-navy shadow-lg transition-all hover:bg-white/95 hover:shadow-xl"
          >
            Explore live demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="grid gap-3 bg-background/40 p-3 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
              className="smooth-card rounded-xl p-5 sm:p-6"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-medical-blue/8 text-medical-blue">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-navy">
                {pillar.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                {pillar.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Quote,
  Sparkles,
} from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

const faqItems = [
  {
    question: "Does SkinSight make a diagnosis?",
    answer:
      "No. SkinSight is designed as decision support. It surfaces risk signals and helps prioritize cases, while the clinician reviews the evidence and makes the final decision.",
  },
  {
    question: "How does the AI analysis work?",
    answer:
      "The workflow reviews a lesion image alongside case context and presents explainable ABCDE observations, a risk signal, and a concise summary for clinician verification.",
  },
  {
    question: "Can clinicians change the AI assessment?",
    answer:
      "Yes. Clinicians can verify or override findings, add notes, and record their own assessment before approving the report.",
  },
  {
    question: "Is patient data used in this demo?",
    answer:
      "No real patient data is required. The current portfolio demo uses fictional cases and representative clinical content to demonstrate the product workflow.",
  },
  {
    question: "Can I explore a sample clinical case?",
    answer:
      "Yes. The live demo includes a fictional sample case where you can review the lesion image, inspect ABCDE signals, add clinical notes, and preview the report workflow.",
  },
  {
    question: "Is SkinSight a medical device?",
    answer:
      "No. This version is a portfolio concept prototype and has not been validated, certified, or approved for clinical use.",
  },
] as const;

function FaqBlock() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr] lg:items-start lg:gap-8">
      <motion.aside
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.4 }}
        className="relative aspect-[3/4] min-h-[22rem] w-full max-w-[18rem] overflow-hidden rounded-[1.75rem] border border-white/90 bg-[#eceff3] shadow-[0_18px_50px_rgba(26,75,140,0.14)] lg:sticky lg:top-24"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatars/maya-faq.jpg?v=12"
          alt="Dr. Maya Laurent"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          decoding="async"
        />

        <div
          className="absolute bottom-4 left-1/2 w-[calc(100%-2.25rem)] -translate-x-1/2 overflow-hidden rounded-2xl px-3 py-2.5 sm:bottom-5 sm:w-[calc(100%-2.75rem)]"
          style={{
            background:
              "linear-gradient(165deg, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.6) 100%)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow:
              "0 8px 28px rgba(26,75,140,0.12), inset 0 1px 0 rgba(255,255,255,0.95)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
          />
          <p className="font-display text-[13px] font-bold tracking-tight text-navy">
            Dr. Maya Laurent
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-medical-blue/80">
            Dermatology specialist
          </p>
          <p className="mt-1 text-[11px] leading-snug text-navy/70">
            Need help exploring the clinical workflow?
          </p>
          <Link
            href="/calendar"
            className="mt-2 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-full border border-white/90 bg-white/95 px-3 text-[11px] font-semibold text-navy shadow-[0_4px_14px_rgba(26,75,140,0.1)] transition-all hover:border-medical-blue/20 hover:text-medical-blue"
          >
            <CalendarDays className="h-3.5 w-3.5 text-medical-blue" />
            Book a meeting
            <ArrowRight className="h-3.5 w-3.5 text-medical-blue" />
          </Link>
        </div>
      </motion.aside>

      <div className="space-y-2.5">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className={cn(
                "overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/85 shadow-[0_8px_28px_rgba(26,75,140,0.06)] backdrop-blur-md transition-shadow",
                isOpen && "shadow-[0_12px_36px_rgba(26,75,140,0.1)]"
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center gap-3.5 px-4 py-4 text-left text-sm font-semibold text-navy sm:gap-4 sm:px-5 sm:text-base"
              >
                <span className="font-display w-7 shrink-0 text-xs font-semibold tracking-wide text-medical-blue/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 leading-snug">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-navy/70 transition-transform duration-300",
                    isOpen && "rotate-180 text-medical-blue"
                  )}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.28,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl px-4 pb-5 pl-[3.25rem] pr-12 text-sm leading-relaxed text-muted sm:px-5 sm:pl-[3.75rem]">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const howItWorksSteps = [
  {
    step: "01",
    title: "Intake",
    body: "Patient information, history, and images are securely collected and organized.",
    image: "/how-it-works/step-01-intake.png",
    scale: "scale-[0.935]",
  },
  {
    step: "02",
    title: "AI Review",
    body: "SkinSight AI analyzes clinical data and images to identify patterns and surface insights.",
    image: "/how-it-works/step-02-ai-review.png",
    scale: "scale-[0.935]",
  },
  {
    step: "03",
    title: "Clinician Review",
    body: "A licensed clinician reviews the AI findings, adds expertise, and confirms next steps.",
    image: "/how-it-works/step-03-clinician.png",
    scale: "scale-[0.935]",
  },
  {
    step: "04",
    title: "Report",
    body: "A clear, patient-ready report is generated with findings and recommendations.",
    image: "/how-it-works/step-04-report.png",
    scale: "scale-[0.935]",
  },
] as const;

export function LandingPage() {
  return (
    <div className="min-h-screen text-foreground">
      <LandingHeader />

      {/* Hero */}
      <section className="relative min-h-[calc(100svh+8rem)] overflow-hidden bg-[#f7fbff] lg:min-h-[calc(100svh+12rem)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 right-0 w-[55%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/cellular-signal.png"
              alt=""
              className="h-full w-full object-cover object-[67%_50%]"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#f7fbff_0%,rgba(247,251,255,0.7)_18%,rgba(247,251,255,0.08)_42%,transparent_62%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-b from-transparent via-[#f7fbff]/70 to-[#f7fbff]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh+8rem)] max-w-6xl items-center px-5 py-24 sm:px-8 sm:py-28 lg:min-h-[calc(100svh+12rem)] lg:px-12">
          <div className="flex max-w-xl flex-col items-center text-center lg:max-w-[48%] lg:-translate-y-20 lg:items-start lg:text-left">
            <motion.p
              className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]"
              {...fadeUp}
              transition={{ duration: 0.55 }}
            >
              SkinSight AI
            </motion.p>

            <motion.h1
              className="mt-5 max-w-xl text-xl font-semibold tracking-tight text-navy sm:text-2xl lg:text-[1.65rem] lg:leading-snug"
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              AI-assisted dermatology triage for clinicians who need speed
              without losing judgment.
            </motion.h1>

            <motion.p
              className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base"
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.14 }}
            >
              Prioritize lesion cases, review explainable ABCDE signals, and keep
              final decisions in the clinician&apos;s hands.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <Link
                href="/onboarding"
                className={buttonStyles({
                  variant: "ai",
                  size: "lg",
                  className: "min-w-[11rem] px-6",
                })}
              >
                Start as clinician
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/app"
                className={buttonStyles({
                  variant: "secondary",
                  size: "lg",
                  className:
                    "min-w-[11rem] border-border bg-white text-navy shadow-[var(--shadow-soft)] hover:border-medical-blue/25 hover:bg-medical-blue/[0.04] hover:text-medical-blue",
                })}
              >
                Open live demo
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem — one job */}
      <section
        id="challenge"
        className="relative scroll-mt-28 overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 12% 8%, rgba(45,108,181,0.1) 0%, transparent 55%), radial-gradient(ellipse 55% 45% at 88% 12%, rgba(6,182,212,0.08) 0%, transparent 50%), linear-gradient(180deg, #f7fbff 0%, #ffffff 48%, #f4f8fc 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(26,75,140,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 75% 60% at 50% 30%, black 15%, transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="section-label">The challenge</p>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Too many lesion images. Too little clarity on what comes first.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Dermatology teams review case after case under time pressure. AI can
            help — but only if risk signals are explainable and the clinician
            stays in control.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative scroll-mt-28 overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 12% 8%, rgba(45,108,181,0.1) 0%, transparent 55%), radial-gradient(ellipse 55% 45% at 88% 12%, rgba(6,182,212,0.08) 0%, transparent 50%), linear-gradient(180deg, #f7fbff 0%, #ffffff 48%, #f4f8fc 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(26,75,140,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 75% 60% at 50% 30%, black 15%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label text-medical-blue">How it works</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              One clinical workflow.
              <br className="hidden sm:block" /> Four clear steps.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              SkinSight AI streamlines skin assessment from intake to report,
              combining intelligent analysis with clinician expertise.
            </p>
          </div>

          <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
            {howItWorksSteps.map((item, index) => (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative rounded-[1.35rem] border border-white/80 bg-white/70 px-5 pb-5 pt-2.5 text-center shadow-[0_10px_36px_rgba(26,75,140,0.08)] backdrop-blur-xl sm:px-6 sm:pb-6 sm:pt-3"
              >
                <div className="mx-auto -my-2 flex h-[10.5rem] w-[13.5rem] items-center justify-center sm:-my-3 sm:h-48 sm:w-60">
                  <Image
                    src={item.image}
                    alt=""
                    width={1024}
                    height={1024}
                    quality={100}
                    sizes="768px"
                    priority={index < 2}
                    className={cn("h-full w-full object-contain", item.scale)}
                  />
                </div>

                <p className="mt-2 text-[11px] font-semibold tracking-[0.14em] text-medical-blue">
                  {item.step}
                </p>
                <h3 className="font-display mt-1.5 text-lg font-bold tracking-tight text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Illustrative testimonial */}
      <section className="bg-white px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-br from-medical-blue/[0.06] via-white to-cyan-accent/[0.07] px-6 py-8 shadow-[var(--shadow-soft)] sm:px-10 sm:py-10"
        >
          <Quote className="h-7 w-7 text-medical-blue/30" aria-hidden="true" />
          <blockquote className="font-display mt-5 max-w-3xl text-xl font-semibold leading-relaxed tracking-tight text-navy sm:text-2xl">
            “The priority queue makes it clear which cases need attention first,
            while the ABCDE signals keep the reasoning visible before I make
            the final call.”
          </blockquote>
          <figcaption className="mt-6">
            <p className="text-sm font-semibold text-navy">
              Illustrative clinician perspective
            </p>
            <p className="mt-1 text-xs text-muted">
              Representative scenario for this portfolio concept
            </p>
          </figcaption>
        </motion.figure>
      </section>

      {/* Product promise */}
      <section
        id="product"
        className="scroll-mt-28 mesh-bg border-y border-border-subtle/60 px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="section-label">Built for clinicians</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              A triage workspace, not a black-box score
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              SkinSight organizes the queue, surfaces explainable AI
              observations, and guides review without replacing clinical
              judgment.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Priority queue that lifts high-risk cases first",
                "ABCDE signals with clinician-facing explanations",
                "Human-in-the-loop verification before report approval",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-medical-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-medical-blue/15 bg-white px-6 py-8 shadow-[var(--shadow-elevated)] sm:px-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 70% 80% at 90% 10%, rgba(6,182,212,0.12) 0%, transparent 55%)",
              }}
            />
            <div className="relative">
              <Sparkles className="h-5 w-5 text-cyan-accent" />
              <p className="mt-4 font-display text-xl font-bold tracking-tight text-navy sm:text-2xl">
                AI accelerates review.
                <br />
                <span className="text-muted">You keep the final call.</span>
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                Every analysis is framed as decision support — with clear
                disclaimers and an explicit clinician verification step.
              </p>
              <Link
                href="/cases/case-001"
                className={cn(
                  buttonStyles({ variant: "primary", size: "md" }),
                  "mt-6"
                )}
              >
                Walk a demo case
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="relative scroll-mt-28 overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 65% 50% at 8% 20%, rgba(45,108,181,0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 92% 80%, rgba(6,182,212,0.07) 0%, transparent 50%), linear-gradient(180deg, #f7fbff 0%, #ffffff 55%, #f4f8fc 100%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="section-label text-medical-blue">FAQ</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Common questions about SkinSight
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              How the concept supports clinical triage while keeping the
              clinician in control.
            </p>
          </div>

          <FaqBlock />
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border-subtle bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-4xl rounded-3xl border border-medical-blue/15 bg-gradient-to-br from-medical-blue/[0.08] via-white to-cyan-accent/[0.07] px-6 py-12 text-center shadow-[var(--shadow-elevated)] sm:px-10">
          <p className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            SkinSight AI
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Register as a clinician and open the live triage demo in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/onboarding"
              className={buttonStyles({
                variant: "ai",
                size: "lg",
                className: "min-w-[11rem] px-6",
              })}
            >
              Clinician onboarding
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className={buttonStyles({
                variant: "secondary",
                size: "lg",
                className:
                  "min-w-[11rem] border-border bg-white text-navy shadow-[var(--shadow-soft)] hover:border-medical-blue/25 hover:bg-medical-blue/[0.04] hover:text-medical-blue",
              })}
            >
              Read the case study
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border-subtle bg-white px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted">
            © 2026 SkinSight AI · Portfolio concept prototype
          </p>
          <div className="flex gap-4 text-xs text-muted">
            <Link href="/app" className="transition-colors hover:text-medical-blue">
              App
            </Link>
            <Link href="/onboarding" className="transition-colors hover:text-medical-blue">
              Onboarding
            </Link>
            <Link href="/about" className="transition-colors hover:text-medical-blue">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

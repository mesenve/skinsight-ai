"use client";

import { useLayoutEffect, useRef, useState } from "react";
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
import { RiskBadge } from "@/components/shared/RiskBadge";
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
  const listRef = useRef<HTMLDivElement>(null);
  const collapsedHeightRef = useRef<number | null>(null);
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const sync = () => {
      if (openIndex !== null) {
        if (collapsedHeightRef.current != null) {
          setCardHeight(collapsedHeightRef.current);
        }
        return;
      }
      const height = Math.round(el.getBoundingClientRect().height);
      collapsedHeightRef.current = height;
      setCardHeight(height);
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [openIndex]);

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr] lg:items-start lg:gap-8">
      <motion.aside
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.4 }}
        style={cardHeight ? { height: cardHeight } : undefined}
        className="relative min-h-[22rem] w-full max-w-[18rem] overflow-hidden rounded-[1.75rem] border border-white/90 bg-[#eceff3] shadow-[0_18px_50px_rgba(26,75,140,0.14)] lg:sticky lg:top-24"
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

      <div ref={listRef} className="space-y-2.5">
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

function ProductCanvas() {
  const queueCard = (
    <div className="rounded-[1.25rem] border border-white/90 bg-white/92 p-3 shadow-[0_18px_50px_rgba(26,75,140,0.16)] backdrop-blur-xl sm:p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-medical-blue">
            Today&apos;s triage
          </p>
          <p className="font-display mt-0.5 text-sm font-bold text-navy sm:text-base">
            Patient queue
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-risk-high/[0.08] px-2 py-0.5 text-[9px] font-semibold text-risk-high">
          3 high risk
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {[
          { label: "Total", value: "10" },
          { label: "Waiting", value: "5" },
          { label: "Follow-up", value: "2" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border-subtle/80 bg-[#f7fafc] px-2 py-1.5"
          >
            <p className="text-[8px] font-semibold uppercase tracking-wide text-muted">
              {stat.label}
            </p>
            <p className="font-display mt-0.5 text-base font-bold text-navy">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-2 space-y-1.5">
        {[
          {
            name: "Elena Vasquez",
            detail: "Left forearm",
            level: "high" as const,
          },
          {
            name: "James Okonkwo",
            detail: "Upper back",
            level: "high" as const,
          },
          {
            name: "Amara Diallo",
            detail: "Left thigh",
            level: "medium" as const,
          },
        ].map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between gap-2 rounded-lg border border-border-subtle/70 bg-white px-2 py-1.5"
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-navy">
                {row.name}
              </p>
              <p className="text-[9px] text-muted">{row.detail}</p>
            </div>
            <RiskBadge level={row.level} />
          </div>
        ))}
      </div>
    </div>
  );

  const riskCard = (
    <div className="rounded-[1.25rem] border border-white/90 bg-white/92 p-3 shadow-[0_18px_50px_rgba(26,75,140,0.16)] backdrop-blur-xl sm:p-3.5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
        AI risk signal
      </p>
      <p className="font-display mt-1.5 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        82
        <span className="text-lg text-muted-light">/100</span>
      </p>
      <p className="mt-0.5 text-xs font-medium text-medical-blue">
        Elevated priority
      </p>
      <div className="mt-3 space-y-1.5">
        {["Asymmetry", "Border", "Color", "Diameter", "Evolution"].map(
          (item, index) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-16 text-[9px] font-medium text-muted">
                {item}
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-medical-blue-light to-cyan-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${68 + index * 5}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.12 * index }}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="relative mx-auto w-full max-w-xl overflow-visible lg:max-w-none">
      {/* Visual stage — banner hex field + floating product cards */}
      <div className="relative aspect-[5/4] w-full overflow-visible sm:aspect-square lg:aspect-[6/5]">
        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#f7fafc] via-[#eef5fb] to-[#e8f0f8] shadow-[0_28px_80px_rgba(26,75,140,0.14)] ring-1 ring-medical-blue/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/hex-field.jpg?v=2"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-white/20" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18, x: 10 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.65, delay: 0.32 }}
          className="absolute -right-1 top-[4%] z-20 w-[min(88%,15.5rem)] sm:-right-3 sm:top-[6%] sm:w-[16.5rem] lg:-right-4 lg:w-[17rem]"
        >
          {queueCard}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22, x: -10 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.65, delay: 0.45 }}
          className="absolute -left-1 bottom-[3%] z-20 w-[min(85%,13.5rem)] sm:-left-3 sm:bottom-[5%] sm:w-[14.5rem] lg:-left-4 lg:w-[15rem]"
        >
          {riskCard}
        </motion.div>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen text-foreground">
      <LandingHeader />

      {/* Hero — copy left, visuals right */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 55% 50% at 85% 45%, rgba(45,108,181,0.08) 0%, transparent 55%), radial-gradient(ellipse 40% 35% at 10% 20%, rgba(6,182,212,0.05) 0%, transparent 50%), linear-gradient(180deg, #ffffff 0%, #f7fafc 60%, #eef2f7 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:px-12 lg:pb-20 lg:pt-32">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
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

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.18,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="lg:pl-2"
          >
            <ProductCanvas />
          </motion.div>
        </div>
      </section>

      {/* Problem — one job */}
      <section
        id="challenge"
        className="scroll-mt-28 mesh-bg border-t border-border-subtle/60 px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-3xl text-center">
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

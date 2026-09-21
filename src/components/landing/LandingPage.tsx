"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Quote,
  Sparkles,
} from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LogoMark } from "@/components/shared/LogoMark";
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

const clinicianQuotes = [
  {
    quote:
      "The priority queue makes it clear which cases need attention first, while the ABCDE signals keep the reasoning visible before I make the final call.",
    name: "Dr. Emily Carter",
    role: "Dermatologist · London, UK",
    initials: "DC",
    avatar: "/avatars/id-01.jpg",
  },
  {
    quote:
      "It gives our team a calm, structured starting point for reviewing a busy list of lesion images without losing the clinical context around each case.",
    name: "Dr. James Miller",
    role: "Dermatologist · Austin, US",
    initials: "CO",
    avatar: "/avatars/id-06.jpg",
  },
  {
    quote:
      "The value is not a black-box result. It is seeing the signals, reviewing the evidence, and keeping the clinician in control of the decision.",
    name: "Dr. Sophia Lee",
    role: "Dermatologist · Sydney, AU",
    initials: "CD",
    avatar: "/avatars/id-03.jpg",
  },
] as const;

function QuoteSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeQuote = clinicianQuotes[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? clinicianQuotes.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % clinicianQuotes.length);
  };

  return (
    <section className="bg-white px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-center sm:mb-7">
          <div>
            <p className="section-label">Clinician perspective</p>
            <h2 className="font-display mt-2 text-xl font-bold tracking-tight text-navy sm:text-2xl">
              Built around clearer decisions.
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.65rem] bg-[#071a35] shadow-[0_18px_42px_rgba(7,26,53,0.19)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(51,190,233,0.3),transparent_34%),radial-gradient(circle_at_92%_88%,rgba(52,123,238,0.28),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-accent/70 to-transparent" />

          <AnimatePresence mode="wait">
            <motion.article
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative grid min-h-[19rem] items-center gap-7 px-7 py-8 sm:grid-cols-[1fr_11rem] sm:px-10 sm:py-10"
            >
              <div>
                <Quote className="h-7 w-7 text-cyan-accent/80" aria-hidden="true" />
                <blockquote className="font-display mt-5 max-w-xl text-lg font-medium leading-relaxed tracking-tight text-white sm:text-xl">
                  “{activeQuote.quote}”
                </blockquote>
                <div className="mt-7 flex items-center gap-3">
                  <Image
                    src={activeQuote.avatar}
                    alt=""
                    width={88}
                    height={88}
                    className="h-10 w-10 rounded-full border border-white/30 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{activeQuote.name}</p>
                    <p className="mt-0.5 text-xs text-blue-100/70">{activeQuote.role}</p>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto h-44 w-36 overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_14px_30px_rgba(0,0,0,0.2)] sm:mx-0 sm:justify-self-end">
                <Image
                  src={activeQuote.avatar}
                  alt={`${activeQuote.name} portrait`}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071a35]/70 via-transparent to-transparent" />
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3" aria-label="Quote controls">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous clinician perspective"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-medical-blue/15 bg-[#f1f7fc] text-navy transition-colors hover:bg-medical-blue hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Show next clinician perspective"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-medical-blue/15 bg-[#f1f7fc] text-navy transition-colors hover:bg-medical-blue hover:text-white"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

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
      <section className="relative min-h-[100svh] overflow-hidden bg-[#f7fbff]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 right-0 w-[55%]">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/hero/cellular-signal.png"
              aria-hidden="true"
              className="h-full w-full object-cover object-[67%_50%]"
            >
              <source src="/hero/cellular-signal-forward-loop.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#f7fbff_0%,rgba(247,251,255,0.7)_18%,rgba(247,251,255,0.08)_42%,transparent_62%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-b from-transparent via-[#f7fbff]/70 to-[#f7fbff]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
          <div className="flex w-full max-w-xl flex-col items-center text-center lg:max-w-[48%] lg:items-start lg:text-left">
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
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl text-left">
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
          <div className="max-w-2xl text-left">
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

      <QuoteSlider />

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

      <footer className="relative overflow-hidden bg-[#06152b] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer/hex-night-hq.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,40,0.16)_0%,rgba(4,18,40,0.32)_45%,rgba(4,18,40,0.58)_100%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to modernize lesion triage?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-blue-100/70 sm:text-base">
              Join clinics and health systems using SkinSight AI to detect sooner,
              work smarter, and deliver confident care.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/onboarding"
                className="inline-flex h-11 min-w-[11.5rem] items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-navy shadow-[0_10px_28px_rgba(103,189,255,0.24)]"
              >
                Start onboarding
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/calendar"
                className="inline-flex h-11 min-w-[11.5rem] items-center justify-center rounded-full border border-blue-200/60 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Request a demo
              </Link>
            </div>
          </div>

          <div className="my-12 h-px bg-blue-100/15 sm:my-14" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_repeat(4,1fr)] lg:gap-8">
            <div className="max-w-[15rem]">
              <div className="flex items-center gap-3">
                <LogoMark size={42} className="rounded-full" />
                <span className="font-display text-2xl font-semibold tracking-tight text-white">
                  SkinSight <span className="font-normal text-blue-200/65">AI</span>
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-blue-100/65">
                AI-powered skin health insights for earlier action and healthier tomorrows.
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200/65">Product</h3>
              <div className="mt-4 space-y-3 text-sm text-blue-50/90">
                <Link href="/#how-it-works" className="block transition-colors hover:text-cyan-accent">How it works</Link>
                <Link href="/app" className="block transition-colors hover:text-cyan-accent">Live demo</Link>
                <Link href="/onboarding" className="block transition-colors hover:text-cyan-accent">Onboarding</Link>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200/65">Company</h3>
              <div className="mt-4 space-y-3 text-sm text-blue-50/90">
                <Link href="/about" className="block transition-colors hover:text-cyan-accent">About us</Link>
                <Link href="/about" className="block transition-colors hover:text-cyan-accent">Case study</Link>
                <Link href="/calendar" className="block transition-colors hover:text-cyan-accent">Contact</Link>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200/65">Resources</h3>
              <div className="mt-4 space-y-3 text-sm text-blue-50/90">
                <Link href="/#faq" className="block transition-colors hover:text-cyan-accent">Documentation</Link>
                <Link href="/#faq" className="block transition-colors hover:text-cyan-accent">Support</Link>
                <Link href="/#faq" className="block transition-colors hover:text-cyan-accent">Trust center</Link>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200/65">Legal</h3>
              <div className="mt-4 space-y-3 text-sm text-blue-50/90">
                <Link href="/about" className="block transition-colors hover:text-cyan-accent">Privacy policy</Link>
                <Link href="/about" className="block transition-colors hover:text-cyan-accent">Terms of service</Link>
                <Link href="/about" className="block transition-colors hover:text-cyan-accent">Accessibility</Link>
              </div>
            </div>
          </div>

          <p className="mt-12 border-t border-blue-100/10 pt-6 text-xs text-blue-100/45">
            © 2026 SkinSight AI · Portfolio concept prototype
          </p>
        </div>
      </footer>
    </div>
  );
}

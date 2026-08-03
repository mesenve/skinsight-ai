"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ListOrdered,
  Menu,
  ScanLine,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { LogoMark } from "@/components/shared/LogoMark";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/about", label: "Case study" },
  { href: "/app", label: "Live demo" },
];

function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:px-4",
          scrolled
            ? "border-white/12 bg-[#0b1220]/80 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-white/8 bg-white/[0.04] backdrop-blur-md"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl px-1 py-0.5"
          onClick={() => setMobileOpen(false)}
        >
          <LogoMark size={36} className="shadow-medical-blue/25" />
          <div className="hidden min-[380px]:block">
            <p className="font-display text-sm font-bold tracking-tight text-white">
              SkinSight AI
            </p>
            <p className="text-[10px] font-medium tracking-wide text-white/45">
              Dermatology Triage
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3.5 py-2 text-sm font-medium text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/onboarding"
            className={buttonStyles({
              variant: "ai",
              size: "sm",
              className: "hidden h-9 px-4 sm:inline-flex",
            })}
          >
            Get started
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/12 bg-[#0b1220]/95 p-3 shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3.5 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/onboarding"
                onClick={() => setMobileOpen(false)}
                className={buttonStyles({
                  variant: "ai",
                  size: "md",
                  className: "mt-2 w-full",
                })}
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ProductCanvas() {
  return (
    <div className="relative overflow-hidden border-t border-white/10 bg-[#0f1a2e]/80 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 py-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-accent/80">
                Today&apos;s triage
              </p>
              <p className="mt-1 font-display text-lg font-bold text-white">
                Patient queue
              </p>
            </div>
            <span className="rounded-full bg-cyan-accent/15 px-3 py-1 text-[11px] font-semibold text-cyan-accent">
              3 high risk
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Total", value: "10" },
              { label: "Waiting", value: "5" },
              { label: "Follow-up", value: "2" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
                  {stat.label}
                </p>
                <p className="font-display mt-1 text-xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { name: "Elena Vasquez", detail: "Left forearm", level: "high" as const },
              { name: "James Okonkwo", detail: "Upper back", level: "high" as const },
              { name: "Amara Diallo", detail: "Left thigh", level: "medium" as const },
            ].map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {row.name}
                  </p>
                  <p className="text-[11px] text-white/45">{row.detail}</p>
                </div>
                <RiskBadge level={row.level} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-medical-blue/30 to-transparent p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
            AI risk signal
          </p>
          <p className="font-display mt-3 text-5xl font-bold tracking-tight text-white">
            82
            <span className="text-2xl text-white/40">/100</span>
          </p>
          <p className="mt-2 text-sm text-cyan-accent">Elevated priority</p>
          <div className="mt-6 space-y-2">
            {["Asymmetry", "Border", "Color", "Diameter", "Evolution"].map(
              (item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-20 text-[11px] font-medium text-white/55">
                    {item}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-medical-blue-light to-cyan-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${70 + index * 5}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.15 * index }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07111f] text-foreground">
      <LandingNav />

      {/* Hero — one composition, brand-first, full-bleed visual plane */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 90% 70% at 20% -10%, rgba(45,108,181,0.45) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 20%, rgba(6,182,212,0.22) 0%, transparent 50%), linear-gradient(180deg, #07111f 0%, #0b1220 55%, #0f1a2e 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pb-10 pt-8 text-center sm:px-8 sm:pb-14 sm:pt-12 lg:pt-16">
          <motion.p
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            {...fadeUp}
            transition={{ duration: 0.55 }}
          >
            SkinSight AI
          </motion.p>

          <motion.h1
            className="mt-5 max-w-3xl text-xl font-semibold tracking-tight text-white/90 sm:text-2xl lg:text-[1.75rem] lg:leading-snug"
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            AI-assisted dermatology triage for clinicians who need speed without
            losing judgment.
          </motion.h1>

          <motion.p
            className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base"
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            Prioritize lesion cases, review explainable ABCDE signals, and keep
            final decisions in the clinician&apos;s hands.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
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
                  "min-w-[11rem] border-white/15 bg-white/5 text-white hover:border-white/25 hover:bg-white/10 hover:text-white",
              })}
            >
              Open live demo
            </Link>
          </motion.div>

          <motion.p
            className="mt-5 text-[11px] text-white/35"
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.26 }}
          >
            Portfolio concept · Decision support only · Not a medical device
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ProductCanvas />
        </motion.div>
      </section>

      {/* Problem — one job */}
      <section className="mesh-bg border-t border-border-subtle/60 px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
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
        className="scroll-mt-28 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="section-label">How it works</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              One clinical workflow from intake to sign-off
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Intake",
                body: "Register the patient and capture the lesion image.",
                icon: ListOrdered,
              },
              {
                step: "02",
                title: "AI Review",
                body: "Run multimodal analysis for ABCDE risk signals.",
                icon: ScanLine,
              },
              {
                step: "03",
                title: "Clinician",
                body: "Verify findings, add notes, and override when needed.",
                icon: ShieldCheck,
              },
              {
                step: "04",
                title: "Report",
                body: "Approve a decision-support report for the record.",
                icon: CheckCircle2,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative"
              >
                <p className="font-display text-3xl font-bold text-medical-blue/15">
                  {item.step}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-medical-blue" />
                  <h3 className="font-display text-base font-bold text-navy">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product promise */}
      <section className="mesh-bg border-y border-border-subtle/60 px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
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

          <div className="relative overflow-hidden rounded-2xl bg-navy px-6 py-8 text-white sm:px-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 70% 80% at 90% 10%, rgba(6,182,212,0.25) 0%, transparent 55%)",
              }}
            />
            <div className="relative">
              <Sparkles className="h-5 w-5 text-cyan-accent" />
              <p className="mt-4 font-display text-xl font-bold tracking-tight sm:text-2xl">
                AI accelerates review.
                <br />
                <span className="text-white/60">You keep the final call.</span>
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
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

      {/* Final CTA */}
      <section className="bg-[#07111f] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            SkinSight AI
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
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
                  "min-w-[11rem] border-white/15 bg-white/5 text-white hover:border-white/25 hover:bg-white/10 hover:text-white",
              })}
            >
              Read the case study
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 bg-[#07111f] px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} SkinSight AI · Portfolio concept prototype
          </p>
          <div className="flex gap-4 text-xs text-white/45">
            <Link href="/app" className="hover:text-white">
              App
            </Link>
            <Link href="/onboarding" className="hover:text-white">
              Onboarding
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

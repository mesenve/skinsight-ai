import Link from "next/link";
import { AboutContent } from "@/components/about/AboutContent";
import { LandingHeader } from "@/components/landing/LandingHeader";

export const metadata = {
  title: "Case Study — SkinSight AI",
  description:
    "A UI/UX case study on designing a safer AI-assisted dermatology review experience.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 20% -10%, rgba(45,108,181,0.14) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 10%, rgba(6,182,212,0.1) 0%, transparent 50%)",
        }}
      />
      <LandingHeader />
      <main className="relative mesh-bg border-t border-border-subtle px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28 lg:px-10">
        <div className="mx-auto mb-8 max-w-5xl">
          <p className="section-label text-medical-blue">Case study</p>
          <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Designing safer AI-assisted dermatology review
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            A compact product design case study for SkinSight AI — clinician
            triage, explainable risk signals, and human-in-the-loop decisions.
          </p>
        </div>
        <AboutContent />
      </main>
      <footer className="relative border-t border-border-subtle bg-white px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted">
            © 2026 SkinSight AI · Portfolio concept prototype
          </p>
          <div className="flex gap-4 text-xs text-muted">
            <Link href="/" className="transition-colors hover:text-medical-blue">
              Home
            </Link>
            <Link href="/app" className="transition-colors hover:text-medical-blue">
              Live demo
            </Link>
            <Link href="/onboarding" className="transition-colors hover:text-medical-blue">
              Onboarding
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

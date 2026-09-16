"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { LogoMark } from "@/components/shared/LogoMark";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const landingNavLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#product", label: "Product" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "Case study" },
  { href: "/app", label: "Live demo" },
];

export function LandingHeader() {
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
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 transition-[background-color,backdrop-filter,padding] duration-300 sm:px-6 lg:px-8",
        scrolled && "bg-background/70 pb-3 backdrop-blur-xl"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/70 bg-white/55 px-3 py-2.5 shadow-[0_10px_34px_rgba(26,75,140,0.1)] backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-300 sm:gap-4 sm:px-4",
          scrolled &&
            "border-white/80 bg-white/70 shadow-[0_14px_42px_rgba(26,75,140,0.14)]"
        )}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-xl px-1 py-0.5"
          onClick={() => setMobileOpen(false)}
        >
          <LogoMark size={36} className="shadow-medical-blue/25" />
          <div className="hidden min-[380px]:block">
            <p className="font-display text-sm font-bold tracking-tight text-navy">
              SkinSight AI
            </p>
            <p className="text-[10px] font-medium tracking-wide text-muted">
              Dermatology Triage
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {landingNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-2.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-medical-blue/[0.06] hover:text-medical-blue lg:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-navy transition-colors hover:border-medical-blue/25 hover:bg-medical-blue/[0.06] xl:hidden"
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
            className="pointer-events-auto mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/70 bg-white/60 p-3 shadow-[var(--shadow-elevated)] backdrop-blur-2xl backdrop-saturate-150 xl:hidden"
          >
            <nav className="flex flex-col gap-1">
              {landingNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3.5 py-3 text-sm font-medium text-muted transition-colors hover:bg-medical-blue/[0.06] hover:text-medical-blue"
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

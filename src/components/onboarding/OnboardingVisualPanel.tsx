"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type OnboardingStepId = "account" | "practice" | "preferences";

const stepCopy: Record<
  OnboardingStepId,
  { title: string; body: string; focusLabel: string }
> = {
  account: {
    title: "Secure clinician access",
    body: "Create your workspace identity to review lesion cases with clear AI support.",
    focusLabel: "Identity layer",
  },
  practice: {
    title: "Clinic context shapes triage",
    body: "Specialty and role help SkinSight prioritize the cases that matter most.",
    focusLabel: "Practice signal",
  },
  preferences: {
    title: "Ready for triage review",
    body: "Tune alerts, then enter the dashboard. AI assists — final judgment stays with you.",
    focusLabel: "Decision support",
  },
};

const statusItems = [
  { id: "account", label: "Account secured" },
  { id: "practice", label: "Practice linked" },
  { id: "preferences", label: "Preferences set" },
] as const;

const cells = [
  { size: 44, top: "10%", left: "12%", opacity: 0.32, delay: 0 },
  { size: 28, top: "18%", left: "62%", opacity: 0.26, delay: 0.1 },
  { size: 56, top: "42%", left: "6%", opacity: 0.2, delay: 0.15 },
  { size: 34, top: "58%", left: "72%", opacity: 0.28, delay: 0.05 },
  { size: 22, top: "72%", left: "30%", opacity: 0.22, delay: 0.2 },
  { size: 38, top: "14%", left: "80%", opacity: 0.18, delay: 0.12 },
];

const stepImages: Partial<Record<OnboardingStepId, string>> = {
  account: "/onboarding-account.jpg",
  practice: "/onboarding-practice.jpg",
  preferences: "/onboarding-preferences.jpg",
};

interface OnboardingVisualPanelProps {
  stepId: OnboardingStepId;
  stepIndex: number;
}

function StatusList({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="space-y-2">
      {statusItems.map((item, index) => {
        const done = index < stepIndex;
        const current = index === stepIndex;
        const state = done ? "done" : current ? "current" : "upcoming";

        return (
          <motion.div
            key={item.id}
            initial={false}
            animate={state}
            variants={{
              upcoming: {
                opacity: 0.34,
                y: 6,
                scale: 0.98,
              },
              current: {
                opacity: 1,
                y: 0,
                scale: 1,
              },
              done: {
                opacity: 0.74,
                y: 0,
                scale: 1,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 28,
              mass: 0.8,
              delay: current ? 0.08 : done ? index * 0.04 : 0,
            }}
            className={cn(
              "flex items-center gap-2.5 rounded-full border px-3.5 py-2",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_6px_16px_rgba(26,75,140,0.04)] backdrop-blur-2xl",
              done
                ? "border-white/40 bg-white/42"
                : current
                  ? "border-white/45 bg-white/40"
                  : "border-white/30 bg-white/34"
            )}
          >
            <motion.span
              layout
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full",
                done
                  ? "bg-risk-low/12 text-risk-low/85"
                  : current
                    ? "bg-medical-blue/12 text-medical-blue/90"
                    : "bg-white/40 text-muted/80"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {done ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0.4, opacity: 0, rotate: -40 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  >
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="dot"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{
                      scale: current ? [1, 1.25, 1] : 1,
                      opacity: 1,
                    }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={
                      current
                        ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.2 }
                    }
                    className="h-1.5 w-1.5 rounded-full bg-current"
                  />
                )}
              </AnimatePresence>
            </motion.span>

            <span
              className={cn(
                "flex-1 text-xs transition-colors duration-300",
                done
                  ? "font-medium text-navy/60"
                  : current
                    ? "font-medium text-navy/78"
                    : "font-medium text-navy/48"
              )}
            >
              {item.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export function OnboardingVisualPanel({
  stepId,
  stepIndex,
}: OnboardingVisualPanelProps) {
  const copy = stepCopy[stepId];
  const imageSrc = stepImages[stepId];

  if (imageSrc) {
    return (
      <motion.div
        key={`${stepId}-panel`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="relative h-full w-full min-h-0 overflow-hidden rounded-none bg-[#e8eef7] lg:rounded-r-[1.5rem]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={imageSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              priority={stepId === "account"}
              unoptimized
              sizes="(max-width: 1024px) 0px, 50vw"
              className="object-cover object-center opacity-95 scale-[1.06]"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-white/18" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              // Soft white top third — no side-edge wash
              "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.62) 12%, rgba(255,255,255,0.28) 24%, rgba(255,255,255,0.08) 36%, transparent 52%)",
              // Soft brand tone from bottom
              "linear-gradient(180deg, transparent 40%, rgba(26,75,140,0.05) 68%, rgba(26,75,140,0.14) 100%)",
              // Very light cyan hint bottom-right
              "radial-gradient(ellipse 70% 45% at 90% 100%, rgba(6,182,212,0.10) 0%, transparent 60%)",
            ].join(", "),
          }}
        />

        <div className="relative z-10 flex h-full min-h-0 flex-col justify-between p-5">
          <div className="max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={stepId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <h2 className="font-display text-xl font-semibold tracking-tight text-navy/80 leading-snug">
                  {copy.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-muted/90 sm:text-sm">
                  {copy.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <span className="mb-3 inline-flex rounded-full border border-white/35 bg-white/42 px-2.5 py-1 text-[10px] font-medium text-navy/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-2xl">
              {copy.focusLabel}
            </span>
            <StatusList stepIndex={stepIndex} />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-none bg-gradient-to-b from-[#f8fafc] via-[#e8eef7] to-[#c9d8ec] p-5 lg:rounded-r-[1.5rem]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 70% 35%, rgba(45,108,181,0.14) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 20% 75%, rgba(6,182,212,0.1) 0%, transparent 55%)",
        }}
      />

      {cells.map((cell, index) => (
        <motion.span
          key={index}
          className="pointer-events-none absolute rounded-full border border-white/60 bg-white/35 shadow-[0_8px_24px_rgba(26,75,140,0.08)] backdrop-blur-[2px]"
          style={{
            width: cell.size,
            height: cell.size,
            top: cell.top,
            left: cell.left,
            opacity: cell.opacity,
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 5 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: cell.delay,
          }}
        />
      ))}

      <div className="relative z-10 max-w-sm shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            <h2 className="font-display text-xl font-semibold tracking-tight text-navy/80 leading-snug">
              {copy.title}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
              {copy.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto my-auto flex w-full flex-1 items-center justify-center py-3">
        <div className="relative aspect-square w-full max-w-[12rem]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/80 via-[#d7e3f2]/70 to-[#b7cae3]/80 shadow-[0_16px_40px_rgba(26,75,140,0.12)]" />
          <div className="absolute inset-[12%] rounded-full border border-white/70 bg-gradient-to-br from-[#eef3f9] to-[#c5d6ea]/90" />

          <motion.div
            className="absolute inset-[28%] overflow-hidden rounded-full shadow-[inset_0_0_24px_rgba(26,75,140,0.12)]"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #f4e4d4 0%, #d4a574 35%, #a66b3c 62%, #6b3f24 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 60% 55%, rgba(0,0,0,0.18) 0%, transparent 45%), radial-gradient(circle at 25% 70%, rgba(255,255,255,0.15) 0%, transparent 35%)",
              }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-[22%] rounded-full border border-cyan-accent/35"
            animate={{
              opacity: [0.35, 0.75, 0.35],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="absolute inset-x-3 bottom-[16%] z-10 text-center">
            <span className="inline-flex rounded-full border border-white/50 bg-white/75 px-2.5 py-1 text-[10px] font-semibold text-navy shadow-[var(--shadow-soft)] backdrop-blur-sm">
              {copy.focusLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0">
        <StatusList stepIndex={stepIndex} />
      </div>
    </div>
  );
}

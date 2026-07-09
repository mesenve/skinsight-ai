"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Microscope } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { detail: "Polarized capture · 18mm FOV", code: "QC" },
  { detail: "Segmentation mask · 94% confidence", code: "SEG" },
  { detail: "5 dimensions scored", code: "ABCDE" },
  { detail: "Composite triage index", code: "RISK" },
];

const ABCDE_MARKERS = [
  { letter: "A", cx: 36, cy: 45 },
  { letter: "B", cx: 164, cy: 35 },
  { letter: "C", cx: 176, cy: 99 },
  { letter: "D", cx: 100, cy: 141 },
  { letter: "E", cx: 24, cy: 93 },
];

const LESION_PATH =
  "M 100 38 C 128 36 152 52 156 78 C 158 98 148 118 128 128 C 108 136 82 132 68 114 C 54 96 58 68 76 52 C 86 44 94 40 100 38 Z";

interface AIScanOverlayProps {
  active: boolean;
  onComplete: () => void;
}

export function AIScanOverlay({ active, onComplete }: AIScanOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [abcdeApproved, setAbcdeApproved] = useState(0);

  useEffect(() => {
    if (!active) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const stepDuration = 900;

    STEPS.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setCurrentStep(index);
          setProgress(((index + 1) / STEPS.length) * 100);
        }, index * stepDuration)
      );
    });

    timers.push(
      setTimeout(() => {
        setTimeout(onComplete, 550);
      }, STEPS.length * stepDuration + 350)
    );

    return () => timers.forEach(clearTimeout);
  }, [active, onComplete]);

  useEffect(() => {
    if (currentStep !== 2) {
      if (currentStep > 2) setAbcdeApproved(5);
      else setAbcdeApproved(0);
      return;
    }

    setAbcdeApproved(0);
    const timers = ABCDE_MARKERS.map((_, i) =>
      setTimeout(() => setAbcdeApproved(i + 1), 180 + i * 220)
    );
    return () => timers.forEach(clearTimeout);
  }, [currentStep]);

  if (!active) return null;

  const showContour = currentStep >= 1;
  const showAbcde = currentStep >= 2;
  const showHeatmap = currentStep >= 2;
  const showRisk = currentStep >= 3;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      >
        {/* Edge-only scrim — center stays clear for the lesion image */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/25 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center px-8 pb-[148px] pt-12">
          <div className="relative aspect-square w-full max-w-[min(72vw,260px)]">
            <div className="absolute inset-[3%] rounded-full border border-white/40" />
            <div className="absolute inset-[5%] rounded-full border border-medical-blue/20" />

            <motion.div
              className="absolute inset-[5%] rounded-full opacity-60"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(5,150,105,0.1) 22deg, rgba(26,75,140,0.04) 50deg, transparent 85deg)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute inset-[8%] rounded-full border border-risk-low/30"
              animate={{ scale: [1, 1.02, 1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />

            <AnimatePresence>
              {showHeatmap && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showRisk ? 0.22 : 0.12 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-[20%] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 55% 45%, rgba(220,38,38,0.35) 0%, rgba(217,119,6,0.15) 40%, transparent 70%)",
                    filter: "blur(10px)",
                  }}
                />
              )}
            </AnimatePresence>

            <svg
              viewBox="0 0 200 200"
              className="absolute inset-[10%] left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2"
              aria-hidden
            >
              <defs>
                <filter id="contour-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="rgba(26,75,140,0.12)"
                strokeWidth="0.5"
                strokeDasharray="3 8"
              />

              {showContour && (
                <motion.path
                  d={LESION_PATH}
                  transform="translate(0, 22)"
                  fill="rgba(5,150,105,0.04)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              <motion.path
                d={LESION_PATH}
                transform="translate(0, 22)"
                fill="none"
                stroke={showContour ? "#059669" : "rgba(26,75,140,0.25)"}
                strokeWidth="1.5"
                strokeLinejoin="round"
                filter="url(#contour-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: showContour ? 1 : 0,
                  opacity: showContour ? 1 : 0.2,
                }}
                transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              />

              {showAbcde && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  transform="translate(0, 22)"
                >
                  <line x1="68" y1="132" x2="132" y2="132" stroke="rgba(26,75,140,0.35)" strokeWidth="0.75" />
                  <line x1="68" y1="128" x2="68" y2="136" stroke="rgba(26,75,140,0.35)" strokeWidth="0.75" />
                  <line x1="132" y1="128" x2="132" y2="136" stroke="rgba(26,75,140,0.35)" strokeWidth="0.75" />
                  <text x="100" y="126" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="system-ui">
                    6.2 mm
                  </text>
                </motion.g>
              )}

              {showAbcde &&
                ABCDE_MARKERS.map((m, i) => {
                  const approved = i < abcdeApproved;
                  return (
                    <motion.g
                      key={m.letter}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
                      transform="translate(0, 22)"
                    >
                      <line
                        x1={m.cx}
                        y1={m.cy}
                        x2="100"
                        y2="82"
                        stroke={approved ? "rgba(5,150,105,0.35)" : "rgba(26,75,140,0.15)"}
                        strokeWidth="0.5"
                      />
                      <circle
                        cx={m.cx}
                        cy={m.cy}
                        r="9"
                        fill={approved ? "rgba(5,150,105,0.85)" : "rgba(11,18,32,0.55)"}
                        stroke={approved ? "#059669" : "rgba(255,255,255,0.5)"}
                        strokeWidth="1"
                      />
                      <text
                        x={m.cx}
                        y={m.cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={approved ? "#ffffff" : "#ffffff"}
                        fontSize="7"
                        fontWeight="700"
                        fontFamily="system-ui"
                      >
                        {m.letter}
                      </text>
                    </motion.g>
                  );
                })}
            </svg>

            {showRisk && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-[22%] rounded-full ring-1 ring-risk-medium/40"
              />
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 backdrop-blur-md">
            <Microscope className="h-3.5 w-3.5 text-cyan-glow" />
            <span className="text-[10px] font-semibold tracking-[0.12em] text-white/90">
              DERMOSCOPIC PRE-SCREEN
            </span>
          </div>
          <div className="rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-right leading-none backdrop-blur-md">
            <span className="font-display text-sm font-bold tabular-nums text-cyan-glow">
              {Math.round(progress)}%
            </span>
            <p className="mt-0.5 text-[9px] tracking-wide text-white/55">
              {STEPS[currentStep]?.code}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/88 to-white/0 px-4 pb-3 pt-10 shadow-[0_-8px_24px_rgba(11,18,32,0.05)]">
          <div className="mb-2.5 h-1 overflow-hidden rounded-full bg-background">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-risk-low/70 via-risk-low to-risk-low"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {STEPS.map((step, index) => {
              const isDone = index < currentStep;
              const isCurrent = index === currentStep;

              return (
                <motion.div
                  key={step.code}
                  initial={false}
                  animate={{
                    backgroundColor: isDone
                      ? "rgba(5,150,105,0.1)"
                      : isCurrent
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(238,242,247,0.8)",
                  }}
                  className={cn(
                    "flex h-9 items-center gap-1.5 rounded-lg px-2 transition-shadow",
                    isDone && "ring-1 ring-risk-low/25",
                    isCurrent && "ring-1 ring-medical-blue/25 shadow-sm",
                    !isDone && !isCurrent && "opacity-55"
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: isDone ? "#059669" : isCurrent ? "rgba(26,75,140,0.12)" : "rgba(11,18,32,0.06)",
                    }}
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold",
                      isDone ? "text-white" : isCurrent ? "text-medical-blue" : "text-muted-light"
                    )}
                  >
                    {isDone ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 22 }}
                      >
                        <Check className="h-2.5 w-2.5" />
                      </motion.div>
                    ) : (
                      index + 1
                    )}
                  </motion.div>
                  <span
                    className={cn(
                      "truncate text-[10px] font-semibold leading-none",
                      isDone && "text-risk-low",
                      isCurrent && "text-navy",
                      !isDone && !isCurrent && "text-muted-light"
                    )}
                  >
                    {step.code}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-2 flex h-7 items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.22 }}
                className="text-center text-[10px] leading-none text-muted"
              >
                {STEPS[currentStep].detail}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-1 text-center text-[9px] leading-none text-muted-light">
            Decision-support analysis · Clinician verification required
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import type { RiskLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AIRiskScoreCardProps {
  score: number;
  priority: RiskLevel;
  loading?: boolean;
}

const priorityConfig: Record<
  RiskLevel,
  { label: string; color: string; bg: string; threshold: string }
> = {
  high: {
    label: "Elevated risk signal",
    color: "text-risk-high",
    bg: "from-risk-high/15 to-risk-high/5",
    threshold: "Above clinic review threshold",
  },
  medium: {
    label: "Moderate risk signal",
    color: "text-risk-medium",
    bg: "from-risk-medium/15 to-risk-medium/5",
    threshold: "Within monitoring range",
  },
  low: {
    label: "Low risk signal",
    color: "text-risk-low",
    bg: "from-risk-low/15 to-risk-low/5",
    threshold: "Below expedited review threshold",
  },
};

const ZONES = [
  { label: "Low", max: 33, color: "#059669" },
  { label: "Moderate", max: 66, color: "#d97706" },
  { label: "Elevated", max: 100, color: "#dc2626" },
];

export function AIRiskScoreCard({
  score,
  priority,
  loading = false,
}: AIRiskScoreCardProps) {
  const config = priorityConfig[priority];
  const size = 160;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  if (loading) {
    return (
      <div className="smooth-card rounded-2xl p-6">
        <div className="mx-auto h-40 w-40 animate-pulse rounded-full bg-background" />
        <div className="mx-auto mt-5 h-4 w-36 animate-pulse rounded-lg bg-background" />
        <div className="mt-3 flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-16 animate-pulse rounded-lg bg-background" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "smooth-card overflow-hidden rounded-2xl",
        "bg-gradient-to-br to-white",
        config.bg
      )}
    >
      <div className="p-6">
        <div>
          <p className="section-label">AI Risk Signal</p>
          <p className="mt-1 text-xs text-muted">
            Decision-support score
          </p>
        </div>

        <div className="relative mx-auto mt-5 flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            {ZONES.map((zone, i) => {
              const startAngle = i === 0 ? 0 : ZONES[i - 1].max;
              const zoneSize = zone.max - startAngle;
              const zoneOffset = circumference - (zoneSize / 100) * circumference;
              const rotation = (startAngle / 100) * 360;
              return (
                <circle
                  key={zone.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={zone.color}
                  strokeWidth={stroke}
                  strokeOpacity={0.12}
                  strokeDasharray={circumference}
                  strokeDashoffset={zoneOffset}
                  style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "center" }}
                />
              );
            })}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              strokeWidth={stroke}
              strokeLinecap="round"
              stroke={
                priority === "high"
                  ? "#dc2626"
                  : priority === "medium"
                    ? "#d97706"
                    : "#059669"
              }
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              style={{ strokeDasharray: circumference }}
            />
          </svg>
          <div className="absolute text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="font-display text-4xl font-bold text-navy"
            >
              {score}
            </motion.span>
            <p className="text-xs font-medium text-muted-light">/ 100</p>
          </div>
        </div>

        <p className={cn("mt-4 text-center text-sm font-semibold", config.color)}>
          {config.label}
        </p>
        <p className="mt-1 text-center text-xs text-muted">
          {config.threshold}
        </p>

        <div className="mt-5 flex justify-center gap-3">
          {ZONES.map((zone) => (
            <div key={zone.label} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: zone.color }}
              />
              <span className="text-[10px] font-medium text-muted">{zone.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2 bg-white/60 px-5 py-3">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-light" />
        <p className="text-[11px] leading-relaxed text-muted">
          Requires clinician verification before any clinical action. Not a
          diagnosis.
        </p>
      </div>
    </motion.div>
  );
}

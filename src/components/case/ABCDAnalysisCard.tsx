"use client";

import { motion } from "framer-motion";
import type { ABCDDimension } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusConfig = {
  concerning: {
    label: "Elevated",
    bar: "bg-gradient-to-r from-risk-high/80 to-risk-high",
    chip: "bg-risk-high/8 text-risk-high",
  },
  moderate: {
    label: "Moderate",
    bar: "bg-gradient-to-r from-risk-medium/80 to-risk-medium",
    chip: "bg-risk-medium/8 text-risk-medium",
  },
  normal: {
    label: "Within Range",
    bar: "bg-gradient-to-r from-risk-low/80 to-risk-low",
    chip: "bg-risk-low/8 text-risk-low",
  },
};

interface ABCDAnalysisCardProps {
  title: string;
  dimension: ABCDDimension;
  index?: number;
  loading?: boolean;
}

export function ABCDAnalysisCard({
  title,
  dimension,
  index = 0,
  loading = false,
}: ABCDAnalysisCardProps) {
  const config = statusConfig[dimension.status];

  if (loading) {
    return (
      <div className="smooth-card rounded-xl p-4">
        <div className="h-4 w-24 animate-pulse rounded-md bg-background" />
        <div className="mt-4 h-1.5 w-full animate-pulse rounded-full bg-background" />
        <div className="mt-3 h-3 w-full animate-pulse rounded-md bg-background" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -1, transition: { duration: 0.15 } }}
      className="smooth-card rounded-xl p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold text-navy/20">
            {title[0]}
          </span>
          <h4 className="text-sm font-semibold text-navy">{title}</h4>
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            config.chip
          )}
        >
          {config.label}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-background">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${dimension.score}%` }}
            transition={{ delay: index * 0.07 + 0.25, duration: 0.7, ease: "easeOut" }}
            className={cn("h-full rounded-full", config.bar)}
          />
        </div>
        <span className="font-display text-xs font-bold text-navy">
          {dimension.score}
        </span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        {dimension.explanation}
      </p>
    </motion.div>
  );
}

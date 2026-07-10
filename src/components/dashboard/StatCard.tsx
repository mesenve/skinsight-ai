"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  accent?: "navy" | "red" | "blue" | "cyan" | "green";
  trend?: string;
  index?: number;
  active?: boolean;
  onClick?: () => void;
}

const accentConfig = {
  navy: {
    icon: "bg-navy/6 text-navy",
    surface: "bg-gradient-to-br from-navy/[0.04] via-white to-white",
    glow: "bg-navy/10",
    ring: "ring-navy/20",
  },
  red: {
    icon: "bg-risk-high/6 text-risk-high",
    surface: "bg-gradient-to-br from-risk-high/[0.05] via-white to-white",
    glow: "bg-risk-high/10",
    ring: "ring-risk-high/20",
  },
  blue: {
    icon: "bg-medical-blue/6 text-medical-blue",
    surface: "bg-gradient-to-br from-medical-blue/[0.05] via-white to-white",
    glow: "bg-medical-blue/10",
    ring: "ring-medical-blue/20",
  },
  cyan: {
    icon: "bg-cyan-accent/8 text-cyan-accent",
    surface: "bg-gradient-to-br from-cyan-accent/[0.05] via-white to-white",
    glow: "bg-cyan-accent/10",
    ring: "ring-cyan-accent/20",
  },
  green: {
    icon: "bg-risk-low/6 text-risk-low",
    surface: "bg-gradient-to-br from-risk-low/[0.05] via-white to-white",
    glow: "bg-risk-low/10",
    ring: "ring-risk-low/20",
  },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  accent = "navy",
  trend,
  index = 0,
  active = false,
  onClick,
}: StatCardProps) {
  const config = accentConfig[accent];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "interactive-card group relative w-full overflow-hidden rounded-2xl p-5 text-left",
        "shadow-[var(--shadow-soft)] transition-[box-shadow,transform] duration-200",
        "hover:shadow-[var(--shadow-hover)]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-medical-blue/35 focus-visible:ring-offset-1",
        config.surface,
        active && cn("ring-1 ring-offset-1 ring-offset-background", config.ring)
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl",
          config.glow
        )}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="section-label">{label}</p>
          <p className="font-display mt-2 text-3xl font-bold tracking-tight text-navy">
            {value}
          </p>
          {trend && (
            <p className="mt-1.5 text-xs text-muted">{trend}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
            config.icon
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.button>
  );
}

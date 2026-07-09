"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  accent?: "navy" | "red" | "blue" | "cyan";
  trend?: string;
  index?: number;
}

const accentConfig = {
  navy: { icon: "bg-navy/6 text-navy", bar: "bg-navy", glow: "from-navy/5" },
  red: { icon: "bg-risk-high/8 text-risk-high", bar: "bg-risk-high", glow: "from-risk-high/5" },
  blue: { icon: "bg-medical-blue/8 text-medical-blue", bar: "bg-medical-blue", glow: "from-medical-blue/5" },
  cyan: { icon: "bg-cyan-accent/10 text-cyan-accent", bar: "bg-cyan-accent", glow: "from-cyan-accent/5" },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  accent = "navy",
  trend,
  index = 0,
}: StatCardProps) {
  const config = accentConfig[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "smooth-card group relative overflow-hidden rounded-2xl p-5",
        "bg-gradient-to-br to-white",
        config.glow
      )}
    >
      <div className="flex items-start justify-between">
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
      <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-background">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value * 10, 100)}%` }}
          transition={{ delay: index * 0.07 + 0.3, duration: 0.8, ease: "easeOut" }}
          className={cn("h-full rounded-full opacity-60", config.bar)}
        />
      </div>
    </motion.div>
  );
}

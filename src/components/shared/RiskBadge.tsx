import type { RiskLevel } from "@/lib/types";
import { AlertTriangle, CheckCircle2, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const config: Record<
  RiskLevel,
  { label: string; className: string; dot: string; icon: typeof AlertTriangle }
> = {
  high: {
    label: "High Risk",
    className: "bg-risk-high/8 text-risk-high",
    dot: "bg-risk-high",
    icon: AlertTriangle,
  },
  medium: {
    label: "Medium",
    className: "bg-risk-medium/8 text-risk-medium",
    dot: "bg-risk-medium",
    icon: Minus,
  },
  low: {
    label: "Low Risk",
    className: "bg-risk-low/8 text-risk-low",
    dot: "bg-risk-low",
    icon: CheckCircle2,
  },
};

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
  showDot?: boolean;
}

export function RiskBadge({
  level,
  className,
  showDot = true,
}: RiskBadgeProps) {
  const { label, className: levelClass, dot, icon: Icon } = config[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        levelClass,
        className
      )}
    >
      {showDot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
      )}
      <Icon className="h-3 w-3 opacity-70" />
      {label}
    </span>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  id?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  className,
  id,
}: SwitchProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "group inline-flex items-center gap-3 text-left focus-visible:outline-none",
        className
      )}
    >
      <span
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-all duration-200",
          "ring-1 ring-inset",
          checked
            ? "bg-gradient-to-r from-medical-blue to-medical-blue-light shadow-sm shadow-medical-blue/20 ring-medical-blue/20"
            : "bg-background ring-border-subtle group-hover:ring-medical-blue/25",
          "group-focus-visible:ring-2 group-focus-visible:ring-medical-blue/35 group-focus-visible:ring-offset-2"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(11,18,32,0.18),0_1px_1px_rgba(11,18,32,0.08)] transition-transform duration-200 ease-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </span>
      {label ? (
        <span className="text-sm font-medium text-navy transition-colors group-hover:text-medical-blue">
          {label}
        </span>
      ) : null}
    </button>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex rounded-md border border-border bg-surface-inset p-0.5",
        className
      )}
      role="tablist"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded px-3 py-1.5 text-xs font-semibold transition-all duration-150",
            value === opt.value
              ? "bg-white text-navy shadow-sm"
              : "text-muted hover:text-navy"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

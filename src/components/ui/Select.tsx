"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
}

const triggerClass =
  "smooth-card flex w-full items-center justify-between gap-2 rounded-xl border border-border-subtle/80 bg-white px-4 py-2.5 text-left text-sm text-navy outline-none transition-all hover:border-medical-blue/25 focus-visible:shadow-[var(--shadow-soft)] focus-visible:ring-2 focus-visible:ring-medical-blue/20";

export function Select<T extends string>({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className,
  "aria-label": ariaLabel,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((option) => option.value === value);
  const selectedIndex = options.findIndex((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (!open) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((index) => Math.min(index + 1, options.length - 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((index) => Math.max(index - 1, 0));
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const option = options[highlightedIndex];
        if (option) {
          onChange(option.value);
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [highlightedIndex, onChange, open, options]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          if (!open) {
            setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
          }
          setOpen((current) => !current);
        }}
        className={cn(triggerClass, open && "border-medical-blue/30 shadow-[var(--shadow-soft)]")}
      >
        <span className={cn(!selected && "text-muted-light")}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180 text-medical-blue"
          )}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-border-subtle/80 bg-white p-1.5 shadow-[var(--shadow-elevated)]"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    isSelected
                      ? "bg-medical-blue/8 font-semibold text-medical-blue"
                      : "text-navy",
                    isHighlighted && !isSelected && "bg-medical-blue/[0.05]",
                    !isSelected && !isHighlighted && "hover:bg-medical-blue/[0.05]"
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="h-4 w-4 shrink-0 text-medical-blue" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

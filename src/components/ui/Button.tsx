import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "chip"
  | "chip-active"
  | "primary"
  | "ai"
  | "secondary"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue/35 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  chip:
    "rounded-full border border-border-subtle bg-white text-muted shadow-[var(--shadow-soft)] hover:border-medical-blue/30 hover:bg-medical-blue/[0.04] hover:text-navy",
  "chip-active":
    "rounded-full bg-medical-blue text-white shadow-md shadow-medical-blue/20 hover:bg-medical-blue-light",
  primary:
    "rounded-xl bg-gradient-to-r from-medical-blue to-medical-blue-light text-white shadow-sm shadow-medical-blue/12 hover:shadow-md hover:shadow-medical-blue/15 hover:brightness-[1.02]",
  ai: "rounded-xl bg-gradient-to-r from-medical-blue via-medical-blue-light to-cyan-accent text-white shadow-sm shadow-medical-blue/10 hover:shadow-md hover:shadow-medical-blue/12 hover:brightness-[1.02]",
  secondary:
    "group rounded-xl border border-border-subtle/80 bg-background/70 text-navy hover:border-medical-blue/25 hover:bg-background hover:text-medical-blue",
  ghost:
    "rounded-lg text-muted hover:bg-background hover:text-medical-blue",
};

/** Fixed heights — md/lg share h-10 for consistent action bars */
const sizes: Record<ButtonSize, string> = {
  sm: "h-8 min-h-8 px-3 text-xs leading-none",
  md: "h-10 min-h-10 px-4 text-sm leading-none",
  lg: "h-10 min-h-10 px-5 text-sm leading-none",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  )
);

Button.displayName = "Button";

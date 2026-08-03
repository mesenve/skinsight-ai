import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      {eyebrow && <p className="section-label">{eyebrow}</p>}
      <h2
        className={cn(
          "font-display text-xl font-bold tracking-tight text-navy sm:text-2xl",
          eyebrow ? "mt-2" : "mt-0"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

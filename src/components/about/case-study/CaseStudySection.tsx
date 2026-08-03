import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/about/SectionHeader";

interface CaseStudySectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function CaseStudySection({
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
}: CaseStudySectionProps) {
  return (
    <section className={cn(className)}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        className="mb-5"
      />
      <div className={contentClassName}>{children}</div>
    </section>
  );
}

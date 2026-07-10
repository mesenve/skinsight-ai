import Image from "next/image";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientIdPhotoProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { box: "h-12 w-10", sizes: "40px", icon: "h-5 w-5" },
  md: { box: "h-14 w-11", sizes: "44px", icon: "h-5 w-5" },
  lg: { box: "h-[72px] w-[58px]", sizes: "58px", icon: "h-7 w-7" },
};

export function PatientIdPhoto({
  src,
  alt,
  size = "md",
  className,
}: PatientIdPhotoProps) {
  const { box, sizes, icon } = sizeMap[size];
  const photoSrc = src?.trim();

  if (!photoSrc) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-sm border border-border-subtle/80 bg-medical-blue/[0.06] shadow-sm",
          box,
          className
        )}
        aria-label={alt}
        role="img"
      >
        <UserRound className={cn(icon, "text-medical-blue/70")} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-sm bg-[#cfd8e3] shadow-sm",
        box,
        className
      )}
    >
      <Image
        src={photoSrc}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes={sizes}
      />
    </div>
  );
}

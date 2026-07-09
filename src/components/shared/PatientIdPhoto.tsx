import Image from "next/image";
import { cn } from "@/lib/utils";

interface PatientIdPhotoProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { box: "h-12 w-10", sizes: "40px" },
  md: { box: "h-14 w-11", sizes: "44px" },
  lg: { box: "h-[72px] w-[58px]", sizes: "58px" },
};

export function PatientIdPhoto({
  src,
  alt,
  size = "md",
  className,
}: PatientIdPhotoProps) {
  const { box, sizes } = sizeMap[size];

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-sm bg-[#cfd8e3] shadow-sm",
        box,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes={sizes}
      />
    </div>
  );
}

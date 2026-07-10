import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 40, className }: LogoMarkProps) {
  return (
    <Image
      src="/logo.png"
      alt="SkinSight AI"
      width={size}
      height={size}
      className={cn("rounded-xl shadow-lg shadow-medical-blue/20", className)}
      priority
    />
  );
}

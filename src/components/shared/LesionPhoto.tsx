import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface LesionPhotoProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
}

export function LesionPhoto({ src, alt, className, ...props }: LesionPhotoProps) {
  const isDataUrl = src.startsWith("data:") || src.startsWith("blob:");

  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={isDataUrl}
      className={cn(className)}
      {...props}
    />
  );
}

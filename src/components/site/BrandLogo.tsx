import Image from "next/image";
import { cn } from "@/lib/cn";
import { brand } from "@/lib/site";

type BrandLogoProps = {
  className?: string;
  /** Header should pass true for LCP. */
  priority?: boolean;
};

/**
 * Wordmark logo (stencil + script). Intrinsic size 512×171; size via `className` (e.g. h-7 w-auto).
 */
export function BrandLogo({ className, priority }: BrandLogoProps) {
  const { src, alt, width, height } = brand.logo;
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("w-auto object-contain object-left", className)}
      priority={priority}
      sizes="(max-width: 768px) 200px, 240px"
    />
  );
}

import Link from "next/link";
import { BrandLogo } from "@/components/site/BrandLogo";
import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/locations", label: "Locations" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "siteHeader sticky top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-xl transition-[background-color,backdrop-filter] duration-300 [transition-timing-function:var(--ease-out)]",
        className,
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,214,138,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md px-1 py-0.5"
        >
          <BrandLogo
            className="h-7 w-auto opacity-95 transition-opacity group-hover:opacity-100 md:h-8"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/72 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,214,138,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md px-2 py-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" href="/locations" className="hidden sm:inline-flex">
            Choose a shop
          </Button>
          <Button href="/locations">Book now</Button>
        </div>
      </Container>

      <div className="border-t border-white/10 md:hidden">
        <Container className="flex gap-2 overflow-x-auto py-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-full border border-white/12 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-[color:var(--accent)] hover:text-white",
                item.href === "/gallery" &&
                  "border-[color:var(--accent)] bg-[rgba(255,214,138,0.12)] text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}


import Link from "next/link";
import { BrandLogo } from "@/components/site/BrandLogo";
import { Container } from "@/components/site/Container";
import { locations } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <Container className="py-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandLogo className="h-8 w-auto sm:h-9" />
            <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
              A premium barbershop experience in Oakville — clean work, sharp
              details, no rush jobs.
            </p>
          </div>

          <div className="md:col-span-7 grid gap-6 sm:grid-cols-3">
            {locations.map((l) => (
              <div key={l.slug} className="text-sm">
                <p className="text-white/85">{l.name}</p>
                <p className="mt-2 text-white/60">
                  {l.addressLine1}
                  <br />
                  {l.addressLine2}
                </p>
                {l.phone ? (
                  <a
                    className="mt-2 inline-block text-white/72 hover:text-white"
                    href={`tel:${l.phone.replace(/[^\d+]/g, "")}`}
                  >
                    {l.phone}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Top Tier Company. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/reviews" className="hover:text-white">
              Reviews
            </Link>
            <Link href="/locations" className="hover:text-white">
              Locations
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}


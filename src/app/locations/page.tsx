import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/Button";
import { locations } from "@/lib/site";

export default function LocationsPage() {
  return (
    <main className="grain topo">
      <Container className="py-14 md:py-20">
        <div className="max-w-2xl">
          <h1
            className="text-4xl tracking-[-0.03em] text-white md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Choose your shop.
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/60 md:text-base">
            Three Oakville locations. Same standards: clean execution, sharp
            detail work, and a consistent finish.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {locations.map((l) => (
            <div
              key={l.slug}
              className="rounded-3xl border border-white/12 bg-white/4 p-6"
            >
              <p className="text-sm text-white/90">
                {l.name} <span className="text-white/50">• {l.neighborhoodLabel}</span>
              </p>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {l.addressLine1}
                <br />
                {l.addressLine2}
              </p>

              <div className="mt-4 grid gap-2 text-xs text-white/60">
                {l.hours.map((h) => (
                  <div key={h.label} className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.18em] text-white/45">
                      {h.label}
                    </span>
                    <span className="text-white/70">{h.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Button href={`/booking?location=${l.slug}`}>Book</Button>
                <Button variant="ghost" href={`/locations/${l.slug}`}>
                  Details
                </Button>
                <a
                  className="text-xs text-white/60 hover:text-white transition-colors"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    l.googleMapsQuery,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/12 bg-white/4 p-6">
          <p className="text-sm text-white/85">Booking tip</p>
          <p className="mt-2 text-sm leading-6 text-white/60">
            If you’re not sure which shop to pick, start with the closest one.
            Your cut should feel consistent no matter where you book.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button href="/services" variant="ghost">
              See services
            </Button>
            <Link
              href="/contact"
              className="text-sm text-white/70 hover:text-white transition-colors self-center"
            >
              Questions? Contact us →
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}


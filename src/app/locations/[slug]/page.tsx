import { notFound } from "next/navigation";
import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/Button";
import { locations, type LocationSlug } from "@/lib/site";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export default function LocationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug as LocationSlug;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return notFound();

  return (
    <main className="grain topo">
      <Container className="py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.32em] text-white/55">
              Location
            </p>
            <h1
              className="mt-3 text-4xl tracking-[-0.03em] text-white md:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {loc.name}
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/60 md:text-base">
              {loc.neighborhoodLabel} — {loc.addressLine1}, {loc.addressLine2}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href={`/booking?location=${loc.slug}`}>Book this shop</Button>
              {loc.phone ? (
                <Button
                  variant="ghost"
                  href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`}
                >
                  Call {loc.phone}
                </Button>
              ) : (
                <Button variant="ghost" href="/contact">
                  Contact
                </Button>
              )}
              <a
                className="text-sm text-white/70 hover:text-white transition-colors"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  loc.googleMapsQuery,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps →
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/12 bg-white/4 p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                  Hours
                </p>
                <div className="mt-3 grid gap-2 text-sm text-white/70">
                  {loc.hours.map((h) => (
                    <div key={h.label} className="flex justify-between gap-4">
                      <span className="text-white/55">{h.label}</span>
                      <span className="text-white/80">{h.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/12 bg-white/4 p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                  Getting here
                </p>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {loc.parkingNote ??
                    "Plan a few minutes for parking and arrival."}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  Tip: arrive 5 minutes early so your appointment stays on time.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-white/12 bg-black/35 p-6">
              <p className="text-xs uppercase tracking-[0.26em] text-white/55">
                Map
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/12 bg-white/5">
                <iframe
                  title={`Map of ${loc.name}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    loc.googleMapsQuery,
                  )}&output=embed`}
                  className="h-[320px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-4 text-xs leading-5 text-white/55">
                If the map doesn’t load, use “Open in Google Maps” above.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


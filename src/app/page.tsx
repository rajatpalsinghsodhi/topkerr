import Link from "next/link";
import { Container } from "@/components/site/Container";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { SocialWall } from "@/components/site/SocialWall";
import { Button } from "@/components/ui/Button";
import { brand, locations, services, socialEmbeds, testimonials } from "@/lib/site";

export default function Home() {
  return (
    <main className="grain topo">
      <section className="relative overflow-hidden">
        <Container className="relative py-16 md:py-24">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="revealUp inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_6px_rgba(255,214,138,0.12)]" />
                {brand.city} • premium barbershop
              </p>

              <h1
                className="revealUp mt-6 text-balance text-5xl leading-[0.95] tracking-[-0.03em] text-white md:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {brand.hero.headline}
              </h1>
              <p
                className="revealUp mt-5 max-w-xl text-pretty text-base leading-7 text-white/82 md:text-lg"
                style={{ animationDelay: "90ms" }}
              >
                {brand.hero.subhead}
              </p>

              <div
                className="revealUp mt-8 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "150ms" }}
              >
                <Button href="/locations" className="revealUp" style={{ animationDelay: "180ms" }}>
                  Book now
                </Button>
                <Button
                  variant="ghost"
                  href="/services"
                  className="revealUp"
                  style={{ animationDelay: "240ms" }}
                >
                  See services
                </Button>
                <Button
                  variant="ghost"
                  href="/gallery"
                  className="revealUp"
                  style={{ animationDelay: "300ms" }}
                >
                  View gallery
                </Button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Rating", v: "4.9★ (500+ reviews)" },
                  { k: "Hours", v: "Mon–Sat 10–8 • Sun 10–6" },
                  { k: "Vibe", v: "Fades + Beard + Kicks" },
                ].map((s, i) => (
                  <div
                    key={s.k}
                    className="reveal rounded-2xl border border-white/12 bg-white/5 px-4 py-4"
                    style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                      {s.k}
                    </p>
                    <p className="mt-2 text-sm text-white/82">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-black/35 p-5">
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-[color:var(--glow)] blur-3xl" />
                  <div className="absolute -right-14 bottom-0 h-80 w-80 rounded-full bg-[rgba(156,231,255,0.12)] blur-3xl" />
                </div>

                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/55">
                    Choose a shop
                  </p>
                  <div className="mt-4 grid gap-3">
                    {locations.map((l, i) => (
                      <Link
                        key={l.slug}
                        href={`/locations/${l.slug}`}
                        className="reveal group rounded-2xl border border-white/12 bg-white/4 p-4 transition-[transform,background-color,border-color] duration-200 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5 hover:bg-white/6 hover:border-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,214,138,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm text-white/90">
                              {l.name}{" "}
                              <span className="text-white/50">
                                • {l.neighborhoodLabel}
                              </span>
                            </p>
                            <p className="mt-1 text-xs leading-5 text-white/55">
                              {l.addressLine1}, {l.addressLine2}
                            </p>
                          </div>
                          <span className="mt-0.5 inline-flex items-center rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
                            book
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="reveal mt-5 rounded-2xl border border-white/12 bg-white/4 p-4">
                    <p className="text-sm text-white/85">
                      Want the “kicks” side too?
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/55">
                      Top Tier blends barber craft with consignment culture. Stop
                      in, get fresh, and browse.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="pulse flex flex-col items-center gap-2 text-white/55">
              <span className="text-[10px] uppercase tracking-[0.32em]">
                scroll
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M12 5v12m0 0 5-5m-5 5-5-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 left-1/2 h-64 w-[1100px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl"
          />
        </Container>
      </section>

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,214,138,0.14),rgba(255,214,138,0.06))]">
        <div className="ticker py-4">
          <div className="tickerTrack">
            {Array.from({ length: 2 }).map((_, pass) => (
              <div key={pass} className="flex items-center gap-6 pr-6">
                {services.map((s) => (
                  <div
                    key={`${pass}-${s.title}`}
                    className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-[rgba(255,214,138,0.80)] px-5 py-2 text-xs uppercase tracking-[0.26em] text-black/85"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-black/70" />
                    {s.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <Container className="py-14 md:py-18">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                className="reveal text-3xl tracking-[-0.02em] text-white md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Services that stay sharp.
              </h2>
              <p className="reveal mt-2 max-w-2xl text-sm leading-6 text-white/60">
                Built for consistency: clean blends, crisp edges, and detail
                work that holds up days later.
              </p>
            </div>
            <Button variant="ghost" href="/services" className="reveal w-fit">
              Full service list
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <div
                key={s.title}
                className="reveal relative overflow-hidden rounded-3xl border border-white/12 bg-white/4 p-6 transition-[border-color,transform] duration-200 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5 hover:border-[color:var(--accent)]"
                style={{ transitionDelay: `${(i + 1) * 80}ms` }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl"
                />
                <p className="text-sm text-white/90">{s.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10">
        <Container className="py-14 md:py-18">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                className="reveal text-3xl tracking-[-0.02em] text-white md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Real reviews. Real results.
              </h2>
              <p className="reveal mt-2 max-w-2xl text-sm leading-6 text-white/60">
                Excerpts from public Google reviews. Consistency and care show up
                again and again.
              </p>
            </div>
            <Button variant="ghost" href="/reviews" className="reveal w-fit">
              Read more
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="reveal"
                style={{ transitionDelay: `${(i + 1) * 80}ms` }}
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10">
        <Container className="py-14 md:py-18">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                className="reveal text-3xl tracking-[-0.02em] text-white md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                From the chair.
              </h2>
              <p className="reveal mt-2 max-w-2xl text-sm leading-6 text-white/60">
                Latest from social — real work, real vibe.
              </p>
            </div>
            <Button
              variant="ghost"
              href={brand.socials.instagram}
              className="reveal w-fit"
            >
              Instagram
            </Button>
          </div>

          <div className="reveal">
            <SocialWall className="mt-8" items={socialEmbeds} />
          </div>
        </Container>
      </section>
    </main>
  );
}
